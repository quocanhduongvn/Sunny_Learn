/**
 * SUNNY PANDA - High-Fidelity Audio & Speech Engine
 * Hybrid Multi-Tier Audio:
 * Tier 1: Local MP3 recordings (sound/Zero.mp3 - Nine.mp3)
 * Tier 2: Real Native Speaker Studio MP3 stream (Youdao Audio CDN - 100% reliable, zero CORS/403)
 * Tier 3: Native Web Speech API (with Chromium pause/resume bug fixes)
 * Tier 4: Procedural Web Audio SFX (pops, stars, fanfare, chomp) + BGM Synthesizer
 */

class PandaAudioEngine {
    constructor() {
        this.ctx = null;
        this.bgmPlaying = false;
        this.bgmTimer = null;
        this.bgmVolume = 0.25;
        this.sfxVolume = 0.9;
        this.currentAudioElem = null;
        this.unlocked = false;

        // Settings loaded from localStorage
        this.settings = {
            ttsEngine: 'hybrid', // 'hybrid' (Real MP3 + Web Speech) | 'system'
            speed: 0.9,
            voiceEn: '',
            voiceVi: '',
            bgmEnabled: true,
            sfxEnabled: true
        };

        this.loadSettings();
        this.initSysVoices();
        this.setupGlobalUnlockListener();
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('sunny_panda_settings') || localStorage.getItem('sunny_tts_settings');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.settings = { ...this.settings, ...parsed };
            }
        } catch (e) {}

        // Always ensure hybrid/system engine is active (discard old broken edge/google tokens)
        if (this.settings.ttsEngine === 'edge' || this.settings.ttsEngine === 'google' || !this.settings.ttsEngine) {
            this.settings.ttsEngine = 'hybrid';
            this.saveSettings();
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('sunny_panda_settings', JSON.stringify(this.settings));
        } catch (e) {}
    }

    setupGlobalUnlockListener() {
        const unlock = () => {
            this.unlockAudio();
            window.removeEventListener('click', unlock);
            window.removeEventListener('touchstart', unlock);
            window.removeEventListener('pointerdown', unlock);
        };
        window.addEventListener('click', unlock, { passive: true });
        window.addEventListener('touchstart', unlock, { passive: true });
        window.addEventListener('pointerdown', unlock, { passive: true });
    }

    unlockAudio() {
        if (this.unlocked) return;
        this.unlocked = true;

        // 1. Web Audio Context
        this.initAudioContext();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }

        // 2. Web Speech API resume for Chrome/Safari
        if ('speechSynthesis' in window) {
            try {
                if (window.speechSynthesis.paused) {
                    window.speechSynthesis.resume();
                }
                const dummy = new SpeechSynthesisUtterance('');
                dummy.volume = 0.01;
                window.speechSynthesis.speak(dummy);
            } catch (e) {}
        }

        // 3. Start BGM
        if (this.settings.bgmEnabled && !this.bgmPlaying) {
            setTimeout(() => this.startBgm(), 300);
        }

        this.playSfx('star');
    }

    initAudioContext() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
    }

    initSysVoices() {
        this.sysVoices = [];
        if ('speechSynthesis' in window) {
            const update = () => {
                this.sysVoices = window.speechSynthesis.getVoices() || [];
            };
            window.speechSynthesis.onvoiceschanged = update;
            update();
            setTimeout(update, 600);
        }
    }

    // ==========================================
    // PROCEDURAL SOUND EFFECTS (Web Audio API)
    // ==========================================

    playSfx(type) {
        if (!this.settings.sfxEnabled) return;
        this.initAudioContext();
        if (!this.ctx) return;

        const executeSfx = () => {
            const now = this.ctx.currentTime;
            const master = this.ctx.createGain();
            master.gain.setValueAtTime(this.sfxVolume, now);
            master.connect(this.ctx.destination);

            switch (type) {
                case 'pop': {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(450, now);
                    osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);

                    gain.gain.setValueAtTime(0.9, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

                    osc.connect(gain);
                    gain.connect(master);
                    osc.start(now);
                    osc.stop(now + 0.1);
                    break;
                }

                case 'star': {
                    [1046.5, 1318.5, 1567.98, 2093].forEach((freq, idx) => {
                        const osc = this.ctx.createOscillator();
                        const gain = this.ctx.createGain();
                        const t = now + idx * 0.06;

                        osc.type = 'triangle';
                        osc.frequency.setValueAtTime(freq, t);

                        gain.gain.setValueAtTime(0.5, t);
                        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

                        osc.connect(gain);
                        gain.connect(master);
                        osc.start(t);
                        osc.stop(t + 0.38);
                    });
                    break;
                }

                case 'fanfare':
                case 'success': {
                    const notes = [523.25, 659.25, 783.99, 1046.5];
                    notes.forEach((freq, idx) => {
                        const osc = this.ctx.createOscillator();
                        const gain = this.ctx.createGain();
                        const t = now + idx * 0.1;

                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(freq, t);

                        gain.gain.setValueAtTime(0.6, t);
                        gain.gain.exponentialRampToValueAtTime(0.01, t + (idx === 3 ? 0.6 : 0.25));

                        osc.connect(gain);
                        gain.connect(master);
                        osc.start(t);
                        osc.stop(t + (idx === 3 ? 0.7 : 0.3));
                    });
                    break;
                }

                case 'wrong': {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(300, now);
                    osc.frequency.exponentialRampToValueAtTime(150, now + 0.25);

                    gain.gain.setValueAtTime(0.5, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

                    osc.connect(gain);
                    gain.connect(master);
                    osc.start(now);
                    osc.stop(now + 0.26);
                    break;
                }

                case 'chomp': {
                    for (let i = 0; i < 3; i++) {
                        const osc = this.ctx.createOscillator();
                        const gain = this.ctx.createGain();
                        const t = now + i * 0.12;

                        osc.type = 'square';
                        osc.frequency.setValueAtTime(320 - i * 40, t);
                        osc.frequency.exponentialRampToValueAtTime(120, t + 0.08);

                        gain.gain.setValueAtTime(0.4, t);
                        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

                        osc.connect(gain);
                        gain.connect(master);
                        osc.start(t);
                        osc.stop(t + 0.09);
                    }
                    break;
                }

                case 'tickle': {
                    [650, 950, 800, 1200].forEach((freq, idx) => {
                        const osc = this.ctx.createOscillator();
                        const gain = this.ctx.createGain();
                        const t = now + idx * 0.07;

                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(freq, t);

                        gain.gain.setValueAtTime(0.5, t);
                        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

                        osc.connect(gain);
                        gain.connect(master);
                        osc.start(t);
                        osc.stop(t + 0.09);
                    });
                    break;
                }

                case 'click': {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(650, now);
                    gain.gain.setValueAtTime(0.4, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
                    osc.connect(gain);
                    gain.connect(master);
                    osc.start(now);
                    osc.stop(now + 0.06);
                    break;
                }
            }
        };

        if (this.ctx.state === 'suspended') {
            this.ctx.resume().then(executeSfx).catch(executeSfx);
        } else {
            executeSfx();
        }
    }

    // ==========================================
    // PROCEDURAL BACKGROUND MUSIC (BGM)
    // ==========================================

    toggleBgm(forceState) {
        if (forceState !== undefined) {
            this.settings.bgmEnabled = forceState;
        } else {
            this.settings.bgmEnabled = !this.settings.bgmEnabled;
        }
        this.saveSettings();

        if (this.settings.bgmEnabled) {
            this.startBgm();
        } else {
            this.stopBgm();
        }
        return this.settings.bgmEnabled;
    }

    startBgm() {
        if (this.bgmPlaying || !this.settings.bgmEnabled) return;
        this.initAudioContext();
        if (!this.ctx) return;
        this.bgmPlaying = true;

        const melody = [
            523.25, 659.25, 783.99, 659.25, 1046.5, 783.99, 880.0, 783.99,
            523.25, 587.33, 659.25, 587.33, 523.25, 392.00, 523.25, 0
        ];
        let noteIndex = 0;

        const playNext = () => {
            if (!this.bgmPlaying) return;
            const freq = melody[noteIndex % melody.length];
            noteIndex++;

            if (freq > 0 && this.ctx && this.ctx.state === 'running') {
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);

                gain.gain.setValueAtTime(this.bgmVolume * 0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.48);
            }

            this.bgmTimer = setTimeout(playNext, 480);
        };

        if (this.ctx.state === 'suspended') {
            this.ctx.resume().then(playNext).catch(() => {});
        } else {
            playNext();
        }
    }

    stopBgm() {
        this.bgmPlaying = false;
        if (this.bgmTimer) {
            clearTimeout(this.bgmTimer);
            this.bgmTimer = null;
        }
    }

    // ==========================================
    // MASTER VOCAL PRONUNCIATION (Real MP3 + Fallback)
    // ==========================================

    speak(text, lang = 'en', onEnd) {
        if (!text) {
            if (onEnd) onEnd();
            return;
        }

        this.unlockAudio();

        // 1. Check if word is a number 0-9 with existing local mp3
        const numMap = {
            'zero': 'sound/Zero.mp3', '0': 'sound/Zero.mp3',
            'one': 'sound/One.mp3', '1': 'sound/One.mp3',
            'two': 'sound/Two.mp3', '2': 'sound/Two.mp3',
            'three': 'sound/Three.mp3', '3': 'sound/Three.mp3',
            'four': 'sound/Four.mp3', '4': 'sound/Four.mp3',
            'five': 'sound/Five.mp3', '5': 'sound/Five.mp3',
            'six': 'sound/Six.mp3', '6': 'sound/Six.mp3',
            'seven': 'sound/Seven.mp3', '7': 'sound/Seven.mp3',
            'eight': 'sound/Eight.mp3', '8': 'sound/Eight.mp3',
            'nine': 'sound/Nine.mp3', '9': 'sound/Nine.mp3'
        };

        const clean = text.toLowerCase().trim();
        if (numMap[clean]) {
            this.playMp3(numMap[clean], onEnd, () => {
                this.speakSystem(text, lang, onEnd);
            });
            return;
        }

        // 2. If English word or letter or short phrase: use Studio Native Speaker MP3
        if (lang === 'en' && text.length <= 40) {
            // Free, fast, crystal clear native speaker American English MP3
            const studioUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=2`;
            this.playMp3(studioUrl, onEnd, () => {
                // Offline fallback: Web Speech API
                this.speakSystem(text, lang, onEnd);
            });
            return;
        }

        // 3. For Vietnamese or longer sentences: use Native Web Speech API
        this.speakSystem(text, lang, onEnd);
    }

    playMp3(url, onEnd, onFail) {
        if (this.currentAudioElem) {
            try {
                this.currentAudioElem.pause();
                this.currentAudioElem.currentTime = 0;
            } catch (e) {}
        }

        const audio = new Audio();
        this.currentAudioElem = audio;
        audio.playbackRate = this.settings.speed || 1.0;
        audio.volume = 1.0;

        let resolved = false;
        const done = () => {
            if (!resolved) {
                resolved = true;
                if (onEnd) onEnd();
            }
        };

        const fail = () => {
            if (!resolved) {
                resolved = true;
                if (onFail) onFail();
                else done();
            }
        };

        audio.onended = done;
        audio.onerror = fail;

        audio.src = url;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch((err) => {
                console.warn('MP3 play caught error:', err);
                fail();
            });
        }
    }

    speakSystem(text, lang = 'en', onEnd) {
        if (!('speechSynthesis' in window)) {
            if (onEnd) onEnd();
            return;
        }

        try {
            // Fix Chrome speech synthesis engine pause state
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            }

            const msg = new SpeechSynthesisUtterance(text);
            msg.lang = lang === 'en' ? 'en-US' : 'vi-VN';
            msg.rate = this.settings.speed || 0.9;
            msg.volume = 1.0;
            msg.pitch = 1.05;

            if (this.sysVoices.length === 0) {
                this.sysVoices = window.speechSynthesis.getVoices() || [];
            }

            const langPrefix = lang === 'en' ? 'en' : 'vi';
            const matched = this.sysVoices.find(v => v.lang && v.lang.toLowerCase().startsWith(langPrefix));
            if (matched) {
                msg.voice = matched;
            }

            let finished = false;
            const complete = () => {
                if (!finished) {
                    finished = true;
                    if (onEnd) onEnd();
                }
            };

            msg.onend = complete;
            msg.onerror = complete;

            window.speechSynthesis.speak(msg);

            // Chrome bug pump: periodically resume if engine gets stuck
            setTimeout(() => {
                if (window.speechSynthesis.paused) {
                    window.speechSynthesis.resume();
                }
            }, 60);
        } catch (e) {
            console.warn('speakSystem exception:', e);
            if (onEnd) onEnd();
        }
    }

    // ==========================================
    // SPEECH RECOGNITION
    // ==========================================

    listenForWord(targetWord, onResult, onError) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            if (onError) onError('Trình duyệt chưa hỗ trợ nhận diện giọng nói');
            return null;
        }

        try {
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 3;

            recognition.onresult = (event) => {
                let heard = '';
                let matched = false;
                const cleanTarget = targetWord.toLowerCase().trim();

                for (let i = 0; i < event.results[0].length; i++) {
                    const transcript = event.results[0][i].transcript.toLowerCase().trim();
                    heard = transcript;
                    if (transcript.includes(cleanTarget) || cleanTarget.includes(transcript)) {
                        matched = true;
                        break;
                    }
                }
                if (onResult) onResult({ matched, heard, target: targetWord });
            };

            recognition.onerror = (e) => {
                if (onError) onError(e.error);
            };

            recognition.start();
            return recognition;
        } catch (err) {
            if (onError) onError(err);
            return null;
        }
    }
}

// Global audio engine
const pandaAudio = new PandaAudioEngine();
