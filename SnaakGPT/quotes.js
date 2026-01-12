// SNAAK COMMAND CENTER - Quote Arsenal
// No soft shit. Just hard facts.

const snaakQuotes = {
    basistraining: [
        "Snaak",
        "Goeie zaak",
        "U bent een loempia",
        "U bent echt een plunjebaal met woorden",
        "Ontspan uw poes, cadet!",
        "Stelletje oempaloempa's",
        "Opppeteenieeuw!",
        "Gewoon je best doen muts!",
        "U bent een gehaktbal met tanden",
        "U bent een plunjebal met oren",
        "Knert!",
        "Eelt",
        "U bent opgelijnd als een wokkel",
        "U bent opgelijnd als de scheve toren van Pisa",
        "Gaat u voor een triple vetje?",
        "Mijn complimenten, u bent een snaba",
        "Nou, klinkt Daab",
        "KOJP",
        "U ziet eruit als een uitgeknepen citroen",
        "Ik zou u graag willen helpen, maar u bent hopeloos",
        "U bent een wandelende ramp",
        "Stop met dat gehannes!",
        "U bent zo traag als een dooie vlieg",
        "Dat is geen uniform, dat is een verkleedpartij",
        "U marcheert als een pingpongballetje in een wasmachine",
        "U heeft het IQ van een beschuitje",
        "U bent zo nuttig als een asbak op een motor"
    ],
    oefeningen: [
        "Ik denk dat u dit priiima Zulu11 zult regelen",
        "Als u zo doorgaat als trekpop zou ik me zorgen maken om uw ballen",
        "Amulapa",
        "Links rechts, links rechts! Niet zoals een dronken eend!",
        "U kruipt langzamer dan een slak op valium",
        "Dat noemt u rennen? Mijn oma gaat sneller!",
        "U schiet naast de schuur vanaf de binnenkant",
        "Concentratie niveau: goudvis",
        "U bent zo nutteloos als een chocolade theepot",
        "Kom op, toon wat militaire spirit!",
        "U valt meer dan u staat",
        "Dat was dramatischer dan een soap opera",
        "U bent een natuurtalent... voor mislukken",
        "Probeer het nog eens, maar dan goed",
        "U bent een inspiratie voor anderen... om beter te worden",
        "U heeft de atletische vaardigheden van een bejaarde zeester",
        "Uw vorm is zo slecht, het is abstract kunst",
        "U beweegt als een robot met lege batterijen",
        "Ik heb kreupele schildpadden sneller zien gaan",
        "U heeft de coördinatie van een dronken flamingo"
    ],
    inspectie: [
        "Wat is dit voor prul?",
        "Dit uniform ziet eruit alsof u er in geslapen hebt",
        "Uw schoenen glimmen minder dan een doffe cent",
        "Rechtop staan! U bent geen bananenboom!",
        "Uw bed lijkt op een bomkrater",
        "Discipline, waar is uw discipline?",
        "Dit is geen vakantiekamp, soldaat!",
        "U ziet eruit als een vogelschrikker",
        "Netjes is niet optioneel, het is verplicht",
        "Uw kast lijkt op een explosie in een kledingfabriek. OPPETENIEUW!",
        "Houding! Toon wat trots!",
        "U bent een schande voor uw regiment",
        "Dit noemt u schoon? Ik heb vuilnisbelten gezien die er beter uitzagen",
        "Uw presentatie is beneden alle peil",
        "Wees trots op uw uiterlijk, soldaat!",
        "Uw bed ziet eruit als een verkeersongeluk",
        "Heeft u uw uniform door een blender gehaald?",
        "U ziet er zo netjes uit als een ontplofte kledingkast",
        "Uw schoenen zijn zo dof, ze absorberen licht"
    ],
    eten: [
        "Eet alles op, of u krijgt het morgen weer",
        "Dit is geen restaurant, dit is de kazerne",
        "Sneller eten! De vijand wacht niet!",
        "U eet als een verfijnde dame op een theevisite",
        "Geen gemekker over het eten, u bent geen criticus",
        "Voeding is brandstof, niet entertainment",
        "U heeft 10 minuten, geen seconde meer",
        "Dat bord moet zo leeg zijn dat het spiegelt",
        "Eten is een privilege, geen recht",
        "Stop met dat gepruts, gewoon doorslikken",
        "U bent geen konijn, eet normaal",
        "Rantsoen is rantsoen, geen wensen menu",
        "Dat gezicht! Het eten is niet vergiftigd",
        "Discipline begint bij uw eetgewoonten",
        "Geen kruimels! U bent geen duif!"
    ],
    algemeen: [
        "Wat een toestand...",
        "Hier klopt helemaal niks van",
        "U doet het verkeerd",
        "U bent langzamer dan internet in 1995",
        "U graaft niet, u aait het zand",
        "Ik heb mummies gezien met meer leven",
        "U bent zo nutteloos als een paraplu onder water",
        "Concentreer u! Uw brein is niet voor decoratie!",
        "U reageert trager dan een Windows 95 computer",
        "Geef acht! U staat er bij als een kapotte verkeerslicht",
        "U bent zo scherp als een bowlingbal",
        "Uw IQ is lager dan de buitentemperatuur in Siberië",
        "Stop met denken, het doet u pijn",
        "U bent een wandelend bewijs dat evolutie achteruit kan gaan",
        "Uw prestaties zijn zo slecht, ze zijn illegaal in 12 landen",
        "U bent zo traag, slakken vragen u om een lift",
        "Uw focus is korter dan een goudvis z'n geheugen",
        "U bent een speciale sneeuwvlok... helaas wel een gesmolten",
        "Uw talent is net als bigfoot: theoretisch mogelijk maar nooit bewezen",
        "U heeft de efficiëntie van een chocolade theepot",
        "U bent zo slecht georganiseerd, chaos vraagt u om tips",
        "Uw timing is slechter dan de Titanic's route planning",
        "U bent helderder dan... nee wacht, niets eigenlijk",
        "Presteer! Of ga terug naar de kleuterschool!"
    ],
    motivatie: [
        "U kunt dit aan, soldaat! Tenminste, dat hoop ik...",
        "Geef niet op! U bent al zo ver gekomen in het teleurstellen",
        "Elke grote soldaat begon als recruut. U blijft gewoon recruut",
        "Moed, eer en... nou ja, 2 van de 3 is niet slecht",
        "Samen staan we sterk. Gelukkig, want alleen bent u hopeloos",
        "Voor het vaderland! Ook al zou het vaderland liever iemand anders hebben",
        "Toon wat Nederlandse moed! Of in ieder geval Nederlandse koppigheid",
        "U bent sterker dan u eruitziet. Gelukkig maar!",
        "Volhouden! Het kan niet erger worden... of toch wel?",
        "Echte soldaten geven nooit op. U bent blijkbaar geen echte soldaat",
        "Oefening baart kunst. In uw geval baart het vooral hoofdpijn",
        "U bent onderdeel van iets groters: de reden waarom we meer training nodig hebben",
        "Eer uw uniform! Het verdient beter dan u",
        "Traditie en eer... nou ja, we hebben nog de traditie",
        "Moed wordt gevormd door tegenslag. U heeft genoeg materiaal!"
    ]
};

// Roast templates for custom generator
const roastTemplates = {
    appearance: [
        "U ziet eruit als {object}",
        "Uw {bodypart} lijkt op {object}",
        "U bent opgelijnd als {comparison}"
    ],
    performance: [
        "U {action} als {comparison}",
        "Uw {skill} is {negative_adjective}",
        "U heeft de {skill} van {ridiculous_subject}"
    ],
    intelligence: [
        "Uw IQ is lager dan {low_number}",
        "U bent zo slim als {dumb_object}",
        "U denkt met uw {bodypart}"
    ]
};

const roastComponents = {
    objects: ["gehaktbal", "loempia", "wokkel", "plunjebaal", "oempaloempa", "beschuitje", "pingpongballetje", "vogelschrikker", "uitgeknepen citroen"],
    bodyparts: ["poes", "tanden", "oren", "ballen", "kop", "lijf"],
    comparisons: ["een wokkel", "de scheve toren van Pisa", "een dronken eend", "een kapotte verkeerslicht", "een ontplofte kledingkast"],
    actions: ["marcheert", "kruipt", "beweegt", "reageert", "denkt", "eet"],
    skills: ["coördinatie", "snelheid", "intelligentie", "discipline", "vorm"],
    negativeAdjectives: ["hopeloos", "dramatisch", "beneden alle peil", "illegaal slecht", "abstract kunst"],
    ridiculousSubjects: ["dronken flamingo", "bejaarde zeester", "dooie vlieg", "slak op valium", "goudvis"]
};

// Battle mode - rate hardness/humor
const battleCategories = ["hardheid", "humor", "creativiteit"];

// Achievements
const achievements = {
    "quote_master": { name: "Quote Master", desc: "100 quotes gelezen", points: 100 },
    "battle_winner": { name: "Battle Koning", desc: "25 battles gewonnen", points: 50 },
    "roast_chef": { name: "Roast Chef", desc: "10 custom roasts gemaakt", points: 25 },
    "quiz_god": { name: "Quiz God", desc: "50 quiz vragen goed", points: 75 },
    "chaos_survivor": { name: "Chaos Overlever", desc: "Chaos mode 10x overleefd", points: 50 },
    "snaak_legend": { name: "Snaak Legend", desc: "1000 punten totaal", points: 1000 }
};

// Flatten quotes
const allQuotes = Object.values(snaakQuotes).flat();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        snaakQuotes,
        allQuotes,
        roastTemplates,
        roastComponents,
        battleCategories,
        achievements
    };
}
