// Game Modes Configuration
export const gameModes = {
    // Existing modes
    math: {
        name: 'Math Challenge',
        description: 'Solve math problems of increasing difficulty',
        icon: '🧮',
        color: '#4CAF50',
        levels: 10,
        timePerQuestion: 30,
        questionsPerLevel: 5
    },
    spelling: {
        name: 'Spelling Bee',
        description: 'Spell words correctly to advance',
        icon: '🔤',
        color: '#9C27B0',
        levels: 5,
        timePerQuestion: 45,
        wordsPerLevel: 10
    },
    
    // New modes
    timed: {
        name: 'Timed Challenge',
        description: 'Answer as many questions as you can in 2 minutes!',
        icon: '⏱️',
        color: '#FF9800',
        timeLimit: 120, // 2 minutes
        getQuestions: function(count) {
            // Mix of math and spelling questions
            const mathCount = Math.ceil(count * 0.7);
            const spellingCount = count - mathCount;
            
            const mathQuestions = generateMathQuestions(mathCount);
            const spellingQuestions = generateSpellingQuestions(spellingCount);
            
            // Shuffle all questions together
            return [...mathQuestions, ...spellingQuestions].sort(() => Math.random() - 0.5);
        }
    },
    
    endless: {
        name: 'Endless Mode',
        description: 'How long can you last? No time limit!',
        icon: '∞',
        color: '#2196F3',
        lives: 3,
        difficultyIncrement: 0.1, // Increase difficulty after each correct answer
        getNextQuestion: function(difficulty) {
            // 70% chance of math, 30% spelling
            if (Math.random() < 0.7) {
                return generateMathQuestions(1, difficulty)[0];
            } else {
                return generateSpellingQuestions(1, difficulty)[0];
            }
        }
    },
    
    practice: {
        name: 'Practice Mode',
        description: 'Practice specific skills at your own pace',
        icon: '📚',
        color: '#607D8B',
        categories: {
            addition: { name: 'Addition', icon: '➕' },
            subtraction: { name: 'Subtraction', icon: '➖' },
            multiplication: { name: 'Multiplication', icon: '✖️' },
            division: { name: 'Division', icon: '➗' },
            animals: { name: 'Animal Words', icon: '🐾' },
            food: { name: 'Food Words', icon: '🍎' },
            science: { name: 'Science Terms', icon: '🔬' }
        },
        getQuestions: function(category, count = 10) {
            if (['addition', 'subtraction', 'multiplication', 'division'].includes(category)) {
                return generateMathQuestions(count, { operation: category });
            } else {
                return generateSpellingQuestions(count, { category });
            }
        }
    },
    
    multiplayer: {
        name: 'Multiplayer',
        description: 'Challenge a friend! (Local)',
        icon: '👥',
        color: '#E91E63',
        maxPlayers: 2,
        rounds: 5,
        timePerRound: 30,
        setupGame: function(players) {
            // Initialize game state for multiplayer
            return {
                players: players.map(p => ({ ...p, score: 0 })),
                currentRound: 0,
                currentPlayer: 0,
                questions: []
            };
        }
    }
};

// Helper functions for question generation
function generateMathQuestions(count, options = {}) {
    // Implementation from game.js
    // ...
    return []; // Placeholder
}

function generateSpellingQuestions(count, options = {}) {
    // Implementation from spelling-fix.js
    // ...
    return []; // Placeholder
}

// Export the game modes
export function getGameMode(mode) {
    return gameModes[mode];
}

export function getAvailableModes() {
    return Object.entries(gameModes).map(([id, config]) => ({
        id,
        ...config
    }));
}
