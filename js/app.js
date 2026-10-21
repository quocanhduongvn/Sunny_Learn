/**
 * SUNNY PANDA - Main Application Controller
 * Handles Navigation, Gamification Stars, Settings, Parental Gate
 */

class SunnyPandaApp {
    constructor() {
        this.stars = 0;
        this.mascot = null;
        this.games = null;
        this.parentalAnswer = null;

        this.init();
    }

    init() {
        this.loadStars();
        this.mascot = new PandaMascot('panda-mascot-container');
        this.games = new PandaGamesManager(this);

        this.renderHome();
        this.updateStarDisplays();
        this.bindGlobalControls();

        // Welcome speech & audio unlock on first interaction
        const triggerWelcome = () => {
            if (!this.welcomed) {
                this.welcomed = true;
                const banner = document.getElementById('audio-starter-banner');
                if (banner) banner.style.display = 'none';

                if (window.pandaAudio) {
                    window.pandaAudio.unlockAudio();
                }
                if (this.mascot) {
                    this.mascot.say("Welcome! Let's learn English with Panda! 🎋", "Chào bé yêu! Cùng học tiếng Anh với Gấu nha!", 4000);
                }
            }
        };

        window.addEventListener('click', triggerWelcome, { once: true, passive: true });
        window.addEventListener('touchstart', triggerWelcome, { once: true, passive: true });
        window.addEventListener('pointerdown', triggerWelcome, { once: true, passive: true });

        window.startAudioExperience = () => {
            triggerWelcome();
            if (window.pandaAudio) {
                window.pandaAudio.speak("Hello baby! Let's play together!", "en");
            }
        };
    }

    loadStars() {
        try {
            const saved = localStorage.getItem('sunny_panda_stars');
            this.stars = saved ? parseInt(saved, 10) : 15; // Give 15 starter stars
        } catch (e) {
            this.stars = 15;
        }
    }

    saveStars() {
        try {
            localStorage.setItem('sunny_panda_stars', this.stars.toString());
        } catch (e) {}
    }

    addStars(amount) {
        this.stars += amount;
        this.saveStars();
        this.updateStarDisplays();

        // Animate floating star
        this.animateFloatingStar(amount);
    }

    animateFloatingStar(amount) {
        const starElem = document.createElement('div');
        starElem.className = 'star-burst-fly';
        starElem.innerHTML = `+${amount} ⭐`;
        starElem.style.left = '50%';
        starElem.style.top = '40%';
        document.body.appendChild(starElem);

        setTimeout(() => {
            starElem.remove();
        }, 1200);
    }

    updateStarDisplays() {
        const starDisplays = document.querySelectorAll('.star-count-badge');
        starDisplays.forEach(elem => {
            elem.textContent = this.stars;
        });
    }

    bindGlobalControls() {
        // BGM button
        const bgmBtn = document.getElementById('btn-bgm-toggle');
        if (bgmBtn && window.pandaAudio) {
            bgmBtn.onclick = () => {
                const isPlaying = window.pandaAudio.toggleBgm();
                bgmBtn.innerHTML = isPlaying ? '🎵 Nhạc: Bật' : '🔇 Nhạc: Tắt';
                bgmBtn.classList.toggle('btn-muted', !isPlaying);
            };
        }
    }

    showHome() {
        if (this.games) {
            this.games.stopBalloonGame();
            if (this.games.autoPlayTimer) clearTimeout(this.games.autoPlayTimer);
        }

        const homeArea = document.getElementById('home-area');
        const gameArea = document.getElementById('game-area');
        if (homeArea) homeArea.style.display = 'block';
        if (gameArea) {
            gameArea.style.display = 'none';
            gameArea.innerHTML = '';
        }

        if (this.mascot) {
            this.mascot.setMood('idle');
            this.mascot.say("Pick a fun game or topic, baby! 🐾", "Bé thích học chủ đề nào nè?");
        }
    }

    showGameArea() {
        const homeArea = document.getElementById('home-area');
        const gameArea = document.getElementById('game-area');
        if (homeArea) homeArea.style.display = 'none';
        if (gameArea) gameArea.style.display = 'block';
    }

    renderHome() {
        const container = document.getElementById('categories-container');
        if (!container) return;

        let html = '';
        PANDA_DATABASE.categories.forEach(cat => {
            html += `
            <div class="category-card" style="border-color:${cat.color}; background:${cat.bg};" onclick="sunnyApp.launchCategory('${cat.id}')">
                <div class="cat-icon-wrap" style="background:${cat.color};">
                    <span class="cat-icon">${cat.icon}</span>
                </div>
                <div class="cat-info">
                    <div class="cat-name-vn">${cat.name}</div>
                    <div class="cat-name-en">${cat.nameEn}</div>
                </div>
                <div class="cat-play-arrow">▶</div>
            </div>
            `;
        });

        container.innerHTML = html;
    }

    launchCategory(categoryId) {
        if (window.pandaAudio) window.pandaAudio.playSfx('pop');
        this.showGameArea();
        this.games.startFlashcards(categoryId);
    }

    launchRandomAll() {
        if (window.pandaAudio) window.pandaAudio.playSfx('pop');
        this.showGameArea();
        this.games.startFlashcards('random');
    }

    launchQuiz() {
        if (window.pandaAudio) window.pandaAudio.playSfx('pop');
        this.showGameArea();
        this.games.startQuiz('all');
    }

    launchFeedPanda() {
        if (window.pandaAudio) window.pandaAudio.playSfx('pop');
        this.showGameArea();
        this.games.startFeedPanda();
    }

    launchBalloon() {
        if (window.pandaAudio) window.pandaAudio.playSfx('pop');
        this.showGameArea();
        this.games.startBalloonPop();
    }

    launchMemory() {
        if (window.pandaAudio) window.pandaAudio.playSfx('pop');
        this.showGameArea();
        this.games.startMemoryMatch('animals');
    }

    launchSpeak() {
        if (window.pandaAudio) window.pandaAudio.playSfx('pop');
        this.showGameArea();
        this.games.startSpeakPractice();
    }

    launchStickerAlbum() {
        if (window.pandaAudio) window.pandaAudio.playSfx('pop');
        this.showGameArea();
        this.games.showStickerAlbum();
    }

    // ==========================================
    // PARENTAL GATE & SETTINGS
    // ==========================================

    openParentalGate() {
        const num1 = Math.floor(Math.random() * 5) + 2;
        const num2 = Math.floor(Math.random() * 5) + 1;
        this.parentalAnswer = num1 + num2;

        const questionElem = document.getElementById('gate-question');
        const inputElem = document.getElementById('gate-input');
        if (questionElem) questionElem.textContent = `${num1} + ${num2} = ?`;
        if (inputElem) {
            inputElem.value = '';
            inputElem.focus();
        }

        const modal = document.getElementById('parental-gate-modal');
        if (modal) modal.style.display = 'flex';
    }

    closeParentalGate() {
        const modal = document.getElementById('parental-gate-modal');
        if (modal) modal.style.display = 'none';
    }

    verifyParentalGate() {
        const inputElem = document.getElementById('gate-input');
        const val = parseInt(inputElem.value.trim(), 10);

        if (val === this.parentalAnswer) {
            this.closeParentalGate();
            this.openSettings();
        } else {
            alert('Câu trả lời chưa đúng. Chức năng này dành cho phụ huynh!');
            inputElem.value = '';
        }
    }

    openSettings() {
        const modal = document.getElementById('settings-modal');
        if (!modal) return;

        // Fill current settings
        const settings = window.pandaAudio.settings;
        document.getElementById('set-tts-engine').value = settings.ttsEngine || 'system';
        document.getElementById('set-speed').value = settings.speed || 0.9;
        document.getElementById('set-speed-val').textContent = settings.speed || 0.9;
        document.getElementById('set-edge-en').value = settings.edgeEn;
        document.getElementById('set-edge-vi').value = settings.edgeVi;

        this.updateSettingsEngineUI();
        modal.style.display = 'flex';
    }

    testAudioInSettings() {
        if (typeof playEnglishAudio === 'function') {
            playEnglishAudio("Apple");
            setTimeout(() => playEnglishAudio("Panda"), 1200);
        } else if (window.pandaAudio) {
            window.pandaAudio.speak("Apple", "en");
        }
    }

    updateSettingsEngineUI() {
        const engine = document.getElementById('set-tts-engine').value;
        const edgeGroup = document.getElementById('edge-settings-group');
        const sysGroup = document.getElementById('sys-settings-group');

        if (edgeGroup) edgeGroup.style.display = (engine === 'edge') ? 'block' : 'none';
        if (sysGroup) sysGroup.style.display = (engine === 'system') ? 'block' : 'none';
    }

    closeSettings() {
        const modal = document.getElementById('settings-modal');
        if (modal) modal.style.display = 'none';
    }

    saveSettings() {
        const engine = document.getElementById('set-tts-engine').value;
        const speed = parseFloat(document.getElementById('set-speed').value);
        const edgeEn = document.getElementById('set-edge-en').value;
        const edgeVi = document.getElementById('set-edge-vi').value;

        window.pandaAudio.settings.ttsEngine = engine;
        window.pandaAudio.settings.speed = speed;
        window.pandaAudio.settings.edgeEn = edgeEn;
        window.pandaAudio.settings.edgeVi = edgeVi;
        window.pandaAudio.saveSettings();

        this.closeSettings();
        if (this.mascot) {
            this.mascot.say("Settings updated! 🌟", "Đã lưu cài đặt phụ huynh!");
        }
        if (window.pandaAudio) {
            window.pandaAudio.speak("Settings saved!", "en");
        }
    }

    resetStars() {
        if (confirm("Ba mẹ có muốn đặt lại số ngôi sao của bé về 0 không?")) {
            this.stars = 0;
            this.saveStars();
            this.updateStarDisplays();
            alert("Đã đặt lại ngôi sao!");
        }
    }
}

// Global App Instance
let sunnyApp = null;
function initSunnyApp() {
    if (!window.sunnyApp) {
        sunnyApp = new SunnyPandaApp();
        window.sunnyApp = sunnyApp;
    }
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initSunnyApp);
} else {
    initSunnyApp();
}
