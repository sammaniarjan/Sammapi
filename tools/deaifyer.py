#!/usr/bin/env python3
"""De-AI-fyer: bewaakt de schrijfstijl van deze repo.

Gebruik:
    python3 tools/deaifyer.py          # controleer; exitcode 1 bij vondsten
    python3 tools/deaifyer.py --fix    # herstel wat veilig automatisch kan

Regels (zie ook CLAUDE.md):
- Geen gedachtestreepjes (em-dash, los en-streepje of de HTML-entiteiten
  ervan) in tekst. Herschrijf naar dubbele punt, komma, puntkomma of
  haakjes; dit vergt een redactionele keuze en wordt daarom alleen
  gemeld, nooit blind vervangen.
- Geen krulquotes of krul-apostrofs; --fix maakt er rechte tekens van.
- Bereiken tussen cijfers (10-15, 18:00-24:00) met een koppelteken;
  --fix zet een en-dash tussen cijfers om.
- Signaalwoorden (cruciaal, essentieel, ...) geven een waarschuwing,
  geen fout: soms zijn ze gewoon het juiste woord.

Uitgesloten: de vendored xlsx-bibliotheek (mag nooit wijzigen), fonts,
foto's/binaries en dit script zelf.
"""
import re
import sys
from pathlib import Path

WORTEL = Path(__file__).resolve().parent.parent
EXTENSIES = {'.html', '.js', '.css', '.md', '.txt'}
UITSLUITEN = (
    'excel-to-ical/lib/',   # vendored xlsx: nooit aanpassen
    'fonts/',
    'node_modules/',
    'tools/deaifyer.py',
)

EM = '—'      # em-dash
EN = '–'      # en-dash
LDQ = '“'     # linker krulquote
RDQ = '”'     # rechter krulquote
LSQ = '‘'     # linker krul-apostrof
RSQ = '’'     # rechter krul-apostrof

# hard fout: gedachtestreepjes, ook als entiteit
STREEP_PATRONEN = [EM, '&mdash;', '&#8212;', '&ndash;', '&#8211;', EN]

# --fix kan dit veilig zelf: krulquotes naar rechte tekens
# (entiteit -> entiteit, letterlijk teken -> letterlijk teken)
QUOTE_FIXES = [
    ('&ldquo;', '&quot;'), ('&rdquo;', '&quot;'),
    ('&lsquo;', '&#39;'), ('&rsquo;', '&#39;'),
    (LDQ, '"'), (RDQ, '"'), (LSQ, "'"), (RSQ, "'"),
]

# waarschuwing, geen fout
SIGNAALWOORDEN = ['cruciaal', 'cruciale', 'essentieel', 'essentiële',
                  'naadloos', 'naadloze', 'robuust', 'robuuste', 'kortom']


def bestanden():
    for pad in sorted(WORTEL.rglob('*')):
        if not pad.is_file() or pad.suffix.lower() not in EXTENSIES:
            continue
        rel = pad.relative_to(WORTEL).as_posix()
        if any(rel.startswith(u) or rel == u.rstrip('/') for u in UITSLUITEN):
            continue
        yield pad, rel


def fix(tekst):
    """Voert alleen de mechanisch veilige herstellingen uit."""
    for oud, nieuw in QUOTE_FIXES:
        tekst = tekst.replace(oud, nieuw)
    # en-dash (teken of entiteit) tussen cijfers -> koppelteken
    tekst = re.sub(r'(?<=\d)(?:' + EN + r'|&ndash;|&#8211;)(?=\d)', '-', tekst)
    return tekst


def main():
    herstel = '--fix' in sys.argv[1:]
    fouten = 0
    waarschuwingen = 0

    for pad, rel in bestanden():
        tekst = pad.read_text(encoding='utf-8')
        if herstel:
            nieuw = fix(tekst)
            if nieuw != tekst:
                pad.write_text(nieuw, encoding='utf-8')
                print(f'hersteld  {rel}')
                tekst = nieuw

        for nr, regel in enumerate(tekst.splitlines(), 1):
            for p in STREEP_PATRONEN:
                if p in regel:
                    # en-dash tussen cijfers is al door --fix af te vangen,
                    # maar melden doen we hem altijd
                    print(f'FOUT  {rel}:{nr}: gedachtestreepje ({p!r}): {regel.strip()[:90]}')
                    fouten += 1
                    break
            else:
                for oud, _ in QUOTE_FIXES:
                    if oud in regel:
                        print(f'FOUT  {rel}:{nr}: krulquote ({oud!r}): {regel.strip()[:90]}')
                        fouten += 1
                        break
                else:
                    laag = regel.lower()
                    for w in SIGNAALWOORDEN:
                        if w in laag:
                            print(f'let op  {rel}:{nr}: signaalwoord "{w}": {regel.strip()[:90]}')
                            waarschuwingen += 1
                            break

    if fouten:
        print(f'\n{fouten} fout(en). Gedachtestreepjes herschrijf je met de hand '
              '(dubbele punt, komma, puntkomma of haakjes); krulquotes lost --fix op.')
        return 1
    melding = 'Schoon.' if not waarschuwingen else f'Schoon; {waarschuwingen} waarschuwing(en) om zelf te wegen.'
    print(melding)
    return 0


if __name__ == '__main__':
    sys.exit(main())
