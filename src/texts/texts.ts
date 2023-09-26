const texts = {
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
                    "subTitle": "리더",
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
                    "subTitle": "일정",
                    "label": "널널함",
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
                    "examples": [
                        [{}]
                    ]
                },
                "city": {
                    "title": "이런 곳은 어때?",
                    "subTitle": "여행지",
                    "answers": [
                        {
                            "label": "-2",
                            "value": 0,
                            "quote": "싫어!",
                            "emoji": "troll" ,
                        },
                        {
                            "label": "-1",
                            "value": 1,
                            "quote": "별로야..",
                            "emoji": "bad" ,
                        },
                        {
                            "label": "0",
                            "value": 2,
                            "quote": "상관없어",
                            "emoji": "soso" ,
                        },
                        {
                            "label": "1",
                            "value": 3,
                            "quote": "좋아",
                            "emoji": "good" ,
                        },
                        {
                            "label": "2",
                            "value": 4,
                            "quote": "완전 내 취향!",
                            "emoji": "great",
                        },
                    ],
                    "subTests": {
                        "metropolis": {
                            "title": "현대적인 대도시",
                            "id": "metropolis",
                            "examples": ["tokyo", "osaka", "yokohama"]
                            // 삿포로
                        },
                        "history": {
                            "title": "유서 깊은 대도시",
                            "id": "history",
                            "examples": ["kyoto", "nara", "kamakura"]
                            // 가와고에 가나자와
                        },
                        "nature": {
                            "title": "자연이 살아있는 곳",
                            "label": "nature" ,
                            "examples": ["shiretoko", "yakushima", "biei"] 
                        },
                        // {
                        //     "title": "한적한 시골마을",
                        //     "label": "country" 
                        // },
                    }
                },
                "activity": {
                    "title": "이런 활동은 어때?",
                    "subTitle": "즐기기",
                    "answers": [
                        {
                            "label": "-2",
                            "value": 0,
                            "quote": "싫어!",
                            "emoji": "troll" ,
                        },
                        {
                            "label": "-1",
                            "value": 1,
                            "quote": "별로야..",
                            "emoji": "bad" ,
                        },
                        {
                            "label": "0",
                            "value": 2,
                            "quote": "상관없어",
                            "emoji": "soso" ,
                        },
                        {
                            "label": "1",
                            "value": 3,
                            "quote": "좋아",
                            "emoji": "good" ,
                        },
                        {
                            "label": "2",
                            "value": 4,
                            "quote": "완전 내 취향!",
                            "emoji": "great",
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
                "budget": {
                    "linkLabel": "더보기",
                    "subTests": {
                        "food": {
                            "label": "예산",
                            "title": "한끼에 얼마나 쓰면 좋을까?",
                            "subTitle": "예산 - 식사",
                            "examples": {
                                "iida-shouten-ramen": {
                                    "name": "라멘 이이다쇼텐",
                                    "city": "오사카",
                                    "menu": "쇼유라멘",
                                    "price": 20000,
                                    "nation": "JP",
                                    "linkLabel": "타베로그",
                                    "link": "https://tabelog.com/en/kanagawa/A1410/A141002/14038776/",
                                },
                                "tomoei": {
                                    "name": "토모에이",
                                    "city": "도쿄",
                                    "menu": "장어덮밥",
                                    "price": 60000,
                                    "nation": "JP",
                                    "linkLabel": "타베로그",
                                    "link": "https://tabelog.com/en/kanagawa/A1410/A141001/14001626/",
                                },
                                "mandarin-grill": {
                                    "name": "만다린 그릴",
                                    "city": "홍콩",
                                    "menu": "선셋 디너 코스",
                                    "price": 100000,
                                    "nation": "JP",
                                    "linkLabel": "홈페이지",
                                    "link": "https://www.mandarinoriental.com/en/hong-kong/victoria-harbour/dine/mandarin-grill-and-bar",
                                },
                                "torishiki": {
                                    "name": "토리시키",
                                    "city": "도쿄",
                                    "menu": "야키토리",
                                    "price": 140000,
                                    "nation": "JP",
                                    "linkLabel": "타베로그",
                                    "link": "https://tabelog.com/kr/tokyo/A1316/A131601/13041029/",
                                },
                            }
                        },
                        "accomodate": {
                            "label": "예산",
                            "title": "하룻밤 묵는데 얼마나 쓰면 좋을까?",
                            "subTitle": "예산 - 숙소",
                            "linkLabel": "Hotels.com에서 보기",
                            "examples": {
                                "iida-shouten-ramen": {
                                    "name": "라멘 이이다쇼텐",
                                    "city": "오사카",
                                    "menu": "라멘",
                                    "price": 20000,
                                    "nation": "JP",
                                },
                                "tomoei": {
                                    "name": "토모에이",
                                    "city": "도쿄",
                                    "menu": "장어덮밥",
                                    "price": 60000,
                                    "nation": "JP",
                                },
                                "mandarin-grill": {
                                    "name": "만다린 홀",
                                    "city": "홍콩",
                                    "menu": "양식",
                                    "price": 100000,
                                    "nation": "JP",
                                },
                                "torishiki": {
                                    "name": "토리시키",
                                    "city": "도쿄",
                                    "menu": "",
                                    "price": 140000,
                                    "nation": "JP",
                                },
                            }
                        },
                        "foodSpecial": {
                            "title": "특별한 레스토랑에서 식사를 한다면 얼마까지 쓸 수 있어?",
                            "subTitle": "예산 - 식도락",
                            "linkLabel": "다른 식당 보기",
                            "examples": {
                                "iida-shouten-ramen": {
                                    "name": "라멘 이이다쇼텐",
                                    "city": "도쿄",
                                    "menu": "쇼유라멘",
                                    "price": 20000,
                                    "nation": "JP",
                                    "linkLabel": "타베로그",
                                    "link": "https://tabelog.com/en/kanagawa/A1410/A141002/14038776/",
                                },
                                "tomoei": {
                                    "name": "토모에이",
                                    "city": "도쿄",
                                    "menu": "장어덮밥",
                                    "price": 60000,
                                    "nation": "JP",
                                    "linkLabel": "타베로그",
                                    "link": "https://tabelog.com/en/kanagawa/A1410/A141001/14001626/",
                                },
                                "mandarin-grill": {
                                    "name": "만다린 그릴",
                                    "city": "홍콩",
                                    "menu": "선셋 디너 코스",
                                    "price": 100000,
                                    "nation": "HK",
                                    "linkLabel": "홈페이지",
                                    "link": "https://www.mandarinoriental.com/en/hong-kong/victoria-harbour/dine/mandarin-grill-and-bar",
                                },
                                "torishiki": {
                                    "name": "토리시키",
                                    "city": "도쿄",
                                    "menu": "야키토리",
                                    "price": 140000,
                                    "nation": "JP",
                                    "linkLabel": "타베로그",
                                    "link": "https://tabelog.com/kr/tokyo/A1316/A131601/13041029/",
                                },
                            }
                        },
                        "accomodateSpecial": {
                            "title": "하루 근사한 숙소에서 묵는다면 얼마까지 쓸 수 있어?",
                            "subTitle": "예산 - 숙소",
                            "linkLabel": "Hotels.com에서 보기",
                            "examples": {
                                "iida-shouten-ramen": {
                                    "name": "게로온센 스이메이칸",
                                    "city": "일본 중부",
                                    "room": "룸이름",
                                    "price": 200000,
                                    "priceText": "20만원~ (1인)",
                                    "nation": "JP",
                                    "link": "https://www.suimeikan.co.jp/ko/",
                                },
                                "tomoei": {
                                    "name": "오타루 긴린소",
                                    "city": "훗카이도",
                                    "room": "룸이름",
                                    "price": 300000,
                                    "priceText": "60만원~ (2인)",
                                    "nation": "JP",
                                    "link": "https://www.ginrinsou.com/ko/"
                                },
                                "mandarin-grill": {
                                    "name": "만다린 홀",
                                    "city": "홍콩",
                                    "menu": "양식",
                                    "price": 100000,
                                    "nation": "HK",
                                },
                                "torishiki": {
                                    "name": "토리시키",
                                    "city": "도쿄",
                                    "menu": "",
                                    "price": 140000,
                                    "nation": "JP",
                                },
                            }
                        },
                    },
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
}

export default texts;