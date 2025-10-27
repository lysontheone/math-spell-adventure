// Sound effects for the game
class GameSounds {
    constructor() {
        this.sounds = {
            correct: {
                url: 'https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3',
                audio: null
            },
            wrong: {
                url: 'https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3',
                audio: null
            },
            levelUp: {
                url: 'https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3',
                audio: null
            },
            click: {
                url: 'https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3',
                audio: null
            },
            gameOver: {
                url: 'https://assets.mixkit.co/sfx/preview/mixkit-retro-arcade-game-over-470.mp3',
                audio: null
            }
        };
        
        // Preload all sounds
        this.loadSounds();
    }
    
    loadSounds() {
        for (const [key, sound] of Object.entries(this.sounds)) {
            sound.audio = new Audio(sound.url);
            sound.audio.load();
        }
    }
    
    play(soundName) {
        const sound = this.sounds[soundName];
        if (sound && sound.audio) {
            // Create a new audio instance to allow overlapping sounds
            const audio = new Audio(sound.url);
            audio.volume = 0.5; // Set volume to 50%
            audio.play().catch(e => console.log("Audio play failed:", e));
        }
    }
}

// Create a global instance
const gameSounds = new GameSounds();
