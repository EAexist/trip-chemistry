const TEXTS = {
    "_lang": "ko-kr",
    "public": {
        "common":{
            linkText: "에서 보기",
            emoji:{
                great: "😍",
                good: "😃",
                soso: "🤔",
                bad: "😤",
                troll: "😡",
            },
            nation:{
                "jp": {
                    name: "일본",
                    flag: true
                },
                "hk": {
                    name: "홍콩",
                    flag: true
                },
                "kr": {
                    name: "한국",
                    flag: true
                },
                "sea": {
                    name: "동남아시아",
                    flag: false
                },
            },
            linkType:{
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
            city:{
                jp:
                    {
                        name: "일본 전역",
                        nation: "jp",
                        link: "https://www.japan.travel/ko/",
                        linkType: "travel-japan",
                    },
                tokyo:
                    {
                        name: "도쿄",
                        nation: "jp",
                        link: "https://www.japan.travel/ko/destinations/kanto/tokyo/",
                        linkType: "travel-japan",
                    },
                osaka:
                    {
                        name: "오사카",
                        nation: "jp",
                        link: "https://www.japan.travel/ko/destinations/kansai/osaka/",
                        linkType: "travel-japan",
                    },
                yokohama: 
                    {
                        name: "요코하마",
                        nation: "jp",
                        link: "https://www.japan.travel/ko/destinations/kanto/kanagawa/yokohama-and-around/",
                        linkType: "travel-japan",
                    },
                    // 삿포로
                kyoto: 
                    {
                        name: "교토",
                        nation: "jp",
                        link: "https://www.japan.travel/ko/destinations/kansai/kyoto/",
                        linkType: "travel-japan",
                    },
                nara: 
                    {
                        name: "나라",
                        nation: "jp",
                        link: "https://www.japan.travel/ko/destinations/kansai/nara/",
                        linkType: "travel-japan",
                    },
                kamakura: 
                    {
                        name: "가마쿠라",
                        nation: "jp",
                        link: "https://www.japan.travel/ko/destinations/kanto/kanagawa/kamakura-and-around/",
                        linkType: "travel-japan",
                    },
                    // 가와고에 가나자와
                shiretoko: 
                    {
                        name: "시레토코",
                        nation: "jp",
                        link: "https://www.japan.travel/ko/spot/2143/",
                        linkType: "travel-japan",
                    },
                yakushima: 
                    {
                        name: "야쿠시마",
                        nation: "jp",
                        link: "https://www.japan.travel/ko/destinations/kyushu/kagoshima/yakushima/",
                        linkType: "travel-japan",
                    }, 
                biei: 
                    {
                        name: "비에이",
                        nation: "jp",
                        link: "https://www.japan.travel/ko/spot/1890/",
                        linkType: "travel-japan",
                    },               
                sapporo: 
                    {
                        name: "삿포로",
                        nation: "jp",
                        // link: "https://www.discoverhongkong.com/eng/index.html",
                        // linkType: "discovering-hongkong",
                    },
                hongkong: 
                    {
                        name: "홍콩",
                        nation: "hk",
                        link: "https://www.discoverhongkong.com/eng/index.html",
                        linkType: "discovering-hongkong",
                    },
            },
        },
        "emojis":{
            great: "😍",
            good: "😃",
            soso: "🤔",
            bad: "😤",
            troll: "😡",
        },
        "nations":{
            "jp": "일본",
            "hk": "홍콩",
            "KR": "한국",
            "SEA": "동남아시아",
        },
        "linkType":{
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
        "topNav": {
            "home": "여행 케미 테스트",
            "test": "테스트",
            "result": "내 결과",
            "chemistry": "케미 보기",
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
                "leadership":{
                    "answers": {
                        0: {
                            "title": "내가 리드하기",
                            "detail": "나는 여행도 많이 다녀봤고 계획하는 걸 좋아하니까 내가 리드하는게 편해",
                            "imageTitle": "lead"
                        },
                        1: {
                            "title": "리더 없이 함께 준비하기",
                            "detail": "한 명이 리드하지 않아도 다 같이 이야기하면서 계획하는게 좋아",
                            "imageTitle": "co-work"
                        },
                        2: {
                            "title": "다른 사람이 리드해주기",
                            "detail": "불만 없이 열심히 의견 낼테니 누군가가 리드해주면 좋겠어",
                            "imageTitle": "placeholder"
                        }
                    },
                    "subTests": {
                        "leadership": {
                            "icon": "groups",
                            "title": "여행 계획은 누가 리드해?",
                            "subtitle": "리더",
                            "label": "리더",
                        },
                    },
                },
                "schedule": {
                    "answers": {
                        0: {
                            "label": "아주 널널하게",
                        },
                        1: {
                            "label": "널널하게",
                        },
                        2: {
                            "label": "아무래도 상관 없어",
                        },
                        3: {
                            "label": "알차게",
                        },
                        4: {
                            "label": "매우 알차게",
                        }
                    },
                    "sliderProps": {
                        "step": 1,
                        "min": 0,
                        "max": 4
                    },
                    "subTests":{
                        "schedule":{
                            "icon": "edit_calendar",
                            "title": "일정은 얼마나 알차면 좋을까?",
                            "subtitle": "일정",
                            "label": "널널함",
                            // "credit": "재하(https://blog.naver.com/jcjw1234)님의 여행 계획",
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
                        }
                    }
                },
                "budget": {
                    "subtitle": "예산",
                    "linkText": "에서 보기",
                    "defaultPriceText": "슬라이더를 움직여봐!",
                    "subTests": {
                        "food": {
                            "budgetLowerBounds": [
                                5000,
                                15000,
                                25000,
                                50000,
                            ],
                            "sliderProps": {
                                "step": 5000,
                                "min": 5000,
                                "max": 70000
                            },
                            "label": "먹을것",
                            "icon": "restaurant",
                            "title": "한끼에 얼마나 쓰면 좋을까?",
                            "subtitle": "예산 - 식사",
                            "examples": {
                                5000:{
                                    "kyudong":
                                        {
                                            "name": "규동",
                                            "city": "jp",
                                            "restaurant": "yoshinoya",
                                            "restaurantName": "요시노야",
                                            "nation": "jp",
                                            "linkType": "website",
                                            "link": "https://www.yoshinoya.com/",
                                        },
                                    "wantang":
                                        {
                                            "name": "완탕면",
                                            "city": "hongkong",
                                            "restaurant": "tsim-chai-kee",
                                            "restaurantName": "침차이키",
                                            "nation": "hk",
                                            "linkType": "tripadvisor",
                                            "link": "https://www.tripadvisor.co.kr/Restaurant_Review-g294217-d1094369-Reviews-Tsim_Chai_Kee_Noodle_Shop-Hong_Kong.html",
                                        },                         
                                    "churos":
                                        {
                                            "name": "츄러스",
                                            "city": "hongkong",
                                            "restaurant": "twist&buckle",
                                            "restaurantName": "Twist & Buckle",
                                            "nation": "hk",
                                            "linkType": "website",
                                            "link": "https://www.twistandbuckle.com/",
                                        },

                                },
                                15000:{
                                    "ramen":
                                        {
                                            "name": "라멘",
                                            "city": "osaka",
                                            "restaurant": "iida-shouten-ramen",
                                            "restaurantName": "라멘 이이다쇼텐",
                                            "nation": "jp",
                                            "linkType": "tabelog",
                                            "link": "https://tabelog.com/en/kanagawa/A1410/A141002/14038776/",
                                        },   
                                    "udon":
                                        {
                                            "name": "우동",
                                            "city": "tokyo",
                                            "restaurant": "udon-maruka",
                                            "restaurantName": "우동 마루카",
                                            "nation": "jp",
                                            "linkType": "tabelog",
                                            "link": "https://tabelog.com/kr/osaka/A2707/A270704/27011240/",
                                        },         
                                    "dumpling":
                                        {
                                            "name": "딤섬",
                                            "city": "hongkong",
                                            "restaurant": "timhowan",
                                            "restaurantName": "팀호완",
                                            "nation": "hk",
                                            "linkType": "website",
                                            "link": "https://www.timhowan.com/",
                                        },                      
                                },
                                25000:{        
                                    "sushi":
                                        {
                                            "name": "초밥",
                                            "city": "sapporo",
                                            "restaurant": "nemuro-hanamaru",
                                            "restaurantName": "네무로 하나마루",
                                            "nation": "jp",
                                            "linkType": "tabelog",
                                            "link": "https://tabelog.com/kr/hokkaido/A0101/A010101/1001102/",
                                        },      
                                    "afternoon-tea":
                                        {
                                            "name": "애프터눈 티",
                                            "city": "hongkong",
                                            "restaurant": "peninsula-hk",
                                            "restaurantName": "페닌슐라 호텔 홍콩",
                                            "nation": "hk",
                                            "linkType": "website",
                                            "link": "https://www.peninsula.com/en/hong-kong/hotel-fine-dining/the-lobby-afternoon-tea",
                                        },   
                                },
                                50000:{    
                                    "hitsumabushi":
                                        {
                                            "name": "장어덮밥",
                                            "city": "tokyo",
                                            "restaurant": "tomoei",
                                            "restaurantName": "토모에이",
                                            "nation": "jp",
                                            "linkType": "tabelog",
                                            "link": "https://tabelog.com/en/kanagawa/A1410/A141001/14001626/",
                                        },    
                                    "yakitori":
                                        {
                                            "name": "야키토리",
                                            "city": "tokyo",
                                            "restaurant": "torishiki",
                                            "restaurantName": "토리시키",
                                            "nation": "jp",
                                            "linkType": "tabelog",
                                            "link": "https://tabelog.com/kr/tokyo/A1316/A131601/13041029/",
                                        },  
                                    "chili-crab":
                                        {
                                            "name": "칠리크랩",
                                            "city": "hongkong",
                                            "restaurant": "underbridge-spicy-crab",
                                            "restaurantName": "언더브릿지 스파이시 크랩",
                                            "nation": "hk",
                                            "linkType": "tripadvisor",
                                            "link": "https://www.tripadvisor.com/Restaurant_Review-g294217-d1089734-Reviews-Under_the_Bridge_Spicy_Crab-Hong_Kong.html",
                                        },   
                                },
                                75000:{    
                                    "mandarin-grill":                        
                                    {
                                        "name": "퓨전 파인다이닝",
                                        "city": "hongkong",
                                        "restaurant": "mandarin-grill",
                                        "restaurantName": "만다린 그릴",
                                        "price": 100000,
                                        "nation": "jp",
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
                        //                 "nation": "jp",
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
                        //                 "nation": "jp",
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
                    "sliderProps": {
                        "step": 1,
                        "min": 0,
                        "max": 4
                    },
                    "answers": {
                        0: {
                            "label": "-2",
                            "quote": "싫어!",
                            "emoji": "😡" ,
                        },
                        1: {
                            "label": "-1",
                            "quote": "별로야..",
                            "emoji": "😤",
                        },
                        2: {
                            "label": "0",
                            "quote": "상관없어",
                            "emoji": "🤔",
                        },
                        3: {
                            "label": "1",
                            "quote": "좋아",
                            "emoji": "😃" ,
                        },
                        4: {
                            "label": "2",
                            "quote": "완전 내 취향!",
                            "emoji": "😍",
                        },
                    },
                    "subTests": {
                        "metropolis": {
                            "label": "현대적인 대도시",
                            "title": "현대적인 대도시",
                            "icon": "domain",
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
                            "label": "유서 깊은 대도시",
                            "title": "유서 깊은 대도시",
                            "icon": "temple_buddhist",
                            "id": "history",
                            "examples": [
                                "kyoto",
                                "nara",
                                "kamakura",
                            ]
                            // 가와고에 가나자와
                        },
                        "nature": {
                            "label": "자연경관이 아름다운 곳",
                            "title": "자연경관이 아름다운 곳",
                            "icon": "forest",
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
                    "icon": "check",
                    "label": "결과 확인",
                    "title": "다시 답변하고 싶은 질문은 없는지 확인해봐"

                }
            },
            "result": {
                "sections": {
                    "tripCharacter":
                    {
                        label: "내 여행\nMBTI",
                        icon: "pets",
                        typeIntro: "내 여행 MBTI는",
                    },
                    "city":
                    {
                        label: "추천\n여행지",
                        icon: "travel_explore",
                        citySuffix: "당신을 위한 여행지",
                        // "cityListTitle": "아름다운 자연경관, 산책과 하이킹 명소",
                        cityListIntro: "추천 여행지",
                        nationFilterTitle: "지역",
                        unsupportedNationTooltip: "이 지역의 도시들은 추가될 예정이에요.",
                    },
                    "chemistry":
                    {
                        label: "여행 케미\n확인하러\n가기",
                        icon: "flight",
                        startChemistryIntro: "이제 친구랑 같이 떠나볼까?",
                        startChemistryTitle: "여행 케미 확인하기",
                        navigateToChemistryButton: "여행 케미 확인하기",
                    },
                },
            },
            "chemistry": {
                "sections": {
                    "addFriend": {
                        label: "친구 추가",
                        icon: "group_add",
                        me: "(Me!)",
                        addFriendButton: "친구 추가하기",
                        addByName: "닉네임으로 친구 추가하기",
                        friendNameFormLabel: "닉네임을 입력하세요 (e.g. 우동#1234)",
                        giveMyName: "친구에게 내 닉네임 알려주기",
                        userApiMissMessage: "친구를 찾지 못했어요.\nID를 다시 확인해주세요.",
                        userApiFailMessage: "현재 서버에 접속할 수 없어요.\n잠시 후 다시 시도해주세요.",
                        add: "추가하기",
                        confirm: "확인",
                        startChemistryButton: "케미 확인 시작하기!",
                        startChemistryButtonTooltip: "\"친구 추가하기\" 버튼을 눌러 친구를 한 명 이상 추가해주세요.",
                    },
                    "tripCharacter": {
                        label: "여행 MBTI",
                        icon: "pets",
                        "title": "일행의 여행 MBTI 알아보기",
                        "subtitle": "일행의 여행 MBTI를 통해 서로가 원하는 여행 스타일을 이해해봐요",
                    },
                    "leadership": {
                        label: "리더",
                        icon: "groups",
                        "title": "이번 여행의 대장님은 누구?",
                        "leaderTitle": "듬직한 대장",
                    },
                    "schedule" : {
                        label: "일정",
                        icon: "edit_calendar",
                        "title": "일정은 얼마나 알차게 짤까?",
                    },
                    "budget" : {
                        label: "예산",
                        icon: "attach_money",
                        "title": "예산을 세워보자"
                    },
                    "city" : {
                        label: "여행지",
                        icon: "travel_explore",    
                        "title": "함께 어디로 떠나볼까"
                    },
                }
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