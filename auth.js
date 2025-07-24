// User Authentication and Data Management
class UserManager {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('mathSpellUsers')) || [];
    }

    // User registration
    register(username, password) {
        if (this.users.some(u => u.username === username)) {
            return { success: false, message: 'Username already exists' };
        }

        const newUser = {
            id: Date.now().toString(),
            username,
            password: this._hashPassword(password),
            highScores: {
                math: 0,
                spelling: 0
            },
            progress: {
                math: { level: 1, completedLevels: [] },
                spelling: { level: 1, completedLevels: [] }
            },
            achievements: [],
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        this._saveUsers();
        this.currentUser = newUser;
        return { success: true, user: { ...newUser } };
    }

    // User login
    login(username, password) {
        const user = this.users.find(u => u.username === username && u.password === this._hashPassword(password));
        if (user) {
            this.currentUser = user;
            return { success: true, user: { ...user } };
        }
        return { success: false, message: 'Invalid username or password' };
    }

    // Logout current user
    logout() {
        this.currentUser = null;
        return { success: true };
    }

    // Update user progress
    updateProgress(gameMode, level, score) {
        if (!this.currentUser) return { success: false, message: 'Not logged in' };

        const user = this.users.find(u => u.id === this.currentUser.id);
        if (!user) return { success: false, message: 'User not found' };

        // Update high score if current score is higher
        if (score > user.highScores[gameMode]) {
            user.highScores[gameMode] = score;
        }

        // Update level progress
        if (!user.progress[gameMode].completedLevels.includes(level)) {
            user.progress[gameMode].completedLevels.push(level);
            user.progress[gameMode].level = Math.max(user.progress[gameMode].level, level + 1);
        }

        // Check for achievements
        this._checkAchievements(user);

        this._saveUsers();
        this.currentUser = user;
        return { success: true, user: { ...user } };
    }

    // Check and award achievements
    _checkAchievements(user) {
        const achievements = [];
        
        // Math Master achievement
        if (user.highScores.math >= 1000 && !user.achievements.includes('math_master')) {
            achievements.push('math_master');
        }
        
        // Spelling Bee Champion achievement
        if (user.highScores.spelling >= 1000 && !user.achievements.includes('spelling_champion')) {
            achievements.push('spelling_champion');
        }
        
        // Add any new achievements
        if (achievements.length > 0) {
            user.achievements = [...new Set([...user.achievements, ...achievements])];
            return achievements;
        }
        
        return [];
    }

    // Helper method to hash passwords (in a real app, use a proper hashing library)
    _hashPassword(password) {
        // This is a simple hash for demonstration purposes
        // In production, use a proper hashing algorithm like bcrypt
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }

    // Save users to localStorage
    _saveUsers() {
        localStorage.setItem('mathSpellUsers', JSON.stringify(this.users));
    }
}

// Create a singleton instance
export const userManager = new UserManager();

// Auth UI Components
export function showAuthModal() {
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-container">
            <div class="auth-tabs">
                <button class="auth-tab active" data-tab="login">Login</button>
                <button class="auth-tab" data-tab="register">Register</button>
            </div>
            
            <div id="login-form" class="auth-form">
                <input type="text" id="login-username" placeholder="Username" required>
                <input type="password" id="login-password" placeholder="Password" required>
                <button id="login-btn">Login</button>
            </div>
            
            <div id="register-form" class="auth-form" style="display: none;">
                <input type="text" id="register-username" placeholder="Choose a username" required>
                <input type="password" id="register-password" placeholder="Choose a password" required>
                <input type="password" id="confirm-password" placeholder="Confirm password" required>
                <button id="register-btn">Create Account</button>
            </div>
            
            <div id="auth-message"></div>
            <button class="close-auth">×</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const tabName = e.target.dataset.tab;
            modal.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            document.getElementById('login-form').style.display = tabName === 'login' ? 'block' : 'none';
            document.getElementById('register-form').style.display = tabName === 'register' ? 'block' : 'none';
        });
    });
    
    // Login handler
    document.getElementById('login-btn').addEventListener('click', () => {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const result = userManager.login(username, password);
        
        const messageEl = document.getElementById('auth-message');
        if (result.success) {
            messageEl.textContent = 'Login successful!';
            messageEl.className = 'success';
            setTimeout(() => {
                modal.remove();
                updateUserUI();
            }, 1000);
        } else {
            messageEl.textContent = result.message || 'Login failed';
            messageEl.className = 'error';
        }
    });
    
    // Register handler
    document.getElementById('register-btn').addEventListener('click', () => {
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (password !== confirmPassword) {
            const messageEl = document.getElementById('auth-message');
            messageEl.textContent = 'Passwords do not match';
            messageEl.className = 'error';
            return;
        }
        
        const result = userManager.register(username, password);
        const messageEl = document.getElementById('auth-message');
        
        if (result.success) {
            messageEl.textContent = 'Registration successful! Please login.';
            messageEl.className = 'success';
            // Switch to login tab
            document.querySelector('.auth-tab[data-tab="login"]').click();
        } else {
            messageEl.textContent = result.message || 'Registration failed';
            messageEl.className = 'error';
        }
    });
    
    // Close modal
    modal.querySelector('.close-auth').addEventListener('click', () => {
        modal.remove();
    });
}

// Update UI based on auth state
export function updateUserUI() {
    const user = userManager.currentUser;
    const authButton = document.getElementById('auth-button') || createAuthButton();
    
    if (user) {
        authButton.innerHTML = `
            <span class="user-greeting">Hi, ${user.username}!</span>
            <button id="logout-btn">Logout</button>
            <div class="user-menu">
                <div class="user-stats">
                    <div>Math High Score: ${user.highScores.math}</div>
                    <div>Spelling High Score: ${user.highScores.spelling}</div>
                </div>
                ${user.achievements.length > 0 ? 
                    `<div class="user-achievements">
                        <strong>Achievements:</strong>
                        <div>${user.achievements.map(a => `<span class="achievement">${a}</span>`).join('')}</div>
                    </div>` : ''
                }
            </div>
        `;
        
        document.getElementById('logout-btn')?.addEventListener('click', () => {
            userManager.logout();
            updateUserUI();
        });
    } else {
        authButton.innerHTML = '<button id="login-btn">Login / Register</button>';
        document.getElementById('login-btn')?.addEventListener('click', showAuthModal);
    }
}

// Create auth button if it doesn't exist
function createAuthButton() {
    const header = document.querySelector('.header');
    if (!header) return null;
    
    const authButton = document.createElement('div');
    authButton.id = 'auth-button';
    authButton.className = 'auth-button';
    header.appendChild(authButton);
    
    return authButton;
}

// Initialize auth system
document.addEventListener('DOMContentLoaded', () => {
    // Add auth button to header
    const authButton = createAuthButton();
    if (authButton) {
        updateUserUI();
    }
});
