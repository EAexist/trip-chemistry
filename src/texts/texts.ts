const TEXTS = {
    "_lang": "ko-kr",
    "public": {
        "emojis":{
            great: "😍",
            good: "😃",
            soso: "🤔",
            bad: "😤",
            troll: "😡",
        },
        "nations":{
            "JP": "일본",
            "HK": "홍콩",
            "KR": "한국",
        },
        "linkTypes":{
            "travel-japan": {
                name: "Travel Japan",
            },
            "tabelog": {
                name: "타베로그",
            },
            "tripadvisor": {
                name: "Tripadvisor",
            },
            "website": {
                name: "웹사이트",
            },
            "discovering-hongkong": {
                name: "홍콩관광청",
            },
        },
        "places":{
            tokyo:
                {
                    name: "도쿄",
                    nation: "JP",
                    link: "https://www.japan.travel/ko/destinations/kanto/tokyo/",
                    linkType: "travel-japan",
                },
            osaka:
                {
                    name: "오사카",
                    nation: "JP",
                    link: "https://www.japan.travel/ko/destinations/kansai/osaka/",
                    linkType: "travel-japan",
                },
            yokohama: 
                {
                    name: "요코하마",
                    nation: "JP",
                    link: "https://www.japan.travel/ko/destinations/kanto/kanagawa/yokohama-and-around/",
                    linkType: "travel-japan",
                },
                // 삿포로
            kyoto: 
                {
                    name: "교토",
                    nation: "JP",
                    link: "https://www.japan.travel/ko/destinations/kansai/kyoto/",
                    linkType: "travel-japan",
                },
            nara: 
                {
                    name: "나라",
                    nation: "JP",
                    link: "https://www.japan.travel/ko/destinations/kansai/nara/",
                    linkType: "travel-japan",
                },
            kamakura: 
                {
                    name: "가마쿠라",
                    nation: "JP",
                    link: "https://www.japan.travel/ko/destinations/kanto/kanagawa/kamakura-and-around/",
                    linkType: "travel-japan",
                },
                // 가와고에 가나자와
            shiretoko: 
                {
                    name: "시레토코",
                    nation: "JP",
                    link: "https://www.japan.travel/ko/spot/2143/",
                    linkType: "travel-japan",
                },
            yakushima: 
                {
                    name: "야쿠시마",
                    nation: "JP",
                    link: "https://www.japan.travel/ko/destinations/kyushu/kagoshima/yakushima/",
                    linkType: "travel-japan",
                }, 
            biei: 
                {
                    name: "비에이",
                    nation: "JP",
                    link: "https://www.japan.travel/ko/spot/1890/",
                    linkType: "travel-japan",
                },
            hongkong: 
                {
                    name: "홍콩",
                    nation: "HK",
                    link: "https://www.discoverhongkong.com/eng/index.html",
                    linkType: "discovering-hongkong",
                },
        },
        "pages": {
            "home": {
                "appTitle": "여행 케미 테스트",
                "loginButton": "(1초) 로그인하고 시작하기",
                "startButton": "로그인없이 시작하기",
                "infoTitle": "여행가는데 싸우고 싶지 않다면",
                "infoBody": "친구끼리, 연인끼리, 여행을 가는데 싸울까봐 걱정 된다고?\n서로의 여행 MBTI를 확인하고 다른 부분을 맞춰봐!"
            },
            "test": {
                "leadership": {
                    "title": "여행 계획은 누가 리드해?",
                    "subtitle": "리더",
                    "label": "리더",
                    "answers": [
                        {
                            "title": "내가 리드하기",
                            "detail": "나는 여행도 많이 다녀봤고 계획하는 걸 좋아하니까 내가 리드하는게 편해",
                            "imageTitle": "lead"
                        },
                        {
                            "title": "리더 없이 함께 준비하기",
                            "detail": "한 명이 리드하지 않아도 다 같이 이야기하면서 계획하는게 좋아",
                            "imageTitle": "co-work"
                        },
                        {
                            "title": "다른 사람이 리드해주기",
                            "detail": "불만 없이 열심히 의견 낼테니 누군가가 리드해주면 좋겠어",
                            "imageTitle": "placeholder"
                        }
                    ]

                },
                "schedule": {
                    "title": "일정은 얼마나 알차면 좋을까?",
                    "subtitle": "일정",
                    "label": "널널함",
                    // "credit": "재하(https://blog.naver.com/jcjw1234)님의 여행 계획",
                    "answers": [
                        {
                            "label": "아주 널널하게",
                            "value": 0
                        },
                        {
                            "label": "널널하게",
                            "value": 1
                        },
                        {
                            "label": "아무래도 상관 없어",
                            "value": 2
                        },
                        {
                            "label": "알차게",
                            "value": 3
                        },
                        {
                            "label": "매우 알차게",
                            "value": 4
                        }
                    ],
                    "exampleTitle": "후쿠오카 🇯🇵 여행 지도",
                    "startPosition": {            
                        lat:33.596306,
                        lng:130.4293798,
                    },
                    "examples": [
                        [
                            {                                
                                position:{
                                    lat:33.5897988,
                                    lng:130.4085279,
                                },
                                label:'캐널시티',
                                icon:'shopping_cart',                              
                            },
                            {                              
                                position:{
                                    lat:33.5897904,
                                    lng:130.3504891,
                                },
                                label:'후쿠오카시 박물관',
                                icon:'museum',   
                            },
                        ],
                        [       
                            {           
                                position:{
                                    lat:33.5838392,
                                    lng:130.4539866,
                                },
                                label:'덴푸라 히라오 본점',
                                icon:'restaurant',                    
                            },
                            {                                
                                position:{
                                    lat:33.6147611,
                                    lng:130.4216325,
                                },
                                label:'하코자키 궁',
                                icon:'temple_buddhist',                                  
                            },
                        ],
                        [
                            {              
                                position:{
                                    lat:33.5893684,
                                    lng:130.4172629,
                                },
                                label:'한큐백화점 하카타점',
                                icon:'shopping_cart',                                      
                            },    
                            {                                
                                position:{
                                    lat:33.5934691,
                                    lng:130.3465043,
                                },
                                label:'모모치해변',
                                icon:'beach_access',                              
                            },
                        ],
                        [
                            {                                
                                position:{
                                    lat:33.5932449,
                                    lng:130.4020225,
                                },
                                label:'이치란 본점',
                                icon:'restaurant',                              
                            },
                            {                                
                                position:{
                                    lat:33.5650103,
                                    lng:130.4388288,
                                },
                                label:'건담 파크 후쿠오카',
                                icon:'tour',     
                                                           
                            },
                        ],
                        [                 
                            {                                
                                position:{
                                    lat:33.5626837,
                                    lng:130.3738197,
                                },
                                label:'유센테이',
                                icon:'tour',                              
                            },
                            {      
                                position:{
                                    lat:33.6133009,
                                    lng:130.4307441,
                                },
                                label:'하쿠하쿠',
                                icon:'museum',                         
                            },
                        ]
                    ]
                },
                "budget": {
                    "subtitle": "예산",
                    "linkText": "에서 보기",
                    "defaultPriceText": "슬라이더를 움직여봐!",
                    "subTests": {
                        "food": {
                            "label": "예산",
                            "title": "한끼에 얼마나 쓰면 좋을까?",
                            "subtitle": "예산 - 식사",
                            "examples": {
                                5000:{
                                    "kyudong":
                                        {
                                            "name": "규동",
                                            "city": "일본",
                                            "restaurant": "yoshinoya",
                                            "restaurantName": "요시노야",
                                            "nation": "JP",
                                            "linkType": "website",
                                            "link": "https://www.yoshinoya.com/",
                                        },
                                    "wantang":
                                        {
                                            "name": "완탕면",
                                            "city": "홍콩",
                                            "restaurant": "tsim-chai-kee",
                                            "restaurantName": "침차이키",
                                            "nation": "HK",
                                            "linkType": "tripadvisor",
                                            "link": "https://www.tripadvisor.co.kr/Restaurant_Review-g294217-d1094369-Reviews-Tsim_Chai_Kee_Noodle_Shop-Hong_Kong.html",
                                        },                         
                                    "churos":
                                        {
                                            "name": "츄러스",
                                            "city": "홍콩",
                                            "restaurant": "twist&buckle",
                                            "restaurantName": "Twist & Buckle",
                                            "nation": "HK",
                                            "linkType": "website",
                                            "link": "https://www.twistandbuckle.com/",
                                        },

                                },
                                15000:{
                                    "ramen":
                                        {
                                            "name": "라멘",
                                            "city": "오사카",
                                            "restaurant": "iida-shouten-ramen",
                                            "restaurantName": "라멘 이이다쇼텐",
                                            "nation": "JP",
                                            "linkType": "tabelog",
                                            "link": "https://tabelog.com/en/kanagawa/A1410/A141002/14038776/",
                                        },   
                                    "udon":
                                        {
                                            "name": "우동",
                                            "city": "도쿄",
                                            "restaurant": "udon-maruka",
                                            "restaurantName": "우동 마루카",
                                            "nation": "JP",
                                            "linkType": "tabelog",
                                            "link": "https://tabelog.com/kr/osaka/A2707/A270704/27011240/",
                                        },         
                                    "dumpling":
                                        {
                                            "name": "딤섬",
                                            "city": "홍콩",
                                            "restaurant": "timhowan",
                                            "restaurantName": "팀호완",
                                            "nation": "HK",
                                            "linkType": "website",
                                            "link": "https://www.timhowan.com/",
                                        },                      
                                },
                                25000:{        
                                    "sushi":
                                        {
                                            "name": "초밥",
                                            "city": "삿포로",
                                            "restaurant": "nemuro-hanamaru",
                                            "restaurantName": "네무로 하나마루",
                                            "nation": "JP",
                                            "linkType": "tabelog",
                                            "link": "https://tabelog.com/kr/hokkaido/A0101/A010101/1001102/",
                                        },      
                                    "afternoon-tea":
                                        {
                                            "name": "애프터눈 티",
                                            "city": "홍콩",
                                            "restaurant": "peninsula-hk",
                                            "restaurantName": "페닌슐라 호텔 홍콩",
                                            "nation": "HK",
                                            "linkType": "website",
                                            "link": "https://www.peninsula.com/en/hong-kong/hotel-fine-dining/the-lobby-afternoon-tea",
                                        },   
                                },
                                50000:{    
                                    "hitsumabushi":
                                        {
                                            "name": "장어덮밥",
                                            "city": "도쿄",
                                            "restaurant": "tomoei",
                                            "restaurantName": "토모에이",
                                            "nation": "JP",
                                            "linkType": "tabelog",
                                            "link": "https://tabelog.com/en/kanagawa/A1410/A141001/14001626/",
                                        },    
                                    "yakitori":
                                        {
                                            "name": "야키토리",
                                            "city": "도쿄",
                                            "restaurant": "torishiki",
                                            "restaurantName": "토리시키",
                                            "nation": "JP",
                                            "linkType": "tabelog",
                                            "link": "https://tabelog.com/kr/tokyo/A1316/A131601/13041029/",
                                        },  
                                    "chili-crab":
                                        {
                                            "name": "칠리크랩",
                                            "city": "홍콩",
                                            "restaurant": "underbridge-spicy-crab",
                                            "restaurantName": "언더브릿지 스파이시 크랩",
                                            "nation": "HK",
                                            "linkType": "tripadvisor",
                                            "link": "https://www.tripadvisor.com/Restaurant_Review-g294217-d1089734-Reviews-Under_the_Bridge_Spicy_Crab-Hong_Kong.html",
                                        },   
                                },
                                75000:{    
                                    "mandarin-grill":                        
                                    {
                                        "name": "퓨전 파인다이닝",
                                        "city": "홍콩",
                                        "restaurant": "mandarin-grill",
                                        "restaurantName": "만다린 그릴",
                                        "price": 100000,
                                        "nation": "JP",
                                        "linkType": "website",
                                        "link": "https://www.mandarinoriental.com/en/hong-kong/victoria-harbour/dine/mandarin-grill-and-bar",
                                    },                                  
                                },
                            }
                        },
                        // "accomodateSpecial": {
                        //     "title": "하룻밤 묵는데 얼마나 쓰면 좋을까?",
                        //     "subtitle": "예산 - 숙소",
                        //     "linkType": "Hotels.com에서 보기",
                        //     "examples": {
                        //         20000: [
                        //             {
                        //                 "id": "iida-shouten-ramen",
                        //                 "name": "게로온센 스이메이칸",
                        //                 "city": "일본 중부",
                        //                 "room": "룸이름",
                        //                 "price": 200000,
                        //                 "priceText": "20만원~ (1인)",
                        //                 "nation": "JP",
                        //                 "link": "https://www.suimeikan.co.jp/ko/",
                        //             },
                        //         ],
                        //         60000: [
                        //             {
                        //                 "id": "tomoei",
                        //                 "name": "오타루 긴린소",
                        //                 "city": "훗카이도",
                        //                 "room": "룸이름",
                        //                 "price": 300000,
                        //                 "priceText": "60만원~ (2인)",
                        //                 "nation": "JP",
                        //                 "link": "https://www.ginrinsou.com/ko/"
                        //             },
                        //         ],
                        //     },
                        // },
                    },
                },
                "city": {
                    "title": "이런 곳은 어때?",
                    "subtitle": "여행지",
                    "linkText": "에서 보기",
                    "answers": [
                        {
                            "label": "-2",
                            "value": 0,
                            "quote": "싫어!",
                            "emoji": "😡" ,
                        },
                        {
                            "label": "-1",
                            "value": 1,
                            "quote": "별로야..",
                            "emoji": "😤",
                        },
                        {
                            "label": "0",
                            "value": 2,
                            "quote": "상관없어",
                            "emoji": "🤔",
                        },
                        {
                            "label": "1",
                            "value": 3,
                            "quote": "좋아",
                            "emoji": "😃" ,
                        },
                        {
                            "label": "2",
                            "value": 4,
                            "quote": "완전 내 취향!",
                            "emoji": "😍",
                        },
                    ],
                    "subTests": {
                        "metropolis": {
                            "title": "현대적인 대도시",
                            "id": "metropolis",
                            "examples": [
                                "tokyo",
                                "osaka",
                                "yokohama",
                                "hongkong",
                            ]
                            // 삿포로
                        },
                        "history": {
                            "title": "유서 깊은 대도시",
                            "id": "history",
                            "examples": [
                                "kyoto",
                                "nara",
                                "kamakura",
                            ]
                            // 가와고에 가나자와
                        },
                        "nature": {
                            "title": "자연경관이 아름다운 곳",
                            "label": "nature" ,
                            "examples": [
                                "shiretoko",
                                "yakushima",
                                "biei",
                            ] 
                        },
                        // {
                        //     "title": "한적한 시골마을",
                        //     "label": "country" 
                        // },
                    }
                },
                "activity": {
                    "title": "이런 활동은 어때?",
                    "subtitle": "즐기기",
                    "answers": [
                        {
                            "label": "-2",
                            "value": 0,
                            "quote": "싫어!",
                            "emoji": "😡" ,
                        },
                        {
                            "label": "-1",
                            "value": 1,
                            "quote": "별로야..",
                            "emoji": "😤",
                        },
                        {
                            "label": "0",
                            "value": 2,
                            "quote": "상관없어",
                            "emoji": "🤔",
                        },
                        {
                            "label": "1",
                            "value": 3,
                            "quote": "좋아",
                            "emoji": "😃",
                        },
                        {
                            "label": "2",
                            "value": 4,
                            "quote": "완전 내 취향!",
                            "emoji": "😍",
                        },
                    ],
                    "subTests": {
                        "food": {
                            "title": "식도락",
                            "id": "food",
                            "examples": ["tokyo", "osaka", "yokohama"]
                        },
                        "walk": {
                            "title": "주변 감상하며 걷기",
                            "id": "walk",
                            "examples": ["tokyo", "osaka", "yokohama"]
                        },
                        "photo": {
                            "title": "사진찍기",
                            "id": "photo",
                            "examples": ["kyoto", "nara", "kamakura"]
                        },
                        "shopping": {
                            "title": "쇼핑",
                            "label": "shopping",
                            "examples": ["shiretoko", "yakushima", "biei"] 
                        },
                        "museum": {
                            "title": "박물관 미술관",
                            "label": "museum",
                            "examples": ["shiretoko", "yakushima", "biei"] 
                        },
                        "themePark": {
                            "title": "테마파크",
                            "label": "themePark",
                            "examples": ["shiretoko", "yakushima", "biei"] 
                        },
                        // {
                        //     "title": "한적한 시골마을",
                        //     "label": "country" 
                        // },
                    }
                },
                "confirm": {
                    "label": "특별한 예산",
                    "title": "다시 답변하고 싶은 질문은 없는지 확인해봐"

                }
            },
            "result": {
                "steps": [
                    "내 여행 MBTI",
                    "추천 여행지",
                    "여행 케미 확인하기"
                ],
                "typeIntro": "내 여행 MBTI는",
                // "characterName" :  "부지런한 벌꿀형",
                // "characterPrefix" : "쉴 틈이 없어요",
                // "characterBody" : "부지런한 꿀벌형은 여행 준비, 교통편과 숙소 예매부터 철두철미하게 게획해요. 몸이 힘들더라도 여행지에서 해볼 수 있는 것들을 최대한 해보는 알찬 여행을 좋아한답니다.",
                // "tripTagList" : [ "자연경관", "하이킹", "꼼꼼한 계획", "알찬 일정"],
                "placeIntro": "나에게 잘 맞는 여행지는",
                // "placeListTitle" : "아름다운 자연경관, 산책과 하이킹 명소",
                "placeListIntro": "추천 여행지",
                "startChemistryIntro": "이제 친구랑 같이 떠나볼까?",
                "startChemistryTitle": "여행 케미 확인하기",
                "startChemistryButton": "여행 케미 확인하기",
                "startChemistryButtonTooltip": "\"친구 추가하기\" 버튼을 눌러 친구를 한 명 이상 추가해주세요.",
                "addFriendButton": "친구 추가하기",
                "addFriendDialog": {
                    "addByName": "닉네임으로 친구 추가하기",
                    "friendNameFormLabel": "닉네임을 입력하세요 (e.g. 우동#1234)",
                    "giveMyName": "친구에게 내 닉네임 알려주기",
                    "userApiMissMessage": "친구를 찾지 못했어요.\nID를 다시 확인해주세요.",
                    "userApiFailMessage": "현재 서버에 접속할 수 없어요.\n잠시 후 다시 시도해주세요.",
                    "add": "추가하기",
                    "confirm": "확인"
                },
                "prevButton": "테스트 다시하기",
                "placeCards": [
                    {
                        "title": "후쿠오카",
                        "body": "유제품, 과일, 각종 신선한 식재료와 음식이 넘쳐나고 자연경관이 멋진 하이킹 명소!",
                        "tags": ["자연경관", "하이킹"]
                    },
                    {
                        "title": "후쿠오카",
                        "body": "유제품, 과일, 각종 신선한 식재료와 음식이 넘쳐나고 자연경관이 멋진 하이킹 명소!",
                        "tags": ["자연경관", "하이킹"]
                    },
                    {
                        "title": "후쿠오카",
                        "body": "유제품, 과일, 각종 신선한 식재료와 음식이 넘쳐나고 자연경관이 멋진 하이킹 명소!",
                        "tags": ["자연경관", "하이킹"]
                    }
                ]
            },
            "chemistry": {
                "characeterTitle": "일행의 여행 MBTI 알아보기",
                "characeterSubtitle": "일행의 여행 MBTI를 통해 서로가 원하는 여행 스타일을 이해해봐요",
                "leadershipTitle": "이번 여행의 대장님은 누구?",
                "scheduleTitle": "일정은 얼마나 알차게 짤까?",
                "budgetTitle": "예산을 세워보자"

            }
        },
        "assets": {
            "home": {

            },
            "testUser": {

            },
            "result": {

            },
            "chemistry": {

            }

        }
    }
};

export default TEXTS;