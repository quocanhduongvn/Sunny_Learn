/**
 * SUNNY PANDA - Audio & Speech Engine
 * Procedural Web Audio SFX, BGM Synthesizer, Edge TTS + Google TTS + Web Speech API + Speech Recognition
 */

class PandaAudioEngine {
    constructor() {
        this.ctx = null;
        this.bgmPlaying = false;
        this.bgmTimer = null;
        this.bgmVolume = 0.15;
        this.sfxVolume = 0.7;
        this.ttsAudio = new Audio();
        this.edgeBlobCache = {};
        
        // Settings loaded from localStorage
        this.settings = {
            ttsEngine: 'edge', // 'edge' | 'google' | 'system'
            speed: 0.9,       // slightly slower for 4-5yo
            voiceEn: '',
            voiceVi: '',
            edgeEn: 'en-US-AnaNeural', // Ana is cute child voice
            edgeVi: 'vi-VN-HoaiMyNeural',
            bgmEnabled: true,
            sfxEnabled: true
        };

        this.loadSettings();
        this.initSysVoices();
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('sunny_panda_settings');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.settings = { ...this.settings, ...parsed };
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

    initAudioContext() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        // Unlock silent audio for iOS/Android
        if (this.ttsAudio && !this.ttsAudio.unlocked) {
            this.ttsAudio.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
            this.ttsAudio.play().then(() => this.ttsAudio.unlocked = true).catch(() => {});
        }
    }

    initSysVoices() {
        this.sysVoices = [];
        if ('speechSynthesis' in window) {
            const update = () => {
                this.sysVoices = window.speechSynthesis.getVoices();
            };
            window.speechSynthesis.onvoiceschanged = update;
            update();
        }
    }

    // ==========================================
    // PROCEDURAL SOUND EFFECTS (Web Audio API)
    // 100% reliable, zero external files needed!
    // ==========================================

    playSfx(type) {
        if (!this.settings.sfxEnabled) return;
        this.initAudioContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const master = this.ctx.createGain();
        master.gain.setValueAtTime(this.sfxVolume, now);
        master.connect(this.ctx.destination);

        switch (type) {
            case 'pop': {
                // Cute bubbly pop
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

                gain.gain.setValueAtTime(0.8, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

                osc.connect(gain);
                gain.connect(master);
                osc.start(now);
                osc.stop(now + 0.1);
                break;
            }

            case 'star': {
                // High-pitched magical star chime
                [1046.5, 1318.5, 1567.98, 2093].forEach((freq, idx) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    const t = now + idx * 0.06;

                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, t);

                    gain.gain.setValueAtTime(0.4, t);
                    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

                    osc.connect(gain);
                    gain.connect(master);
                    osc.start(t);
                    osc.stop(t + 0.35);
                });
                break;
            }

            case 'fanfare':
            case 'success': {
                // Cheerful triumphal celebration chord: C - E - G - high C
                const notes = [523.25, 659.25, 783.99, 1046.5];
                notes.forEach((freq, idx) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    const t = now + idx * 0.1;

                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, t);

                    gain.gain.setValueAtTime(0.5, t);
                    gain.gain.exponentialRampToValueAtTime(0.01, t + (idx === 3 ? 0.6 : 0.25));

                    osc.connect(gain);
                    gain.connect(master);
                    osc.start(t);
                    osc.stop(t + (idx === 3 ? 0.7 : 0.3));
                });
                break;
            }

            case 'wrong': {
                // Soft, cartoon "boing" (encouraging, not harsh for toddlers)
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(280, now);
                osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

                gain.gain.setValueAtTime(0.4, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

                osc.connect(gain);
                gain.connect(master);
                osc.start(now);
                osc.stop(now + 0.26);
                break;
            }

            case 'chomp': {
                // Funny crunch/eating sound
                for (let i = 0; i < 3; i++) {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    const t = now + i * 0.12;

                    osc.type = 'square';
                    osc.frequency.setValueAtTime(320 - i * 40, t);
                    osc.frequency.exponentialRampToValueAtTime(120, t + 0.08);

                    gain.gain.setValueAtTime(0.3, t);
                    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

                    osc.connect(gain);
                    gain.connect(master);
                    osc.start(t);
                    osc.stop(t + 0.09);
                }
                break;
            }

            case 'tickle': {
                // Panda giggle / cute chirp
                [600, 900, 750, 1100].forEach((freq, idx) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    const t = now + idx * 0.07;

                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, t);

                    gain.gain.setValueAtTime(0.4, t);
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
                osc.frequency.setValueAtTime(600, now);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
                osc.connect(gain);
                gain.connect(master);
                osc.start(now);
                osc.stop(now + 0.05);
                break;
            }
        }
    }

    // ==========================================
    // PROCEDURAL BACKGROUND MUSIC (Music Box)
    // Gentle lullaby/play tune, perfectly non-intrusive
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

        // Pentatonic joyful melody notes: C4, D4, E4, G4, A4, C5, D5, E5
        const melody = [
            523.25, 659.25, 783.99, 659.25, 1046.5, 783.99, 880.0, 783.99,
            523.25, 587.33, 659.25, 587.33, 523.25, 392.00, 523.25, 0
        ];
        let noteIndex = 0;

        const playNext = () => {
            if (!this.bgmPlaying) return;
            const freq = melody[noteIndex % melody.length];
            noteIndex++;

            if (freq > 0 && this.ctx) {
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);

                gain.gain.setValueAtTime(this.bgmVolume * 0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.48);
            }

            this.bgmTimer = setTimeout(playNext, 480);
        };

        playNext();
    }

    stopBgm() {
        this.bgmPlaying = false;
        if (this.bgmTimer) {
            clearTimeout(this.bgmTimer);
            this.bgmTimer = null;
        }
    }

    // ==========================================
    // TEXT-TO-SPEECH (Edge Neural, Google, System)
    // ==========================================

    speak(text, lang = 'en', onEnd) {
        this.initAudioContext();
        if (this.ttsAudio) {
            this.ttsAudio.playbackRate = this.settings.speed || 1.0;
        }

        if (this.settings.ttsEngine === 'system') {
            this.speakSystem(text, lang, onEnd);
            return;
        }

        if (this.settings.ttsEngine === 'edge') {
            this.speakEdge(text, lang, onEnd);
            return;
        }

        // Default: Google Translate TTS
        this.speakGoogle(text, lang, onEnd);
    }

    speakGoogle(text, lang, onEnd) {
        const gLang = lang === 'en' ? 'en' : 'vi';
        const url = `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${gLang}&q=${encodeURIComponent(text)}`;

        if (this.ttsAudio) {
            this.ttsAudio.src = url;
            this.ttsAudio.onended = () => { if (onEnd) onEnd(); };
            this.ttsAudio.play().catch(e => {
                this.speakSystem(text, lang, onEnd);
            });
        } else {
            this.speakSystem(text, lang, onEnd);
        }
    }

    speakEdge(text, lang, onEnd) {
        const voice = lang === 'en' ? (this.settings.edgeEn || 'en-US-AnaNeural') : (this.settings.edgeVi || 'vi-VN-HoaiMyNeural');
        const cacheKey = voice + "_" + text;
        const xmlLang = lang === 'en' ? 'en-US' : 'vi-VN';
        const speed = this.settings.speed || 1.0;

        if (this.edgeBlobCache[cacheKey]) {
            this.ttsAudio.src = this.edgeBlobCache[cacheKey];
            this.ttsAudio.playbackRate = speed;
            this.ttsAudio.onended = () => { if (onEnd) onEnd(); };
            this.ttsAudio.play().catch(() => this.speakGoogle(text, lang, onEnd));
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
                        const blob = new Blob(audioParts, { type: 'audio/mp3' });
                        const url = URL.createObjectURL(blob);
                        this.edgeBlobCache[cacheKey] = url;
                        this.ttsAudio.src = url;
                        this.ttsAudio.playbackRate = speed;
                        this.ttsAudio.onended = () => { if (onEnd) onEnd(); };
                        this.ttsAudio.play().catch(() => this.speakGoogle(text, lang, onEnd));
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
                this.speakGoogle(text, lang, onEnd);
            };
        } catch (e) {
            this.speakGoogle(text, lang, onEnd);
        }
    }

    speakSystem(text, lang, onEnd) {
        if (!('speechSynthesis' in window)) {
            if (onEnd) onEnd();
            return;
        }
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = lang === 'en' ? 'en-US' : 'vi-VN';
        msg.rate = this.settings.speed || 0.9;
        msg.pitch = 1.1; // Friendly slightly higher pitch for kids

        const targetVoiceName = lang === 'en' ? this.settings.voiceEn : this.settings.voiceVi;
        if (targetVoiceName && this.sysVoices && this.sysVoices.length > 0) {
            const matched = this.sysVoices.find(v => v.name === targetVoiceName);
            if (matched) msg.voice = matched;
        }

        msg.onend = () => { if (onEnd) onEnd(); };
        msg.onerror = () => { if (onEnd) onEnd(); };
        window.speechSynthesis.speak(msg);
    }

    // ==========================================
    // SPEECH RECOGNITION (Voice Practice for 4-5yo)
    // ==========================================

    listenForWord(targetWord, onResult, onError) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            if (onError) onError('Trình duyệt không hỗ trợ nhận diện giọng nói');
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

// Global instance
const pandaAudio = new PandaAudioEngine();
