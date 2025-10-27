// Game state
let currentGameMode = '';
let score = 0;
let currentLevel = 1;
let currentQuestionIndex = 0;
let questions = [];
let timeLeft = 30;
let timer;
const highScores = JSON.parse(localStorage.getItem('highScores')) || { math: 0, spelling: 0 };

// Sound effects
const sounds = {
    correct: new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU' + 'A'.repeat(1000)),
    wrong: new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU' + 'A'.repeat(1000)),
    levelUp: new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU' + 'A'.repeat(1000)),
    gameOver: new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU' + 'A'.repeat(1000))
};

// Initialize sounds with empty audio data (will be replaced with actual sounds if available)
Object.values(sounds).forEach(sound => {
    sound.volume = 0.5;
    sound.load();
});

// DOM Elements
let gameModeEl, gameScreenEl, resultScreenEl, questionEl, optionsEl, feedbackEl, scoreEl, levelEl, finalScoreEl;

// Initialize DOM elements
function initDOM() {
    gameModeEl = document.getElementById('game-mode');
    gameScreenEl = document.getElementById('game-screen');
    resultScreenEl = document.getElementById('result-screen');
    questionEl = document.getElementById('question');
    optionsEl = document.getElementById('options');
    feedbackEl = document.getElementById('feedback');
    scoreEl = document.getElementById('score');
    levelEl = document.getElementById('level');
    finalScoreEl = document.getElementById('final-score');
    
    // Debug log
    console.log('DOM elements initialized');
    console.log('gameModeEl:', gameModeEl);
    console.log('gameScreenEl:', gameScreenEl);
    console.log('resultScreenEl:', resultScreenEl);
}

// Game data
// Math questions by level
const mathQuestionsByLevel = {
    1: [
        // Level 1: Addition and subtraction up to 10
        { question: '2 + 3', answer: '5', operation: '+' },
        { question: '7 - 4', answer: '3', operation: '-' },
        { question: '5 + 1', answer: '6', operation: '+' },
        { question: '9 - 3', answer: '6', operation: '-' },
        { question: '4 + 5', answer: '9', operation: '+' },
        { question: '8 - 2', answer: '6', operation: '-' },
        { question: '3 + 6', answer: '9', operation: '+' },
        { question: '7 - 5', answer: '2', operation: '-' },
        { question: '1 + 8', answer: '9', operation: '+' },
        { question: '10 - 4', answer: '6', operation: '-' }
    ],
    2: [
        // Level 2: Addition and subtraction up to 20, simple multiplication
        { question: '12 + 7', answer: '19', operation: '+' },
        { question: '18 - 9', answer: '9', operation: '-' },
        { question: '5 × 3', answer: '15', operation: '×' },
        { question: '14 + 6', answer: '20', operation: '+' },
        { question: '17 - 8', answer: '9', operation: '-' },
        { question: '4 × 4', answer: '16', operation: '×' },
        { question: '9 + 8', answer: '17', operation: '+' },
        { question: '15 - 7', answer: '8', operation: '-' },
        { question: '6 × 3', answer: '18', operation: '×' },
        { question: '11 + 9', answer: '20', operation: '+' }
    ],
    3: [
        // Level 3: All operations, larger numbers
        { question: '25 + 17', answer: '42', operation: '+' },
        { question: '50 - 23', answer: '27', operation: '-' },
        { question: '7 × 8', answer: '56', operation: '×' },
        { question: '63 ÷ 9', answer: '7', operation: '÷' },
        { question: '38 + 45', answer: '83', operation: '+' },
        { question: '72 - 28', answer: '44', operation: '-' },
        { question: '9 × 7', answer: '63', operation: '×' },
        { question: '81 ÷ 9', answer: '9', operation: '÷' },
        { question: '56 + 29', answer: '85', operation: '+' },
        { question: '100 - 47', answer: '53', operation: '-' }
    ],
    4: [
        // Level 4: Multi-step problems
        { question: '(5 + 3) × 2', answer: '16', operation: '×' },
        { question: '15 - 3 × 4', answer: '3', operation: '×-' },
        { question: '20 ÷ (4 + 1)', answer: '4', operation: '÷' },
        { question: '7 + 3 × 2 - 5', answer: '8', operation: '×+-' },
        { question: '(10 - 2) × (3 + 1)', answer: '32', operation: '×' },
        { question: '25 - 5 × 3 + 2', answer: '12', operation: '×-+' },
        { question: '18 ÷ (3 + 3) × 5', answer: '15', operation: '÷×' },
        { question: '5 + 6 × 3 - 4', answer: '19', operation: '×+-' },
        { question: '(12 + 8) ÷ (7 - 2)', answer: '4', operation: '÷' },
        { question: '9 × 3 - 15 ÷ 3', answer: '22', operation: '×-÷' }
    ],
    5: [
        // Level 5: Complex problems
        { question: '3² + 4²', answer: '25', operation: '^' },
        { question: '√(16) × 5', answer: '20', operation: '√×' },
        { question: '2³ × 3', answer: '24', operation: '^×' },
        { question: '5! ÷ 20', answer: '6', operation: '!÷' },
        { question: '√(9) + 4 × 5', answer: '23', operation: '√+×' },
        { question: '3³ - 4²', answer: '11', operation: '^-' },
        { question: '10² ÷ (2 + 3)', answer: '20', operation: '^÷' },
        { question: '√(25) × √(16)', answer: '20', operation: '√×' },
        { question: '4! ÷ (3 + 3)', answer: '4', operation: '!÷' },
        { question: '5² - 3² + 2', answer: '18', operation: '^-+' }
    ]
};

// Convert to the game's question format
const mathQuestions = [];
for (const [level, questions] of Object.entries(mathQuestionsByLevel)) {
    questions.forEach(q => {
        const options = generateOptions(parseInt(q.answer), 4);
        mathQuestions.push({
            type: 'math',
            level: parseInt(level),
            question: `What is ${q.question}?`,
            answer: q.answer,
            operation: q.operation,
            options: options.map(n => n.toString())
        });
    });
}

// Helper function to generate unique options
function generateOptions(correct, count) {
    const options = new Set([correct]);
    while (options.size < count) {
        const variation = Math.floor(Math.random() * 10) - 5;
        const option = Math.max(1, correct + variation);
        if (option !== correct) {
            options.add(option);
        }
    }
    return Array.from(options).sort(() => Math.random() - 0.5);
}

const spellingCategories = {
    // Level 1 (Easy) - Grade 3 words
    easy: {
        emoji: '⭐',
        words: [
            // Original easy words
            { word: 'cat', level: 1, emoji: '🐱' },
            { word: 'dog', level: 1, emoji: '🐶' },
            { word: 'sun', level: 1, emoji: '☀️' },
            { word: 'bed', level: 1, emoji: '🛏️' },
            { word: 'book', level: 1, emoji: '📚' },
            
            // Grade 3 words from JSON
            { word: 'verge', level: 1, emoji: '⭐' },
            { word: 'portion', level: 1, emoji: '🍽️' },
            { word: 'leash', level: 1, emoji: '🐕' },
            { word: 'rind', level: 1, emoji: '🍉' },
            { word: 'raven', level: 1, emoji: '🐦' }
        ]
    },
    
    // Level 2 - Grade 4 words
    medium: {
        emoji: '⭐⭐',
        words: [
            // Original medium words
            { word: 'frog', level: 2, emoji: '🐸' },
            { word: 'lion', level: 2, emoji: '🦁' },
            { word: 'tree', level: 2, emoji: '🌳' },
            { word: 'pencil', level: 2, emoji: '✏️' },
            
            // Grade 4 words from JSON
            { word: 'drizzle', level: 2, emoji: '🌧️' },
            { word: 'honesty', level: 2, emoji: '⭐' },
            { word: 'tropics', level: 2, emoji: '🌴' },
            { word: 'reflect', level: 2, emoji: '✨' },
            { word: 'calorie', level: 2, emoji: '⚖️' },
            { word: 'salmon', level: 2, emoji: '🐟' }
        ]
    },
    
    // Level 3 - Grade 5 words
    challenging: {
        emoji: '⭐⭐⭐',
        words: [
            // Original challenging words
            { word: 'zebra', level: 3, emoji: '🦓' },
            { word: 'monkey', level: 3, emoji: '🐵' },
            { word: 'flower', level: 3, emoji: '🌸' },
            
            // Grade 5 words from JSON
            { word: 'interior', level: 3, emoji: '🏠' },
            { word: 'imitate', level: 3, emoji: '🔄' },
            { word: 'elegant', level: 3, emoji: '💃' },
            { word: 'editor', level: 3, emoji: '✍️' },
            { word: 'castle', level: 3, emoji: '🏰' },
            { word: 'archery', level: 3, emoji: '🏹' }
        ]
    },
    
    // Level 4 - Grade 6 words
    difficult: {
        emoji: '⭐⭐⭐⭐',
        words: [
            // Original difficult words
            { word: 'dolphin', level: 4, emoji: '🐬' },
            { word: 'elephant', level: 4, emoji: '🐘' },
            { word: 'mountain', level: 4, emoji: '⛰️' },
            
            // Grade 6 words from JSON
            { word: 'grocery', level: 4, emoji: '🛒' },
            { word: 'champion', level: 4, emoji: '🏆' },
            { word: 'ecology', level: 4, emoji: '🌱' },
            { word: 'drought', level: 4, emoji: '☀️' },
            { word: 'computer', level: 4, emoji: '💻' },
            { word: 'bacteria', level: 4, emoji: '🔬' }
        ]
    },
    
    // Level 5 - Grades 7-8 words
    expert: {
        emoji: '⭐⭐⭐⭐⭐',
        words: [
            // Original expert words
            { word: 'butterfly', level: 5, emoji: '🦋' },
            { word: 'volcano', level: 5, emoji: '🌋' },
            
            // Grade 7-8 words from JSON
            { word: 'cornea', level: 5, emoji: '👁️' },
            { word: 'allegory', level: 5, emoji: '📖' },
            { word: 'biceps', level: 5, emoji: '💪' },
            { word: 'cello', level: 5, emoji: '🎻' },
            { word: 'symphonious', level: 5, emoji: '🎼' },
            { word: 'arachnid', level: 5, emoji: '🕷️' },
            { word: 'vertex', level: 5, emoji: '🔺' },
            { word: 'voluminous', level: 5, emoji: '📦' },
            { word: 'rhetoric', level: 5, emoji: '💬' },
            { word: 'venerable', level: 5, emoji: '👴' }
        ]
    }
};

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
});

// Game functions
function showSpellingCategories() {
    document.querySelector('.game-options').classList.add('hidden');
    document.getElementById('spelling-categories').classList.remove('hidden');
}

function hideSpellingCategories() {
    document.querySelector('.game-options').classList.remove('hidden');
    document.getElementById('spelling-categories').classList.add('hidden');
}

function startSpellingGame(category = null) {
    startGame('spelling', category);
}

function updateHighScoreDisplays() {
    document.getElementById('math-high-score').textContent = highScores.math || 0;
    document.getElementById('spelling-high-score').textContent = highScores.spelling || 0;
    document.getElementById('high-score-display').textContent = highScores[currentGameMode] || 0;
}

// Track used questions to prevent repetition
let usedQuestionIndices = new Set();

function initBackButton() {
    console.log('Initializing back button...');
    const backToMenuBtn = document.getElementById('back-to-menu-btn');
    
    if (!backToMenuBtn) {
        console.error('Back button element not found!');
        return;
    }
    
    console.log('Back button found:', backToMenuBtn);
    
    // Create a new button to replace the old one
    const newBtn = backToMenuBtn.cloneNode(true);
    
    // Add inline styles to ensure visibility
    newBtn.style.position = 'absolute';
    newBtn.style.left = '10px';
    newBtn.style.top = '10px';
    newBtn.style.zIndex = '1000';
    newBtn.style.padding = '8px 15px';
    newBtn.style.backgroundColor = '#4a90e2';
    newBtn.style.color = 'white';
    newBtn.style.border = 'none';
    newBtn.style.borderRadius = '4px';
    newBtn.style.cursor = 'pointer';
    
    // Replace the old button with the new one
    backToMenuBtn.parentNode.replaceChild(newBtn, backToMenuBtn);
    
    // Add click handler
    newBtn.onclick = function(e) {
        console.log('Back button clicked!');
        e.preventDefault();
        e.stopPropagation();
        returnToMainMenu();
        return false;
    };
    
    // Add touch handler for mobile
    newBtn.ontouchend = function(e) {
        console.log('Back button touched!');
        e.preventDefault();
        e.stopPropagation();
        returnToMainMenu();
        return false;
    };
    
    console.log('Back button initialization complete');
}

function createEmergencyBackButton() {
    console.log('Creating emergency back button...');
    const emergencyBtn = document.createElement('button');
    emergencyBtn.textContent = '← BACK TO MENU (EMERGENCY)';
    emergencyBtn.style.position = 'fixed';
    emergencyBtn.style.top = '10px';
    emergencyBtn.style.left = '10px';
    emergencyBtn.style.zIndex = '9999';
    emergencyBtn.style.padding = '15px 25px';
    emergencyBtn.style.fontSize = '18px';
    emergencyBtn.style.backgroundColor = '#ff4444';
    emergencyBtn.style.color = 'white';
    emergencyBtn.style.border = '3px solid white';
    emergencyBtn.style.borderRadius = '8px';
    emergencyBtn.style.cursor = 'pointer';
    emergencyBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    
    emergencyBtn.onclick = function() {
        console.log('Emergency back button clicked!');
        returnToMainMenu();
        this.remove(); // Remove the button after clicking
    };
    
    document.body.appendChild(emergencyBtn);
    console.log('Emergency back button added to DOM');
}

function startGame(mode, category = null) {
    currentGameMode = mode;
    score = 0;
    currentLevel = 1;
    currentQuestionIndex = 0;
    timeLeft = 30;
    usedQuestionIndices.clear();
    
    updateScore();
    updateLevel();
    updateTimer();
    updateHighScoreDisplays();
    
    // Show game screen
    gameModeEl.classList.add('hidden');
    resultScreenEl.classList.add('hidden');
    gameScreenEl.classList.remove('hidden');
    
    // Add emergency back button
    createEmergencyBackButton();
    
    // Load first question
    loadQuestion();
}

function loadQuestion() {
    console.log('Loading question...');
    console.log('Current game mode:', currentGameMode);
    console.log('Current level:', currentLevel);
    
    // Ensure DOM elements are properly initialized
    if (!feedbackEl) {
        console.error('feedbackEl is not defined');
        feedbackEl = document.getElementById('feedback') || document.createElement('div');
    }
    
    // Clear any existing feedback
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
    
    // Get all available questions for current level and mode
    let availableQuestions = [];
    
    if (currentGameMode === 'math') {
        // For math, use questions from the current level
        availableQuestions = [...(mathQuestionsByLevel[currentLevel] || [])];
        
        // Reset used questions if we've used them all or if starting a new level
        if (usedQuestionIndices.size >= availableQuestions.length) {
            usedQuestionIndices.clear();
        }
        
        // If no questions available for this level, try next level
        if (availableQuestions.length === 0) {
            if (currentLevel < 5) {
                currentLevel++;
                updateLevel();
                availableQuestions = [...(mathQuestionsByLevel[currentLevel] || [])];
                usedQuestionIndices.clear();
                
                // Show level up message
                feedbackEl.textContent = `Level ${currentLevel} unlocked!`;
                feedbackEl.className = 'feedback correct';
                
                // Continue after a short delay
                setTimeout(loadQuestion, 1500);
                return;
            } else {
                endGame();
                return;
            }
        }
    } else {
        // For spelling, use the current category's words
        const category = document.querySelector('.spelling-category.active')?.dataset.category || 'easy';
        availableQuestions = [...(spellingCategories[category]?.words || [])];
        
        // Reset used questions if we've used them all
        if (usedQuestionIndices.size >= availableQuestions.length) {
            usedQuestionIndices.clear();
        }
    }
    
    // Get a random unused question
    let randomIndex;
    let selectedQuestion;
    
    if (currentGameMode === 'math') {
        // For math, use a random question from the current level
        randomIndex = Math.floor(Math.random() * availableQuestions.length);
        selectedQuestion = availableQuestions[randomIndex];
        
        // Mark this question as used
        usedQuestionIndices.add(randomIndex);
    } else {
        // For spelling, use the next question in sequence
        randomIndex = currentQuestionIndex % availableQuestions.length;
        selectedQuestion = availableQuestions[randomIndex];
    }
    
    if (originalIndex !== -1) {
        usedQuestionIndices.add(originalIndex);
    }
    
    // Load the selected question
    if (currentGameMode === 'math') {
        loadMathQuestion(selectedQuestion);
    } else {
        loadSpellingQuestion(selectedQuestion);
    }
    
    // Clear feedback and enable options
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
    document.getElementById('next-btn').style.display = 'none';
    
    // Update the question counter
    const totalQuestions = (currentGameMode === 'math' ? mathQuestions : spellingQuestions)
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            
            // Add error handling
            recognition.onerror = function(event) {
                console.error('Speech recognition error', event.error);
                feedbackEl.textContent = 'Voice input not available. Please type your answer.';
            };
            
            recognition.onspeechend = function() {
                if (recognition) {
                    recognition.stop();
                }
            };
            
            return true;
        }
    }
    return false;
}

// Speech recognition is currently disabled
let isSpeechRecognitionAvailable = false;

function setupVoiceRecognition() {
    console.warn('Speech recognition is currently disabled');
    return false;
}

function loadSpellingQuestion(question) {
    // Show the emoji and word to spell
    questionEl.innerHTML = `
        <div class="spelling-prompt">
            <div class="emoji-hint">${question.image}</div>
            <div>Spell the word for this ${question.word.length}-letter word:</div>
            <div class="word-hint">${'_ '.repeat(question.word.length).trim()}</div>
            <button onclick="speakWord('${question.word}')" class="speak-btn">
                🔊 Hear Word
            </button>
        </div>
        <div class="voice-controls">
            <button id="startListening" class="mic-btn">
                🎤 Click to Speak
            </button>
            <div id="voiceFeedback" class="voice-feedback">
                <div id="voiceLevel" class="voice-level"></div>
                <div id="voiceText">Press the mic and say the word</div>
            </div>
        </div>
    `;
    
    // Clear previous options
    optionsEl.innerHTML = '';
    
    // Setup voice recognition if supported
    if (setupVoiceRecognition()) {
        const startButton = document.getElementById('startListening');
        const voiceText = document.getElementById('voiceText');
        const voiceLevel = document.getElementById('voiceLevel');
        
        startButton.addEventListener('click', () => {
            try {
                recognition.start();
                voiceText.textContent = 'Listening...';
                startButton.disabled = true;
                startButton.innerHTML = '🎙️ Listening...';
                
                // Visual feedback for voice level (animation)
                const animateLevel = () => {
                    if (recognition && recognition.state === 'listening') {
                        const level = Math.random() * 100; // Simulate voice level
                        voiceLevel.style.width = `${level}%`;
                        requestAnimationFrame(animateLevel);
                    }
                };
                animateLevel();
                
            } catch (e) {
                console.error('Error starting speech recognition:', e);
                voiceText.textContent = 'Error: Could not access microphone';
            }
        });
        
        recognition.onresult = (event) => {
            const spokenWord = event.results[0][0].transcript.trim().toLowerCase();
            voiceText.innerHTML = `You said: <strong>${spokenWord}</strong>`;
            checkAnswer(spokenWord, question.word.toLowerCase());
        };
        
        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            voiceText.textContent = `Error: ${event.error}`;
            startButton.disabled = false;
            startButton.innerHTML = '🎤 Try Again';
        };
        
        recognition.onend = () => {
            startButton.disabled = false;
            startButton.innerHTML = '🎤 Click to Speak';
            voiceLevel.style.width = '0%';
        };
    } else {
        // Fallback to text input if speech recognition is not supported
        const fallbackHTML = `
            <div style="color: red; margin: 10px 0;">
                Voice input not supported in your browser. Please type the word:
            </div>
            <input type="text" id="fallbackInput" class="spelling-input" placeholder="Type the word...">
            <button onclick="checkAnswer(document.getElementById('fallbackInput').value.trim().toLowerCase(), '${question.word.toLowerCase()}')" class="submit-btn">
                Submit
            </button>
        `;
        optionsEl.innerHTML = fallbackHTML;
        document.getElementById('fallbackInput')?.focus();
    }
    
    // Add keyboard listener for Enter key on fallback input
    document.addEventListener('keypress', function handleKeyPress(e) {
        if (e.key === 'Enter' && document.activeElement.id === 'fallbackInput') {
            checkAnswer(document.getElementById('fallbackInput').value.trim().toLowerCase(), question.word.toLowerCase());
        }
    });
}

function checkAnswer(selected, correct) {
    const isCorrect = selected === correct;
    const buttons = optionsEl.querySelectorAll('button');
    
    // Disable all buttons immediately
    buttons.forEach(btn => btn.disabled = true);
    
    if (isCorrect) {
        // Calculate points with streak bonus
        const basePoints = 10 * currentLevel;
        const streakBonus = Math.min(20, (currentStreak || 0) * 2); // Max 20 point bonus
        const pointsEarned = basePoints + streakBonus;
        
        // Update score and streak
        score += pointsEarned;
        currentStreak = (currentStreak || 0) + 1;
        
        // Update high scores
        if (currentGameMode === 'math') {
            highScores.math = Math.max(highScores.math || 0, score);
            highScores.bestStreak = Math.max(highScores.bestStreak || 0, currentStreak);
            highScores.lastPlayed = new Date().toISOString();
            localStorage.setItem('highScores', JSON.stringify(highScores));
            updateHighScoreDisplays();
        }
        
        // Update UI
        updateScore();
        feedbackEl.textContent = `Correct! +${pointsEarned} points! 🎉`;
        feedbackEl.className = 'feedback correct';
        
        // Play sound effect with volume control
        if (sounds.correct) {
            sounds.correct.volume = 0.6;
            sounds.correct.currentTime = 0;
            sounds.correct.play().catch(e => console.log('Audio play failed:', e));
        }
        
        // Visual feedback for correct answer
        const selectedButton = Array.from(buttons).find(btn => btn.textContent === selected);
        if (selectedButton) {
            selectedButton.classList.add('correct');
            selectedButton.style.transform = 'scale(1.05)';
            setTimeout(() => {
                selectedButton.style.transform = 'scale(1)';
            }, 200);
        }
        
        // Show confetti for streaks of 5 or more
        if (currentStreak >= 5) {
            triggerConfetti();
            if (currentStreak % 5 === 0) {
                // Play level up sound for every 5 in a row
                if (sounds.levelUp) {
                    sounds.levelUp.volume = 0.7;
                    sounds.levelUp.currentTime = 0;
                    sounds.levelUp.play().catch(console.error);
                }
                feedbackEl.textContent += `\n${currentStreak} in a row! Amazing!`;
            }
        }
    } else {
        // Handle incorrect answer
        currentStreak = 0; // Reset streak on wrong answer
        feedbackEl.textContent = `Incorrect. The correct answer is: ${correct}`;
        feedbackEl.className = 'feedback incorrect';
        
        // Play wrong answer sound
        if (sounds.wrong) {
            sounds.wrong.volume = 0.4;
            sounds.wrong.currentTime = 0;
            sounds.wrong.play().catch(console.error);
        }
        
        // Visual feedback for incorrect answer
        const selectedButton = Array.from(buttons).find(btn => btn.textContent === selected);
        const correctButton = Array.from(buttons).find(btn => btn.textContent === correct);
        
        if (selectedButton) selectedButton.classList.add('incorrect');
        if (correctButton) correctButton.classList.add('correct');
    }
    
    // Show next button with animation
    const nextBtn = document.getElementById('next-btn');
    nextBtn.style.display = 'inline-block';
    nextBtn.style.animation = 'pulse 1.5s infinite';
    
    // Update streak display if it exists
    const streakDisplay = document.getElementById('streak-display');
    if (streakDisplay) {
        streakDisplay.textContent = `🔥 ${currentStreak}`;
        if (currentStreak > 0) {
            streakDisplay.style.display = 'inline-block';
            streakDisplay.style.animation = 'pulse 1s infinite';
        } else {
            streakDisplay.style.animation = 'none';
        }
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    
    // Level up every 5 questions
    if (currentQuestionIndex > 0 && currentQuestionIndex % 5 === 0) {
        currentLevel = Math.min(5, currentLevel + 1);
        updateLevel();
        
        // Play level up sound and show animation
        if (sounds.levelUp) {
            sounds.levelUp.currentTime = 0;
            sounds.levelUp.play().catch(e => console.log('Audio play failed:', e));
        }
        
        // Show level up message
        const levelUpMsg = document.createElement('div');
        levelUpMsg.className = 'level-up-message';
        levelUpMsg.textContent = `Level ${currentLevel}!`;
        document.body.appendChild(levelUpMsg);
        
        // Animate and remove
        setTimeout(() => {
            levelUpMsg.style.opacity = '0';
            levelUpMsg.style.transform = 'translate(-50%, -100px)';
            setTimeout(() => levelUpMsg.remove(), 1000);
        }, 1000);
    }
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timer);
    gameScreenEl.classList.add('hidden');
    resultScreenEl.classList.remove('hidden');
    document.getElementById('final-score').textContent = score;
    
    // Check for high score
    const isNewHighScore = score > (highScores[currentGameMode] || 0);
    
    if (isNewHighScore) {
        highScores[currentGameMode] = score;
        localStorage.setItem('highScores', JSON.stringify(highScores));
        document.getElementById('high-score').textContent = score;
        document.getElementById('new-high-score').classList.remove('hidden');
        
        // Play level up sound for new high score
        if (sounds.levelUp) {
            sounds.levelUp.currentTime = 0;
            sounds.levelUp.play().catch(e => console.log('Audio play failed:', e));
        }
    } else {
        document.getElementById('high-score').textContent = highScores[currentGameMode] || 0;
        document.getElementById('new-high-score').classList.add('hidden');
        
        // Play game over sound for regular end
        if (sounds.gameOver) {
            sounds.gameOver.currentTime = 0;
            sounds.gameOver.play().catch(e => console.log('Audio play failed:', e));
        }
    }
    
    // Add confetti effect for new high score
    if (isNewHighScore) {
        triggerConfetti();
    }
}

// Confetti effect for celebrations
function triggerConfetti() {
    const confettiSettings = {
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff9900'],
        shapes: ['circle', 'square'],
        gravity: 0.8,
        ticks: 200
    };
    
    // Simple confetti effect
    for (let i = 0; i < confettiSettings.particleCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = confettiSettings.colors[Math.floor(Math.random() * confettiSettings.colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        document.body.appendChild(confetti);
        
        // Animate confetti
        const animation = confetti.animate(
            [
                { transform: `translateY(-100vh) rotate(0deg)`, opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ],
            {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)',
                fill: 'forwards'
            }
        );
        
        // Remove confetti after animation
        animation.onfinish = () => confetti.remove();
    }
}

function resetGame() {
    resultScreenEl.classList.add('hidden');
    gameModeEl.classList.remove('hidden');
    updateHighScoreDisplays();
}

function returnToMenu() {
    resultScreenEl.classList.add('hidden');
    gameModeEl.classList.remove('hidden');
    updateHighScoreDisplays();
}

// Function to return to main menu
function returnToMainMenu() {
    // Reset game state
    stopTimer();
    resetGame();
    
    // Show main menu and hide other screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    gameModeEl.classList.remove('hidden');
    
    // Update high scores
    updateHighScoreDisplays();
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add click handler for the main header to return to the main menu
    const mainHeader = document.getElementById('main-header');
    if (mainHeader) {
        mainHeader.addEventListener('click', returnToMainMenu);
    }
    
    // Add click handler for the back to menu button with better event handling
    const backToMenuBtn = document.getElementById('back-to-menu-btn');
    if (backToMenuBtn) {
        backToMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Back to menu button clicked');
            returnToMainMenu();
            return false;
        });
        
        // Also add a separate handler for touch events on mobile
        backToMenuBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Back to menu button touched');
            returnToMainMenu();
            return false;
        });
    }

    console.log('DOM fully loaded, initializing game...');
    
    // Initialize DOM elements
    initDOM();
    
    // Make sure all required elements exist
    if (!gameModeEl || !gameScreenEl || !resultScreenEl) {
        console.error('Required elements not found in the DOM');
        return;
    }
    
    // Initialize game state
    updateHighScoreDisplays();
    
    // Add click event listeners for game options
    const mathOption = document.querySelector('.game-option:first-child');
    const spellingOption = document.querySelector('.game-option:last-child');
    
    if (mathOption) {
        mathOption.onclick = function(e) {
            // Prevent default in case it's a link
            if (e) e.preventDefault();
            
            console.log('Math option clicked');
            console.log('Starting math game...');
            
            // Hide the game mode selection
            if (gameModeEl) gameModeEl.style.display = 'none';
            
            // Show the game screen
            if (gameScreenEl) {
                gameScreenEl.classList.remove('hidden');
                console.log('Game screen shown');
            } else {
                console.error('Game screen element not found');
            }
            
            // Start the math game
            startGame('math');
        };
    }
    
    if (spellingOption) {
        spellingOption.onclick = function() {
            console.log('Spelling option clicked');
            showSpellingCategories();
        };
    }
    
    // Add click handler for back button in spelling categories
    const backButton = document.querySelector('.back-btn');
    if (backButton) {
        backButton.onclick = hideSpellingCategories;
    }
    
    // Add click handlers for spelling categories
    document.querySelectorAll('.category').forEach(category => {
        category.onclick = function() {
            const categoryName = this.getAttribute('data-category') || '';
            console.log('Category selected:', categoryName);
            startSpellingGame(categoryName);
        };
    });
    
    console.log('Game initialization complete');
});

function loadSpellingQuestion(question) {
    // Clear previous content
    optionsEl.innerHTML = '';
    
    // Set up the question prompt
    questionEl.textContent = `Spell the word:`;
    
    // Create and append the word to spell (for visual reference)
    const wordDisplay = document.createElement('div');
    wordDisplay.className = 'word-to-spell';
    wordDisplay.textContent = question.word;
    questionEl.appendChild(wordDisplay);
    
    // Create input field for typing the word
    const inputContainer = document.createElement('div');
    inputContainer.className = 'spelling-input-container';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'spelling-input';
    input.placeholder = 'Type the word here...';
    input.autocomplete = 'off';
    input.spellcheck = false;
    
    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit';
    submitBtn.onclick = () => checkAnswer(input.value.trim().toLowerCase(), question.word.toLowerCase());
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer(input.value.trim().toLowerCase(), question.word.toLowerCase());
        }
    });
    
    inputContainer.appendChild(input);
    inputContainer.appendChild(submitBtn);
    optionsEl.appendChild(inputContainer);
    
    // Add next button (initially hidden)
    const nextBtn = document.createElement('button');
    nextBtn.id = 'next-btn';
    nextBtn.textContent = 'Next Question';
    nextBtn.onclick = nextQuestion;
    nextBtn.style.display = 'none';
    optionsEl.appendChild(nextBtn);
    
    // Focus the input field
    setTimeout(() => input.focus(), 100);
    
    // Speak the word
    speakWord(question.word);
}

function updateScore() {
    scoreEl.textContent = score;
}

function updateLevel() {
    levelEl.textContent = currentLevel;
    // Update level stars
    const stars = '⭐'.repeat(currentLevel);
    document.getElementById('level-stars').textContent = stars;
    
    // Add a fun animation when leveling up
    if (currentLevel > 1) {
        const levelUpEl = document.createElement('div');
        levelUpEl.className = 'level-up-message';
        levelUpEl.textContent = `Level ${currentLevel} Unlocked!`;
        document.body.appendChild(levelUpEl);
        
        // Remove after animation
        setTimeout(() => {
            levelUpEl.style.opacity = '0';
            levelUpEl.style.transform = 'translate(-50%, -80%)';
            setTimeout(() => levelUpEl.remove(), 1000);
        }, 1500);
    }
}

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Timer functions
function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    updateTimer();
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function updateTimer() {
    const timerEl = document.getElementById('timer');
    if (timerEl) {
        timerEl.textContent = timeLeft;
        timerEl.className = timeLeft < 10 ? 'timer warning' : 'timer';
    }
}

// Add some styling for the spelling input
// Text-to-speech function
function speakWord(word) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.rate = 0.8; // Slower speech for better understanding
        speechSynthesis.speak(utterance);
    } else {
        alert('Text-to-speech is not supported in your browser. The word is: ' + word);
    }
}

const style = document.createElement('style');
style.textContent = `
    .spelling-prompt {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
    }
    
    .emoji-hint {
        font-size: 3em;
        margin: 10px 0;
    }
    
    .word-hint {
        font-family: monospace;
        font-size: 1.8em;
        letter-spacing: 5px;
        margin: 10px 0;
        color: #2c3e50;
    }
    
    .speak-btn {
        background-color: #3498db;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        margin: 10px 0;
        font-size: 1em;
        transition: all 0.3s ease;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    
    .speak-btn:hover {
        background-color: #2980b9;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    
    .speak-btn:active {
        transform: translateY(0);
    }
    
    .voice-controls {
        margin: 20px 0;
        text-align: center;
        width: 100%;
    }
    
    .mic-btn {
        background: #e74c3c;
        color: white;
        border: none;
        padding: 15px 30px;
        font-size: 1.2em;
        border-radius: 50px;
        cursor: pointer;
        margin: 15px 0;
        transition: all 0.3s ease;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    
    .mic-btn:hover:not(:disabled) {
        background: #c0392b;
        transform: scale(1.05);
    }
    
    .mic-btn:disabled {
        background: #95a5a6;
        cursor: not-allowed;
    }
    
    .mic-btn.listening {
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.7); }
        70% { box-shadow: 0 0 0 15px rgba(231, 76, 60, 0); }
        100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0); }
    }
    
    .voice-feedback {
        margin: 20px auto;
        max-width: 300px;
        background: #f8f9fa;
        border-radius: 10px;
        padding: 15px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .voice-level {
        height: 8px;
        background: #3498db;
        width: 0%;
        border-radius: 4px;
        margin-bottom: 10px;
        transition: width 0.1s ease;
    }
    
    #voiceText {
        font-size: 1em;
        color: #555;
        min-height: 24px;
    }
    
    .spelling-input {
        margin: 10px 0;
        padding: 12px 15px;
        font-size: 1.2em;
        border: 2px solid #3498db;
        border-radius: 8px;
        width: 80%;
        max-width: 300px;
    }
    
    .submit-btn {
        background-color: #9b59b6;
        color: white;
        border: none;
        padding: 12px 25px;
        font-size: 1em;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 15px;
        transition: all 0.3s ease;
    }
    
    .submit-btn:hover {
        background-color: #8e44ad;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .submit-btn:active {
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
