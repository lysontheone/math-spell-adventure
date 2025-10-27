// Math problems by difficulty level (1-5)
export const mathProblems = {
    addition: [
        // Level 1: Single-digit addition (5 problems)
        { level: 1, question: '2 + 3 = ?', answer: '5', type: 'addition' },
        { level: 1, question: '7 + 1 = ?', answer: '8', type: 'addition' },
        { level: 1, question: '4 + 5 = ?', answer: '9', type: 'addition' },
        { level: 1, question: '6 + 2 = ?', answer: '8', type: 'addition' },
        { level: 1, question: '9 + 0 = ?', answer: '9', type: 'addition' },
        
        // Level 2: Two-digit addition (5 problems)
        { level: 2, question: '12 + 8 = ?', answer: '20', type: 'addition' },
        { level: 2, question: '15 + 7 = ?', answer: '22', type: 'addition' },
        { level: 2, question: '23 + 19 = ?', answer: '42', type: 'addition' },
        { level: 2, question: '34 + 26 = ?', answer: '60', type: 'addition' },
        { level: 2, question: '18 + 35 = ?', answer: '53', type: 'addition' },
        
        // Level 3: Two-digit addition with carrying (5 problems)
        { level: 3, question: '45 + 28 = ?', answer: '73', type: 'addition' },
        { level: 3, question: '67 + 39 = ?', answer: '106', type: 'addition' },
        { level: 3, question: '82 + 57 = ?', answer: '139', type: 'addition' },
        { level: 3, question: '94 + 68 = ?', answer: '162', type: 'addition' },
        { level: 3, question: '76 + 89 = ?', answer: '165', type: 'addition' },
        
        // Level 4: Three-digit addition (5 problems)
        { level: 4, question: '123 + 89 = ?', answer: '212', type: 'addition' },
        { level: 4, question: '256 + 178 = ?', answer: '434', type: 'addition' },
        { level: 4, question: '342 + 267 = ?', answer: '609', type: 'addition' },
        { level: 4, question: '489 + 375 = ?', answer: '864', type: 'addition' },
        { level: 4, question: '567 + 428 = ?', answer: '995', type: 'addition' },
        
        // Level 5: Four to six-digit addition (5 problems)
        { level: 5, question: '1,234 + 5,678 = ?', answer: '6912', type: 'addition' },
        { level: 5, question: '9,876 + 5,432 = ?', answer: '15308', type: 'addition' },
        { level: 5, question: '7,654 + 3,219 = ?', answer: '10873', type: 'addition' },
        { level: 5, question: '12,345 + 67,890 = ?', answer: '80235', type: 'addition' },
        { level: 5, question: '98,765 + 43,210 = ?', answer: '141975', type: 'addition' },
    ],
    
    subtraction: [
        // Level 1: Single-digit subtraction (5 problems)
        { level: 1, question: '5 - 2 = ?', answer: '3', type: 'subtraction' },
        { level: 1, question: '9 - 4 = ?', answer: '5', type: 'subtraction' },
        { level: 1, question: '7 - 3 = ?', answer: '4', type: 'subtraction' },
        { level: 1, question: '8 - 1 = ?', answer: '7', type: 'subtraction' },
        { level: 1, question: '6 - 6 = ?', answer: '0', type: 'subtraction' },
        
        // Level 2: Two-digit subtraction (5 problems)
        { level: 2, question: '15 - 8 = ?', answer: '7', type: 'subtraction' },
        { level: 2, question: '24 - 13 = ?', answer: '11', type: 'subtraction' },
        { level: 2, question: '37 - 19 = ?', answer: '18', type: 'subtraction' },
        { level: 2, question: '45 - 27 = ?', answer: '18', type: 'subtraction' },
        { level: 2, question: '53 - 28 = ?', answer: '25', type: 'subtraction' },
        
        // Level 3: Two-digit subtraction with borrowing (5 problems)
        { level: 3, question: '57 - 29 = ?', answer: '28', type: 'subtraction' },
        { level: 3, question: '83 - 47 = ?', answer: '36', type: 'subtraction' },
        { level: 3, question: '92 - 68 = ?', answer: '24', type: 'subtraction' },
        { level: 3, question: '105 - 79 = ?', answer: '26', type: 'subtraction' },
        { level: 3, question: '147 - 89 = ?', answer: '58', type: 'subtraction' },
        
        // Level 4: Three-digit subtraction (5 problems)
        { level: 4, question: '245 - 178 = ?', answer: '67', type: 'subtraction' },
        { level: 4, question: '500 - 327 = ?', answer: '173', type: 'subtraction' },
        { level: 4, question: '789 - 456 = ?', answer: '333', type: 'subtraction' },
        { level: 4, question: '1,024 - 768 = ?', answer: '256', type: 'subtraction' },
        { level: 4, question: '2,500 - 1,875 = ?', answer: '625', type: 'subtraction' },
        
        // Level 5: Four to six-digit subtraction (5 problems)
        { level: 5, question: '1,234 - 567 = ?', answer: '667', type: 'subtraction' },
        { level: 5, question: '10,000 - 7,654 = ?', answer: '2346', type: 'subtraction' },
        { level: 5, question: '50,000 - 12,345 = ?', answer: '37655', type: 'subtraction' },
        { level: 5, question: '100,000 - 87,654 = ?', answer: '12346', type: 'subtraction' },
        { level: 5, question: '1,000,000 - 123,456 = ?', answer: '876544', type: 'subtraction' },
    ],
    
    multiplication: [
        // Level 1: Single-digit multiplication (5 problems)
        { level: 1, question: '2 × 3 = ?', answer: '6', type: 'multiplication' },
        { level: 1, question: '5 × 4 = ?', answer: '20', type: 'multiplication' },
        { level: 1, question: '3 × 3 = ?', answer: '9', type: 'multiplication' },
        { level: 1, question: '7 × 2 = ?', answer: '14', type: 'multiplication' },
        { level: 1, question: '4 × 4 = ?', answer: '16', type: 'multiplication' },
        
        // Level 2: Times tables up to 12 (5 problems)
        { level: 2, question: '7 × 8 = ?', answer: '56', type: 'multiplication' },
        { level: 2, question: '12 × 5 = ?', answer: '60', type: 'multiplication' },
        { level: 2, question: '9 × 6 = ?', answer: '54', type: 'multiplication' },
        { level: 2, question: '11 × 4 = ?', answer: '44', type: 'multiplication' },
        { level: 2, question: '8 × 7 = ?', answer: '56', type: 'multiplication' },
        
        // Level 3: Two-digit by one-digit (5 problems)
        { level: 3, question: '15 × 6 = ?', answer: '90', type: 'multiplication' },
        { level: 3, question: '24 × 5 = ?', answer: '120', type: 'multiplication' },
        { level: 3, question: '37 × 3 = ?', answer: '111', type: 'multiplication' },
        { level: 3, question: '45 × 4 = ?', answer: '180', type: 'multiplication' },
        { level: 3, question: '18 × 7 = ?', answer: '126', type: 'multiplication' },
        
        // Level 4: Two-digit by two-digit (5 problems)
        { level: 4, question: '12 × 15 = ?', answer: '180', type: 'multiplication' },
        { level: 4, question: '25 × 11 = ?', answer: '275', type: 'multiplication' },
        { level: 4, question: '34 × 28 = ?', answer: '952', type: 'multiplication' },
        { level: 4, question: '45 × 36 = ?', answer: '1620', type: 'multiplication' },
        { level: 4, question: '57 × 42 = ?', answer: '2394', type: 'multiplication' },
        
        // Level 5: Three-digit and larger (5 problems)
        { level: 5, question: '123 × 45 = ?', answer: '5535', type: 'multiplication' },
        { level: 5, question: '256 × 89 = ?', answer: '22784', type: 'multiplication' },
        { level: 5, question: '789 × 123 = ?', answer: '97047', type: 'multiplication' },
        { level: 5, question: '1,234 × 56 = ?', answer: '69104', type: 'multiplication' },
        { level: 5, question: '9,876 × 54 = ?', answer: '533304', type: 'multiplication' },
    ],
    
    division: [
        // Level 1: Basic division facts (5 problems)
        { level: 1, question: '6 ÷ 2 = ?', answer: '3', type: 'division' },
        { level: 1, question: '15 ÷ 3 = ?', answer: '5', type: 'division' },
        { level: 1, question: '9 ÷ 3 = ?', answer: '3', type: 'division' },
        { level: 1, question: '16 ÷ 4 = ?', answer: '4', type: 'division' },
        { level: 1, question: '25 ÷ 5 = ?', answer: '5', type: 'division' },
        
        // Level 2: Division with remainders (5 problems)
        { level: 2, question: '17 ÷ 3 = ?', answer: '5 R2', type: 'division' },
        { level: 2, question: '29 ÷ 4 = ?', answer: '7 R1', type: 'division' },
        { level: 2, question: '35 ÷ 6 = ?', answer: '5 R5', type: 'division' },
        { level: 2, question: '47 ÷ 5 = ?', answer: '9 R2', type: 'division' },
        { level: 2, question: '58 ÷ 7 = ?', answer: '8 R2', type: 'division' },
        
        // Level 3: Two-digit division (5 problems)
        { level: 3, question: '84 ÷ 6 = ?', answer: '14', type: 'division' },
        { level: 3, question: '135 ÷ 9 = ?', answer: '15', type: 'division' },
        { level: 3, question: '196 ÷ 14 = ?', answer: '14', type: 'division' },
        { level: 3, question: '225 ÷ 15 = ?', answer: '15', type: 'division' },
        { level: 3, question: '289 ÷ 17 = ?', answer: '17', type: 'division' },
        
        // Level 4: Three-digit division (5 problems)
        { level: 4, question: '1,024 ÷ 32 = ?', answer: '32', type: 'division' },
        { level: 4, question: '2,401 ÷ 49 = ?', answer: '49', type: 'division' },
        { level: 4, question: '3,600 ÷ 60 = ?', answer: '60', type: 'division' },
        { level: 4, question: '4,900 ÷ 70 = ?', answer: '70', type: 'division' },
        { level: 4, question: '6,400 ÷ 80 = ?', answer: '80', type: 'division' },
        
        // Level 5: Large number division (5 problems)
        { level: 5, question: '10,000 ÷ 125 = ?', answer: '80', type: 'division' },
        { level: 5, question: '50,625 ÷ 225 = ?', answer: '225', type: 'division' },
        { level: 5, question: '123,456 ÷ 64 = ?', answer: '1929', type: 'division' },
        { level: 5, question: '1,000,000 ÷ 1,250 = ?', answer: '800', type: 'division' },
        { level: 5, question: '9,999,999 ÷ 1,111 = ?', answer: '9000.9', type: 'division' },
    ],
    
    mixed: [
        // Level 1: Simple operations (5 problems)
        { level: 1, question: '2 + 3 × 2 = ?', answer: '8', type: 'mixed' },
        { level: 1, question: '(4 + 5) × 2 = ?', answer: '18', type: 'mixed' },
        { level: 1, question: '10 - 3 + 4 = ?', answer: '11', type: 'mixed' },
        { level: 1, question: '15 ÷ 3 + 2 = ?', answer: '7', type: 'mixed' },
        { level: 1, question: '5 × 2 - 3 = ?', answer: '7', type: 'mixed' },
        
        // Level 2: Basic order of operations (5 problems)
        { level: 2, question: '12 + 8 ÷ 2 = ?', answer: '16', type: 'mixed' },
        { level: 2, question: '20 - 5 × 3 = ?', answer: '5', type: 'mixed' },
        { level: 2, question: '(7 + 3) × (6 - 2) = ?', answer: '40', type: 'mixed' },
        { level: 2, question: '24 ÷ 4 + 5 = ?', answer: '11', type: 'mixed' },
        { level: 2, question: '18 - 9 + 3 = ?', answer: '12', type: 'mixed' },
        
        // Level 3: Intermediate expressions (5 problems)
        { level: 3, question: '15 + 6 × 3 - 4 = ?', answer: '29', type: 'mixed' },
        { level: 3, question: '30 ÷ (2 + 3) × 4 = ?', answer: '24', type: 'mixed' },
        { level: 3, question: '7 × 3 + 15 ÷ 3 = ?', answer: '26', type: 'mixed' },
        { level: 3, question: '(12 - 4) × (5 + 3) = ?', answer: '64', type: 'mixed' },
        { level: 3, question: '45 ÷ 9 + 7 × 2 = ?', answer: '19', type: 'mixed' },
        
        // Level 4: Complex expressions (5 problems)
        { level: 4, question: '100 ÷ (5 + 5) × 3 = ?', answer: '30', type: 'mixed' },
        { level: 4, question: '(15 + 5) × (12 - 4) = ?', answer: '160', type: 'mixed' },
        { level: 4, question: '7 + 3 × (10 - (2 + 3)) = ?', answer: '22', type: 'mixed' },
        { level: 4, question: '48 ÷ (6 + 2) × 5 = ?', answer: '30', type: 'mixed' },
        { level: 4, question: '(25 - 5) × (3 + 2) ÷ 5 = ?', answer: '20', type: 'mixed' },
        
        // Level 5: Advanced expressions (5 problems)
        { level: 5, question: '2 + 3 × 4 - 5 = ?', answer: '9', type: 'mixed' },
        { level: 5, question: '10 - (5 + 2) × 3 = ?', answer: '-11', type: 'mixed' },
        { level: 5, question: '5 + 3 × (8 - 2) ÷ 2 = ?', answer: '14', type: 'mixed' },
        { level: 5, question: '20 - 3 × (4 + 2) = ?', answer: '2', type: 'mixed' },
        { level: 5, question: '(12 + 8) × (15 - 5) ÷ 10 = ?', answer: '20', type: 'mixed' }
    ]
};

// Spelling words by difficulty level (1-5)
export const spellingWords = {
    easy: [
        { word: 'cat', definition: 'A small domesticated carnivorous mammal', example: 'The cat sat on the mat.' },
        { word: 'dog', definition: 'A domesticated carnivorous mammal', example: 'The dog barked loudly.' },
        { word: 'sun', definition: 'The star around which the earth orbits', example: 'The sun rises in the east.' },
        { word: 'hat', definition: 'A shaped covering for the head', example: 'She wore a red hat.' },
        { word: 'pen', definition: 'An instrument for writing or drawing with ink', example: 'He wrote with a blue pen.' },
        { word: 'book', definition: 'A written or printed work', example: 'She read a book.' },
        { word: 'tree', definition: 'A woody perennial plant', example: 'The tree had green leaves.' },
        { word: 'ball', definition: 'A spherical object used in games', example: 'He kicked the ball.' },
        { word: 'fish', definition: 'A limbless cold-blooded vertebrate animal', example: 'We saw a fish in the pond.' },
        { word: 'bird', definition: 'A warm-blooded egg-laying vertebrate', example: 'A bird sang in the tree.' },
    ],
    medium: [
        { word: 'garden', definition: 'A piece of ground for growing flowers or vegetables', example: 'She planted flowers in the garden.' },
        { word: 'pencil', definition: 'An instrument for writing or drawing', example: 'He sharpened his pencil.' },
        { word: 'window', definition: 'An opening in a wall to let in light and air', example: 'She looked out the window.' },
        { word: 'bottle', definition: 'A container with a narrow neck', example: 'He drank water from a bottle.' },
        { word: 'rabbit', definition: 'A burrowing mammal with long ears', example: 'A rabbit hopped across the field.' },
        { word: 'turtle', definition: 'A slow-moving reptile with a shell', example: 'The turtle walked slowly.' },
        { word: 'purple', definition: 'A color intermediate between red and blue', example: 'She wore a purple dress.' },
        { word: 'orange', definition: 'A color between red and yellow', example: 'The sunset was orange.' },
        { word: 'butter', definition: 'A dairy product made from cream', example: 'She spread butter on the toast.' },
        { word: 'summer', definition: 'The warmest season of the year', example: 'We go to the beach in summer.' },
    ],
    hard: [
        { word: 'beautiful', definition: 'Pleasing the senses or mind aesthetically', example: 'The sunset was beautiful.' },
        { word: 'mystery', definition: 'Something that is difficult to understand or explain', example: 'The disappearance was a mystery.' },
        { word: 'calendar', definition: 'A chart showing the days, weeks, and months of the year', example: 'Mark the date on your calendar.' },
        { word: 'elephant', definition: 'A very large plant-eating mammal with a trunk', example: 'The elephant used its trunk to drink.' },
        { word: 'umbrella', definition: 'A device for protection against rain', example: 'She opened her umbrella when it rained.' },
        { word: 'adventure', definition: 'An unusual and exciting experience', example: 'They went on an adventure.' },
        { word: 'birthday', definition: 'The anniversary of the day someone was born', example: 'Today is my birthday.' },
        { word: 'favorite', definition: 'Preferred before all others of the same kind', example: 'What's your favorite color?' },
        { word: 'hospital', definition: 'An institution providing medical treatment', example: 'He was taken to the hospital.' },
        { word: 'mountain', definition: 'A large natural elevation of the earth's surface', example: 'They climbed the mountain.' },
    ],
    challenge: [
        { word: 'xylophone', definition: 'A musical instrument with wooden bars', example: 'She played a tune on the xylophone.' },
        { word: 'quintessential', definition: 'Representing the most perfect example', example: 'He was the quintessential gentleman.' },
        { word: 'kaleidoscope', definition: 'A toy consisting of a tube containing mirrors and colored papers', example: 'She looked through the kaleidoscope.' },
        { word: 'exhilaration', definition: 'A feeling of excitement, happiness, or elation', example: 'She felt a sense of exhilaration.' },
        { word: 'extravaganza', definition: 'A spectacular entertainment event', example: 'The festival was a musical extravaganza.' },
        { word: 'juxtaposition', definition: 'The fact of two things being seen or placed close together', example: 'The juxtaposition of the two images was striking.' },
        { word: 'labyrinth', definition: 'A complicated irregular network of passages', example: 'They got lost in the labyrinth.' },
        { word: 'quintuplet', definition: 'Each of five children born at one birth', example: 'The couple had quintuplets.' },
        { word: 'ventriloquist', definition: 'An entertainer who makes their voice appear to come from a dummy', example: 'The ventriloquist performed with his dummy.' },
        { word: 'xenophobia', definition: 'Dislike of or prejudice against people from other countries', example: 'Xenophobia has no place in our society.' },
    ]
};

// Generate math questions with multiple choice options
function generateMathQuestion(operation, level = 1) {
    const operations = operation === 'mixed' 
        ? ['addition', 'subtraction', 'multiplication', 'division']
        : [operation];
    
    const selectedOperation = operations[Math.floor(Math.random() * operations.length)];
    const problems = mathProblems[selectedOperation].filter(p => p.level === level);
    
    if (problems.length === 0) {
        // If no problems at this level, get the closest level
        const allLevels = [...new Set(mathProblems[selectedOperation].map(p => p.level))];
        const closestLevel = allLevels.reduce((prev, curr) => 
            Math.abs(curr - level) < Math.abs(prev - level) ? curr : prev
        );
        problems = mathProblems[selectedOperation].filter(p => p.level === closestLevel);
    }
    
    const problem = problems[Math.floor(Math.random() * problems.length)];
    const answer = parseInt(problem.answer.replace(/,/g, ''), 10);
    
    // Generate plausible wrong answers
    const options = new Set([answer]);
    while (options.size < 4) {
        const offset = Math.floor(Math.random() * 10) + 1;
        const sign = Math.random() > 0.5 ? 1 : -1;
        const wrongAnswer = answer + (sign * offset);
        if (wrongAnswer > 0) {
            options.add(wrongAnswer);
        }
    }
    
    // Convert options to array and shuffle
    const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);
    
    return {
        ...problem,
        options: shuffledOptions.map(opt => opt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
        answer: problem.answer
    };
}

// Generate spelling question with hints
export function generateSpellingQuestion(level = 'easy') {
    const levels = ['easy', 'medium', 'hard', 'challenge'];
    const selectedLevel = levels.includes(level) ? level : 'easy';
    const words = spellingWords[selectedLevel];
    const wordData = words[Math.floor(Math.random() * words.length)];
    
    // Generate hint (first letter + underscores for remaining letters)
    const hint = wordData.word[0] + '_'.repeat(wordData.word.length - 1);
    
    return {
        question: `Spell the word: ${wordData.definition}`,
        answer: wordData.word,
        hint: hint,
        definition: wordData.definition,
        example: wordData.example,
        level: selectedLevel,
        type: 'spelling'
    };
}

// Get questions for a specific mode and category
export function getQuestions(mode, category, count = 10) {
    const questions = [];
    
    if (mode === 'math') {
        for (let i = 0; i < count; i++) {
            questions.push(generateMathQuestion(category, 1 + Math.floor(i / 2)));
        }
    } else if (mode === 'spelling') {
        // Start with easier words and gradually increase difficulty
        const levels = ['easy', 'medium', 'hard', 'challenge'];
        for (let i = 0; i < count; i++) {
            const levelIndex = Math.min(Math.floor(i / (count / levels.length)), levels.length - 1);
            questions.push(generateSpellingQuestion(levels[levelIndex]));
        }
    }
    
    return questions;
}

// Get all available categories for a mode
export function getCategories(mode) {
    if (mode === 'math') {
        return [
            { id: 'addition', name: 'Addition', emoji: '➕', description: 'Practice your addition skills' },
            { id: 'subtraction', name: 'Subtraction', emoji: '➖', description: 'Practice your subtraction skills' },
            { id: 'multiplication', name: 'Multiplication', emoji: '✖️', description: 'Practice your multiplication tables' },
            { id: 'division', name: 'Division', emoji: '➗', description: 'Practice division problems' },
            { id: 'mixed', name: 'Mixed Operations', emoji: '🔀', description: 'A mix of different math operations' },
        ];
    } else if (mode === 'spelling') {
        return [
            { id: 'easy', name: 'Easy Words', emoji: '😊', description: 'Simple words for beginners' },
            { id: 'medium', name: 'Medium Words', emoji: '🤔', description: 'Slightly more challenging words' },
            { id: 'hard', name: 'Hard Words', emoji: '🧠', description: 'Difficult words for advanced spellers' },
            { id: 'challenge', name: 'Challenge Words', emoji: '🏆', description: 'Very difficult words to test your skills' },
            { id: 'random', name: 'Random Mix', emoji: '🎲', description: 'A random selection of words from all levels' },
        ];
    }
    
    return [];
}
