/**
 * SUNNY PANDA - Animated Vector Mascot System
 * Pure SVG + CSS animations for crisp visuals at any screen resolution
 */

class PandaMascot {
    constructor(containerId = 'panda-mascot-container') {
        this.container = document.getElementById(containerId);
        this.currentMood = 'idle';
        this.speechTimeout = null;
        this.init();
    }

    init() {
        if (!this.container) return;
        this.container.innerHTML = this.getSvgMarkup();
        this.bindEvents();
        this.startIdleAnimations();
    }

    getSvgMarkup() {
        return `
        <div class="panda-wrapper" id="panda-character" title="Chạm vào tớ để chơi đùa nha!">
            <!-- Speech Bubble -->
            <div class="panda-bubble" id="panda-bubble">
                <span class="bubble-en" id="bubble-en">Hello, Little Friend!</span>
                <span class="bubble-vn" id="bubble-vn">Chào bé yêu, mình cùng học nhé!</span>
            </div>

            <!-- SVG Panda Character -->
            <svg class="panda-svg" viewBox="0 0 200 220" width="100%" height="100%">
                <defs>
                    <radialGradient id="pandaCheekGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#ff7675" stop-opacity="0.8"/>
                        <stop offset="100%" stop-color="#ff7675" stop-opacity="0"/>
                    </radialGradient>
                    <filter id="pandaGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.15"/>
                    </filter>
                </defs>

                <!-- Shadow -->
                <ellipse cx="100" cy="205" rx="65" ry="12" fill="#000000" opacity="0.12" class="panda-ground-shadow"/>

                <!-- Body Group -->
                <g id="panda-body-group" filter="url(#pandaGlow)">
                    <!-- Feet -->
                    <ellipse cx="65" cy="195" rx="22" ry="15" fill="#2d3436" class="panda-foot foot-left"/>
                    <ellipse cx="135" cy="195" rx="22" ry="15" fill="#2d3436" class="panda-foot foot-right"/>
                    <!-- Foot pads -->
                    <ellipse cx="65" cy="197" rx="10" ry="7" fill="#636e72" opacity="0.4"/>
                    <ellipse cx="135" cy="197" rx="10" ry="7" fill="#636e72" opacity="0.4"/>

                    <!-- Main Body -->
                    <path d="M 50 130 C 40 185, 160 185, 150 130 C 145 105, 55 105, 50 130 Z" fill="#ffffff" stroke="#2d3436" stroke-width="4"/>
                    <!-- Black vest/shoulder band -->
                    <path d="M 46 125 C 40 155, 75 165, 100 165 C 125 165, 160 155, 154 125 C 140 110, 60 110, 46 125 Z" fill="#2d3436"/>
                    <!-- White belly patch -->
                    <ellipse cx="100" cy="148" rx="32" ry="24" fill="#ffffff"/>
                    <!-- Heart badge on belly -->
                    <path d="M 100 148 C 96 142, 88 142, 88 148 C 88 154, 100 162, 100 162 C 100 162, 112 154, 112 148 C 112 142, 104 142, 100 148 Z" fill="#ff7675" class="panda-heart"/>

                    <!-- Arms -->
                    <!-- Left arm (bamboo holder or wave) -->
                    <g id="panda-left-arm" class="panda-arm arm-left">
                        <ellipse cx="46" cy="132" rx="16" ry="26" transform="rotate(25 46 132)" fill="#2d3436"/>
                        <!-- Bamboo leaf / twig -->
                        <g id="panda-bamboo" class="panda-bamboo">
                            <rect x="25" y="90" width="6" height="50" rx="3" fill="#2ed573" transform="rotate(-15 28 115)"/>
                            <ellipse cx="20" cy="98" rx="12" ry="5" fill="#26af61" transform="rotate(-40 20 98)"/>
                            <ellipse cx="38" cy="92" rx="12" ry="5" fill="#26af61" transform="rotate(10 38 92)"/>
                        </g>
                    </g>
                    <!-- Right arm (waving) -->
                    <g id="panda-right-arm" class="panda-arm arm-right">
                        <ellipse cx="154" cy="130" rx="16" ry="26" transform="rotate(-25 154 130)" fill="#2d3436"/>
                    </g>

                    <!-- Head Group -->
                    <g id="panda-head-group">
                        <!-- Ears -->
                        <g class="panda-ear ear-left">
                            <circle cx="52" cy="46" r="24" fill="#2d3436"/>
                            <circle cx="52" cy="46" r="14" fill="#636e72" opacity="0.3"/>
                        </g>
                        <g class="panda-ear ear-right">
                            <circle cx="148" cy="46" r="24" fill="#2d3436"/>
                            <circle cx="148" cy="46" r="14" fill="#636e72" opacity="0.3"/>
                        </g>

                        <!-- Head Base -->
                        <ellipse cx="100" cy="80" rx="58" ry="50" fill="#ffffff" stroke="#2d3436" stroke-width="4"/>

                        <!-- Cheeks (Blushing) -->
                        <circle cx="58" cy="92" r="14" fill="url(#pandaCheekGrad)" class="panda-cheek"/>
                        <circle cx="142" cy="92" r="14" fill="url(#pandaCheekGrad)" class="panda-cheek"/>

                        <!-- Black Eye Patches -->
                        <!-- Left patch -->
                        <ellipse cx="72" cy="74" rx="18" ry="22" transform="rotate(-18 72 74)" fill="#2d3436"/>
                        <!-- Right patch -->
                        <ellipse cx="128" cy="74" rx="18" ry="22" transform="rotate(18 128 74)" fill="#2d3436"/>

                        <!-- Eyes (Normal / Blink) -->
                        <g id="panda-eyes-normal" class="panda-eyes">
                            <!-- Left eye -->
                            <circle cx="74" cy="74" r="8" fill="#ffffff"/>
                            <circle cx="75" cy="74" r="5" fill="#1e272e" class="pupil"/>
                            <circle cx="77" cy="71" r="2.5" fill="#ffffff"/>
                            <!-- Right eye -->
                            <circle cx="126" cy="74" r="8" fill="#ffffff"/>
                            <circle cx="125" cy="74" r="5" fill="#1e272e" class="pupil"/>
                            <circle cx="127" cy="71" r="2.5" fill="#ffffff"/>
                        </g>

                        <!-- Star Eyes (for Celebration/Cheering) -->
                        <g id="panda-eyes-stars" class="panda-eyes-stars" style="display:none;">
                            <text x="63" y="83" font-size="22" fill="#ffd32a">⭐</text>
                            <text x="115" y="83" font-size="22" fill="#ffd32a">⭐</text>
                        </g>

                        <!-- Cute Panda Nose -->
                        <ellipse cx="100" cy="86" rx="9" ry="6" fill="#2d3436"/>
                        <ellipse cx="100" cy="85" rx="3" ry="1.5" fill="#ffffff" opacity="0.6"/>

                        <!-- Mouth (Normal Smile) -->
                        <path id="panda-mouth-smile" d="M 92 92 Q 100 97 100 92 Q 100 97 108 92" fill="none" stroke="#2d3436" stroke-width="3" stroke-linecap="round"/>

                        <!-- Mouth (Open Happy / Talking / Eating) -->
                        <g id="panda-mouth-open" style="display:none;">
                            <path d="M 90 92 Q 100 112 110 92 Z" fill="#eb4d4b" stroke="#2d3436" stroke-width="2.5"/>
                            <ellipse cx="100" cy="100" rx="5" ry="3" fill="#ff7979"/>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
        `;
    }

    bindEvents() {
        const char = document.getElementById('panda-character');
        if (!char) return;

        char.addEventListener('click', () => {
            this.tickle();
        });
        char.addEventListener('touchstart', (e) => {
            // Prevent double trigger on mobile
            this.tickle();
        }, { passive: true });
    }

    startIdleAnimations() {
        // Random blinking every 3-5 seconds
        setInterval(() => {
            if (this.currentMood === 'idle') {
                this.blink();
            }
        }, 3500);

        // Random ear wiggle
        setInterval(() => {
            if (this.currentMood === 'idle' && Math.random() > 0.4) {
                this.wiggleEars();
            }
        }, 5000);
    }

    blink() {
        const eyes = document.getElementById('panda-eyes-normal');
        if (!eyes || eyes.style.display === 'none') return;
        eyes.classList.add('panda-blinking');
        setTimeout(() => {
            eyes.classList.remove('panda-blinking');
        }, 220);
    }

    wiggleEars() {
        const ears = document.querySelectorAll('.panda-ear');
        ears.forEach(e => e.classList.add('panda-ear-wiggle'));
        setTimeout(() => {
            ears.forEach(e => e.classList.remove('panda-ear-wiggle'));
        }, 600);
    }

    tickle() {
        if (window.pandaAudio) {
            window.pandaAudio.playSfx('tickle');
        }
        const phrases = [
            { en: "Hehe! That tickles! 🎋", vn: "Hihi! Nhột quá đi bé ơi! 🎋" },
            { en: "I love learning with you!", vn: "Tớ rất thích học cùng bé đó!" },
            { en: "Let's learn new words! ⭐", vn: "Mình cùng khám phá thêm từ mới nhé! ⭐" },
            { en: "You're doing great! 💖", vn: "Bé của tớ thông minh nhất trần đời! 💖" },
            { en: "Give me a high-five! 🐾", vn: "Đập tay với tớ nào bé ơi! 🐾" }
        ];
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        this.say(randomPhrase.en, randomPhrase.vn, 3000);

        const char = document.getElementById('panda-character');
        if (char) {
            char.classList.add('panda-tickled');
            setTimeout(() => char.classList.remove('panda-tickled'), 800);
        }
    }

    setMood(mood) {
        this.currentMood = mood;
        const char = document.getElementById('panda-character');
        const eyesNorm = document.getElementById('panda-eyes-normal');
        const eyesStar = document.getElementById('panda-eyes-stars');
        const mouthSmile = document.getElementById('panda-mouth-smile');
        const mouthOpen = document.getElementById('panda-mouth-open');

        if (!char) return;

        // Reset classes
        char.classList.remove('mood-cheer', 'mood-eat', 'mood-think', 'mood-talk', 'mood-bounce');

        if (mood === 'cheer') {
            char.classList.add('mood-cheer');
            if (eyesNorm) eyesNorm.style.display = 'none';
            if (eyesStar) eyesStar.style.display = 'block';
            if (mouthSmile) mouthSmile.style.display = 'none';
            if (mouthOpen) mouthOpen.style.display = 'block';
            this.spawnConfetti();
        } else if (mood === 'eat') {
            char.classList.add('mood-eat');
            if (eyesNorm) eyesNorm.style.display = 'block';
            if (eyesStar) eyesStar.style.display = 'none';
            if (mouthSmile) mouthSmile.style.display = 'none';
            if (mouthOpen) mouthOpen.style.display = 'block';
        } else if (mood === 'think') {
            char.classList.add('mood-think');
            if (eyesNorm) eyesNorm.style.display = 'block';
            if (eyesStar) eyesStar.style.display = 'none';
            if (mouthSmile) mouthSmile.style.display = 'block';
            if (mouthOpen) mouthOpen.style.display = 'none';
        } else if (mood === 'talk') {
            char.classList.add('mood-talk');
            if (mouthSmile) mouthSmile.style.display = 'none';
            if (mouthOpen) mouthOpen.style.display = 'block';
        } else {
            // Idle
            if (eyesNorm) eyesNorm.style.display = 'block';
            if (eyesStar) eyesStar.style.display = 'none';
            if (mouthSmile) mouthSmile.style.display = 'block';
            if (mouthOpen) mouthOpen.style.display = 'none';
        }
    }

    say(textEn, textVi, duration = 4000) {
        const bubble = document.getElementById('panda-bubble');
        const enSpan = document.getElementById('bubble-en');
        const vnSpan = document.getElementById('bubble-vn');

        if (!bubble || !enSpan || !vnSpan) return;

        enSpan.textContent = textEn || '';
        vnSpan.textContent = textVi || '';
        bubble.classList.add('show');

        if (this.speechTimeout) clearTimeout(this.speechTimeout);
        this.speechTimeout = setTimeout(() => {
            bubble.classList.remove('show');
            if (this.currentMood === 'talk') {
                this.setMood('idle');
            }
        }, duration);
    }

    spawnConfetti() {
        const colors = ['#ff4757', '#2ed573', '#ffa502', '#1e90ff', '#9b51e0', '#ff6b81', '#ffd32a'];
        const container = document.body;
        for (let i = 0; i < 35; i++) {
            const conf = document.createElement('div');
            conf.className = 'panda-confetti';
            conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            conf.style.left = (Math.random() * 80 + 10) + 'vw';
            conf.style.top = (Math.random() * 40 + 20) + 'vh';
            conf.style.transform = `scale(${Math.random() * 0.8 + 0.5}) rotate(${Math.random() * 360}deg)`;
            container.appendChild(conf);

            setTimeout(() => {
                conf.remove();
            }, 1800);
        }
    }
}
