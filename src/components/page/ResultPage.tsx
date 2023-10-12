import { useState, useRef, useEffect, UIEvent } from "react";
import { Link } from 'react-router-dom';

// import { Card, CardContent, CardMedia, Chip } from '@mui/material'
import { CardContent, CardMedia, Skeleton, Tooltip } from '@mui/material';

import { KeyboardArrowLeft, KeyboardArrowRight, AddCircleOutline } from "@mui/icons-material";

import Card, { ClickableCard } from "../Card";
import { usePageString, useString } from "../../texts";
import Button from "../Button";
import NavStepper from "../NavStepper";
import AddFriendDialog from "../ResultPage/AddFriendDialog";
import withLoadStatus, { Loader, withLoadStatusProps } from "../../common/hocs/withLoadStatus";
import { loadStatus } from "../../common/hocs/ApiLoader";
import { useGetResultById, useUserList, useUserListLoadStatus } from "../../common/reducer/userListReducer";
import { UserId } from "../../common/interface/interfaces";
import { NationId, useFetchPlaceGroupById, useNationFilter, usePlaceGroup, usePlaceGroupLoadStatus } from "../../common/reducer/placeGroupReducer";
import ToggleButton from "../ToggleButton";
import getImgSrc, { formatSvg, formatWebp } from "../../common/utils/getImgSrc";
import Chip from "../Chip";

interface ResultPageProps extends withLoadStatusProps{
    // section : 
};

interface place{
    title: string;
    body: string;
    tags: string[]
}

/* Debug */
const userName : UserId = "디클1234";
const imgPathBase = '/static/images/result';
const imgFormat = 'png';

const getImageSrc = (pathname: string, filename: string) => `${imgPathBase}/${pathname}/${filename}.${imgFormat}`

/* 사용자 1인의 여행 타입 테스트 결과를 확인하고, 케미 테스트를 위해 친구를 추가해 일행을 구성하는 페이지 */
function ResultPage({ isLoaded }:ResultPageProps){

    /* Navigation */
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const scrollRefs = useRef<(HTMLDivElement) []>([]);

    /* userList Data and Fetcher */
    const userList = useUserList();
    const userListPath = ''    
    const fetchResultById = useGetResultById();
    const [, setUserListLoadStatus] = useUserListLoadStatus();

    /* PlaceGroup Data and Fetcher  */
    const [placeGroupIndex, setPlaceGroupIndex] = useState(0); 
    const [placeGroupName, placeGroup] = usePlaceGroup(placeGroupIndex);
    const [nationFilter, setNationFilter] = useNationFilter(placeGroupIndex);
    const fetchPlaceGroupById = useFetchPlaceGroupById();
    const [PlaceGroupLoadStatus, setPlaceGroupLoadStatus] = usePlaceGroupLoadStatus();

    const nationStrings = useString('nations');

    /* 사용자 본인의 테스트 결과 Fetch. 최초 렌더링 시 1번만 호출. */
    useEffect(() => {
        console.log(`ResultPage: useEffect: fetchResultById`)
        setUserListLoadStatus && setUserListLoadStatus(loadStatus.PENDING);
        fetchResultById(userName);
    }, []);
    
    useEffect(() => {
        console.log(`ResultPage: useEffect: fetchPlaceGroupById`)
        setPlaceGroupLoadStatus && setPlaceGroupLoadStatus(loadStatus.PENDING);
        fetchPlaceGroupById(userName);
    }, []);
    // setUserListLoadStatus(loadStatus.REST);

    /* URL Parameter Setter. URL의 Parameter를 {?users={id0},{id1},{id2},...} 과 같이 설정함. */
    useEffect(() => {
        const userListPath = `?users=${Object.keys(userList).join(',')}`
        /* https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState */
        window.history.replaceState(null, "", userListPath);
    }, [userList])
    
    const page = 'result'
    const strings = usePageString(page);

    /* 친구 추가 Dialog */
    const [openAddFriendDialog, setOpenAddFriendDialog] = useState(false);

    const handleClickAddFriend = () => {
        setOpenAddFriendDialog(true);
    }; 

    const handleCloseAddFriendDialog = () => {
        setOpenAddFriendDialog(false);
    };

    /*  상단 Stepper 의 step 라벨 클릭.
        step 에 해당하는 idv로 스크롤.
        Stepper 상태 업데이트. */
    const handleClickStepLabel = (index: number) => {
        setActiveSectionIndex(index); 
        scrollRefs.current[index].scrollIntoView({behavior: "smooth"});
    }

    /* Stepper - 스크롤 연계 체크포인트 */
    const ScrollCheckpoint = ({index}: {index: number}) => {

        const scrollCheckpointProps = {
            ref : (element: HTMLDivElement) => {
                if (element) scrollRefs.current[index] = element;
            },
            onScroll : (event: UIEvent<HTMLDivElement>) => {
                setActiveSectionIndex(index); 
            }
        }

        return(
        <div className = 'relative'>
            <div className = 'absolute -top-32 border-black' {...scrollCheckpointProps}></div>
        </div>            
        )
    }

    /*  [여행 케미 확인하기] 버튼 클릭.
        로딩 페이지로 전환.
        현재 일행들의 여행 케미 생성 API 호출.
        API 응답 시 케미를 보여주는 페이지로 전환. */
    
    const handleClickStartChemistry = () => {
        /* 여행 케미 생성 API 호출. */
        
    }

    const placeGroupTitleImageStyle = {backgroundImage: `url("${getImgSrc('/result', `placeGroupTitle-bg-nature`, formatWebp)}")`};
    const startChemistryTitleImageStyle = {backgroundImage: `url("${getImgSrc('/result', `startChemistryTitle-bg-airplane`, formatWebp)}")`};

    return(
        isLoaded ?
        <div>
            {/* TopNaV 네비게이션 */}
            <div className = 'fixed bg-white z-50 w-full h-fit p-4 py-6 flex flex-row items-center justify-between'>
                <Link to ='/test/confirm'>
                <Button><KeyboardArrowLeft/>{strings.prevButton}</Button>
                </Link>
                {/* Stepper: step 은 페이지 내 스크롤 할 수 있는 div 위치와 대응됨.
                    1. 페이지 내에서 특정 세션까지 스크롤되면 step 변화
                    2. step 을 클릭하면 페이지 내에서 해당 위치로 스크롤.
                    testPage의 stepper와 다르게 링크 이동 없음. */}
                <div className='basis-6/12 -translate-y-6'>
                    <NavStepper 
                        steps = {(strings.steps as string[])?.map((label)=>{
                            return {label:label};
                        })}
                        activeSectionIndex = {activeSectionIndex}
                        handleClickStepLabel = {handleClickStepLabel}
                        enableHover = {false}
                    />
                </div>
                <Button>{strings.startChemistryButton}<KeyboardArrowRight/></Button>
            </div>

            <div className='flex flex-col pt-24 space-y-20 [&>*>*]:pl-12'>

                {/* 사용자 테스트 결과 */}
                <div className="space-y-6">
                    <ScrollCheckpoint index = {0}/>
                    <h4>{strings.typeIntro}</h4> {/* ScrollRef 0 */} 
                    <h2>{userList[userName].testResult?.tripCharacter?.prefix}</h2>
                    <h2>{userList[userName].testResult?.tripCharacter?.name}</h2>
                    <h5>{userList[userName].testResult?.tripCharacter?.body}</h5>
                </div>

                {/* 여행지 추천 */}
                <div className="space-y-10">

                    {/* 타이틀: 추천 여행지 타입 */}
                    <div className="bg-cover -bg-bottom-40 bg-white bg-blend-multiply py-16"
                        style={placeGroupTitleImageStyle}                    
                    > 
                        <ScrollCheckpoint index = {1}/> {/* ScrollRef 1 */} 
                        <h4>{strings.placeIntro}</h4>
                        <h2>{placeGroupName}</h2>
                    </div>
                    {/* <h4>{strings.PlaceGroupIntro}</h4> */}

                    {/* 여행지 국가 필터 */}
                    <div className="py-4 flex">
                        {nationFilter && Object.entries(nationFilter).map(([nationId, isActive])=>{
                                const nation = nationStrings[nationId];
                                return(
                                    <ToggleButton isActive={isActive} onClick={()=>setNationFilter(nationId)} variant='round-filled'>
                                        <div className="flex flex-row items-center">
                                            {nation} 
                                            <img className='h-5 border-black border-1' src={getImgSrc('/nation', nationId, formatSvg)} alt={`flag-${nation}`}></img>
                                        </div>
                                    </ToggleButton>
                                )
                        })}    
                    </div>

                    {/* 여행지 카드 목록 */}
                    <div className='flex flex-row justify-center p-0 space-x-6'>
                        {placeGroup?.filter(({nationId})=>(nationFilter as {[key: NationId]: boolean})[nationId as NationId]) 
                            .map(({id, name, body, tripTagList}, index)=>{
                                console.log(getImgSrc('/place', `${id}`, formatWebp));
                            return(
                                <ClickableCard onClick={()=>{}}>
                                    <div className="h-80 w-60 flex flex-col justify-end">
                                        <div>
                                        <CardMedia
                                            component="img"            
                                            sx={{ }}
                                            image={getImgSrc('/place', `${id}`, formatWebp)}
                                            title={name}
                                        />
                                        </div>
                                        <div>
                                        <CardContent>
                                            <h4>{name}</h4>
                                            <p>{body}</p>
                                            <div className='flex flex-wrap space-x-1'>
                                                {tripTagList?.map((tag)=><Chip label={tag} />)}
                                            </div>
                                        </CardContent>
                                        </div>
                                    </div>        
                                </ClickableCard>
                            )
                        })}                      
                    </div>                    
                </div>

                {/* 여행 케미 테스트 시작 */}
                <div className="space-y-10">

                    {/* 타이틀 */}
                    <div className="bg-cover -bg-top-24 bg-white bg-blend-multiply py-16"
                        style={startChemistryTitleImageStyle}                    
                    > 
                        <ScrollCheckpoint index = {2}/> {/* ScrollRef 2 */} 
                        <h4>{strings.startChemistryIntro}</h4>
                        <h2>{strings.startChemistryTitle}</h2>
                    </div>

                    {/* 여행 일행 카드 리스트
                        {사용자}, {일행1}, {일행2}, ..., {일행 추가 버튼}  */}
                    <div className='flex flex-row justify-center space-x-6'>

                        
                        {/* 실제 사용자 카드
                            {사용자}, {일행1}, {일행2}, ... */}
                        {Object.entries(userList)?.map(([userId, {testResult}])=>{
                            return(
                                testResult &&
                                <ClickableCard>
                                    <div className="h-80 w-60 flex flex-col justify-end">
                                        <div>
                                        <CardMedia
                                            component="img"            
                                            sx={{ }}
                                            image={getImageSrc("tripCharacter", testResult.tripCharacter.id)}
                                            title={testResult.tripCharacter.name}
                                        />
                                        </div>
                                        <div>
                                        <CardContent>
                                            <h4>{userId}</h4>
                                            <p>{`${testResult.tripCharacter.prefix} ${testResult.tripCharacter.name}`}</p>
                                            <div className='flex flex-wrap space-x-1'>
                                                {testResult.tripTagList?.map((tag)=><Chip label={tag} />)}
                                            </div>
                                        </CardContent>
                                        </div>
                                    </div>              
                                </ClickableCard>                      
                            )
                        })}

                        {/* 일행 추가 버튼 카드
                            일행 추가 여부, 추가된 일행의 수와 무관하게 항상 활성화. 항상 리스트의 마지막에 위치함.
                            클릭시 AddFriendDialog 다이얼로그를 새로 오픈. */}              
                        <ClickableCard onClick={handleClickAddFriend}>
                            <div className="h-80 w-60 flex flex-col justify-end">
                                <div className="h-full flex items-center justify-center">
                                </div>
                                <CardContent className=''>
                                    {/* <h4><Skeleton variant="text" width='64px' /></h4> */}
                                    <h4>{strings.addFriendButton}<AddCircleOutline /></h4>
                                    <p>
                                        <Skeleton variant="text" width='128px' />
                                    </p>
                                    <div className='flex flex-wrap space-x-1'>
                                        {[8, 4, 2, 6]?.map((count) => '\xa0'.repeat(count))
                                            .map((tag) => <Chip label={tag} />
                                            )}
                                    </div>
                                </CardContent>
                            </div>                
                        </ClickableCard>                                                             
                    </div>   

                    {/* 친구 추가 Dialog */}
                    {openAddFriendDialog && <div><AddFriendDialog setOpen = {setOpenAddFriendDialog} onClose = {handleCloseAddFriendDialog}/></div>}
                    
                    {/* 여행 케미 테스트 시작 버튼
                        기본: 비활성화, 호버 시 친구 추가 안내.
                        친구를 한 명 추가했을 때: 활성화 */}
                    <div className='flex justify-center'>
                        {Object.keys(userList).length > 1 ?
                            <span className='cursor-pointer w-fit'>
                                <Link to={`/chemistry/${userListPath}`}>
                                    <Button onClick={handleClickStartChemistry}>{strings.startChemistryButton}<KeyboardArrowRight/></Button>
                                </Link>
                            </span>                     
                            : <Tooltip title={strings.startChemistryButtonTooltip} placement="right">
                                <span className='cursor-pointer w-fit'>
                                    <Button disabled>{strings.startChemistryButton}<KeyboardArrowRight/></Button>
                                </span>
                            </Tooltip>
                        }
                    </div>
                </div>                
            </div>
        </div> :
        <></>
    );
}

function ResultPageWithLoadStatus(props:ResultPageProps){
    const [userListLoadStatus, setUserListLoadStatus] = useUserListLoadStatus();
    const [placeGroupLoadStatus, setPlaceGroupLoadStatus] = usePlaceGroupLoadStatus();

    // const fetchResultById = useGetResultById();
    // const fetchPlaceGroupById = useFetchPlaceGroupById();

    const isLoaded = (userListLoadStatus === loadStatus.REST) && (placeGroupLoadStatus === loadStatus.REST)

    // useEffect(() => {
    //     setUserListLoadStatus && setUserListLoadStatus(loadStatus.PENDING);
    //     fetchResultById(userName);
    // }, []);
    
    // useEffect(() => {
    //     setPlaceGroupLoadStatus && setPlaceGroupLoadStatus(loadStatus.PENDING);
    //     fetchPlaceGroupById(userName);
    // }, []);

    console.log(`isLoaded=${isLoaded}`)
    return(
        withLoadStatus(ResultPage)(()=><Loader isLoaded={isLoaded}/>, isLoaded)(props)        
    )
}

export default ResultPageWithLoadStatus;


/* ! Deprecated: Redux리덕스 연동 방식으로 변경 !
* API: 테스트 결과 가져오기
* async(비동기). GET /user/{id} */
// const getResult = useServerApi({
//     // path: `/user/${id}`,
//     path: "/user/udon1234/result",
//     handleResponse: (data)=>{setResult(data)},
//     handleNoResponse: ()=>{},
//     fetchProps: {
//         method: "GET", 
//         headers: {
//             // "Accepts": "application/json",
//             "Content-Type": "application/json",
//         },
//         body: undefined,
//     }
// });