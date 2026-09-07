#!/usr/bin/env node
/* Beheer van de versleutelde bellijst-gegevens.
 *
 * De contactgegevens staan als AES-256-GCM-blob (KLUIS) in
 * bellijst/index.html; de sleutel wordt met PBKDF2-SHA256 (200000
 * iteraties) afgeleid uit het wachtwoord, genormaliseerd naar
 * hoofdletters. Het wachtwoord staat nergens in de repo.
 *
 * Gebruik:
 *   node tools/bellijst-kluis.js ontsleutel > /tmp/lijst.json
 *   node tools/bellijst-kluis.js versleutel /tmp/lijst.json
 *
 * Het wachtwoord komt uit de omgevingsvariabele KLUIS_WACHTWOORD of
 * wordt interactief gevraagd. Zet het tijdelijke JSON-bestand nooit
 * in de repo en verwijder het na gebruik.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const readline = require('readline');

const BESTAND = path.join(__dirname, '..', 'bellijst', 'index.html');
const ITERATIES = 200000;

function vraagWachtwoord() {
    if (process.env.KLUIS_WACHTWOORD) return Promise.resolve(process.env.KLUIS_WACHTWOORD);
    return new Promise(los => {
        const rl = readline.createInterface({ input: process.stdin, output: process.stderr });
        rl.question('Wachtwoord: ', antwoord => { rl.close(); los(antwoord); });
    });
}

function sleutel(wachtwoord, zout) {
    return crypto.pbkdf2Sync(Buffer.from(wachtwoord.toUpperCase(), 'utf8'), zout, ITERATIES, 32, 'sha256');
}

function leesKluis(src) {
    const m = src.match(/const KLUIS = \{\s*zout: '([^']+)',\s*iv: '([^']+)',\s*data: '([^']+)'\s*\};/);
    if (!m) throw new Error('Geen KLUIS-blok gevonden in ' + BESTAND);
    return { zout: Buffer.from(m[1], 'base64'), iv: Buffer.from(m[2], 'base64'), data: Buffer.from(m[3], 'base64'), blok: m[0] };
}

async function ontsleutel() {
    const src = fs.readFileSync(BESTAND, 'utf8');
    const kluis = leesKluis(src);
    const ww = await vraagWachtwoord();
    const k = sleutel(ww, kluis.zout);
    const tag = kluis.data.subarray(kluis.data.length - 16);
    const ct = kluis.data.subarray(0, kluis.data.length - 16);
    const decipher = crypto.createDecipheriv('aes-256-gcm', k, kluis.iv);
    decipher.setAuthTag(tag);
    let klaar;
    try {
        klaar = Buffer.concat([decipher.update(ct), decipher.final()]);
    } catch (e) {
        console.error('Ontsleutelen mislukt: onjuist wachtwoord?');
        process.exit(1);
    }
    process.stdout.write(JSON.stringify(JSON.parse(klaar.toString('utf8')), null, 2) + '\n');
}

async function versleutel(jsonPad) {
    const nummers = JSON.parse(fs.readFileSync(jsonPad, 'utf8'));
    if (!Array.isArray(nummers)) throw new Error('Verwacht een JSON-array');
    const src = fs.readFileSync(BESTAND, 'utf8');
    const kluis = leesKluis(src);
    const ww = await vraagWachtwoord();
    const zout = crypto.randomBytes(16);
    const iv = crypto.randomBytes(12);
    const k = sleutel(ww, zout);
    const cipher = crypto.createCipheriv('aes-256-gcm', k, iv);
    const ct = Buffer.concat([cipher.update(Buffer.from(JSON.stringify(nummers), 'utf8')), cipher.final()]);
    const data = Buffer.concat([ct, cipher.getAuthTag()]);
    const blok = "const KLUIS = {\n    zout: '" + zout.toString('base64') +
        "',\n    iv: '" + iv.toString('base64') +
        "',\n    data: '" + data.toString('base64') + "'\n};";
    fs.writeFileSync(BESTAND, src.replace(kluis.blok, blok));
    console.error('KLUIS bijgewerkt (' + nummers.length + ' kaarten). Verwijder het JSON-bestand.');
}

const [, , actie, arg] = process.argv;
if (actie === 'ontsleutel') ontsleutel();
else if (actie === 'versleutel' && arg) versleutel(arg);
else {
    console.error('Gebruik: node tools/bellijst-kluis.js ontsleutel | versleutel <lijst.json>');
    process.exit(1);
}
