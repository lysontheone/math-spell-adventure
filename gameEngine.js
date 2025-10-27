import { getGameMode } from './gameModes.js';
import { userManager } from './auth.js';
import { gameSounds } from './sounds.js';

export class GameEngine {
    constructor() {
        this.currentMode = null;
        this.currentQuestion = null;
        this.score = 0;
        this.streak = 0;
        this.timer = null;
        this.timeLeft = 0;
        this.isGameActive = false;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Global event listeners for game controls
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('option-btn')) {
                this.handleAnswer(e.target.dataset.answer);
            } else if (e.target.id === 'next-btn') {
                this.nextQuestion();
            } else if (e.target.id === 'play-again-btn') {
                this.startGame(this.currentMode);
            } else if (e.target.id === 'back-to-modes') {
                this.endGame();
                document.getElementById('game-selection').classList.remove('hidden');
                document.getElementById('game-screen').classList.add('hidden');
            }
        });
    }

    async startGame(modeId, options = {}) {
        this.currentMode = getGameMode(modeId);
        this.score = 0;
        this.streak = 0;
        this.isGameActive = true;
        
        // Update UI
        document.getElementById('game-selection').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('hidden');
        document.getElementById('score').textContent = this.score;
        
        // Initialize game based on mode
        switch(modeId) {
            case 'timed':
                this.timeLeft = this.currentMode.timeLimit;
                this.startTimer();
                break;
            case 'endless':
                this.lives = this.currentMode.lives;
                document.getElementById('lives').textContent = '❤️'.repeat(this.lives);
                break;
            case 'practice':
                // No special initialization needed for practice mode
                break;
            case 'multiplayer':
                // Initialize multiplayer game state
                this.multiplayerState = this.currentMode.setupGame([
                    { id: 'player1', name: 'Player 1', score: 0 },
                    { id: 'player2', name: 'Player 2', score: 0 }
                ]);
                this.currentPlayer = 0;
                break;
        }
        
        // Load and display first question
        await this.loadQuestion();
    }

    async loadQuestion() {
        if (!this.isGameActive) return;
        
        // Clear previous question
        const questionEl = document.getElementById('question');
        const optionsEl = document.getElementById('options');
        const feedbackEl = document.getElementById('feedback');
        
        questionEl.textContent = 'Loading...';
        optionsEl.innerHTML = '';
        feedbackEl.textContent = '';
        feedbackEl.className = 'feedback';
        
        // Generate question based on game mode
        try {
            if (this.currentMode.id === 'practice') {
                // For practice mode, get questions for the selected category
                const questions = this.currentMode.getQuestions(this.currentCategory, 1);
                this.currentQuestion = questions[0];
            } else if (this.currentMode.id === 'endless') {
                // For endless mode, increase difficulty with each question
                const difficulty = Math.min(1 + (this.score * this.currentMode.difficultyIncrement), 5);
                this.currentQuestion = this.currentMode.getNextQuestion(difficulty);
            } else if (this.currentMode.id === 'timed') {
                // For timed mode, get a mix of questions
                const questions = this.currentMode.getQuestions(5);
                this.currentQuestion = questions[Math.floor(Math.random() * questions.length)];
            } else {
                // Default mode (math or spelling)
                const questions = await this.generateQuestions(1);
                this.currentQuestion = questions[0];
            }
            
            // Display the question
            this.displayQuestion(this.currentQuestion);
            
        } catch (error) {
            console.error('Error loading question:', error);
            questionEl.textContent = 'Error loading question. Please try again.';
        }
    }

    displayQuestion(question) {
        const questionEl = document.getElementById('question');
        const optionsEl = document.getElementById('options');
        
        // Display the question
        questionEl.textContent = question.question;
        
        // Display options (for multiple choice)
        if (question.options && question.options.length > 0) {
            optionsEl.innerHTML = question.options.map((option, index) => `
                <button class="option-btn" data-answer="${option}">
                    ${option}
                </button>
            `).join('');
        } 
        // For spelling questions, show input field
        else if (question.type === 'spelling') {
            optionsEl.innerHTML = `
                <div class="spelling-input-container">
                    <input type="text" id="spelling-answer" placeholder="Type your answer...">
                    <button id="submit-answer" class="btn">Submit</button>
                </div>
            `;
            
            // Add event listener for submit button
            document.getElementById('submit-answer').addEventListener('click', () => {
                const answer = document.getElementById('spelling-answer').value.trim();
                this.handleAnswer(answer);
            });
            
            // Also allow Enter key to submit
            document.getElementById('spelling-answer').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const answer = e.target.value.trim();
                    this.handleAnswer(answer);
                }
            });
        }
        
        // Show question number and other info
        this.updateQuestionInfo();
    }

    handleAnswer(selectedAnswer) {
        if (!this.isGameActive) return;
        
        const feedbackEl = document.getElementById('feedback');
        const isCorrect = this.checkAnswer(selectedAnswer);
        
        // Update UI based on answer
        if (isCorrect) {
            this.handleCorrectAnswer();
        } else {
            this.handleIncorrectAnswer();
        }
        
        // Update score and streak display
        document.getElementById('score').textContent = this.score;
        this.updateStreakCounter();
        
        // Show feedback
        this.showFeedback(isCorrect);
        
        // Disable all option buttons
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.answer === this.currentQuestion.answer) {
                btn.classList.add('correct');
            } else if (btn.dataset.answer === selectedAnswer && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        // Show next button or end game
        if (this.shouldEndGame()) {
            this.endGame();
        } else {
            this.showNextButton();
        }
    }
    
    checkAnswer(selectedAnswer) {
        // Normalize answers for comparison
        const normalize = (str) => str.toString().toLowerCase().trim();
        return normalize(selectedAnswer) === normalize(this.currentQuestion.answer);
    }
    
    handleCorrectAnswer() {
        this.streak++;
        const points = this.calculatePoints();
        this.score += points;
        gameSounds.play('correct');
        
        // Add bonus for streaks
        if (this.streak >= 3) {
            const bonus = Math.floor(this.streak / 3) * 5;
            this.score += bonus;
        }
    }
    
    handleIncorrectAnswer() {
        this.streak = 0;
        gameSounds.play('wrong');
        
        // In endless mode, lose a life
        if (this.currentMode.id === 'endless') {
            this.lives--;
            document.getElementById('lives').textContent = '❤️'.repeat(this.lives);
            
            if (this.lives <= 0) {
                this.endGame();
                return;
            }
        }
    }
    
    calculatePoints() {
        // Base points
        let points = 10;
        
        // Bonus for time left (in timed mode)
        if (this.currentMode.id === 'timed' && this.timeLeft) {
            const timeBonus = Math.floor(this.timeLeft / 5);
            points += timeBonus;
        }
        
        // Bonus for difficulty
        if (this.currentQuestion.level) {
            points += this.currentQuestion.level * 2;
        }
        
        return points;
    }
    
    showFeedback(isCorrect) {
        const feedbackEl = document.getElementById('feedback');
        feedbackEl.textContent = isCorrect ? 'Correct! 🎉' : `Incorrect. The answer was: ${this.currentQuestion.answer}`;
        feedbackEl.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    }
    
    showNextButton() {
        const nextBtn = document.getElementById('next-btn');
        nextBtn.classList.remove('hidden');
        
        // Auto-hide after a delay
        setTimeout(() => {
            nextBtn.classList.add('pulse');
        }, 300);
    }
    
    nextQuestion() {
        const nextBtn = document.getElementById('next-btn');
        nextBtn.classList.add('hidden');
        nextBtn.classList.remove('pulse');
        
        // For timed mode, reset the timer for the next question
        if (this.currentMode.id === 'timed') {
            this.timeLeft = this.currentMode.timePerQuestion || 30;
            this.updateTimerDisplay();
        }
        
        // Load the next question
        this.loadQuestion();
    }
    
    startTimer() {
        if (this.timer) clearInterval(this.timer);
        
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                this.handleTimeUp();
            }
        }, 1000);
    }
    
    updateTimerDisplay() {
        const timerEl = document.getElementById('timer');
        if (!timerEl) return;
        
        timerEl.textContent = `⏱️ ${this.timeLeft}s`;
        
        // Add warning when time is running low
        if (this.timeLeft <= 10) {
            timerEl.classList.add('warning');
            if (this.timeLeft <= 5) {
                gameSounds.play('tick');
            }
        } else {
            timerEl.classList.remove('warning');
        }
    }
    
    handleTimeUp() {
        if (this.currentMode.id === 'timed') {
            this.endGame();
        } else {
            this.handleIncorrectAnswer();
            this.showFeedback(false);
            this.showNextButton();
        }
    }
    
    shouldEndGame() {
        // End game conditions for different modes
        if (this.currentMode.id === 'timed' && this.timeLeft <= 0) {
            return true;
        }
        
        if (this.currentMode.id === 'endless' && this.lives <= 0) {
            return true;
        }
        
        // Add other end conditions for different modes
        
        return false;
    }
    
    endGame() {
        this.isGameActive = false;
        
        // Clear any active timers
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        // Play game over sound
        gameSounds.play('gameOver');
        
        // Show game over screen
        this.showGameOver();
        
        // Save score if user is logged in
        if (userManager.currentUser) {
            userManager.updateHighScore(this.currentMode.id, this.score);
        }
    }
    
    showGameOver() {
        // Hide game screen, show game over screen
        document.getElementById('game-screen').classList.add('hidden');
        
        const gameOverScreen = document.getElementById('game-over');
        const finalScoreEl = document.getElementById('final-score');
        const highScoreEl = document.getElementById('high-score');
        
        // Update scores
        finalScoreEl.textContent = this.score;
        
        // Get and display high score
        const highScore = userManager.currentUser?.highScores?.[this.currentMode.id] || 0;
        highScoreEl.textContent = highScore;
        
        // Show new high score message if applicable
        if (this.score > highScore) {
            document.getElementById('new-high-score').classList.remove('hidden');
        } else {
            document.getElementById('new-high-score').classList.add('hidden');
        }
        
        // Show the game over screen
        gameOverScreen.classList.remove('hidden');
    }
    
    updateQuestionInfo() {
        const infoEl = document.getElementById('question-info');
        if (!infoEl) return;
        
        let infoText = '';
        
        if (this.currentMode.id === 'timed') {
            infoText = `Time Left: ${this.timeLeft}s`;
        } else if (this.currentMode.id === 'endless') {
            infoText = `Lives: ${'❤️'.repeat(this.lives)} | Streak: ${this.streak}`;
        } else if (this.currentMode.id === 'practice') {
            infoText = `Practice Mode: ${this.currentCategory || 'Mixed'}`;
        } else {
            infoText = `Score: ${this.score} | Streak: ${this.streak}`;
        }
        
        infoEl.textContent = infoText;
    }
    
    updateStreakCounter() {
        const streakEl = document.getElementById('streak');
        if (!streakEl) return;
        
        streakEl.textContent = `🔥 ${this.streak}`;
        
        // Add animation for streaks of 3 or more
        if (this.streak >= 3) {
            streakEl.classList.add('hot-streak');
            if (this.streak % 3 === 0) {
                gameSounds.play('levelUp');
            }
        } else {
            streakEl.classList.remove('hot-streak');
        }
    }
}

// Create a singleton instance
export const gameEngine = new GameEngine();

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Make gameEngine globally available for debugging
    window.gameEngine = gameEngine;
});
