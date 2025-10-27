// Dynamic word pools loaded from JSON and grouped by difficulty
const difficultyPools = {
    easy: [],
    medium: [],
    hard: []
};

let sessionWords = [];
let currentWordIndex = 0;
let score = 0;
let currentStreak = 0;
let totalWords = 0;

function buildHint(word) {
    // Simple generic hint using letter count
    return `Word has ${word.length} letters`;
}

async function loadWords() {
    try {
        const res = await fetch('windsurf_spelling_words.json');
        const data = await res.json();
        // Map grades to our difficulty tiers
        const grade3 = data['Grade 3'] || [];
        const grade4 = data['Grade 4'] || [];
        const grade5 = data['Grade 5'] || [];
        const grade6 = data['Grade 6'] || [];
        const grade7 = data['Grade 7'] || [];
        const grade8 = data['Grade 8'] || [];

        // Easy: Grade 3 + first half of Grade 4
        const easyWords = [...grade3, ...grade4.slice(0, Math.ceil(grade4.length / 2))];
        // Medium: second half of Grade 4 + Grade 5
        const mediumWords = [...grade4.slice(Math.ceil(grade4.length / 2)), ...grade5];
        // Hard: Grade 6 + Grade 7 + Grade 8
        const hardWords = [...grade6, ...grade7, ...grade8];

        difficultyPools.easy = easyWords.map(w => ({ word: w, hint: buildHint(w) }));
        difficultyPools.medium = mediumWords.map(w => ({ word: w, hint: buildHint(w) }));
        difficultyPools.hard = hardWords.map(w => ({ word: w, hint: buildHint(w) }));
    } catch (e) {
        console.error('Failed to load words JSON:', e);
        // Fallback minimal pool so the game remains playable
        const fallback = ['apple','banana','computer','elephant','guitar','mountain','rainbow','sunshine','watermelon','zebra'];
        difficultyPools.easy = fallback.map(w => ({ word: w, hint: buildHint(w) }));
        difficultyPools.medium = difficultyPools.easy.slice();
        difficultyPools.hard = difficultyPools.easy.slice();
    }
}

function startSpellingGame() {
    // Read setup selections
    const difficulty = (document.getElementById('difficulty-select')?.value || 'easy');
    const requested = parseInt(document.getElementById('words-count')?.value || '20', 10);

    // Build session word list
    const pool = difficultyPools[difficulty] || [];
    const words = shuffle([...pool]);
    sessionWords = words.slice(0, Math.min(requested, words.length));
    totalWords = sessionWords.length;

    // Reset state
    currentWordIndex = 0;
    score = 0;
    currentStreak = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('streak').textContent = currentStreak;
    document.getElementById('word-count').textContent = `0/${totalWords}`;

    // Switch screens
    document.getElementById('setup-screen')?.classList.add('hidden');
    document.getElementById('game-screen')?.classList.remove('hidden');

    showNextWord();
}

function showNextWord() {
    if (currentWordIndex >= sessionWords.length) {
        endGame();
        return;
    }

    const wordData = sessionWords[currentWordIndex];
    document.getElementById('question-text').innerHTML = `
        <p>${wordData.hint}</p>
        <p class="hint">Word has ${wordData.word.length} letters</p>
    `;
    
    // Clear previous input and feedback
    const input = document.getElementById('spelling-input');
    input.value = '';
    input.focus();
    
    // Clear feedback
    const feedback = document.getElementById('answer-feedback');
    feedback.textContent = '';
    feedback.className = 'feedback';
}

function checkSpelling() {
    const input = document.getElementById('spelling-input');
    const userAnswer = input.value.trim().toLowerCase();
    const correctWord = sessionWords[currentWordIndex].word;
    const feedback = document.getElementById('answer-feedback');

    if (userAnswer === correctWord) {
        // Correct answer
        score += 10 + (currentStreak * 2);
        currentStreak++;
        feedback.textContent = 'Correct! 🎉';
        feedback.className = 'feedback correct';
    } else {
        // Incorrect answer
        currentStreak = 0;
        feedback.innerHTML = `Incorrect. The correct spelling is: <strong>${correctWord}</strong>`;
        feedback.className = 'feedback incorrect';
    }

    // Update score and streak
    document.getElementById('score').textContent = score;
    document.getElementById('streak').textContent = currentStreak;
    
    // Show next button
    document.getElementById('next-btn').classList.remove('hidden');
}

function nextWord() {
    currentWordIndex++;
    document.getElementById('next-btn').classList.add('hidden');
    showNextWord();
}

function endGame() {
    // Save high score
    const highScore = Math.max(score, parseInt(localStorage.getItem('spellingHighScore') || '0'));
    if (score > 0) {
        localStorage.setItem('spellingHighScore', score);
    }
    
    // Show results
    document.getElementById('final-score').textContent = score;
    document.getElementById('final-high-score').textContent = highScore;
    document.getElementById('new-high-score').classList.toggle('hidden', score <= highScore);
    
    // Show result screen
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', async function() {
    // Add click handler for the main header to return to the main menu
    const mainHeader = document.getElementById('main-header');
    if (mainHeader) {
        mainHeader.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    
    // Load high score
    const highScore = localStorage.getItem('spellingHighScore') || '0';
    document.getElementById('high-score-display').textContent = highScore;
    
    // Set up event listeners
    document.getElementById('check-btn').addEventListener('click', checkSpelling);
    document.getElementById('next-btn').addEventListener('click', nextWord);
    document.getElementById('play-again-btn').addEventListener('click', startSpellingGame);
    document.getElementById('menu-btn').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // Allow pressing Enter to check answer
    document.getElementById('spelling-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkSpelling();
        }
    });

    // Load words then enable Start
    const startBtn = document.getElementById('start-spelling-btn');
    startBtn.disabled = true;
    await loadWords();
    startBtn.disabled = false;
    startBtn.addEventListener('click', startSpellingGame);
});

// Utility shuffle
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
