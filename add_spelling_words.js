// Script to add words from windsurf_spelling_words.json to the game
const fs = require('fs');
const path = require('path');

// Read the JSON file
const wordsData = require('./windsurf_spelling_words.json');

// Define how grades map to game levels
const gradeToLevel = {
    'Grade 3': 1,
    'Grade 4': 2,
    'Grade 5': 3,
    'Grade 6': 4,
    'Grade 7': 5,
    'Grade 8': 5  // Map both 7 and 8 to level 5 for more advanced words
};

// Define categories and their emojis
const categories = {
    'animals': { emoji: '🐾', words: [] },
    'nature': { emoji: '🌳', words: [] },
    'school': { emoji: '🏫', words: [] },
    'food': { emoji: '🍎', words: [] },
    'home': { emoji: '🏠', words: [] },
    'general': { emoji: '🌟', words: [] }  // For words that don't fit other categories
};

// Categorize words (simplified categorization for demo)
function categorizeWord(word) {
    const wordLower = word.toLowerCase();
    
    // Animal-related words
    const animalWords = ['cat', 'dog', 'lion', 'tiger', 'zebra', 'monkey', 'dolphin', 'elephant', 
                        'butterfly', 'frog', 'bear', 'wolf', 'shark', 'eagle', 'owl', 'bee', 'ant'];
    if (animalWords.some(animal => wordLower.includes(animal))) {
        return 'animals';
    }
    
    // Nature-related words
    const natureWords = ['sun', 'tree', 'flower', 'mountain', 'river', 'ocean', 'forest', 'desert', 
                        'valley', 'island', 'beach', 'sky', 'cloud', 'rain', 'snow', 'wind', 'storm'];
    if (natureWords.some(nature => wordLower.includes(nature))) {
        return 'nature';
    }
    
    // School-related words
    const schoolWords = ['school', 'class', 'book', 'pencil', 'teacher', 'student', 'homework', 
                        'test', 'exam', 'study', 'learn', 'read', 'write', 'math', 'science', 'history'];
    if (schoolWords.some(school => wordLower.includes(school))) {
        return 'school';
    }
    
    // Food-related words
    const foodWords = ['apple', 'banana', 'pizza', 'hamburger', 'strawberry', 'orange', 'grape', 
                      'bread', 'cheese', 'chicken', 'rice', 'soup', 'salad', 'chocolate', 'cookie'];
    if (foodWords.some(food => wordLower.includes(food))) {
        return 'food';
    }
    
    // Home-related words
    const homeWords = ['home', 'house', 'room', 'kitchen', 'bathroom', 'bedroom', 'living', 'dining', 
                      'garden', 'door', 'window', 'chair', 'table', 'sofa', 'lamp', 'mirror'];
    if (homeWords.some(home => wordLower.includes(home))) {
        return 'home';
    }
    
    // Default to general category
    return 'general';
}

// Process words from the JSON file
for (const [grade, words] of Object.entries(wordsData)) {
    const level = gradeToLevel[grade] || 3; // Default to level 3 if grade not found
    
    words.forEach(word => {
        if (!word || typeof word !== 'string') return; // Skip invalid entries
        
        const trimmedWord = word.trim().toLowerCase();
        if (trimmedWord.length < 2) return; // Skip very short words
        
        const category = categorizeWord(trimmedWord);
        
        // Add to the appropriate category
        if (categories[category]) {
            // Check if word already exists in any category to avoid duplicates
            const wordExists = Object.values(categories).some(
                cat => cat.words.some(w => w.word === trimmedWord)
            );
            
            if (!wordExists) {
                categories[category].words.push({
                    word: trimmedWord,
                    level: level,
                    emoji: categories[category].emoji
                });
            }
        }
    });
}

// Convert to the game's format
const gameCategories = {};
Object.entries(categories).forEach(([category, data]) => {
    if (data.words.length > 0) {
        gameCategories[category] = {
            emoji: data.emoji,
            words: data.words.map(wordData => ({
                word: wordData.word,
                level: wordData.level,
                emoji: wordData.emoji
            }))
        };
    }
});

// Generate the new game code
const newGameCode = `const spellingCategories = ${JSON.stringify(gameCategories, null, 4)};

// Process spelling categories into the questions array
const spellingQuestions = [];
Object.values(spellingCategories).forEach(category => {
    category.words.forEach(({ word, level, emoji }) => {
        spellingQuestions.push({
            type: 'spelling',
            level,
            word: word.toLowerCase(),
            image: emoji,
            category: Object.keys(spellingCategories).find(key => spellingCategories[key] === category)
        });
    });
});`;

// Output the result
console.log(newGameCode);

// Optionally, update the game.js file directly
// Uncomment the following lines to update the game.js file automatically
/*
const gameJsPath = path.join(__dirname, 'game.js');
let gameJs = fs.readFileSync(gameJsPath, 'utf8');

// Replace the spellingCategories section
const startMarker = 'const spellingCategories = {';
const endMarker = '// Process spelling categories into the questions array';
const startIndex = gameJs.indexOf(startMarker);
const endIndex = gameJs.indexOf(endMarker, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const newGameJs = gameJs.substring(0, startIndex) + newGameCode + gameJs.substring(endIndex);
    fs.writeFileSync(gameJsPath, newGameJs, 'utf8');
    console.log('Successfully updated game.js with new spelling words!');
} else {
    console.error('Could not find the spelling categories section in game.js');
}
*/
