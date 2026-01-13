// SNAAK COMMAND CENTER - Configuration
// Harder, Better, Faster, Stronger

const snaakConfig = {
    app: {
        name: "snaakGPT",
        subtitle: "COMMAND CENTER :: PROTOCOL LOEMPIA",
        version: "3.0.0 HARDCORE EDITION"
    },

    // Rank progression - earn it through action
    ranks: {
        0: { name: "KOJP", title: "Kusje Op Je P...", color: "#666" },
        100: { name: "RECRUUT", title: "Klote Ongemotiveerde Jankende Pax", color: "#888" },
        250: { name: "SOLDAAT", title: "Kan Mee", color: "#999" },
        500: { name: "KORPORAAL", title: "Begint Erop Te Lijken", color: "#aaa" },
        1000: { name: "SERGEANT", title: "Beetje Peppi", color: "#5a7f3e" },
        2000: { name: "SERGEANT-MAJOOR", title: "Harde Jongen", color: "#6b9449" },
        3500: { name: "VAANDRIG", title: "Respect", color: "#7ba55a" },
        5000: { name: "LUITENANT", title: "Command Material", color: "#8cb66b" },
        7500: { name: "KAPITEIN", title: "Absolute Snaba", color: "#9dc77c" },
        10000: { name: "MAJOOR", title: "Legende", color: "#ffaa00" }
    },

    // Point system
    points: {
        quoteView: 1,
        battleWin: 10,
        battleVote: 2,
        quizCorrect: 5,
        roastCreate: 3,
        chaosComplete: 15,
        streakDay: 20
    },

    // Battle mode settings
    battle: {
        roundTime: 8000, // 8 seconds to vote
        categories: ["hardheid", "humor", "creativiteit"]
    },

    // Quiz settings
    quiz: {
        questionTime: 10000, // 10 seconds per question
        types: ["category", "complete", "situation"]
    },

    // Chaos mode settings
    chaos: {
        quotesPerRound: 10,
        timeBetweenQuotes: 2000, // 2 seconds
        survivalBonus: 50
    },

    // Visual effects
    effects: {
        scanlines: true,
        glitch: true,
        terminalFlicker: true,
        crunchyAudio: true
    },

    // Audio settings
    audio: {
        enabled: true,
        volume: 0.05,
        sounds: {
            click: { freq: 1200, dur: 0.05 },
            win: { freq: 880, dur: 0.15 },
            lose: { freq: 220, dur: 0.2 },
            levelup: { freq: [440, 550, 660], dur: 0.1 },
            chaos: { freq: 1600, dur: 0.03 }
        }
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { snaakConfig };
}
