import { getAvailableModes, getGameMode } from './gameModes.js';
import { userManager } from './auth.js';

export class GameModeManager {
    constructor() {
        this.currentMode = null;
        this.modes = getAvailableModes();
        this.initializeEventListeners();
        this.renderGameModes();
    }

    initializeEventListeners() {
        // Back button in practice categories screen
        document.getElementById('back-to-modes')?.addEventListener('click', () => {
            this.showScreen('game-selection');
        });
    }

    renderGameModes() {
        const container = document.querySelector('.game-modes');
        if (!container) return;

        container.innerHTML = `
            <div class="modes-grid">
                ${this.modes.map(mode => `
                    <div class="mode-card" data-mode="${mode.id}" tabindex="0">
                        <div class="card-content">
                            <div class="card-front">
                                <div class="emoji">${mode.icon}</div>
                                <h3>${mode.name}</h3>
                                <p>${mode.description}</p>
                                ${this.getModeBadges(mode)}
                            </div>
                            <div class="card-back">
                                <h3>${mode.name}</h3>
                                <p>Click to play ${mode.name.toLowerCase()} mode!</p>
                                ${mode.id === 'math' ? 
                                    `<div class="high-score">High Score: ${localStorage.getItem('highScores') ? JSON.parse(localStorage.getItem('highScores')).math || 0 : 0}</div>` : 
                                    ''}
                                <button class="play-btn">Play Now</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Add click handlers for mode cards and play buttons
        document.querySelectorAll('.mode-card').forEach(card => {
            const mode = card.dataset.mode;
            const playButton = card.querySelector('.play-btn');
            
            // Handle card click (flip)
            card.addEventListener('click', (e) => {
                // Don't flip back if clicking the play button
                if (e.target === playButton) return;
                card.querySelector('.card-content').classList.toggle('flipped');
            });
            
            // Handle play button click
            if (playButton) {
                playButton.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent card flip
                    this.onModeSelected(mode);
                });
            }
            
            // Show mode description on hover
            card.addEventListener('mouseenter', (e) => {
                const mode = getGameMode(e.currentTarget.dataset.mode);
                this.showModeDescription(mode);
            });
            
            // Add keyboard navigation
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (document.activeElement === card) {
                        card.querySelector('.card-content').classList.toggle('flipped');
                    }
                }
            });
        });
    }

    getModeBadges(mode) {
        const badges = [];
        
        // Add high score badge if user is logged in
        if (userManager.currentUser && mode.id in userManager.currentUser.highScores) {
            const score = userManager.currentUser.highScores[mode.id];
            if (score > 0) {
                badges.push(`<span class="badge">🏆 ${score}</span>`);
            }
        }

        // Add new badge for recently added modes
        if (['timed', 'endless', 'practice', 'multiplayer'].includes(mode.id)) {
            badges.push('<span class="badge new">NEW</span>');
        }

        return badges.length ? `<div class="mode-badges">${badges.join('')}</div>` : '';
    }

    showModeDescription(mode) {
        const descEl = document.getElementById('mode-description');
        if (!descEl) return;

        let html = `<h3>${mode.name} ${mode.icon}</h3>
                   <p>${mode.description}</p>`;
        
        // Add mode-specific details
        if (mode.levels) {
            html += `<p><strong>Levels:</strong> ${mode.levels}</p>`;
        }
        
        if (mode.timePerQuestion) {
            html += `<p><strong>Time per question:</strong> ${mode.timePerQuestion}s</p>`;
        }
        
        if (mode.timeLimit) {
            html += `<p><strong>Time limit:</strong> ${mode.timeLimit}s</p>`;
        }
        
        if (mode.lives) {
            html += `<p><strong>Lives:</strong> ${mode.lives}</p>`;
        }

        descEl.innerHTML = html;
    }

    onModeSelected(modeId) {
        const mode = getGameMode(modeId);
        if (!mode) return;

        this.currentMode = mode;

        // Special handling for practice mode (show categories)
        if (modeId === 'practice') {
            this.showPracticeCategories();
            return;
        }

        // Start the selected game mode
        this.startGameMode(modeId);
    }

    showPracticeCategories() {
        const container = document.querySelector('.category-grid');
        if (!container) return;

        const categories = this.currentMode.categories;
        container.innerHTML = Object.entries(categories).map(([id, cat]) => `
            <div class="category-btn" data-category="${id}">
                <span class="emoji">${cat.icon}</span>
                <span class="name">${cat.name}</span>
            </div>
        `).join('');

        // Add click handlers
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.startGameMode('practice', { category });
            });
        });

        this.showScreen('practice-categories');
    }

    startGameMode(modeId, options = {}) {
        // Bridge from mode cards to actual game screens implemented in index.html
        // Hide the mode selection screen
        const selection = document.getElementById('game-selection');
        if (selection) selection.classList.add('hidden');

        // Determine routing behavior
        switch (modeId) {
            case 'math':
            case 'timed':
            case 'endless':
            case 'mixed':
                // Use the existing global startGame('math') defined in index.html
                if (typeof window !== 'undefined' && typeof window.startGame === 'function') {
                    window.startGame('math');
                } else {
                    console.warn('startGame function not found on window.');
                }
                break;
            case 'spelling':
                // Navigate to dedicated spelling page
                window.location.href = 'spelling.html';
                break;
            case 'practice':
                // Already handled before calling startGameMode
                this.showPracticeCategories();
                break;
            default:
                console.log(`Mode ${modeId} not fully wired. Falling back to math.`);
                if (typeof window !== 'undefined' && typeof window.startGame === 'function') {
                    window.startGame('math');
                }
                break;
        }
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(el => {
            el.classList.add('hidden');
        });

        // Show the requested screen
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.remove('hidden');
        }
    }
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gameModeManager = new GameModeManager();
});
