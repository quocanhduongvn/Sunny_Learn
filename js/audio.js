/**
 * SUNNY PANDA - Rock-Solid Audio & Speech Engine
 * Web Speech API (Primary, Instant, 100% Reliable Offline) + Web Audio SFX + Procedural BGM
 * Fallbacks to Edge / Google TTS if requested
 */

class PandaAudioEngine {
    constructor() {
        this.ctx = null;
        this.bgmPlaying = false;
        this.bgmTimer = null;
        this.bgmVolume = 0.25;
        this.sfxVolume = 0.9;
        this.ttsAudio = new Audio();
        this.unlocked = false;
        this.edgeBlobCache = {};
        
        // Settings loaded from localStorage
        this.settings = {
            ttsEngine: 'system', // 'system' (Web Speech API - most reliable) | 'edge' | 'google'
            speed: 0.9,         // slightly slower for 4-5yo
            voiceEn: '',
            voiceVi: '',
            edgeEn: 'en-US-AnaNeural',
            edgeVi: 'vi-VN-HoaiMyNeural',
            bgmEnabled: true,
            sfxEnabled: true
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
                // Ensure default to 'system' if not explicitly set to edge/google
                if (!this.settings.ttsEngine) this.settings.ttsEngine = 'system';
            }
        } catch (e) {
            console.warn('Could not load audio settings', e);
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('sunny_panda_settings', JSON.stringify(this.settings));
        } catch (e) {}
    }

    // Auto-unlock audio on any first gesture (click, touch, pointer)
    setupGlobalUnlockListener() {
        const unlock = () => {
            this.unlockAudio();
            window.removeEventListener('click', unlock);
            window.removeEventListener('touchstart', unlock);
            window.removeEventListener('pointerdown', unlock);
            window.removeEventListener('keydown', unlock);
        };
        window.addEventListener('click', unlock, { passive: true });
        window.addEventListener('touchstart', unlock, { passive: true });
        window.addEventListener('pointerdown', unlock, { passive: true });
        window.addEventListener('keydown', unlock, { passive: true });
    }

    unlockAudio() {
        if (this.unlocked) return;
        this.unlocked = true;

        // 1. Unlock Web Audio API Context
        this.initAudioContext();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }

        // 2. Unlock HTML5 Audio Tag
        if (this.ttsAudio) {
            this.ttsAudio.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
            this.ttsAudio.play().catch(() => {});
        }

        // 3. Unlock SpeechSynthesis on iOS / Android
        if ('speechSynthesis' in window) {
            try {
                window.speechSynthesis.resume();
                const dummy = new SpeechSynthesisUtterance(' ');
                dummy.volume = 0.01;
                dummy.rate = 2.0;
                window.speechSynthesis.speak(dummy);
            } catch (e) {}
        }

        // 4. Start BGM if enabled
        if (this.settings.bgmEnabled && !this.bgmPlaying) {
            setTimeout(() => this.startBgm(), 300);
        }

        // Play gentle chime
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
                // Auto-pick best English and Vietnamese voices if not selected
                if (!this.settings.voiceEn && this.sysVoices.length > 0) {
                    const enVoice = this.sysVoices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Siri')));
                    if (enVoice) this.settings.voiceEn = enVoice.name;
                }
                if (!this.settings.voiceVi && this.sysVoices.length > 0) {
                    const viVoice = this.sysVoices.find(v => v.lang.startsWith('vi'));
                    if (viVoice) this.settings.voiceVi = viVoice.name;
                }
            };
            window.speechSynthesis.onvoiceschanged = update;
            update();
            setTimeout(update, 500);
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
    // TEXT-TO-SPEECH (TTS)
    // ==========================================

    speak(text, lang = 'en', onEnd) {
        if (!text) {
            if (onEnd) onEnd();
            return;
        }

        // Ensure audio context and speech synth are active
        this.unlockAudio();

        if (this.settings.ttsEngine === 'edge') {
            this.speakEdge(text, lang, onEnd);
            return;
        }

        if (this.settings.ttsEngine === 'google') {
            this.speakGoogle(text, lang, onEnd);
            return;
        }

        // Default & Most Reliable: System Web Speech API
        this.speakSystem(text, lang, onEnd);
    }

    speakSystem(text, lang = 'en', onEnd) {
        if (!('speechSynthesis' in window)) {
            // Ultimate fallback to google
            this.speakGoogle(text, lang, onEnd);
            return;
        }

        try {
            window.speechSynthesis.cancel(); // Cancel any lingering utterances

            const msg = new SpeechSynthesisUtterance(text);
            msg.lang = lang === 'en' ? 'en-US' : 'vi-VN';
            msg.rate = this.settings.speed || 0.9;
            msg.pitch = 1.05;
            msg.volume = 1.0;

            if (this.sysVoices.length === 0) {
                this.sysVoices = window.speechSynthesis.getVoices() || [];
            }

            // Find best voice match
            const targetVoiceName = lang === 'en' ? this.settings.voiceEn : this.settings.voiceVi;
            let matchedVoice = null;

            if (targetVoiceName) {
                matchedVoice = this.sysVoices.find(v => v.name === targetVoiceName);
            }

            if (!matchedVoice) {
                const langPrefix = lang === 'en' ? 'en' : 'vi';
                matchedVoice = this.sysVoices.find(v => v.lang && v.lang.toLowerCase().startsWith(langPrefix));
            }

            if (matchedVoice) {
                msg.voice = matchedVoice;
            }

            msg.onend = () => { if (onEnd) onEnd(); };
            msg.onerror = (err) => {
                console.warn('SpeechSynthesis error, falling back:', err);
                if (onEnd) onEnd();
            };

            window.speechSynthesis.speak(msg);
        } catch (e) {
            console.warn('speakSystem exception:', e);
            if (onEnd) onEnd();
        }
    }

    speakGoogle(text, lang = 'en', onEnd) {
        const gLang = lang === 'en' ? 'en' : 'vi';
        const url = `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${gLang}&q=${encodeURIComponent(text)}`;

        let handled = false;
        const fallback = () => {
            if (handled) return;
            handled = true;
            this.speakSystem(text, lang, onEnd);
        };

        const timer = setTimeout(fallback, 1500); // 1.5s timeout

        if (this.ttsAudio) {
            this.ttsAudio.playbackRate = this.settings.speed || 1.0;
            this.ttsAudio.src = url;
            this.ttsAudio.onended = () => {
                clearTimeout(timer);
                if (!handled) {
                    handled = true;
                    if (onEnd) onEnd();
                }
            };
            this.ttsAudio.onerror = () => {
                clearTimeout(timer);
                fallback();
            };
            this.ttsAudio.play().catch(() => {
                clearTimeout(timer);
                fallback();
            });
        } else {
            fallback();
        }
    }

    speakEdge(text, lang = 'en', onEnd) {
        const voice = lang === 'en' ? (this.settings.edgeEn || 'en-US-AnaNeural') : (this.settings.edgeVi || 'vi-VN-HoaiMyNeural');
        const cacheKey = voice + "_" + text;
        const xmlLang = lang === 'en' ? 'en-US' : 'vi-VN';
        const speed = this.settings.speed || 1.0;

        let handled = false;
        const fallback = () => {
            if (handled) return;
            handled = true;
            this.speakSystem(text, lang, onEnd);
        };

        const timeout = setTimeout(fallback, 2000); // 2s timeout

        if (this.edgeBlobCache[cacheKey]) {
            clearTimeout(timeout);
            this.ttsAudio.src = this.edgeBlobCache[cacheKey];
            this.ttsAudio.playbackRate = speed;
            this.ttsAudio.onended = () => { if (onEnd) onEnd(); };
            this.ttsAudio.play().catch(() => fallback());
            return;
        }

        try {
            const ws = new WebSocket("wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EAFF4E9FB37E23D68491D6F4");
            let audioParts = [];

            ws.onopen = () => {
                const reqId = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => (c=='x'?Math.random()*16|0:(Math.random()*16|0&0x3|0x8)).toString(16));
                ws.send(`X-Timestamp:${new Date().toISOString()}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"true"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}`);
                ws.send(`X-RequestId:${reqId}\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:${new Date().toISOString()}\r\nPath:ssml\r\n\r\n<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='${xmlLang}'><voice name='${voice}'>${text}</voice></speak>`);
            };

            ws.onmessage = async (e) => {
                if (typeof e.data === 'string') {
                    if (e.data.includes('Path:turn.end')) {
                        ws.close();
                        clearTimeout(timeout);
                        const blob = new Blob(audioParts, { type: 'audio/mp3' });
                        const url = URL.createObjectURL(blob);
                        this.edgeBlobCache[cacheKey] = url;
                        this.ttsAudio.src = url;
                        this.ttsAudio.playbackRate = speed;
                        this.ttsAudio.onended = () => {
                            if (!handled) {
                                handled = true;
                                if (onEnd) onEnd();
                            }
                        };
                        this.ttsAudio.play().catch(() => fallback());
                    }
                } else {
                    const buffer = await e.data.arrayBuffer();
                    const view = new Uint8Array(buffer);
                    let headerEnd = -1;
                    for (let i = 0; i < view.length - 3; i++) {
                        if (view[i] === 13 && view[i+1] === 10 && view[i+2] === 13 && view[i+3] === 10) {
                            headerEnd = i + 4;
                            break;
                        }
                    }
                    if (headerEnd !== -1) audioParts.push(buffer.slice(headerEnd));
                }
            };

            ws.onerror = () => {
                ws.close();
                clearTimeout(timeout);
                fallback();
            };
        } catch (e) {
            clearTimeout(timeout);
            fallback();
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
