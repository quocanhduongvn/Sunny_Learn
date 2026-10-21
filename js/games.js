/**
 * SUNNY PANDA - Educational Mini-Games Suite for 4-5 Year Olds
 * Flashcards, Panda Quiz, Feed Panda, Balloon Pop, Memory Match, Speak Practice, Sticker Album
 */

class PandaGamesManager {
    constructor(app) {
        this.app = app;
        this.currentMode = null;
        this.gameState = {};
        this.autoPlayTimer = null;
    }

    // ========================================================
    // 1. FLASHCARD MODE
    // ========================================================

    startFlashcards(categoryKey, startIndex = 0) {
        this.currentMode = 'flashcards';
        let words = [];
        if (categoryKey === 'random') {
            words = this.shuffle([...getAllWords()]);
        } else if (PANDA_DATABASE[categoryKey]) {
            words = PANDA_DATABASE[categoryKey];
        } else {
            words = PANDA_DATABASE.animals;
        }

        this.gameState = {
            categoryKey,
            words,
            currentIndex: startIndex,
            isFlipped: false,
            autoPlay: false
        };

        this.renderFlashcardScreen();
        this.showFlashcard(this.gameState.currentIndex);
    }

    renderFlashcardScreen() {
        const gameArea = document.getElementById('game-area');
        if (!gameArea) return;

        gameArea.innerHTML = `
        <div class="flashcard-zone">
            <!-- Header Bar -->
            <div class="game-header">
                <button class="nav-btn btn-round" onclick="sunnyApp.showHome()" title="Về trang chủ">🏠</button>
                <div class="game-title" id="fc-category-name">Thẻ Học Kỳ Diệu</div>
                <button class="nav-btn btn-round" id="btn-fc-autoplay" onclick="sunnyApp.games.toggleFlashcardAutoPlay()" title="Tự động lật thẻ">▶️ Tự Chạy</button>
            </div>

            <!-- Main Card Container -->
            <div class="card-scene">
                <div class="card-3d" id="fc-card" onclick="sunnyApp.games.flipCard()">
                    <!-- Front Side -->
                    <div class="card-face card-front">
                        <div class="card-media-box" onclick="event.stopPropagation(); sunnyApp.games.speakCurrent(event, 'en')" style="cursor: pointer;" title="Chạm hình ảnh để nghe tiếng Anh">
                            <img id="fc-img" src="" alt="Word" class="card-photo" onerror="this.onerror=null; this.src='https://placehold.co/600x600/f6b93b/ffffff.png?text=Sunny';">
                            <span class="card-emoji-badge" id="fc-emoji">🐾</span>
                        </div>
                        <div class="card-word-en" id="fc-en" onclick="event.stopPropagation(); sunnyApp.games.speakCurrent(event, 'en')" style="cursor: pointer;" title="Chạm vào chữ để nghe phát âm tiếng Anh">Word 🔊</div>
                        <div class="card-ipa" id="fc-ipa" onclick="event.stopPropagation(); sunnyApp.games.speakCurrent(event, 'en')" style="cursor: pointer;" title="Phiên âm quốc tế">/wɜːd/</div>
                        <div class="card-flip-hint">👆 Chạm viền ngoài để lật xem tiếng Việt</div>
                    </div>

                    <!-- Back Side -->
                    <div class="card-face card-back">
                        <div class="back-emoji" id="fc-back-emoji">🌟</div>
                        <div class="back-word-vn" id="fc-vn" onclick="event.stopPropagation(); sunnyApp.games.speakCurrent(event, 'vi')" style="cursor: pointer;" title="Chạm để nghe tiếng Việt">Từ Tiếng Việt 🇻🇳</div>
                        <div class="back-sentence-en" id="fc-sentence" onclick="event.stopPropagation(); sunnyApp.games.speakSentence(event)" style="cursor: pointer;" title="Chạm để nghe cả câu tiếng Anh">Example sentence for kids 🔊</div>
                        <div class="back-hint">🎉 Giỏi lắm bé ơi!</div>
                    </div>
                </div>
            </div>

            <!-- Audio Actions -->
            <div class="card-audio-bar">
                <button class="btn-voice-en" onclick="sunnyApp.games.speakCurrent(event, 'en')" title="Phát âm tiếng Anh chuẩn">
                    <span class="voice-icon">🔊</span>
                    <span>Tiếng Anh</span>
                </button>
                <button class="btn-voice-slow" onclick="sunnyApp.games.speakCurrent(event, 'slow')" title="Nghe chậm rõ từng âm">
                    <span class="voice-icon">🐢</span>
                    <span>Nghe Chậm</span>
                </button>
                <button class="btn-voice-vn" onclick="sunnyApp.games.speakCurrent(event, 'vi')" title="Nghe tiếng Việt">
                    <span class="voice-icon">🇻🇳</span>
                    <span>Tiếng Việt</span>
                </button>
            </div>

            <!-- Progress & Navigation -->
            <div class="card-nav-bar">
                <button class="nav-arrow-btn" onclick="sunnyApp.games.prevCard()">◀</button>
                <div class="card-counter" id="fc-counter">1 / 10</div>
                <button class="nav-arrow-btn" onclick="sunnyApp.games.nextCard()">▶</button>
            </div>
        </div>
        `;
    }

    showFlashcard(index) {
        const words = this.gameState.words;
        if (!words || words.length === 0) return;

        if (index < 0) index = words.length - 1;
        if (index >= words.length) index = 0;
        this.gameState.currentIndex = index;
        this.gameState.isFlipped = false;

        const card = document.getElementById('fc-card');
        if (card) card.classList.remove('is-flipped');

        const item = words[index];
        const img = document.getElementById('fc-img');
        const emoji = document.getElementById('fc-emoji');
        const en = document.getElementById('fc-en');
        const ipa = document.getElementById('fc-ipa');
        const vn = document.getElementById('fc-vn');
        const backEmoji = document.getElementById('fc-back-emoji');
        const sentence = document.getElementById('fc-sentence');
        const counter = document.getElementById('fc-counter');

        if (img) img.src = item.img || `https://placehold.co/600x600/38ada9/ffffff.png?text=${item.en}`;
        if (emoji) emoji.textContent = item.emoji || '🐾';
        if (en) en.textContent = item.en || item.letter || '';
        if (ipa) ipa.textContent = item.ipa || '';
        if (vn) vn.textContent = item.vn || '';
        if (backEmoji) backEmoji.textContent = item.emoji || '🎋';
        if (sentence) sentence.textContent = item.sentence || '';
        if (counter) counter.textContent = `${index + 1} / ${words.length}`;

        // Panda speaks the word
        if (window.pandaAudio) {
            window.pandaAudio.speak(item.en, 'en');
        }
        if (window.sunnyApp && window.sunnyApp.mascot) {
            window.sunnyApp.mascot.say(item.en, item.vn, 2500);
        }
    }

    flipCard() {
        const card = document.getElementById('fc-card');
        if (!card) return;
        this.gameState.isFlipped = !this.gameState.isFlipped;
        card.classList.toggle('is-flipped', this.gameState.isFlipped);
        if (window.pandaAudio) {
            window.pandaAudio.playSfx('pop');
        }

        const item = this.gameState.words[this.gameState.currentIndex];
        if (this.gameState.isFlipped && item) {
            // Speak Vietnamese or sentence on back
            setTimeout(() => {
                if (window.pandaAudio) window.pandaAudio.speak(item.vn, 'vi');
            }, 300);
        }
    }

    prevCard() {
        if (window.pandaAudio) window.pandaAudio.playSfx('click');
        this.showFlashcard(this.gameState.currentIndex - 1);
    }

    nextCard() {
        if (window.pandaAudio) window.pandaAudio.playSfx('click');
        this.showFlashcard(this.gameState.currentIndex + 1);
        this.app.addStars(1); // Give a little star for exploring cards
    }

    speakCurrent(event, type) {
        let targetEl = null;
        if (event) {
            event.stopPropagation();
            targetEl = event.currentTarget || event.target;
            if (targetEl && targetEl.classList) {
                targetEl.classList.add("playing-audio");
                setTimeout(() => {
                    if (targetEl && targetEl.classList) {
                        targetEl.classList.remove("playing-audio");
                    }
                }, 1000);
            }
        }
        const item = this.gameState.words[this.gameState.currentIndex];
        if (!item) return;
        const audio = window.pandaAudio || (typeof pandaAudio !== 'undefined' ? pandaAudio : null);
        if (!audio) return;

        if (type === 'en') {
            audio.speak(item.en, 'en');
        } else if (type === 'slow') {
            const prev = audio.settings.speed;
            audio.settings.speed = 0.65;
            audio.speak(item.en, 'en', () => {
                audio.settings.speed = prev;
            });
        } else if (type === 'vi') {
            audio.speak(item.vn, 'vi');
        }
    }

    speakSentence(event) {
        let targetEl = null;
        if (event) {
            event.stopPropagation();
            targetEl = event.currentTarget || event.target;
            if (targetEl && targetEl.classList) {
                targetEl.classList.add("playing-audio");
                setTimeout(() => {
                    if (targetEl && targetEl.classList) {
                        targetEl.classList.remove("playing-audio");
                    }
                }, 1000);
            }
        }
        const item = this.gameState.words[this.gameState.currentIndex];
        if (!item || !item.sentence) return;
        const audio = window.pandaAudio || (typeof pandaAudio !== 'undefined' ? pandaAudio : null);
        if (audio) {
            audio.speak(item.sentence, 'en');
        }
    }

    toggleFlashcardAutoPlay() {
        this.gameState.autoPlay = !this.gameState.autoPlay;
        const btn = document.getElementById('btn-fc-autoplay');
        if (btn) {
            btn.innerHTML = this.gameState.autoPlay ? '⏸️ Tạm Dừng' : '▶️ Tự Chạy';
            btn.classList.toggle('active', this.gameState.autoPlay);
        }

        if (this.gameState.autoPlay) {
            this.runAutoPlayCycle();
        } else {
            if (this.autoPlayTimer) clearTimeout(this.autoPlayTimer);
        }
    }

    runAutoPlayCycle() {
        if (!this.gameState.autoPlay || this.currentMode !== 'flashcards') return;
        this.autoPlayTimer = setTimeout(() => {
            if (!this.gameState.autoPlay) return;
            this.nextCard();
            this.runAutoPlayCycle();
        }, 4000);
    }

    // ========================================================
    // 2. PANDA QUIZ GAME (ĐỐ VUI TÌM TRANH)
    // ========================================================

    startQuiz(categoryKey = 'animals') {
        this.currentMode = 'quiz';
        let pool = [];
        if (categoryKey === 'all') {
            pool = getAllWords();
        } else if (PANDA_DATABASE[categoryKey]) {
            pool = PANDA_DATABASE[categoryKey];
        } else {
            pool = PANDA_DATABASE.animals;
        }

        this.gameState = {
            categoryKey,
            pool,
            score: 0,
            questionIndex: 0,
            currentTarget: null,
            choices: []
        };

        this.renderQuizScreen();
        this.nextQuizQuestion();
    }

    renderQuizScreen() {
        const gameArea = document.getElementById('game-area');
        if (!gameArea) return;

        gameArea.innerHTML = `
        <div class="quiz-zone">
            <div class="game-header">
                <button class="nav-btn btn-round" onclick="sunnyApp.showHome()">🏠</button>
                <div class="game-title">🎯 Đố Vui Tìm Tranh</div>
                <div class="quiz-score-badge">⭐ <span id="quiz-score">0</span></div>
            </div>

            <div class="quiz-question-box">
                <div class="quiz-prompt-en" id="quiz-prompt-en">Where is the ...?</div>
                <div class="quiz-prompt-vn" id="quiz-prompt-vn">Bé hãy chọn hình đúng nhé!</div>
                <button class="btn-quiz-hear" onclick="sunnyApp.games.repeatQuizAudio()">
                    🔊 Nghe lại câu hỏi
                </button>
            </div>

            <div class="quiz-choices-grid" id="quiz-choices"></div>
        </div>
        `;
    }

    nextQuizQuestion() {
        const pool = this.gameState.pool;
        if (!pool || pool.length < 3) return;

        const target = pool[Math.floor(Math.random() * pool.length)];
        this.gameState.currentTarget = target;

        // Pick 2 wrong choices
        let wrongList = pool.filter(w => w.en !== target.en);
        wrongList = this.shuffle(wrongList);
        const choices = this.shuffle([target, wrongList[0], wrongList[1]]);
        this.gameState.choices = choices;

        const promptEn = document.getElementById('quiz-prompt-en');
        const promptVn = document.getElementById('quiz-prompt-vn');
        if (promptEn) promptEn.innerHTML = `Where is the <strong class="highlight-word">${target.en}</strong>?`;
        if (promptVn) promptVn.textContent = `Bé hãy tìm: "${target.vn}" nha!`;

        const grid = document.getElementById('quiz-choices');
        if (grid) {
            grid.innerHTML = '';
            choices.forEach((c) => {
                const choiceBtn = document.createElement('button');
                choiceBtn.className = 'quiz-choice-card';
                choiceBtn.innerHTML = `
                    <div class="choice-img-wrap">
                        <img src="${c.img || 'https://placehold.co/400x400/2ed573/ffffff.png?text=' + c.en}" alt="${c.en}">
                        <span class="choice-emoji">${c.emoji || '✨'}</span>
                    </div>
                    <div class="choice-label">${c.en}</div>
                `;
                choiceBtn.onclick = () => {
                    playEnglishAudio(c.en);
                    this.handleQuizAnswer(c, choiceBtn);
                };
                grid.appendChild(choiceBtn);
            });
        }

        // Voice instruction
        this.repeatQuizAudio();
    }

    repeatQuizAudio() {
        const target = this.gameState.currentTarget;
        if (!target) return;

        const cleanTarget = target.en.toLowerCase().replace(/[^a-z0-9_]/g, '_');
        if (typeof playAudioSequence === 'function') {
            playAudioSequence([
                'sound/words/where_is_the.mp3',
                `sound/words/${cleanTarget}.mp3`
            ]);
        } else {
            playEnglishAudio(target.en);
        }

        if (this.app.mascot) {
            this.app.mascot.setMood('think');
            this.app.mascot.say(`Where is the ${target.en}?`, `Bé tìm "${target.vn}" ở đâu nào?`);
        }
    }

    handleQuizAnswer(chosenItem, buttonElem) {
        const target = this.gameState.currentTarget;
        if (!target) return;

        if (chosenItem.en === target.en) {
            // CORRECT!
            buttonElem.classList.add('choice-correct');
            if (window.pandaAudio) {
                window.pandaAudio.playSfx('fanfare');
                window.pandaAudio.playSfx('star');
            }
            if (this.app.mascot) {
                this.app.mascot.setMood('cheer');
                this.app.mascot.say("Excellent! You did it! ⭐", "Bé siêu quá! Hoan hô bé!", 2500);
            }
            this.gameState.score += 10;
            this.app.addStars(5);
            const scoreDisplay = document.getElementById('quiz-score');
            if (scoreDisplay) scoreDisplay.textContent = this.gameState.score;

            setTimeout(() => {
                this.nextQuizQuestion();
            }, 1800);
        } else {
            // WRONG - GENTLE TRY AGAIN
            buttonElem.classList.add('choice-wrong');
            if (window.pandaAudio) {
                window.pandaAudio.playSfx('wrong');
            }
            if (this.app.mascot) {
                this.app.mascot.say("Let's try again! You can do it! 💖", "Bé thử lại nhé, cố lên nào!", 2500);
            }
            setTimeout(() => {
                buttonElem.classList.remove('choice-wrong');
            }, 800);
        }
    }

    // ========================================================
    // 3. FEED THE PANDA (CHO GẤU TRÚC ĂN)
    // ========================================================

    startFeedPanda() {
        this.currentMode = 'feed';
        const foodList = [
            ...PANDA_DATABASE.fruits,
            { en: 'Milk', vn: 'Sữa Tươi', emoji: '🥛', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80' },
            { en: 'Cookie', vn: 'Bánh Quy', emoji: '🍪', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop&q=80' }
        ];

        this.gameState = {
            foodList,
            score: 0,
            targetFood: null
        };

        this.renderFeedScreen();
        this.nextFeedRound();
    }

    renderFeedScreen() {
        const gameArea = document.getElementById('game-area');
        if (!gameArea) return;

        gameArea.innerHTML = `
        <div class="feed-zone">
            <div class="game-header">
                <button class="nav-btn btn-round" onclick="sunnyApp.showHome()">🏠</button>
                <div class="game-title">🎋 Cho Gấu Trúc Ăn</div>
                <div class="quiz-score-badge">😋 <span id="feed-count">0</span> Đã Ăn</div>
            </div>

            <!-- Big Panda Target -->
            <div class="feed-panda-box" id="feed-target-zone">
                <div class="feed-bubble" id="feed-bubble">
                    Tớ đang đói bụng quá! Cho tớ ăn nha! 🎋
                </div>
                <div class="feed-panda-avatar" id="feed-panda-face">
                    <span class="feed-mouth-state">😋</span>
                </div>
            </div>

            <div class="feed-instruction" id="feed-instruction">
                Panda wants: <strong id="feed-wanted-food">Apple</strong>
            </div>

            <!-- Floating Food Options -->
            <div class="feed-food-tray" id="feed-food-tray"></div>
        </div>
        `;
    }

    nextFeedRound() {
        const foodList = this.gameState.foodList;
        const target = foodList[Math.floor(Math.random() * foodList.length)];
        this.gameState.targetFood = target;

        const wanted = document.getElementById('feed-wanted-food');
        const bubble = document.getElementById('feed-bubble');
        if (wanted) wanted.textContent = target.en;
        if (bubble) bubble.innerHTML = `Please feed me: <strong>${target.en} (${target.vn})</strong>! 😋`;

        // Pick 2 other foods
        const others = this.shuffle(foodList.filter(f => f.en !== target.en));
        const choices = this.shuffle([target, others[0], others[1]]);

        const tray = document.getElementById('feed-food-tray');
        if (tray) {
            tray.innerHTML = '';
            choices.forEach(food => {
                const item = document.createElement('div');
                item.className = 'feed-food-item';
                item.innerHTML = `
                    <div class="food-emoji">${food.emoji}</div>
                    <div class="food-name">${food.en}</div>
                `;
                item.onclick = () => {
                    playEnglishAudio(food.en);
                    this.feedPanda(food, item);
                };
                tray.appendChild(item);
            });
        }

        const cleanTarget = target.en.toLowerCase().replace(/[^a-z0-9_]/g, '_');
        if (typeof playAudioSequence === 'function') {
            playAudioSequence([
                'sound/words/please_feed_me.mp3',
                `sound/words/${cleanTarget}.mp3`
            ]);
        } else {
            playEnglishAudio(target.en);
        }

        if (this.app.mascot) {
            this.app.mascot.setMood('think');
            this.app.mascot.say(`I want ${target.en}! 😋`, `Cho tớ ăn ${target.vn} nha!`);
        }
    }

    feedPanda(food, elem) {
        const target = this.gameState.targetFood;
        if (!target) return;

        if (food.en === target.en) {
            // YUM YUM!
            elem.classList.add('food-eaten');
            if (window.pandaAudio) {
                window.pandaAudio.playSfx('chomp');
                setTimeout(() => window.pandaAudio.playSfx('fanfare'), 300);
            }
            if (this.app.mascot) {
                this.app.mascot.setMood('eat');
                this.app.mascot.say("Yum yum! So delicious! Thank you! 😋", "Ngon tuyệt cú mèo! Cảm ơn bé yêu nha!", 2500);
            }
            this.gameState.score++;
            this.app.addStars(5);

            const countDisplay = document.getElementById('feed-count');
            if (countDisplay) countDisplay.textContent = this.gameState.score;

            const mouth = document.querySelector('.feed-mouth-state');
            if (mouth) mouth.textContent = '🤤';

            setTimeout(() => {
                if (mouth) mouth.textContent = '😋';
                this.nextFeedRound();
            }, 1800);
        } else {
            // WRONG FOOD
            if (window.pandaAudio) window.pandaAudio.playSfx('wrong');
            if (this.app.mascot) {
                this.app.mascot.say(`No, that's ${food.en}! I want ${target.en}!`, `Không phải rồi, tớ muốn ăn ${target.vn} cơ!`, 2000);
            }
            elem.classList.add('food-rejected');
            setTimeout(() => elem.classList.remove('food-rejected'), 600);
        }
    }

    // ========================================================
    // 4. BALLOON POP GAME (BẮN BONG BÓNG)
    // ========================================================

    startBalloonPop() {
        this.currentMode = 'balloon';
        const letters = PANDA_DATABASE.alphabet.slice(0, 15);
        this.gameState = {
            letters,
            score: 0,
            activeBalloons: [],
            targetLetter: null,
            timer: null
        };

        this.renderBalloonScreen();
        this.nextBalloonTarget();
        this.spawnBalloonsLoop();
    }

    renderBalloonScreen() {
        const gameArea = document.getElementById('game-area');
        if (!gameArea) return;

        gameArea.innerHTML = `
        <div class="balloon-zone" id="balloon-sky">
            <div class="game-header">
                <button class="nav-btn btn-round" onclick="sunnyApp.games.stopBalloonGame(); sunnyApp.showHome();">🏠</button>
                <div class="game-title">🎈 Bắn Bong Bóng Chữ</div>
                <div class="quiz-score-badge">💥 <span id="pop-count">0</span></div>
            </div>

            <div class="balloon-mission">
                Pop letter: <span class="balloon-target-display" id="balloon-target-char">A</span>
                <button class="btn-bubble-voice" onclick="sunnyApp.games.repeatBalloonAudio()">🔊 Nghe</button>
            </div>

            <div class="sky-area" id="sky-area"></div>
        </div>
        `;
    }

    nextBalloonTarget() {
        const letters = this.gameState.letters;
        const target = letters[Math.floor(Math.random() * letters.length)];
        this.gameState.targetLetter = target;

        const charElem = document.getElementById('balloon-target-char');
        if (charElem) charElem.textContent = target.letter;

        this.repeatBalloonAudio();
    }

    repeatBalloonAudio() {
        const target = this.gameState.targetLetter;
        if (!target) return;

        if (typeof playAudioSequence === 'function') {
            playAudioSequence([
                'sound/words/pop_the_letter.mp3',
                `sound/words/letter_${target.letter.toLowerCase()}.mp3`
            ]);
        } else {
            playEnglishAudio(target.letter);
        }

        if (this.app.mascot) {
            this.app.mascot.say(`Pop letter ${target.letter}! 🎈`, `Bắn bong bóng chữ ${target.letter} nào!`);
        }
    }

    spawnBalloonsLoop() {
        if (this.currentMode !== 'balloon') return;

        const sky = document.getElementById('sky-area');
        if (!sky) return;

        const colors = ['#ff4757', '#2ed573', '#ffa502', '#1e90ff', '#9b51e0', '#ff6b81'];
        const balloon = document.createElement('div');
        balloon.className = 'floating-balloon';

        // 40% chance it is target, 60% random other
        let item = this.gameState.targetLetter;
        if (Math.random() > 0.4) {
            item = this.gameState.letters[Math.floor(Math.random() * this.gameState.letters.length)];
        }

        const color = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.backgroundColor = color;
        balloon.style.left = (Math.random() * 75 + 10) + '%';
        balloon.style.animationDuration = (Math.random() * 3 + 5) + 's';

        balloon.innerHTML = `
            <span class="balloon-letter">${item.letter}</span>
            <span class="balloon-string"></span>
        `;

        balloon.onclick = () => this.popBalloon(balloon, item);

        sky.appendChild(balloon);

        balloon.addEventListener('animationend', () => {
            balloon.remove();
        });

        this.gameState.timer = setTimeout(() => {
            if (this.currentMode === 'balloon') this.spawnBalloonsLoop();
        }, 1400);
    }

    popBalloon(balloon, item) {
        const target = this.gameState.targetLetter;
        if (!target) return;

        if (window.pandaAudio) window.pandaAudio.playSfx('pop');

        balloon.classList.add('balloon-popped');
        setTimeout(() => balloon.remove(), 250);

        // Always speak the letter on balloon pop
        playEnglishAudio(item.letter);

        if (item.letter === target.letter) {
            // MATCH!
            if (window.pandaAudio) window.pandaAudio.playSfx('star');
            if (this.app.mascot) {
                this.app.mascot.say(`Letter ${item.letter}! Like ${item.en}! ⭐`, `Chính xác! ${item.letter} - ${item.en}!`);
            }
            this.gameState.score++;
            this.app.addStars(3);

            const popDisplay = document.getElementById('pop-count');
            if (popDisplay) popDisplay.textContent = this.gameState.score;

            setTimeout(() => this.nextBalloonTarget(), 1000);
        }
    }

    stopBalloonGame() {
        this.currentMode = null;
        if (this.gameState && this.gameState.timer) {
            clearTimeout(this.gameState.timer);
        }
    }

    // ========================================================
    // 5. MEMORY MATCH GAME (LẬT THẺ TRÍ NHỚ)
    // ========================================================

    startMemoryMatch(categoryKey = 'animals') {
        this.currentMode = 'memory';
        const source = PANDA_DATABASE[categoryKey] || PANDA_DATABASE.animals;
        const selected = this.shuffle([...source]).slice(0, 3); // 3 pairs = 6 cards for 4yo

        let cards = [];
        selected.forEach((item, idx) => {
            cards.push({ uid: `${idx}-a`, pairId: idx, ...item });
            cards.push({ uid: `${idx}-b`, pairId: idx, ...item });
        });
        cards = this.shuffle(cards);

        this.gameState = {
            cards,
            flipped: [],
            matchedCount: 0,
            isLocked: false
        };

        this.renderMemoryScreen();
    }

    renderMemoryScreen() {
        const gameArea = document.getElementById('game-area');
        if (!gameArea) return;

        gameArea.innerHTML = `
        <div class="memory-zone">
            <div class="game-header">
                <button class="nav-btn btn-round" onclick="sunnyApp.showHome()">🏠</button>
                <div class="game-title">🧩 Lật Thẻ Tìm Cặp</div>
                <div class="quiz-score-badge">🏆 <span id="mem-pairs">0</span>/3 Cặp</div>
            </div>

            <div class="memory-instruction">Tìm 2 hình giống nhau nhé bé!</div>
            <div class="memory-grid" id="memory-grid"></div>
        </div>
        `;

        const grid = document.getElementById('memory-grid');
        if (!grid) return;

        this.gameState.cards.forEach((card, idx) => {
            const cardElem = document.createElement('div');
            cardElem.className = 'memory-card';
            cardElem.id = `mem-card-${idx}`;
            cardElem.innerHTML = `
                <div class="mem-inner">
                    <div class="mem-front">🐾</div>
                    <div class="mem-back">
                        <span class="mem-emoji">${card.emoji}</span>
                        <span class="mem-word">${card.en}</span>
                    </div>
                </div>
            `;
            cardElem.onclick = () => this.handleMemoryClick(idx);
            grid.appendChild(cardElem);
        });
    }

    handleMemoryClick(index) {
        if (this.gameState.isLocked) return;
        const cardElem = document.getElementById(`mem-card-${index}`);
        const cardData = this.gameState.cards[index];

        if (cardElem.classList.contains('is-flipped') || cardElem.classList.contains('is-matched')) return;

        // Flip card
        if (window.pandaAudio) window.pandaAudio.playSfx('pop');
        cardElem.classList.add('is-flipped');

        // Immediately pronounce the word on card flip
        playEnglishAudio(cardData.en);

        this.gameState.flipped.push({ index, data: cardData, elem: cardElem });

        if (this.gameState.flipped.length === 2) {
            this.gameState.isLocked = true;
            const [first, second] = this.gameState.flipped;

            if (first.data.pairId === second.data.pairId) {
                // MATCH!
                setTimeout(() => {
                    first.elem.classList.add('is-matched');
                    second.elem.classList.add('is-matched');
                    if (window.pandaAudio) {
                        window.pandaAudio.playSfx('star');
                        window.pandaAudio.speak(first.data.en, 'en');
                    }
                    if (this.app.mascot) {
                        this.app.mascot.setMood('cheer');
                        this.app.mascot.say(`Matched: ${first.data.en}! ⭐`, `Đúng rồi! Cặp đôi ${first.data.vn}!`);
                    }
                    this.gameState.matchedCount++;
                    this.app.addStars(5);

                    const pairDisplay = document.getElementById('mem-pairs');
                    if (pairDisplay) pairDisplay.textContent = this.gameState.matchedCount;

                    this.gameState.flipped = [];
                    this.gameState.isLocked = false;

                    if (this.gameState.matchedCount === 3) {
                        setTimeout(() => this.celebrateMemoryWin(), 600);
                    }
                }, 500);
            } else {
                // NOT A MATCH
                setTimeout(() => {
                    if (window.pandaAudio) window.pandaAudio.playSfx('wrong');
                    first.elem.classList.remove('is-flipped');
                    second.elem.classList.remove('is-flipped');
                    this.gameState.flipped = [];
                    this.gameState.isLocked = false;
                }, 1000);
            }
        }
    }

    celebrateMemoryWin() {
        if (window.pandaAudio) window.pandaAudio.playSfx('fanfare');
        if (this.app.mascot) {
            this.app.mascot.setMood('cheer');
            this.app.mascot.say("You won! Super memory! ⭐⭐⭐", "Hoan hô! Trí nhớ của bé tuyệt đỉnh!", 3500);
        }
        this.app.addStars(10);
    }

    // ========================================================
    // 6. SPEAKING PRACTICE (BÉ TẬP PHÁT ÂM)
    // ========================================================

    startSpeakPractice() {
        this.currentMode = 'speak';
        const words = PANDA_DATABASE.animals.concat(PANDA_DATABASE.fruits);
        this.gameState = {
            words,
            currentIndex: 0,
            isListening: false
        };

        this.renderSpeakScreen();
        this.showSpeakWord();
    }

    renderSpeakScreen() {
        const gameArea = document.getElementById('game-area');
        if (!gameArea) return;

        gameArea.innerHTML = `
        <div class="speak-zone">
            <div class="game-header">
                <button class="nav-btn btn-round" onclick="sunnyApp.showHome()">🏠</button>
                <div class="game-title">🎤 Bé Tập Phát Âm</div>
                <div class="quiz-score-badge">🌟 Bé Giỏi Nói</div>
            </div>

            <div class="speak-card">
                <img id="speak-img" src="" alt="Word" class="speak-photo" onclick="sunnyApp.games.playTargetVoice()" style="cursor: pointer;" title="Chạm ảnh để nghe phát âm">
                <div class="speak-word-en" id="speak-en" onclick="sunnyApp.games.playTargetVoice()" style="cursor: pointer;" title="Chạm chữ để nghe phát âm">Panda 🔊</div>
                <div class="speak-word-vn" id="speak-vn">Gấu Trúc</div>
                <button class="btn-speak-listen" onclick="sunnyApp.games.playTargetVoice()">
                    🔊 Nghe Gấu Mẫu Đọc
                </button>
            </div>

            <div class="mic-container">
                <button class="btn-mic" id="btn-mic" onclick="sunnyApp.games.startListening()">
                    🎙️
                </button>
                <div class="mic-status" id="mic-status">Chạm vào micro rồi đọc to nhé bé!</div>
            </div>

            <div class="card-nav-bar" style="margin-top:20px;">
                <button class="nav-arrow-btn" onclick="sunnyApp.games.prevSpeakWord()">◀</button>
                <button class="nav-arrow-btn" onclick="sunnyApp.games.nextSpeakWord()">▶</button>
            </div>
        </div>
        `;
    }

    showSpeakWord() {
        const item = this.gameState.words[this.gameState.currentIndex];
        if (!item) return;

        const img = document.getElementById('speak-img');
        const en = document.getElementById('speak-en');
        const vn = document.getElementById('speak-vn');
        const status = document.getElementById('mic-status');

        if (img) img.src = item.img || 'https://placehold.co/400x400/2ed573/ffffff.png?text=' + item.en;
        if (en) en.innerHTML = `${item.en} <span style="font-size:1.4rem;">🔊</span>`;
        if (vn) vn.textContent = item.vn;
        if (status) status.textContent = 'Chạm vào micro rồi đọc to nhé bé!';

        this.playTargetVoice();
    }

    playTargetVoice() {
        const item = this.gameState.words[this.gameState.currentIndex];
        if (!item || !window.pandaAudio) return;
        window.pandaAudio.speak(item.en, 'en');
        if (this.app.mascot) {
            this.app.mascot.say(`Say "${item.en}" with me! 🎙️`, `Bé đọc "${item.en}" theo tớ nhé!`);
        }
    }

    startListening() {
        const item = this.gameState.words[this.gameState.currentIndex];
        if (!item || !window.pandaAudio) return;

        const micBtn = document.getElementById('btn-mic');
        const status = document.getElementById('mic-status');

        if (micBtn) micBtn.classList.add('mic-active');
        if (status) status.textContent = 'Gấu đang lắng nghe bé nói nè... 🎧';

        window.pandaAudio.listenForWord(
            item.en,
            (res) => {
                if (micBtn) micBtn.classList.remove('mic-active');
                if (res.matched) {
                    if (status) status.innerHTML = `🎉 Giỏi quá! Bé đọc chuẩn từ <strong>${item.en}</strong>!`;
                    if (window.pandaAudio) window.pandaAudio.playSfx('fanfare');
                    if (this.app.mascot) {
                        this.app.mascot.setMood('cheer');
                        this.app.mascot.say("Bravo! Perfect pronunciation! ⭐⭐⭐", "Tuyệt vời! Bé phát âm chuẩn 10 điểm!", 3500);
                    }
                    this.app.addStars(10);
                } else {
                    if (status) status.innerHTML = `Gấu nghe thấy: "${res.heard}". Bé thử đọc lại từ <strong>${item.en}</strong> nha!`;
                    if (window.pandaAudio) window.pandaAudio.playSfx('wrong');
                }
            },
            (err) => {
                if (micBtn) micBtn.classList.remove('mic-active');
                if (status) status.textContent = 'Bé hãy nói to rõ hơn một chút nha!';
            }
        );
    }

    nextSpeakWord() {
        this.gameState.currentIndex = (this.gameState.currentIndex + 1) % this.gameState.words.length;
        this.showSpeakWord();
    }

    prevSpeakWord() {
        this.gameState.currentIndex = (this.gameState.currentIndex - 1 + this.gameState.words.length) % this.gameState.words.length;
        this.showSpeakWord();
    }

    // ========================================================
    // 7. STICKER ALBUM (BỘ SƯU TẬP HUY HIỆU GẤU)
    // ========================================================

    showStickerAlbum() {
        this.currentMode = 'stickers';
        const gameArea = document.getElementById('game-area');
        if (!gameArea) return;

        const stars = this.app.stars;
        const stickers = PANDA_DATABASE.stickers;

        let itemsHtml = '';
        stickers.forEach(stk => {
            const isUnlocked = stars >= stk.reqStars;
            itemsHtml += `
            <div class="sticker-card ${isUnlocked ? 'unlocked' : 'locked'}" onclick="sunnyApp.games.tapSticker('${stk.id}')">
                <div class="sticker-badge-icon">${isUnlocked ? stk.icon : '🔒'}</div>
                <div class="sticker-name">${stk.name}</div>
                <div class="sticker-req">${isUnlocked ? 'Đã Mở Khóa ✨' : `Cần ${stk.reqStars} ⭐`}</div>
            </div>
            `;
        });

        gameArea.innerHTML = `
        <div class="sticker-zone">
            <div class="game-header">
                <button class="nav-btn btn-round" onclick="sunnyApp.showHome()">🏠</button>
                <div class="game-title">🏆 Bộ Sưu Tập Huy Hiệu Gấu Trúc</div>
                <div class="quiz-score-badge">⭐ ${stars} Sao</div>
            </div>

            <div class="sticker-intro">Càng học chăm chỉ, bé càng mở khóa được nhiều trang phục cho Gấu Trúc Sunny!</div>
            <div class="stickers-grid">${itemsHtml}</div>
        </div>
        `;
    }

    tapSticker(stickerId) {
        const stk = PANDA_DATABASE.stickers.find(s => s.id === stickerId);
        if (!stk) return;

        const isUnlocked = this.app.stars >= stk.reqStars;
        if (isUnlocked) {
            if (window.pandaAudio) window.pandaAudio.playSfx('fanfare');
            if (this.app.mascot) {
                this.app.mascot.setMood('cheer');
                this.app.mascot.say(`I am ${stk.en}! ${stk.icon}`, `${stk.name}! ${stk.desc}`);
            }
        } else {
            if (window.pandaAudio) window.pandaAudio.playSfx('wrong');
            if (this.app.mascot) {
                this.app.mascot.say(`Earn ${stk.reqStars} stars to unlock this! 🌟`, `Bé cần thêm ${stk.reqStars - this.app.stars} sao nữa để mở khóa nha!`);
            }
        }
    }

    // Utility: Shuffle
    shuffle(array) {
        let arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
}
