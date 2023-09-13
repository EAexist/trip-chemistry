import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';

// import { Card, CardContent, CardMedia, Chip } from '@mui/material'
import { Skeleton, Tooltip } from '@mui/material';

import { KeyboardArrowLeft, KeyboardArrowRight, AddCircleOutline } from "@mui/icons-material";

import Card, { ClickableCard, CardProps } from "../Card";
import { usePageString } from "../../texts";
import Button from "../Button";
import NavStepper from "../NavStepper";
import AddFriendDialog from "../ResultPage/AddFriendDialog";
import User, {userId} from "../../interface/User";
import withLoadStatus, { Loader, withLoadStatusProps } from "../utils/withLoadStatus";
import { loadStatus } from "../ApiLoader";
import useServerApi from "../utils/useServerApi";
import { useFetchResultById, useUserList, useUserListLoadStatus } from "../../reducer/userListReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UserId } from "../../interface/interfaces";
import { useFetchPlaceListById, usePlaceList } from "../../reducer/placeListReducer";

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
function ResultPage({ status }:ResultPageProps){

    /* Navigation */
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const scrollRefs = useRef<(HTMLDivElement) []>([]);

    /* userList Data and Fetcher */
    const userList = useUserList();
    const userListPath = ''    
    const fetchResultById = useFetchResultById();
    const [, setUserListLoadStatus] = useUserListLoadStatus();

    /* placeList Data and Fetcher  */
    const [placeList, nationFilter] = usePlaceList();
    const fetchPlaceListById = useFetchPlaceListById();
    const [placeListLoadStatus] = useUserListLoadStatus();

    /* 사용자 본인의 테스트 결과 Fetch. 최초 렌더링 시 1번만 호출. */
    useEffect(() => {
        // setUserListLoadStatus && setUserListLoadStatus(loadStatus.PENDING);
        fetchResultById(userName);
    }, [setUserListLoadStatus, fetchResultById]);
    
    useEffect(() => {
        fetchPlaceListById(userName);
    }, [fetchPlaceListById]);

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
            onScroll : (event: React.UIEvent<HTMLDivElement>) => {
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

    return(
        status === loadStatus.REST ?
        <div>
            {/* TopNaV 네비게이션 */}
            <div className = 'fixed bg-white z-50 w-full p-4 flex flex-row justify-between'>
                <Link to ='/test/confirm'>
                <Button><KeyboardArrowLeft/>{strings.prevButton}</Button>
                </Link>
                {/* Stepper: step 은 페이지 내 스크롤 할 수 있는 div 위치와 대응됨.
                    1. 페이지 내에서 특정 세션까지 스크롤되면 step 변화
                    2. step 을 클릭하면 페이지 내에서 해당 위치로 스크롤.
                    testPage의 stepper와 다르게 링크 이동 없음. */}
                <div className='basis-6/12'>
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

            <div className='flex flex-col margin pt-24'>

                {/* 사용자 테스트 결과 */}
                <div>
                    <ScrollCheckpoint index = {0}/>
                    <div><h3>{strings.typeIntro}</h3></div> {/* ScrollRef 0 */} 
                    <h1>{userList[userName].tripCharacter.prefix}</h1>
                    <h1>{userList[userName].tripCharacter.name}</h1>
                    <p>{userList[userName].tripCharacter.body}</p>
                </div>

                {/* 여행지 추천 */}
                {/* 타이틀 */}
                <div> 
                    <ScrollCheckpoint index = {1}/> {/* ScrollRef 1 */} 
                    <h3>{strings.placeIntro}</h3>
                    <h1>{userList[userName].placeGroupTitle}</h1>
                </div>
                 {/* 여행지 카드 목록 */}
                <div>
                    <h3>{strings.placeListIntro}</h3>
                    <div className='flex flex-row justify-center'>
                        {placeList?.map(({name, body, tripTagList}, index)=>{
                            return(
                                <ClickableCard title={name} body={body} tags={tripTagList}/>
                            )
                        })}                      
                    </div>                    
                </div>

                {/* 여행 케미 테스트 시작 */}
                <div>
                    <ScrollCheckpoint index = {2}/> {/* ScrollRef 2 */} 
                    {/* 타이틀 */}
                    <h3>{strings.startChemistryIntro}</h3>
                    <h1>{strings.startChemistryTitle}</h1>

                    {/* 여행 일행 카드 리스트
                        {사용자}, {일행1}, {일행2}, ..., {일행 추가 버튼}  */}
                    <div className='flex flex-row justify-center'>

                        {Object.entries(userList)?.map(([userId, testResult])=>{
                            return(
                                <ClickableCard {...{
                                    title: userId,
                                    body: `${testResult.tripCharacter.prefix} ${testResult.tripCharacter.name}`,
                                    tags: testResult.tripTagList,
                                    image: getImageSrc("tripCharacter", testResult.tripCharacter.id),
                                    imageTitle: testResult.tripCharacter.name
                                }}/>                                    
                            )
                        })}

                        {/* 일행 추가 버튼 카드
                            일행 추가 여부, 추가된 일행의 수와 무관하게 항상 활성화. 항상 리스트의 마지막에 위치함.
                            클릭시 AddFriendDialog 다이얼로그를 새로 오픈. */}              
                        <ClickableCard {...{
                            onClick: handleClickAddFriend,
                            replaceCardMedia: <h3>{strings.addFriendButton}<AddCircleOutline/></h3>,
                            title: <Skeleton variant="text" width='64px'/>,
                            body: <Skeleton variant="text" width='128px'/>,
                            tags: [10, 6, 8, 12]?.map((count)=>{
                                return('\xa0'.repeat(count));
                            })

                        }}/>                                                             
                    </div>   

                    {/* 친구 추가 Dialog */}
                    {openAddFriendDialog && <AddFriendDialog setOpen = {setOpenAddFriendDialog} onClose = {handleCloseAddFriendDialog}/>}
                    
                    {/* 여행 케미 테스트 시작 버튼
                        기본: 비활성화, 호버 시 친구 추가 안내.
                        친구를 한 명 추가했을 때: 활성화 */}
                    <div className='flex justify-center'>
                        {Object.keys(userList).length > 1 ?
                        <span className='cursor-pointer w-fit'>
                            <Link to={`/chemistry/${userListPath}`}>
                                <Button onClick={handleClickStartChemistry}>{strings.startChemistryButton}<KeyboardArrowRight/></Button>
                            </Link>
                        </span> :                    
                        <Tooltip title={strings.startChemistryButtonTooltip} placement="right">
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
    const [status, setStatus] = useUserListLoadStatus();
    // setStatus(loadStatus.PENDING);

    return(
        withLoadStatus(ResultPage)(Loader, status, setStatus)(props)        
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