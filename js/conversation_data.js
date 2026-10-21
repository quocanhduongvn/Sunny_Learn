/**
 * SUNNY PANDA - Basic English Conversation Database for Kids (4-5 Years Old)
 * Curated daily conversational phrases, role-play dialogues, and phonics
 */

const PANDA_CONVERSATIONS = {
    topics: [
        {
            id: 'greetings',
            name: 'Chào Hỏi & Làm Quen',
            nameEn: 'Greetings & Friends',
            icon: '👋',
            color: '#FF6B6B',
            bg: '#FFE3E3',
            phrases: [
                {
                    id: 'greet_1',
                    en: 'Hello!',
                    ipa: '/həˈloʊ/',
                    vn: 'Xin chào!',
                    emoji: '👋',
                    context: 'Nói khi gặp bạn bè hoặc thầy cô',
                    replyEn: 'Hello! Nice to see you!',
                    replyVn: 'Xin chào! Rất vui được gặp bạn!'
                },
                {
                    id: 'greet_2',
                    en: 'Good morning!',
                    ipa: '/ɡʊd ˈmɔːr.nɪŋ/',
                    vn: 'Chào buổi sáng!',
                    emoji: '🌅',
                    context: 'Chào ba mẹ khi bé thức dậy',
                    replyEn: 'Good morning, sweetie!',
                    replyVn: 'Chào buổi sáng, con yêu!'
                },
                {
                    id: 'greet_3',
                    en: 'What is your name?',
                    ipa: '/wʌt ɪz jʊər neɪm/',
                    vn: 'Bạn tên là gì?',
                    emoji: '🐼',
                    context: 'Khi muốn làm quen với bạn mới',
                    replyEn: 'My name is Sunny Panda!',
                    replyVn: 'Tớ là Gấu Trúc Sunny nè!'
                },
                {
                    id: 'greet_4',
                    en: 'My name is...',
                    ipa: '/maɪ neɪm ɪz/',
                    vn: 'Tên của tớ là...',
                    emoji: '⭐',
                    context: 'Bé giới thiệu tên của mình',
                    replyEn: 'Nice to meet you!',
                    replyVn: 'Rất vui được làm quen với bạn!'
                },
                {
                    id: 'greet_5',
                    en: 'How are you?',
                    ipa: '/haʊ ɑːr juː/',
                    vn: 'Bạn có khỏe không?',
                    emoji: '😊',
                    context: 'Hỏi thăm bạn bè',
                    replyEn: "I'm great, thank you!",
                    replyVn: 'Tớ rất khỏe, cảm ơn bạn!'
                },
                {
                    id: 'greet_6',
                    en: "I'm happy!",
                    ipa: '/aɪm ˈhæp.i/',
                    vn: 'Tớ đang rất vui!',
                    emoji: '🥰',
                    context: 'Bé chia sẻ niềm vui',
                    replyEn: 'Keep smiling, little friend!',
                    replyVn: 'Hãy luôn vui cười nhé!'
                },
                {
                    id: 'greet_7',
                    en: 'Goodbye! See you later!',
                    ipa: '/ɡʊdˈbaɪ siː juː ˈleɪ.tər/',
                    vn: 'Tạm biệt! Hẹn gặp lại nhé!',
                    emoji: '🙋‍♂️',
                    context: 'Khi ra về hoặc chào tạm biệt',
                    replyEn: 'Bye bye! Have a good day!',
                    replyVn: 'Tạm biệt bé! Chúc bé một ngày vui vẻ!'
                }
            ],
            dialogue: [
                { speaker: 'panda', text: 'Hello little friend! What is your name?', vn: 'Xin chào bạn nhỏ! Bạn tên là gì thế?', emoji: '🐼' },
                { speaker: 'kid', text: 'Hello! My name is Kid!', vn: 'Xin chào! Tên con là Em Bé ngoan!', emoji: '🧒' },
                { speaker: 'panda', text: 'Nice to meet you! How are you today?', vn: 'Rất vui được gặp bạn! Hôm nay bạn thế nào?', emoji: '🐼' },
                { speaker: 'kid', text: "I'm very happy and ready to play!", vn: 'Tớ đang rất vui và sẵn sàng chơi cùng bạn!', emoji: '🎉' }
            ]
        },
        {
            id: 'polite',
            name: 'Lời Hay & Lịch Sự',
            nameEn: 'Polite Words',
            icon: '🙏',
            color: '#4D96FF',
            bg: '#E1EFFF',
            phrases: [
                {
                    id: 'polite_1',
                    en: 'Thank you very much!',
                    ipa: '/θæŋk juː ˈver.i mʌtʃ/',
                    vn: 'Cảm ơn bạn rất nhiều!',
                    emoji: '🎁',
                    context: 'Khi được nhận quà hoặc được giúp đỡ',
                    replyEn: "You're very welcome!",
                    replyVn: 'Không có chi đâu bạn ơi!'
                },
                {
                    id: 'polite_2',
                    en: "You're welcome!",
                    ipa: '/jʊər ˈwel.kəm/',
                    vn: 'Không có gì đâu ạ!',
                    emoji: '🤝',
                    context: 'Đáp lại khi ai đó cảm ơn bé',
                    replyEn: 'You are so kind!',
                    replyVn: 'Bé thật là tốt bụng!'
                },
                {
                    id: 'polite_3',
                    en: "I'm sorry!",
                    ipa: '/aɪm ˈsɑːr.i/',
                    vn: 'Tớ xin lỗi bạn nhé!',
                    emoji: '🥺',
                    context: 'Khi bé lỡ làm sai hoặc va vào bạn',
                    replyEn: "That's okay, no problem!",
                    replyVn: 'Không sao đâu, bạn đừng buồn nhé!'
                },
                {
                    id: 'polite_4',
                    en: 'Please help me!',
                    ipa: '/pliːz help miː/',
                    vn: 'Làm ơn giúp con với ạ!',
                    emoji: '🆘',
                    context: 'Khi bé cần ba mẹ hoặc cô giáo hỗ trợ',
                    replyEn: "I'm right here to help you!",
                    replyVn: 'Ba mẹ ở đây để giúp con nè!'
                },
                {
                    id: 'polite_5',
                    en: 'Excuse me, please!',
                    ipa: '/ɪkˈskjuːz miː pliːz/',
                    vn: 'Xin phép cho con đi qua ạ!',
                    emoji: '🚶‍♂️',
                    context: 'Khi xin đường hoặc xin phép nói',
                    replyEn: 'Go ahead, sweetheart!',
                    replyVn: 'Mời con đi trước nè!'
                }
            ],
            dialogue: [
                { speaker: 'panda', text: 'Here is a sweet apple for you! 🍎', vn: 'Tớ tặng bạn quả táo đỏ ngọt lành nè!', emoji: '🐼' },
                { speaker: 'kid', text: 'Thank you very much, Sunny!', vn: 'Cảm ơn bạn Sunny rất nhiều nha!', emoji: '👧' },
                { speaker: 'panda', text: "You're welcome! Sharing is caring!", vn: 'Không có chi! Biết chia sẻ là rất đáng yêu!', emoji: '🐼' }
            ]
        },
        {
            id: 'meals',
            name: 'Ăn Uống Ngon Miệng',
            nameEn: 'Yummy Meals',
            icon: '🥪',
            color: '#FF9F45',
            bg: '#FFF0E0',
            phrases: [
                {
                    id: 'meal_1',
                    en: "I'm hungry!",
                    ipa: '/aɪm ˈhʌŋ.ɡri/',
                    vn: 'Con đói bụng rồi ạ!',
                    emoji: '🤤',
                    context: 'Khi đến giờ ăn cơm',
                    replyEn: "Let's eat some delicious food!",
                    replyVn: 'Cùng ăn món ngon thôi nào!'
                },
                {
                    id: 'meal_2',
                    en: "I'm thirsty!",
                    ipa: '/aɪm ˈθɜːr.sti/',
                    vn: 'Con khát nước rồi ạ!',
                    emoji: '🥛',
                    context: 'Khi bé muốn uống nước hoặc sữa',
                    replyEn: 'Here is some warm water for you!',
                    replyVn: 'Nước ấm của con đây nè!'
                },
                {
                    id: 'meal_3',
                    en: 'I want milk, please!',
                    ipa: '/aɪ wɑːnt mɪlk pliːz/',
                    vn: 'Con muốn uống sữa ạ!',
                    emoji: '🍼',
                    context: 'Khi bé xin sữa thơm ngon',
                    replyEn: 'A cup of milk for my baby!',
                    replyVn: 'Sữa thơm của bé đây nhé!'
                },
                {
                    id: 'meal_4',
                    en: "Yummy! It's so delicious!",
                    ipa: '/ˈjʌm.i ɪts soʊ dɪˈlɪʃ.əs/',
                    vn: 'Ngon tuyệt cú mèo luôn!',
                    emoji: '😋',
                    context: 'Khi thưởng thức món ăn bé thích',
                    replyEn: 'Eat well to grow big and strong!',
                    replyVn: 'Ăn giỏi để mau lớn và khỏe mạnh nha!'
                },
                {
                    id: 'meal_5',
                    en: "I'm full, thank you!",
                    ipa: '/aɪm fʊl θæŋk juː/',
                    vn: 'Con no căng bụng rồi, con cảm ơn ạ!',
                    emoji: '🤰',
                    context: 'Khi bé đã ăn xong bữa cơm',
                    replyEn: 'Good job eating all your food!',
                    replyVn: 'Bé ăn ngoan và giỏi lắm!'
                }
            ],
            dialogue: [
                { speaker: 'kid', text: 'Mommy, I am hungry! What is for dinner?', vn: 'Mẹ ơi con đói bụng rồi! Bữa tối có món gì thế ạ?', emoji: '👦' },
                { speaker: 'panda', text: 'Sunny has fresh bamboo and warm soup!', vn: 'Gấu Sunny có món súp rau củ ấm nóng này!', emoji: '🐼' },
                { speaker: 'kid', text: "Yummy! It's so delicious! I love it!", vn: 'Ngon quá đi thôi! Con thích lắm!', emoji: '👦' }
            ]
        },
        {
            id: 'playtime',
            name: 'Chơi Đùa & Kết Bạn',
            nameEn: 'Fun Playtime',
            icon: '🧸',
            color: '#6BCB77',
            bg: '#E4F9E8',
            phrases: [
                {
                    id: 'play_1',
                    en: "Let's play together!",
                    ipa: '/lets pleɪ təˈɡeð.ər/',
                    vn: 'Chúng mình cùng chơi với nhau nhé!',
                    emoji: '⚽',
                    context: 'Rủ bạn cùng chơi bóng hoặc đồ chơi',
                    replyEn: 'Yes! That sounds like fun!',
                    replyVn: 'Đồng ý luôn! Chơi vui lắm đây!'
                },
                {
                    id: 'play_2',
                    en: 'Can I share with you?',
                    ipa: '/kæn aɪ ʃer wɪð juː/',
                    vn: 'Tớ có thể chia sẻ cùng bạn không?',
                    emoji: '🧩',
                    context: 'Khi bé muốn chơi chung đồ chơi',
                    replyEn: 'Sure! Here you go!',
                    replyVn: 'Tất nhiên rồi! Của bạn một nửa nè!'
                },
                {
                    id: 'play_3',
                    en: "It's my turn!",
                    ipa: '/ɪts maɪ tɜːrn/',
                    vn: 'Đến lượt của tớ rồi nè!',
                    emoji: '🎲',
                    context: 'Khi xếp hàng hoặc chơi theo lượt',
                    replyEn: 'Go for it! You can do it!',
                    replyVn: 'Lên luôn bạn ơi! Cố lên nhé!'
                },
                {
                    id: 'play_4',
                    en: 'Good job, my friend!',
                    ipa: '/ɡʊd dʒɑːb maɪ frend/',
                    vn: 'Bạn làm giỏi lắm luôn!',
                    emoji: '👏',
                    context: 'Khen ngợi khi bạn làm được việc tốt',
                    replyEn: 'Thank you! You are awesome too!',
                    replyVn: 'Cảm ơn bạn! Bạn cũng siêu lắm!'
                },
                {
                    id: 'play_5',
                    en: 'Look at that! So cool!',
                    ipa: '/lʊk æt ðæt soʊ kuːl/',
                    vn: 'Nhìn kìa! Đẹp và thích quá!',
                    emoji: '🤩',
                    context: 'Khi nhìn thấy điều gì kỳ thú',
                    replyEn: 'Wow, look at all the colors!',
                    replyVn: 'Oa, nhiều màu sắc rực rỡ quá!'
                }
            ],
            dialogue: [
                { speaker: 'panda', text: "I have colorful building blocks! Let's play together!", vn: 'Tớ có bộ xếp hình khối màu sắc nè! Cùng chơi nha!', emoji: '🐼' },
                { speaker: 'kid', text: 'Can I share with you? I will build a castle!', vn: 'Tớ cùng xếp với bạn nhé? Tớ sẽ xây lâu đài!', emoji: '👧' },
                { speaker: 'panda', text: 'Good job! Our castle is beautiful!', vn: 'Tuyệt cú mèo! Lâu đài của chúng mình đẹp quá!', emoji: '🐼' }
            ]
        },
        {
            id: 'home',
            name: 'Ở Nhà & Gia Đình',
            nameEn: 'At Home & Bedtime',
            icon: '🏡',
            color: '#9B51E0',
            bg: '#F2E6FF',
            phrases: [
                {
                    id: 'home_1',
                    en: 'I love you, Mommy!',
                    ipa: '/aɪ lʌv juː ˈmɑː.mi/',
                    vn: 'Con yêu Mẹ nhiều lắm!',
                    emoji: '💖',
                    context: 'Bé thổ lộ tình cảm với Mẹ',
                    replyEn: 'I love you to the moon and back!',
                    replyVn: 'Mẹ yêu con nhiều như sao trên trời!'
                },
                {
                    id: 'home_2',
                    en: 'I love you, Daddy!',
                    ipa: '/aɪ lʌv juː ˈdæd.i/',
                    vn: 'Con yêu Bố nhiều lắm!',
                    emoji: '👨‍👧',
                    context: 'Bé thổ lộ tình cảm với Bố',
                    replyEn: 'Daddy loves you so much!',
                    replyVn: 'Bố cũng yêu bé cưng nhiều lắm!'
                },
                {
                    id: 'home_3',
                    en: 'Give me a hug, please!',
                    ipa: '/ɡɪv miː ə hʌɡ pliːz/',
                    vn: 'Ôm con một cái thật chặt nào!',
                    emoji: '🤗',
                    context: 'Khi bé muốn được ôm ấp yêu thương',
                    replyEn: 'Big warm hugs for you!',
                    replyVn: 'Cái ôm ấm áp nhất cho bé yêu!'
                },
                {
                    id: 'home_4',
                    en: 'Time to brush my teeth!',
                    ipa: '/taɪm tuː brʌʃ maɪ tiːθ/',
                    vn: 'Đến giờ đánh răng trắng tinh rồi!',
                    emoji: '🪥',
                    context: 'Vệ sinh răng miệng sạch sẽ',
                    replyEn: 'Brush up and down, nice and clean!',
                    replyVn: 'Đánh trên đánh dưới cho răng sạch bong!'
                },
                {
                    id: 'home_5',
                    en: 'Good night, sweet dreams!',
                    ipa: '/ɡʊd naɪt swiːt driːmz/',
                    vn: 'Chúc ngủ ngon, mơ những giấc mơ đẹp nhé!',
                    emoji: '🌙',
                    context: 'Lời chúc trước khi đi ngủ',
                    replyEn: 'Sleep tight, little angel!',
                    replyVn: 'Ngủ ngon nhé thiên thần nhỏ!'
                }
            ],
            dialogue: [
                { speaker: 'panda', text: 'The stars are shining! Time for bed, little star! ⭐', vn: 'Những ngôi sao đang lấp lánh rồi! Đến giờ ngủ rồi bé ơi!', emoji: '🐼' },
                { speaker: 'kid', text: 'I brush my teeth already! Good night, Sunny Panda!', vn: 'Con đánh răng xong rồi nè! Chúc gấu Sunny ngủ ngon nha!', emoji: '🧒' },
                { speaker: 'panda', text: 'Good night, sweet dreams! See you tomorrow!', vn: 'Chúc bé ngủ ngon, mơ giấc mơ đẹp! Hẹn gặp lại ngày mai!', emoji: '🐼' }
            ]
        },
        {
            id: 'questions',
            name: 'Hỏi Đáp Tò Mò',
            nameEn: 'Curious Questions',
            icon: '❓',
            color: '#FF78C4',
            bg: '#FFEBF5',
            phrases: [
                {
                    id: 'ques_1',
                    en: 'What is this?',
                    ipa: '/wʌt ɪz ðɪs/',
                    vn: 'Đây là cái gì thế ạ?',
                    emoji: '🔍',
                    context: 'Khi bé nhìn thấy đồ vật lạ và muốn biết',
                    replyEn: 'It is a friendly little panda!',
                    replyVn: 'Đó là một chú gấu trúc thân thiện nè!'
                },
                {
                    id: 'ques_2',
                    en: 'Where are you?',
                    ipa: '/wer ɑːr juː/',
                    vn: 'Bạn đang ở đâu đấy?',
                    emoji: '🙈',
                    context: 'Khi chơi trò trốn tìm ú òa',
                    replyEn: 'Here I am! Peek-a-boo!',
                    replyVn: 'Tớ ở đây nè! Ú òa!'
                },
                {
                    id: 'ques_3',
                    en: 'Can I have this, please?',
                    ipa: '/kæn aɪ hæv ðɪs pliːz/',
                    vn: 'Con có thể xin cái này được không ạ?',
                    emoji: '🎈',
                    context: 'Xin phép người lớn một cách lễ phép',
                    replyEn: 'Yes, of course, you may!',
                    replyVn: 'Tất nhiên rồi, con có thể lấy nè!'
                },
                {
                    id: 'ques_4',
                    en: 'What color is it?',
                    ipa: '/wʌt ˈkʌl.ər ɪz ɪt/',
                    vn: 'Nó có màu gì thế ạ?',
                    emoji: '🎨',
                    context: 'Hỏi về màu sắc của đồ vật',
                    replyEn: 'It is bright yellow like the sun!',
                    replyVn: 'Nó có màu vàng tươi như ánh mặt trời!'
                }
            ],
            dialogue: [
                { speaker: 'kid', text: 'Sunny, what is this funny green stick? 🎋', vn: 'Sunny ơi, que tre màu xanh ngộ nghĩnh này là gì vậy?', emoji: '👦' },
                { speaker: 'panda', text: 'It is fresh bamboo! My favorite food in the world!', vn: 'Đó là cành tre tươi đó! Món ăn khoái khẩu của tớ đấy!', emoji: '🐼' },
                { speaker: 'kid', text: 'Can I feed you the bamboo, please?', vn: 'Tớ có thể cho bạn ăn cành tre này được không?', emoji: '👦' },
                { speaker: 'panda', text: 'Yummy! Chomp chomp! Thank you so much!', vn: 'Ngon quá! Nhai chomp chomp! Cảm ơn bạn nhiều nhé!', emoji: '🐼' }
            ]
        }
    ]
};

// Global attachment
if (typeof window !== 'undefined') {
    window.PANDA_CONVERSATIONS = PANDA_CONVERSATIONS;
}
