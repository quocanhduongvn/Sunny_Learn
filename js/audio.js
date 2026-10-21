/**
 * SUNNY PANDA - Enterprise Audio Engine
 * Tier 1: Real Local Studio MP3 Recordings (sound/words/*.mp3) - Instant, loud, clear, 100% offline
 * Tier 2: Real Native Speaker Online Stream (Youdao CDN - identical to TOI-TU-HOC)
 * Tier 3: Web Speech API Fallback
 */

// ==================== HỆ THỐNG PHÁT ÂM TIẾNG ANH (ƯU TIÊN FILE MP3 BẢN XỨ) ====================
function playEnglishAudio(text, buttonElement = null, onEnd = null) {
    if (!text) {
        if (onEnd) onEnd();
        return;
    }

    let btn = buttonElement;
    if (btn && btn.classList) {
        btn.classList.add("playing-audio");
        setTimeout(() => {
            if (btn && btn.classList) {
                btn.classList.remove("playing-audio");
            }
        }, 1200);
    }

    const cleanWord = text.trim().toLowerCase()
        .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
        .replace(/[\.,\?!:;'"()\[\]\{\}]/g, '')
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');
    
    // 1. ƯU TIÊN PHÁT FILE MP3 LOCAL ĐÃ CÓ TRÊN MÁY (117 files trong sound/words/)
    let localUrl = `sound/words/${cleanWord}.mp3`;
    if (cleanWord.length === 1 && cleanWord >= 'a' && cleanWord <= 'z') {
        localUrl = `sound/words/letter_${cleanWord}.mp3`;
    }

    console.log(`[AUDIO] Phát âm tiếng Anh: "${text}" -> File: ${localUrl}`);
    const audio = new Audio(localUrl);
    audio.volume = 1.0;

    let fallbackCalled = false;
    const triggerFallback = (reason) => {
        if (fallbackCalled) return;
        fallbackCalled = true;
        playOnlineStreamAudio(text, onEnd);
    };

    audio.onended = () => {
        if (onEnd) onEnd();
    };

    audio.onerror = () => {
        triggerFallback("audio-load-error");
    };

    const p = audio.play();
    if (p !== undefined) {
        p.catch((err) => {
            triggerFallback(err);
        });
    }
}

function playOnlineStreamAudio(text, onEnd = null) {
    try {
        const streamUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=2`;
        const onlineAudio = new Audio(streamUrl);
        onlineAudio.volume = 1.0;

        let speechFallbackCalled = false;
        const triggerSpeechFallback = () => {
            if (speechFallbackCalled) return;
            speechFallbackCalled = true;
            playWithWebSpeech(text, onEnd);
        };

        onlineAudio.onended = () => { if (onEnd) onEnd(); };
        onlineAudio.onerror = () => { triggerSpeechFallback(); };

        const p = onlineAudio.play();
        if (p !== undefined) {
            p.catch(() => {
                triggerSpeechFallback();
            });
        }
    } catch (e) {
        playWithWebSpeech(text, onEnd);
    }
}

function playWithWebSpeech(text, onEnd = null) {
    if (!('speechSynthesis' in window)) {
        if (onEnd) onEnd();
        return;
    }
    try {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.85;
        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(v => v.lang.startsWith('en'));
        if (enVoice) utterance.voice = enVoice;
        utterance.onend = () => { if (onEnd) onEnd(); };
        utterance.onerror = () => { if (onEnd) onEnd(); };
        window.speechSynthesis.speak(utterance);
    } catch (e) {
        if (onEnd) onEnd();
    }
}

// ==================== PHÁT ÂM TIẾNG VIỆT ====================
function playVietnameseAudio(text, onEnd = null) {
    if (!text) return;
    if ('speechSynthesis' in window) {
        try {
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            }
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'vi-VN';
            utterance.rate = 0.9;
            const voices = window.speechSynthesis.getVoices();
            const viVoice = voices.find(v => v.lang.startsWith('vi'));
            if (viVoice) utterance.voice = viVoice;
            utterance.onend = () => { if (onEnd) onEnd(); };
            utterance.onerror = () => { if (onEnd) onEnd(); };
            window.speechSynthesis.speak(utterance);
        } catch (e) {
            if (onEnd) onEnd();
        }
    } else {
        if (onEnd) onEnd();
    }
}

// ==================== CLASS ĐIỀU PHỐI ÂM THANH ====================
class PandaAudioEngine {
    constructor() {
        this.ctx = null;
        this.bgmPlaying = false;
        this.bgmTimer = null;
        this.bgmVolume = 0.22;
        this.sfxVolume = 0.85;
        this.unlocked = false;

        this.settings = {
            bgmEnabled: true,
            sfxEnabled: true,
            speed: 0.85
        };

        this.loadSettings();
        this.initSysVoices();
        this.setupGlobalUnlockListener();
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('sunny_panda_settings');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.settings = { ...this.settings, ...parsed };
            }
        } catch (e) {}
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

        this.initAudioContext();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }

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
    // BACKGROUND MUSIC (BGM)
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

                gain.gain.setValueAtTime(this.bgmVolume * 0.18, now);
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
    // SPEAK INTERFACE
    // ==========================================

    speak(text, lang = 'en', onEnd) {
        if (!text) {
            if (onEnd) onEnd();
            return;
        }
        this.unlockAudio();

        if (lang === 'vi') {
            playVietnameseAudio(text, onEnd);
        } else {
            playEnglishAudio(text, null, onEnd);
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

// Global audio engine instance
const pandaAudio = new PandaAudioEngine();
window.pandaAudio = pandaAudio;
window.playEnglishAudio = playEnglishAudio;
window.playVietnameseAudio = playVietnameseAudio;

