// Theme management for Math & Spell Adventure
export class ThemeManager {
    constructor() {
        this.themes = {
            light: {
                name: 'Light',
                colors: {
                    primary: '#4a6baf',
                    primaryLight: '#6a8ad4',
                    primaryDark: '#2c4b8a',
                    secondary: '#f4a261',
                    secondaryLight: '#f7c8a0',
                    secondaryDark: '#e76f51',
                    background: '#f8f9fa',
                    surface: '#ffffff',
                    text: '#2d3436',
                    textLight: '#636e72',
                    error: '#e74c3c',
                    success: '#2ecc71',
                    warning: '#f39c12',
                    info: '#3498db',
                    border: '#dfe6e9',
                    shadow: 'rgba(0, 0, 0, 0.1)'
                },
                isDark: false
            },
            dark: {
                name: 'Dark',
                colors: {
                    primary: '#6a8ad4',
                    primaryLight: '#8aa9f5',
                    primaryDark: '#4a6baf',
                    secondary: '#f4a261',
                    secondaryLight: '#f7c8a0',
                    secondaryDark: '#e76f51',
                    background: '#1a1a2e',
                    surface: '#16213e',
                    text: '#f8f9fa',
                    textLight: '#b8c2cc',
                    error: '#ff6b6b',
                    success: '#6bff6b',
                    warning: '#ffd166',
                    info: '#4cc9f0',
                    border: '#2d3748',
                    shadow: 'rgba(0, 0, 0, 0.3)'
                },
                isDark: true
            },
            nature: {
                name: 'Nature',
                colors: {
                    primary: '#2a9d8f',
                    primaryLight: '#44c1b3',
                    primaryDark: '#1d7b70',
                    secondary: '#e9c46a',
                    secondaryLight: '#f4e3b8',
                    secondaryDark: '#d4a81f',
                    background: '#f8f9fa',
                    surface: '#ffffff',
                    text: '#264653',
                    textLight: '#5c7a85',
                    error: '#e76f51',
                    success: '#2a9d8f',
                    warning: '#e9c46a',
                    info: '#3a86ff',
                    border: '#e2e8f0',
                    shadow: 'rgba(0, 0, 0, 0.1)'
                },
                isDark: false
            },
            sunset: {
                name: 'Sunset',
                colors: {
                    primary: '#ff7e5f',
                    primaryLight: '#ff9e8a',
                    primaryDark: '#e65f3e',
                    secondary: '#feb47b',
                    secondaryLight: '#ffd0b0',
                    secondaryDark: '#fc8c3f',
                    background: '#2d3436',
                    surface: '#3a3f4b',
                    text: '#f8f9fa',
                    textLight: '#b8c2cc',
                    error: '#ff6b6b',
                    success: '#6bff6b',
                    warning: '#ffd166',
                    info: '#4cc9f0',
                    border: '#4a4f5b',
                    shadow: 'rgba(0, 0, 0, 0.3)'
                },
                isDark: true
            },
            ocean: {
                name: 'Ocean',
                colors: {
                    primary: '#3a86ff',
                    primaryLight: '#6ba4ff',
                    primaryDark: '#1a68e6',
                    secondary: '#4cc9f0',
                    secondaryLight: '#8fd8f5',
                    secondaryDark: '#1e9ec4',
                    background: '#f0f8ff',
                    surface: '#ffffff',
                    text: '#1a365d',
                    textLight: '#4a5568',
                    error: '#ef476f',
                    success: '#06d6a0',
                    warning: '#ffd166',
                    info: '#118ab2',
                    border: '#e2e8f0',
                    shadow: 'rgba(0, 0, 0, 0.1)'
                },
                isDark: false
            },
            midnight: {
                name: 'Midnight',
                colors: {
                    primary: '#6c5ce7',
                    primaryLight: '#a29bfe',
                    primaryDark: '#5d3af2',
                    secondary: '#a55eea',
                    secondaryLight: '#d0b3f5',
                    secondaryDark: '#8c4bd9',
                    background: '#1a1a2e',
                    surface: '#16213e',
                    text: '#f8f9fa',
                    textLight: '#b8c2cc',
                    error: '#ff6b6b',
                    success: '#6bff6b',
                    warning: '#ffd166',
                    info: '#4cc9f0',
                    border: '#2d3748',
                    shadow: 'rgba(0, 0, 0, 0.3)'
                },
                isDark: true
            }
        };

        this.avatars = [
            { id: 'penguin', emoji: '🐧', name: 'Penguin' },
            { id: 'owl', emoji: '🦉', name: 'Owl' },
            { id: 'fox', emoji: '🦊', name: 'Fox' },
            { id: 'tiger', emoji: '🐯', name: 'Tiger' },
            { id: 'panda', emoji: '🐼', name: 'Panda' },
            { id: 'dino', emoji: '🦖', name: 'Dino' },
            { id: 'unicorn', emoji: '🦄', name: 'Unicorn' },
            { id: 'robot', emoji: '🤖', name: 'Robot' },
            { id: 'alien', emoji: '👽', name: 'Alien' },
            { id: 'wizard', emoji: '🧙', name: 'Wizard' },
            { id: 'ninja', emoji: '🥷', name: 'Ninja' },
            { id: 'astronaut', emoji: '🧑‍🚀', name: 'Astronaut' }
        ];

        this.backgrounds = [
            { id: 'default', name: 'Default', class: 'bg-default' },
            { id: 'grid', name: 'Grid', class: 'bg-grid' },
            { id: 'dots', name: 'Dots', class: 'bg-dots' },
            { id: 'lines', name: 'Lines', class: 'bg-lines' },
            { id: 'stars', name: 'Stars', class: 'bg-stars' },
            { id: 'math', name: 'Math', class: 'bg-math' },
            { id: 'letters', name: 'Letters', class: 'bg-letters' },
            { id: 'gradient', name: 'Gradient', class: 'bg-gradient' },
            { id: 'geometric', name: 'Geometric', class: 'bg-geometric' },
            { id: 'watercolor', name: 'Watercolor', class: 'bg-watercolor' }
        ];

        this.currentTheme = 'light';
        this.currentBackground = 'default';
        this.userAvatar = this.avatars[Math.floor(Math.random() * this.avatars.length)].id;
        this.opponentAvatar = this.avatars[Math.floor(Math.random() * this.avatars.length)].id;
        
        // Load saved preferences
        this.loadPreferences();
    }

    loadPreferences() {
        const savedTheme = localStorage.getItem('theme');
        const savedBackground = localStorage.getItem('background');
        const savedAvatar = localStorage.getItem('avatar');
        
        if (savedTheme && this.themes[savedTheme]) {
            this.currentTheme = savedTheme;
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.currentTheme = 'dark';
        }
        
        if (savedBackground && this.backgrounds.some(bg => bg.id === savedBackground)) {
            this.currentBackground = savedBackground;
        }
        
        if (savedAvatar && this.avatars.some(av => av.id === savedAvatar)) {
            this.userAvatar = savedAvatar;
        }
        
        this.applyTheme();
        this.applyBackground();
    }

    savePreferences() {
        localStorage.setItem('theme', this.currentTheme);
        localStorage.setItem('background', this.currentBackground);
        localStorage.setItem('avatar', this.userAvatar);
    }

    setTheme(themeId) {
        if (this.themes[themeId]) {
            this.currentTheme = themeId;
            this.applyTheme();
            this.savePreferences();
            return true;
        }
        return false;
    }

    setBackground(backgroundId) {
        if (this.backgrounds.some(bg => bg.id === backgroundId)) {
            this.currentBackground = backgroundId;
            this.applyBackground();
            this.savePreferences();
            return true;
        }
        return false;
    }

    setAvatar(avatarId) {
        if (this.avatars.some(av => av.id === avatarId)) {
            this.userAvatar = avatarId;
            this.savePreferences();
            this.updateAvatarElements();
            return true;
        }
        return false;
    }

    applyTheme() {
        const theme = this.themes[this.currentTheme];
        if (!theme) return;

        // Update CSS variables
        const root = document.documentElement;
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });

        // Update dark/light mode class
        if (theme.isDark) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }

        // Update theme color meta tag
        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (themeColor) {
            themeColor.content = theme.colors.primary;
        }
    }

    applyBackground() {
        // Remove all background classes
        document.body.classList.remove(
            'bg-default', 'bg-grid', 'bg-dots', 'bg-lines', 'bg-stars',
            'bg-math', 'bg-letters', 'bg-gradient', 'bg-geometric', 'bg-watercolor'
        );
        
        // Add the current background class
        const background = this.backgrounds.find(bg => bg.id === this.currentBackground);
        if (background) {
            document.body.classList.add(background.class);
        }
    }

    updateAvatarElements() {
        // Update avatar in the UI
        const avatarElements = document.querySelectorAll('.user-avatar');
        const avatar = this.avatars.find(av => av.id === this.userAvatar);
        
        if (avatar) {
            avatarElements.forEach(el => {
                el.textContent = avatar.emoji;
                el.setAttribute('title', avatar.name);
            });
        }
    }

    getCurrentTheme() {
        return {
            ...this.themes[this.currentTheme],
            id: this.currentTheme
        };
    }

    getThemes() {
        return Object.entries(this.themes).map(([id, theme]) => ({
            id,
            ...theme
        }));
    }

    getBackgrounds() {
        return [...this.backgrounds];
    }

    getAvatars() {
        return [...this.avatars];
    }

    getCurrentAvatar() {
        return this.avatars.find(av => av.id === this.userAvatar) || this.avatars[0];
    }

    getOpponentAvatar() {
        return this.avatars.find(av => av.id === this.opponentAvatar) || this.avatars[1];
    }
}

// Create a singleton instance
export const themeManager = new ThemeManager();

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    themeManager.applyTheme();
    themeManager.applyBackground();
    themeManager.updateAvatarElements();
    
    // Make theme manager globally available for debugging
    window.themeManager = themeManager;
});
