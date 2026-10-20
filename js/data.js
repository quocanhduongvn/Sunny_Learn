/**
 * SUNNY PANDA - English Learning Database for Kids (4-5 Years Old)
 * Carefully crafted with phonics, vocabulary, sentences, and Panda themes
 */

const PANDA_DATABASE = {
    categories: [
        { id: 'alphabet', name: 'Bảng Chữ Cái', nameEn: 'Alphabet Fun', icon: '🔤', color: '#FF6B6B', bg: '#FFE3E3' },
        { id: 'numbers', name: 'Đếm Số Vui', nameEn: '123 Numbers', icon: '🔢', color: '#4D96FF', bg: '#E1EFFF' },
        { id: 'animals', name: 'Động Vật Đáng Yêu', nameEn: 'Cute Animals', icon: '🐼', color: '#6BCB77', bg: '#E4F9E8' },
        { id: 'fruits', name: 'Hoa Quả & Rau Củ', nameEn: 'Fruits & Veggies', icon: '🍎', color: '#FF9F45', bg: '#FFF0E0' },
        { id: 'vehicles', name: 'Xe Cộ & Phương Tiện', nameEn: 'Vehicles', icon: '🚗', color: '#9B51E0', bg: '#F2E6FF' },
        { id: 'colors', name: 'Màu Sắc & Hình Khối', nameEn: 'Colors & Shapes', icon: '🎨', color: '#FF78C4', bg: '#FFEBF5' },
        { id: 'body', name: 'Bé & Cơ Thể', nameEn: 'My Body', icon: '👀', color: '#20BF6B', bg: '#E3FAF0' },
        { id: 'family', name: 'Gia Đình Thân Yêu', nameEn: 'My Family', icon: '👨‍👩‍👧', color: '#F7B731', bg: '#FFF7E6' }
    ],

    // ALPHABET with Phonics and Word
    alphabet: [
        { id: 'a', letter: 'A', letterSmall: 'a', en: 'Apple', vn: 'Quả Táo', ipa: '/ˈæp.əl/', emoji: '🍎', soundHint: 'A says /æ/ like Apple', img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6caa6?w=600&auto=format&fit=crop&q=80', sentence: 'The red apple is sweet!' },
        { id: 'b', letter: 'B', letterSmall: 'b', en: 'Bear', vn: 'Con Gấu', ipa: '/beər/', emoji: '🐻', soundHint: 'B says /b/ like Bear', img: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=600&auto=format&fit=crop&q=80', sentence: 'The brown bear waves hello!' },
        { id: 'c', letter: 'C', letterSmall: 'c', en: 'Cat', vn: 'Con Mèo', ipa: '/kæt/', emoji: '🐱', soundHint: 'C says /k/ like Cat', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80', sentence: 'The little cat says Meow!' },
        { id: 'd', letter: 'D', letterSmall: 'd', en: 'Dog', vn: 'Con Chó', ipa: '/dɒɡ/', emoji: '🐶', soundHint: 'D says /d/ like Dog', img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80', sentence: 'The friendly dog says Woof!' },
        { id: 'e', letter: 'E', letterSmall: 'e', en: 'Elephant', vn: 'Con Voi', ipa: '/ˈel.ɪ.fənt/', emoji: '🐘', soundHint: 'E says /e/ like Elephant', img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&auto=format&fit=crop&q=80', sentence: 'The big elephant has a long trunk!' },
        { id: 'f', letter: 'F', letterSmall: 'f', en: 'Fish', vn: 'Con Cá', ipa: '/fɪʃ/', emoji: '🐟', soundHint: 'F says /f/ like Fish', img: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be1?w=600&auto=format&fit=crop&q=80', sentence: 'The golden fish swims happily!' },
        { id: 'g', letter: 'G', letterSmall: 'g', en: 'Giraffe', vn: 'Hươu Cao Cổ', ipa: '/dʒɪˈrɑːf/', emoji: '🦒', soundHint: 'G says /dʒ/ like Giraffe', img: 'https://images.unsplash.com/photo-1538121609141-b84518423fef?w=600&auto=format&fit=crop&q=80', sentence: 'The giraffe has a tall neck!' },
        { id: 'h', letter: 'H', letterSmall: 'h', en: 'Horse', vn: 'Con Ngựa', ipa: '/hɔːs/', emoji: '🐴', soundHint: 'H says /h/ like Horse', img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80', sentence: 'The strong horse runs fast!' },
        { id: 'i', letter: 'I', letterSmall: 'i', en: 'Ice cream', vn: 'Kem Mát Lạnh', ipa: '/ˈaɪs ˌkriːm/', emoji: '🍦', soundHint: 'I says /aɪ/ like Ice cream', img: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&auto=format&fit=crop&q=80', sentence: 'Ice cream is cold and yummy!' },
        { id: 'j', letter: 'J', letterSmall: 'j', en: 'Juice', vn: 'Nước Ép Trái Cây', ipa: '/dʒuːs/', emoji: '🧃', soundHint: 'J says /dʒ/ like Juice', img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80', sentence: 'Orange juice is full of vitamins!' },
        { id: 'k', letter: 'K', letterSmall: 'k', en: 'Kite', vn: 'Con Diều', ipa: '/kaɪt/', emoji: '🪁', soundHint: 'K says /k/ like Kite', img: 'https://images.unsplash.com/photo-1516083684046-efe4393a52f4?w=600&auto=format&fit=crop&q=80', sentence: 'The colorful kite flies in the sky!' },
        { id: 'l', letter: 'L', letterSmall: 'l', en: 'Lion', vn: 'Sư Tử', ipa: '/ˈlaɪ.ən/', emoji: '🦁', soundHint: 'L says /l/ like Lion', img: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=600&auto=format&fit=crop&q=80', sentence: 'The king lion roars proudly!' },
        { id: 'm', letter: 'M', letterSmall: 'm', en: 'Monkey', vn: 'Con Khỉ', ipa: '/ˈmʌŋ.ki/', emoji: '🐒', soundHint: 'M says /m/ like Monkey', img: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=600&auto=format&fit=crop&q=80', sentence: 'The playful monkey loves bananas!' },
        { id: 'n', letter: 'N', letterSmall: 'n', en: 'Nest', vn: 'Tổ Chim', ipa: '/nest/', emoji: '🪺', soundHint: 'N says /n/ like Nest', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80', sentence: 'Baby birds rest in the nest!' },
        { id: 'o', letter: 'O', letterSmall: 'o', en: 'Orange', vn: 'Quả Cam', ipa: '/ˈɒr.ɪndʒ/', emoji: '🍊', soundHint: 'O says /ɒ/ like Orange', img: 'https://images.unsplash.com/photo-1547514701-427221017958?w=600&auto=format&fit=crop&q=80', sentence: 'The sweet orange is round!' },
        { id: 'p', letter: 'P', letterSmall: 'p', en: 'Panda', vn: 'Gấu Trúc', ipa: '/ˈpæn.də/', emoji: '🐼', soundHint: 'P says /p/ like Panda', img: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?w=600&auto=format&fit=crop&q=80', sentence: 'Sunny Panda loves fresh bamboo!' },
        { id: 'q', letter: 'Q', letterSmall: 'q', en: 'Queen', vn: 'Nữ Hoàng', ipa: '/kwiːn/', emoji: '👑', soundHint: 'Q says /kw/ like Queen', img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80', sentence: 'The queen wears a shiny crown!' },
        { id: 'r', letter: 'R', letterSmall: 'r', en: 'Rabbit', vn: 'Chú Thỏ', ipa: '/ˈræb.ɪt/', emoji: '🐰', soundHint: 'R says /r/ like Rabbit', img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&auto=format&fit=crop&q=80', sentence: 'The cute rabbit hops softly!' },
        { id: 's', letter: 'S', letterSmall: 's', en: 'Sun', vn: 'Mặt Trời', ipa: '/sʌn/', emoji: '☀️', soundHint: 'S says /s/ like Sun', img: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&auto=format&fit=crop&q=80', sentence: 'The bright sun shines warm today!' },
        { id: 't', letter: 'T', letterSmall: 't', en: 'Tiger', vn: 'Con Hổ', ipa: '/ˈtaɪ.ɡər/', emoji: '🐯', soundHint: 'T says /t/ like Tiger', img: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=600&auto=format&fit=crop&q=80', sentence: 'The brave tiger has nice stripes!' },
        { id: 'u', letter: 'U', letterSmall: 'u', en: 'Umbrella', vn: 'Chiếc Ô', ipa: '/ʌmˈbrel.ə/', emoji: '☂️', soundHint: 'U says /ʌ/ like Umbrella', img: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80', sentence: 'Open the umbrella in the rain!' },
        { id: 'v', letter: 'V', letterSmall: 'v', en: 'Van', vn: 'Xe Tải Nhỏ', ipa: '/væn/', emoji: '🚐', soundHint: 'V says /v/ like Van', img: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=600&auto=format&fit=crop&q=80', sentence: 'The family van goes on a trip!' },
        { id: 'w', letter: 'W', letterSmall: 'w', en: 'Watermelon', vn: 'Dưa Hấu', ipa: '/ˈwɔː.təˌmel.ən/', emoji: '🍉', soundHint: 'W says /w/ like Watermelon', img: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=600&auto=format&fit=crop&q=80', sentence: 'Juicy watermelon is delicious!' },
        { id: 'x', letter: 'X', letterSmall: 'x', en: 'Xylophone', vn: 'Đàn Gõ Mộc Cầm', ipa: '/ˈzaɪ.lə.fəʊn/', emoji: '🎼', soundHint: 'X says /ks/ or /z/ like Xylophone', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80', sentence: 'Tap the xylophone: ding dong bell!' },
        { id: 'y', letter: 'Y', letterSmall: 'y', en: 'Yogurt', vn: 'Sữa Chua', ipa: '/ˈjɒɡ.ət/', emoji: '🥣', soundHint: 'Y says /j/ like Yogurt', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80', sentence: 'Sweet yogurt is healthy for baby!' },
        { id: 'z', letter: 'Z', letterSmall: 'z', en: 'Zebra', vn: 'Ngựa Vằn', ipa: '/ˈzeb.rə/', emoji: '🦓', soundHint: 'Z says /z/ like Zebra', img: 'https://images.unsplash.com/photo-1526095179574-86e545346ae6?w=600&auto=format&fit=crop&q=80', sentence: 'The black and white zebra runs!' }
    ],

    // NUMBERS 1-20
    numbers: [
        { num: 1, en: 'One', vn: 'Số Một', ipa: '/wʌn/', emoji: '⭐', countIcon: '🍎', sentence: 'One red apple for Panda!' },
        { num: 2, en: 'Two', vn: 'Số Hai', ipa: '/tuː/', emoji: '⭐⭐', countIcon: '🐱', sentence: 'Two cute little cats!' },
        { num: 3, en: 'Three', vn: 'Số Ba', ipa: '/θriː/', emoji: '⭐⭐⭐', countIcon: '🎈', sentence: 'Three floating balloons!' },
        { num: 4, en: 'Four', vn: 'Số Bốn', ipa: '/fɔːr/', emoji: '⭐⭐⭐⭐', countIcon: '🚗', sentence: 'Four fast toy cars!' },
        { num: 5, en: 'Five', vn: 'Số Năm', ipa: '/faɪv/', emoji: '⭐⭐⭐⭐⭐', countIcon: '🌸', sentence: 'Five pretty pink flowers!' },
        { num: 6, en: 'Six', vn: 'Số Sáu', ipa: '/sɪks/', emoji: '🌟🌟🌟🌟🌟🌟', countIcon: '🍓', sentence: 'Six sweet strawberries!' },
        { num: 7, en: 'Seven', vn: 'Số Bảy', ipa: '/ˈsev.ən/', emoji: '🌟🌟🌟🌟🌟🌟🌟', countIcon: '🌈', sentence: 'Seven colors in the rainbow!' },
        { num: 8, en: 'Eight', vn: 'Số Tám', ipa: '/eɪt/', emoji: '🌟🌟🌟🌟🌟🌟🌟🌟', countIcon: '🐥', sentence: 'Eight baby yellow ducks!' },
        { num: 9, en: 'Nine', vn: 'Số Chín', ipa: '/naɪn/', emoji: '🌟🌟🌟🌟🌟🌟🌟🌟🌟', countIcon: '🦋', sentence: 'Nine flying butterflies!' },
        { num: 10, en: 'Ten', vn: 'Số Mười', ipa: '/ten/', emoji: '🔟', countIcon: '🐼', sentence: 'Ten happy panda friends!' },
        { num: 11, en: 'Eleven', vn: 'Số Mười Một', ipa: '/ɪˈlev.ən/', emoji: '1️⃣1️⃣', countIcon: '🎋', sentence: 'Eleven crunchy bamboo sticks!' },
        { num: 12, en: 'Twelve', vn: 'Số Mười Hai', ipa: '/twelv/', emoji: '1️⃣2️⃣', countIcon: '🧁', sentence: 'Twelve yummy cupcakes!' },
        { num: 13, en: 'Thirteen', vn: 'Số Mười Ba', ipa: '/ˌθɜːˈtiːn/', emoji: '1️⃣3️⃣', countIcon: '🍬', sentence: 'Thirteen sweet candy pieces!' },
        { num: 14, en: 'Fourteen', vn: 'Số Mười Bốn', ipa: '/ˌfɔːˈtiːn/', emoji: '1️⃣4️⃣', countIcon: '🍒', sentence: 'Fourteen juicy cherries!' },
        { num: 15, en: 'Fifteen', vn: 'Số Mười Lăm', ipa: '/ˌfɪfˈtiːn/', emoji: '1️⃣5️⃣', countIcon: '⭐', sentence: 'Fifteen shining bright stars!' },
        { num: 16, en: 'Sixteen', vn: 'Số Mười Sáu', ipa: '/ˌsɪkˈstiːn/', emoji: '1️⃣6️⃣', countIcon: '🍉', sentence: 'Sixteen pieces of watermelon!' },
        { num: 17, en: 'Seventeen', vn: 'Số Mười Bảy', ipa: '/ˌsev.ənˈtiːn/', emoji: '1️⃣7️⃣', countIcon: '🍌', sentence: 'Seventeen sweet bananas!' },
        { num: 18, en: 'Eighteen', vn: 'Số Mười Tám', ipa: '/ˌeɪˈtiːn/', emoji: '1️⃣8️⃣', countIcon: '🥕', sentence: 'Eighteen orange carrots!' },
        { num: 19, en: 'Nineteen', vn: 'Số Mười Chín', ipa: '/ˌnaɪnˈtiːn/', emoji: '1️⃣9️⃣', countIcon: '🍇', sentence: 'Nineteen purple grapes!' },
        { num: 20, en: 'Twenty', vn: 'Số Hai Mươi', ipa: '/ˈtwen.ti/', emoji: '2️⃣0️⃣', countIcon: '🎈', sentence: 'Twenty party balloons in the sky!' }
    ],

    // ANIMALS
    animals: [
        { id: 'panda', en: 'Panda', vn: 'Gấu Trúc', ipa: '/ˈpæn.də/', emoji: '🐼', soundType: 'happy', img: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?w=600&auto=format&fit=crop&q=80', sentence: 'Panda Sunny loves to cuddle!' },
        { id: 'dog', en: 'Dog', vn: 'Con Chó', ipa: '/dɒɡ/', emoji: '🐶', soundType: 'bark', img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80', sentence: 'The puppy wags its tail!' },
        { id: 'cat', en: 'Cat', vn: 'Con Mèo', ipa: '/kæt/', emoji: '🐱', soundType: 'meow', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80', sentence: 'The kitten is sleeping softly.' },
        { id: 'lion', en: 'Lion', vn: 'Sư Tử', ipa: '/ˈlaɪ.ən/', emoji: '🦁', soundType: 'roar', img: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=600&auto=format&fit=crop&q=80', sentence: 'The lion has a big mane!' },
        { id: 'elephant', en: 'Elephant', vn: 'Con Voi', ipa: '/ˈel.ɪ.fənt/', emoji: '🐘', soundType: 'trumpet', img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&auto=format&fit=crop&q=80', sentence: 'The big elephant loves water!' },
        { id: 'monkey', en: 'Monkey', vn: 'Con Khỉ', ipa: '/ˈmʌŋ.ki/', emoji: '🐒', soundType: 'chitter', img: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=600&auto=format&fit=crop&q=80', sentence: 'The monkey swings on the tree!' },
        { id: 'rabbit', en: 'Rabbit', vn: 'Chú Thỏ', ipa: '/ˈræb.ɪt/', emoji: '🐰', soundType: 'squeak', img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&auto=format&fit=crop&q=80', sentence: 'The white rabbit has long ears!' },
        { id: 'duck', en: 'Duck', vn: 'Con Vịt', ipa: '/dʌk/', emoji: '🦆', soundType: 'quack', img: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=600&auto=format&fit=crop&q=80', sentence: 'The duck says: Quack quack quack!' },
        { id: 'pig', en: 'Pig', vn: 'Con Heo (Lợn)', ipa: '/pɪɡ/', emoji: '🐷', soundType: 'oink', img: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&auto=format&fit=crop&q=80', sentence: 'The pink pig plays happily!' },
        { id: 'cow', en: 'Cow', vn: 'Con Bò Sữa', ipa: '/kaʊ/', emoji: '🐮', soundType: 'moo', img: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=600&auto=format&fit=crop&q=80', sentence: 'The cow gives fresh tasty milk!' },
        { id: 'dolphin', en: 'Dolphin', vn: 'Cá Heo', ipa: '/ˈdɒl.fɪn/', emoji: '🐬', soundType: 'splash', img: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=600&auto=format&fit=crop&q=80', sentence: 'The smart dolphin jumps over waves!' },
        { id: 'penguin', en: 'Penguin', vn: 'Chim Cánh Cụt', ipa: '/ˈpeŋ.ɡwɪn/', emoji: '🐧', soundType: 'waddle', img: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=600&auto=format&fit=crop&q=80', sentence: 'The cute penguin waddles on ice!' }
    ],

    // FRUITS & FOOD
    fruits: [
        { id: 'apple', en: 'Apple', vn: 'Quả Táo', ipa: '/ˈæp.əl/', emoji: '🍎', img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6caa6?w=600&auto=format&fit=crop&q=80', sentence: 'An apple a day is good for you!' },
        { id: 'banana', en: 'Banana', vn: 'Quả Chuối', ipa: '/bəˈnɑː.nə/', emoji: '🍌', img: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=600&auto=format&fit=crop&q=80', sentence: 'Sweet yellow banana is yummy!' },
        { id: 'orange_fruit', en: 'Orange', vn: 'Quả Cam', ipa: '/ˈɒr.ɪndʒ/', emoji: '🍊', img: 'https://images.unsplash.com/photo-1547514701-427221017958?w=600&auto=format&fit=crop&q=80', sentence: 'Round juicy orange with sweet juice!' },
        { id: 'strawberry', en: 'Strawberry', vn: 'Quả Dâu Tây', ipa: '/ˈstrɔː.bər.i/', emoji: '🍓', img: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80', sentence: 'Bright red strawberry is super sweet!' },
        { id: 'watermelon', en: 'Watermelon', vn: 'Quả Dưa Hấu', ipa: '/ˈwɔː.təˌmel.ən/', emoji: '🍉', img: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=600&auto=format&fit=crop&q=80', sentence: 'Cool watermelon slices on summer days!' },
        { id: 'grape', en: 'Grape', vn: 'Quả Nho', ipa: '/ɡreɪp/', emoji: '🍇', img: 'https://images.unsplash.com/photo-1596363505729-41f7a4768820?w=600&auto=format&fit=crop&q=80', sentence: 'A bunch of purple round grapes!' },
        { id: 'mango', en: 'Mango', vn: 'Quả Xoài', ipa: '/ˈmæŋ.ɡəʊ/', emoji: '🥭', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80', sentence: 'Ripe mango smells so wonderful!' },
        { id: 'carrot', en: 'Carrot', vn: 'Củ Cà Rốt', ipa: '/ˈkær.ət/', emoji: '🥕', img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=80', sentence: 'Crisp orange carrot for little bunny!' },
        { id: 'corn', en: 'Corn', vn: 'Bắp Ngô', ipa: '/kɔːn/', emoji: '🌽', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80', sentence: 'Sweet golden corn is delicious!' },
        { id: 'bamboo', en: 'Bamboo', vn: 'Cây Tre / Trúc', ipa: '/bæmˈbuː/', emoji: '🎋', img: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=80', sentence: 'Panda Sunny loves eating green bamboo!' }
    ],

    // VEHICLES
    vehicles: [
        { id: 'car', en: 'Car', vn: 'Ô Tô', ipa: '/kɑːr/', emoji: '🚗', soundType: 'beep', img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80', sentence: 'The red car goes beep beep!' },
        { id: 'bus', en: 'Bus', vn: 'Xe Buýt', ipa: '/bʌs/', emoji: '🚌', soundType: 'horn', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80', sentence: 'The school bus takes kids to school!' },
        { id: 'train', en: 'Train', vn: 'Tàu Hỏa', ipa: '/treɪn/', emoji: '🚂', soundType: 'choo', img: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&auto=format&fit=crop&q=80', sentence: 'Choo choo! The train runs on tracks!' },
        { id: 'airplane', en: 'Airplane', vn: 'Máy Bay', ipa: '/ˈeə.pleɪn/', emoji: '✈️', soundType: 'whoosh', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80', sentence: 'The airplane flies high above clouds!' },
        { id: 'helicopter', en: 'Helicopter', vn: 'Trực Thăng', ipa: '/ˈhel.ɪˌkɒp.tər/', emoji: '🚁', soundType: 'rotor', img: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop&q=80', sentence: 'The helicopter spins its blades fast!' },
        { id: 'bicycle', en: 'Bicycle', vn: 'Xe Đạp', ipa: '/ˈbaɪ.sɪ.kəl/', emoji: '🚲', soundType: 'ring', img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=80', sentence: 'Ring ring! Ride the bicycle in the park!' },
        { id: 'boat', en: 'Boat', vn: 'Tàu Thủy / Thuyền', ipa: '/bəʊt/', emoji: '⛵', soundType: 'splash', img: 'https://images.unsplash.com/photo-1561021463-b82755e1c8ce?w=600&auto=format&fit=crop&q=80', sentence: 'The boat sails gently on the blue sea!' },
        { id: 'rocket', en: 'Rocket', vn: 'Tên Lửa', ipa: '/ˈrɒk.ɪt/', emoji: '🚀', soundType: 'blast', img: 'https://images.unsplash.com/photo-1517976487502-5f79c948b045?w=600&auto=format&fit=crop&q=80', sentence: '3, 2, 1, blast off! Rocket to space!' }
    ],

    // COLORS & SHAPES
    colors: [
        { id: 'red', en: 'Red', vn: 'Màu Đỏ', ipa: '/red/', emoji: '🔴', hex: '#FF4757', sentence: 'Red like a sweet strawberry!' },
        { id: 'blue', en: 'Blue', vn: 'Màu Xanh Dương', ipa: '/bluː/', emoji: '🔵', hex: '#2ED573', sentence: 'Blue like the ocean and clear sky!' },
        { id: 'green', en: 'Green', vn: 'Màu Xanh Lá', ipa: '/ɡriːn/', emoji: '🟢', hex: '#2ED573', sentence: 'Green like fresh grass and leaves!' },
        { id: 'yellow', en: 'Yellow', vn: 'Màu Vàng', ipa: '/ˈjel.əʊ/', emoji: '🟡', hex: '#FFA502', sentence: 'Yellow like the warm golden sun!' },
        { id: 'pink', en: 'Pink', vn: 'Màu Hồng', ipa: '/pɪŋk/', emoji: '🌸', hex: '#FF6B81', sentence: 'Pink like beautiful blossoms!' },
        { id: 'purple', en: 'Purple', vn: 'Màu Tím', ipa: '/ˈpɜː.pəl/', emoji: '🟣', hex: '#8854D0', sentence: 'Purple like delicious sweet grapes!' },
        { id: 'orange_col', en: 'Orange', vn: 'Màu Cam', ipa: '/ˈɒr.ɪndʒ/', emoji: '🟠', hex: '#FF7F50', sentence: 'Orange like a crunchy carrot!' },
        { id: 'circle', en: 'Circle', vn: 'Hình Tròn', ipa: '/ˈsɜː.kəl/', emoji: '⚪', hex: '#1E90FF', sentence: 'A circle is round like a clock!' },
        { id: 'square', en: 'Square', vn: 'Hình Vuông', ipa: '/skweər/', emoji: '⏹️', hex: '#2ED573', sentence: 'A square has four equal sides!' },
        { id: 'triangle', en: 'Triangle', vn: 'Hình Tam Giác', ipa: '/ˈtraɪ.æŋ.ɡəl/', emoji: '🔺', hex: '#FFA502', sentence: 'A triangle has three sharp corners!' },
        { id: 'star_shape', en: 'Star', vn: 'Hình Ngôi Sao', ipa: '/stɑːr/', emoji: '⭐', hex: '#FFD700', sentence: 'A twinkling star shines in the night!' },
        { id: 'heart', en: 'Heart', vn: 'Hình Trái Tim', ipa: '/hɑːt/', emoji: '💖', hex: '#FF4757', sentence: 'A sweet heart means love and care!' }
    ],

    // MY BODY
    body: [
        { id: 'eyes', en: 'Eyes', vn: 'Đôi Mắt', ipa: '/aɪz/', emoji: '👀', sentence: 'Two bright eyes to see the world!' },
        { id: 'ears', en: 'Ears', vn: 'Đôi Tai', ipa: '/ɪəz/', emoji: '👂', sentence: 'Two ears to listen to lovely music!' },
        { id: 'nose', en: 'Nose', vn: 'Chiếc Mũi', ipa: '/nəʊz/', emoji: '👃', sentence: 'One nose to smell sweet flowers!' },
        { id: 'mouth', en: 'Mouth', vn: 'Miệng Xinh', ipa: '/maʊθ/', emoji: '👄', sentence: 'A smiling mouth to say sweet words!' },
        { id: 'hands', en: 'Hands', vn: 'Đôi Bàn Tay', ipa: '/hændz/', emoji: '👐', sentence: 'Two little hands clap clap clap!' },
        { id: 'feet', en: 'Feet', vn: 'Đôi Bàn Chân', ipa: '/fiːt/', emoji: '🦶', sentence: 'Two happy feet hop and jump!' },
        { id: 'head', en: 'Head', vn: 'Đầu', ipa: '/hed/', emoji: '👶', sentence: 'Nod your head: yes, yes, yes!' }
    ],

    // FAMILY
    family: [
        { id: 'mommy', en: 'Mommy', vn: 'Mẹ Yêu', ipa: '/ˈmɒm.i/', emoji: '👩', sentence: 'I love my sweet Mommy so much!' },
        { id: 'daddy', en: 'Daddy', vn: 'Bố Yêu', ipa: '/ˈdæd.i/', emoji: '👨', sentence: 'My strong Daddy gives great hugs!' },
        { id: 'baby', en: 'Baby', vn: 'Em Bé', ipa: '/ˈbeɪ.bi/', emoji: '👶', sentence: 'The cute baby giggles cheerfully!' },
        { id: 'brother', en: 'Brother', vn: 'Anh / Em Trai', ipa: '/ˈbrʌð.ər/', emoji: '👦', sentence: 'My brother plays toy cars with me!' },
        { id: 'sister', en: 'Sister', vn: 'Chị / Em Gái', ipa: '/ˈsɪs.tər/', emoji: '👧', sentence: 'My sister sings funny songs with me!' },
        { id: 'grandma', en: 'Grandma', vn: 'Bà Yêu', ipa: '/ˈɡræn.mɑː/', emoji: '👵', sentence: 'Grandma tells the best bedtime stories!' },
        { id: 'grandpa', en: 'Grandpa', vn: 'Ông Yêu', ipa: '/ˈɡræn.pɑː/', emoji: '👴', sentence: 'Grandpa goes for gentle walks with me!' }
    ],

    // PANDA STICKERS / BADGES UNLOCKABLE WITH STARS
    stickers: [
        { id: 'stk_baby', name: 'Panda Bé Nhỏ', en: 'Baby Panda', icon: '🐼', reqStars: 0, unlocked: true, desc: 'Người bạn đồng hành dễ thương nhất!' },
        { id: 'stk_bamboo', name: 'Panda Ăn Trúc', en: 'Bamboo Panda', icon: '🎋', reqStars: 10, unlocked: false, desc: 'Ngon tuyệt cú mèo!' },
        { id: 'stk_chef', name: 'Panda Đầu Bếp', en: 'Chef Panda', icon: '👨‍🍳', reqStars: 25, unlocked: false, desc: 'Nấu món ngon cho bé!' },
        { id: 'stk_astro', name: 'Panda Phi Hành Gia', en: 'Astronaut Panda', icon: '🚀', reqStars: 45, unlocked: false, desc: 'Bay vào vũ trụ khám phá!' },
        { id: 'stk_super', name: 'Panda Siêu Nhân', en: 'Superhero Panda', icon: '🦸', reqStars: 70, unlocked: false, desc: 'Bảo vệ thế giới tuổi thơ!' },
        { id: 'stk_artist', name: 'Panda Họa Sĩ', en: 'Artist Panda', icon: '🎨', reqStars: 100, unlocked: false, desc: 'Vẽ nên muôn màu rực rỡ!' },
        { id: 'stk_music', name: 'Panda Ca Sĩ', en: 'Rockstar Panda', icon: '🎸', reqStars: 140, unlocked: false, desc: 'Cất cao giọng hát đáng yêu!' },
        { id: 'stk_king', name: 'Panda Vua Nhí', en: 'Panda King', icon: '👑', reqStars: 180, unlocked: false, desc: 'Vương miện cho bé chăm học!' },
        { id: 'stk_dino', name: 'Panda Khủng Long', en: 'Dino Panda', icon: '🦖', reqStars: 230, unlocked: false, desc: 'Dũng cảm và mạnh mẽ!' },
        { id: 'stk_cup', name: 'Panda Vô Địch', en: 'Champion Panda', icon: '🏆', reqStars: 300, unlocked: false, desc: 'Bé là ngôi sao tiếng Anh số 1!' }
    ]
};

// Helper to get all vocabulary flattened
function getAllWords() {
    let all = [];
    const keys = ['alphabet', 'numbers', 'animals', 'fruits', 'vehicles', 'colors', 'body', 'family'];
    keys.forEach(k => {
        if (PANDA_DATABASE[k]) {
            all = all.concat(PANDA_DATABASE[k].map(item => ({ ...item, categoryKey: k })));
        }
    });
    return all;
}
