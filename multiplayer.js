import { gameEngine } from './gameEngine.js';
import { themeManager } from './themes.js';
import { userManager } from './auth.js';

class MultiplayerManager {
    constructor() {
        this.roomId = null;
        this.players = [];
        this.currentPlayer = null;
        this.gameState = 'waiting';
        this.currentRound = 0;
        this.maxRounds = 5;
        this.scores = {};
        this.initialize();
    }

    initialize() {
        console.log('Initializing multiplayer...');
        this.setupEventHandlers();
    }

    createRoom() {
        if (!userManager.isLoggedIn()) {
            alert('Please log in to create a multiplayer game');
            return false;
        }

        this.roomId = Math.random().toString(36).substr(2, 6).toUpperCase();
        this.addPlayer(userManager.currentUser, true);
        this.updateUI();
        return true;
    }

    joinRoom(roomId) {
        if (!userManager.isLoggedIn()) {
            alert('Please log in to join a multiplayer game');
            return false;
        }

        this.roomId = roomId.toUpperCase();
        this.addPlayer(userManager.currentUser, false);
        this.updateUI();
        return true;
    }

    addPlayer(user, isHost) {
        const player = {
            id: user.userId,
            username: user.username,
            avatar: user.avatar || themeManager.getCurrentAvatar().id,
            score: 0,
            isHost
        };
        
        this.players.push(player);
        this.scores[player.id] = 0;
        this.currentPlayer = player;
    }

    startGame() {
        if (!this.currentPlayer?.isHost) return;
        this.gameState = 'playing';
        this.currentRound = 1;
        this.startRound();
    }

    startRound() {
        if (this.currentRound > this.maxRounds) {
            this.endGame();
            return;
        }
        
        const question = this.generateQuestion();
        this.updateQuestionUI(question);
        this.updateUI();
    }

    generateQuestion() {
        const types = ['math', 'spelling'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        if (type === 'math') {
            const operations = ['+', '-', '×', '÷'];
            const operation = operations[Math.floor(Math.random() * operations.length)];
            let a, b, question, answer;
            
            switch(operation) {
                case '+':
                    a = Math.floor(Math.random() * 20) + 1;
                    b = Math.floor(Math.random() * 20) + 1;
                    question = `${a} + ${b} = ?`;
                    answer = (a + b).toString();
                    break;
                case '-':
                    a = Math.floor(Math.random() * 20) + 10;
                    b = Math.floor(Math.random() * 10) + 1;
                    question = `${a} - ${b} = ?`;
                    answer = (a - b).toString();
                    break;
                case '×':
                    a = Math.floor(Math.random() * 10) + 1;
                    b = Math.floor(Math.random() * 10) + 1;
                    question = `${a} × ${b} = ?`;
                    answer = (a * b).toString();
                    break;
                case '÷':
                    b = Math.floor(Math.random() * 5) + 1;
                    const multiple = Math.floor(Math.random() * 5) + 1;
                    a = b * multiple;
                    question = `${a} ÷ ${b} = ?`;
                    answer = multiple.toString();
                    break;
            }
            
            return {
                type: 'math',
                question: question,
                answer: answer,
                options: this.generateOptions(answer, 4)
            };
        } else {
            const words = [
                { word: 'elephant', hint: 'A large mammal with a trunk' },
                { word: 'umbrella', hint: 'Keeps you dry in the rain' },
                { word: 'butterfly', hint: 'An insect with colorful wings' },
                { word: 'chocolate', hint: 'A sweet brown food' },
                { word: 'mountain', hint: 'A large natural elevation' }
            ];
            
            const word = words[Math.floor(Math.random() * words.length)];
            
            return {
                type: 'spelling',
                question: `Spell the word: ${word.hint}`,
                answer: word.word,
                hint: word.word[0] + '_'.repeat(word.word.length - 1)
            };
        }
    }

    generateOptions(correctAnswer, count) {
        const options = new Set([correctAnswer]);
        const answerNum = parseInt(correctAnswer, 10);
        
        while (options.size < count) {
            const offset = Math.floor(Math.random() * 10) + 1;
            const sign = Math.random() > 0.5 ? 1 : -1;
            const wrongAnswer = (answerNum + (sign * offset)).toString();
            if (parseInt(wrongAnswer, 10) > 0) {
                options.add(wrongAnswer);
            }
        }
        
        return Array.from(options).sort(() => Math.random() - 0.5);
    }

    submitAnswer(answer) {
        if (this.gameState !== 'playing') return;
        
        const isCorrect = this.checkAnswer(answer);
        const points = isCorrect ? 10 : 0;
        
        this.scores[this.currentPlayer.id] += points;
        this.currentPlayer.score = this.scores[this.currentPlayer.id];
        
        this.updateScoreUI();
        this.showAnswerFeedback(isCorrect);
        
        // Move to next round after delay
        setTimeout(() => {
            this.currentRound++;
            this.startRound();
        }, 2000);
    }

    checkAnswer(answer) {
        return answer.toLowerCase().trim() === this.currentQuestion?.answer.toLowerCase();
    }

    endGame() {
        this.gameState = 'finished';
        this.showFinalResults();
    }

    updateUI() {
        this.updatePlayerList();
        this.updateScoreUI();
        this.updateGameStateUI();
    }
    
    updatePlayerList() {
        const playerList = document.getElementById('player-list');
        if (!playerList) return;
        
        playerList.innerHTML = this.players.map(player => `
            <div class="player-card ${player.id === this.currentPlayer?.id ? 'current-player' : ''}">
                <div class="player-avatar">${this.getAvatarEmoji(player.avatar)}</div>
                <div class="player-name">${player.username} ${player.isHost ? '👑' : ''}</div>
                <div class="player-score">${player.score} pts</div>
            </div>
        `).join('');
    }
    
    updateScoreUI() {
        const scoreElements = document.querySelectorAll('.score-display');
        scoreElements.forEach(el => {
            el.textContent = this.currentPlayer?.score || 0;
        });
    }
    
    updateGameStateUI() {
        const waitingScreen = document.getElementById('waiting-screen');
        const gameScreen = document.getElementById('game-screen');
        const gameOverScreen = document.getElementById('game-over-screen');
        
        if (!waitingScreen || !gameScreen || !gameOverScreen) return;
        
        waitingScreen.classList.toggle('hidden', this.gameState !== 'waiting');
        gameScreen.classList.toggle('hidden', this.gameState !== 'playing');
        gameOverScreen.classList.toggle('hidden', this.gameState !== 'finished');
    }
    
    updateQuestionUI(question) {
        this.currentQuestion = question;
        const questionEl = document.getElementById('question');
        const optionsEl = document.getElementById('options');
        
        if (!questionEl || !optionsEl) return;
        
        questionEl.textContent = question.question;
        optionsEl.innerHTML = '';
        
        if (question.type === 'math') {
            question.options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'option-btn';
                button.textContent = option;
                button.onclick = () => this.submitAnswer(option);
                optionsEl.appendChild(button);
            });
        } else {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Type your answer...';
            
            const button = document.createElement('button');
            button.textContent = 'Submit';
            button.onclick = () => this.submitAnswer(input.value);
            
            optionsEl.appendChild(input);
            optionsEl.appendChild(button);
        }
    }
    
    showAnswerFeedback(isCorrect) {
        const feedbackEl = document.getElementById('feedback');
        if (!feedbackEl) return;
        
        feedbackEl.textContent = isCorrect ? 'Correct! 🎉' : 'Incorrect!';
        feedbackEl.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    }
    
    showFinalResults() {
        const resultsEl = document.getElementById('final-results');
        if (!resultsEl) return;
        
        const sortedPlayers = [...this.players].sort((a, b) => b.score - a.score);
        
        resultsEl.innerHTML = `
            <h3>Game Over!</h3>
            <div class="leaderboard">
                ${sortedPlayers.map((player, index) => `
                    <div class="leaderboard-item ${player.id === this.currentPlayer?.id ? 'current-player' : ''}">
                        <span class="rank">#${index + 1}</span>
                        <span class="avatar">${this.getAvatarEmoji(player.avatar)}</span>
                        <span class="name">${player.username}</span>
                        <span class="score">${player.score} pts</span>
                    </div>
                `).join('')}
            </div>
            <button id="play-again-btn" class="btn primary">Play Again</button>
            <button id="back-to-menu" class="btn secondary">Back to Menu</button>
        `;
        
        document.getElementById('play-again-btn')?.addEventListener('click', () => this.startGame());
        document.getElementById('back-to-menu')?.addEventListener('click', () => this.returnToMenu());
    }
    
    returnToMenu() {
        // Reset game state
        this.gameState = 'waiting';
        this.currentRound = 0;
        this.players.forEach(player => {
            player.score = 0;
            this.scores[player.id] = 0;
        });
        
        this.updateUI();
    }
    
    getAvatarEmoji(avatarId) {
        const avatar = themeManager.avatars.find(a => a.id === avatarId);
        return avatar ? avatar.emoji : '👤';
    }
    
    setupEventHandlers() {
        // In a real implementation, this would set up WebSocket event handlers
        console.log('Setting up multiplayer event handlers...');
    }
}

// Create a singleton instance
export const multiplayerManager = new MultiplayerManager();

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Make multiplayer manager globally available for debugging
    window.multiplayer = multiplayerManager;
});
