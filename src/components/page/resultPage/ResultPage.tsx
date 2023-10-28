import { useState, useRef, useEffect, UIEvent, useContext, useCallback, PropsWithChildren } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Icon, Skeleton, Tooltip, } from '@mui/material';

import { KeyboardArrowRight, AddCircleOutline, ArrowRight } from "@mui/icons-material";

import { usePageString, useString } from "../../../texts";
import Button from "../../Button";
import IconStepper from "../../IconStepper";
import AddFriend from "./AddFriend";
import { useGetResultById, useResult, useUserList, useUserListLoadStatus,  } from "../../../common/reducer/userListReducer";
import { UserId } from "../../../common/types/interfaces";
import { NationId, useFetchPlaceGroupById, useNationFilter, usePlaceGroup, usePlaceGroupLoadStatus, withPlaceGroupLoadStatus } from "../../../common/reducer/cityGroupReducer";
import ToggleButton from "../../ToggleButton";
import getImgSrc, { FORMATPNG, FORMATSVG, FORMATWEBP } from "../../../common/utils/getImgSrc";
import Chip from "../../Chip";

/* Swiper */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Card, CardImage, CardDetail } from "../../Card";
import FocusContainer from "../../FocusContainer";

import Logo from "../../Logo";
import { FocusDetail, FocusSummary, Focusable, FocusContext, FocusContextProvider } from "../../../common/focus/FocusContext"; 
import LazyImage from "../../LazyImage";

import ReactCountryFlag from "react-country-flag"
import ConditionalWrapper from "../../../common/utils/ConditionalWrapper";
import { LoadStatus } from "../../../common/types/loadStatus";
import useLoadStatus from "../../../common/hooks/useLoadStatus";
import { TopNavContext, useSetElement } from "../../TopNav";
import SectionHeader from "../../SectionHeader";
import StepItem, { Connector } from "../../StepItem";
import useValueToBound from "../../../common/hooks/useValueToBound";
import { useScrollCheckpoint } from "../../useScrollCheckpoint";
import PageLoader from "../../../common/load/PageLoader";

interface ResultPageProps {
    // section : 
};
/* Debug */
const userName : UserId = "디클1234";

/* 사용자 1인의 여행 타입 테스트 결과를 확인하고, 케미 테스트를 위해 친구를 추가해 일행을 구성하는 페이지 */
function ResultPage({}:ResultPageProps){

    const page = 'result'

    /*** 텍스트 ***/    
    const strings = usePageString(page);
    const commonStrings = useString('common');

    /*** 데이터 ***/
    /* 사용자 데이터 Fetch 및 사용자 데이터 */
    const userList = useUserList();
    const [ userListLoadStatus ] = useUserListLoadStatus({});
    const [ localUserList, setLocalUserList ] = useState(userList);

    const userListLoadsDelay = 3000; 

    useEffect(()=>{
        if(userListLoadStatus === LoadStatus.REST){
            setLocalUserList(userList);
        }
    }, [userList, userListLoadStatus]);

    /* 장소 데이터 Fetch 장소 데이터 */
    const [ cityGroupIndex, setPlaceGroupIndex ] = useState(0); 
    const [ cityGroupName, cityGroup ] = usePlaceGroup(cityGroupIndex);
    const [ nationFilter, toggleNationFilter ] = useNationFilter(cityGroupIndex);

    /* 지원되는 지역 필터(일본, 홍콩)와 를 지원하지 않는 지역(한국, 동남아시아)를 포함한 전체 지역 필터 */
    const nationFilterWithOthers = {...nationFilter, kr: undefined, sea: undefined }; 

    /* URL Parameter Setter. URL의 Parameter를 {?users={id0},{id1},{id2},...} 과 같이 설정함. */
    useEffect(() => {
        const userListPath = `?users=${Object.keys(userList).join(',')}`
        /* https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState */
        window.history.replaceState(null, "", userListPath);
    }, [userList]) 


    /*** 페이지 내 네비게이션 ***/
    const [ activeStep, setActiveStep ] = useState(0); /* 현재 step */

    const handleClickStepButton = (index: number) => { /* 상단 step 버튼 클릭 핸들러 : 클릭한 step을 현재 step 으로 설정하고 해당하는 div로 스크롤. */
        setActiveStep(index); 
        scrollCheckpoints.current[index].scrollIntoView({behavior: "smooth"});
    }

    /* Stepper - 스크롤 연계 체크포인트 */
    const ScrollCheckpoint = ({index}: {index: number}) => {

        const scrollCheckpointProps = {
            ref : (element: HTMLDivElement) => {
                if (element) scrollCheckpoints.current[index] = element;
            }
        }

        return(
            <div className = 'border-black' {...scrollCheckpointProps}></div>
        )
    }

    useSetElement({
        element:              
            /* TopNaV 네비게이션 */
            /* Stepper: step 은 페이지 내 스크롤 할 수 있는 div 위치와 대응됨.
                1. 페이지 내에서 특정 세션까지 스크롤되면 step 변화
                2. step 을 클릭하면 페이지 내에서 해당 위치로 스크롤.
                testPage의 stepper와 다르게 링크 이동 없음. */                

            <div className = 'flex flex-row items-center -translate-y-1'>
                <FocusContextProvider>       
                    {(Object.entries(strings.sections) as [any, {label: string, icon: string}][]).map(([k, {label, icon}], index: number)=>{
                        return (
                            <>
                            {index > 0 && <Connector width='w-20'/>} 
                            <StepItem
                                isActive={index===activeStep}
                                index={index}
                                icon={icon}
                                label={label}
                                handleClick={()=>handleClickStepButton(index)}                        
                            />
                            </>
                        );
                    })}
                </FocusContextProvider>
            </div>,
        dep: [ activeStep, strings.sections ]
    });


    /*** 컴포넌트 ***/

    /* 친구 추가 기능 */
    /* v.1. Dialog: 백드롭 및 다이얼로그에서 친구 추가 */
    // const [ openAddFriend, setOpenAddFriend ] = useState(false);

    /* v.2. Card: 사용자 카드 내에서 친구 추가 */
    const [ openAddFriendCard, setOpenAddFriendCard ] = useState(false);

    const handleClickAddFriend = () => {

        /* Card */
        setOpenAddFriendCard(true);

        /* Dialog */
        // setOpenAddFriend(true);
    }; 

    const handleCloseAddFriend = () => {
        // setOpenAddFriend(false);
    };

    /* Stepper */
    const { activeCheckpointIndex, scrollCheckpoints } = useScrollCheckpoint({});

    useEffect(()=>{
        setActiveStep( activeCheckpointIndex as number );
    }, [ activeCheckpointIndex, setActiveStep ])

    /*  [여행 케미 확인하기] 버튼 클릭.
        1. 로딩 페이지로 전환.
        2. 현재 일행들의 여행 케미 생성 API 호출.
        3. API 응답 시 케미를 보여주는 페이지로 전환. */    
    const handleClickStartChemistry = () => {
        navigate('/result'); 
        /* 여행 케미 생성 API 호출. */
        
    }

    /* Chemistry 페이지 이동 */
    const navigate = useNavigate();

    return(
        <div className="relative">
            <div className='flex flex-col pt-24 space-y-20 [&>*>*]:pl-16'>
                {/* 사용자 테스트 결과 */}
                <div className="space-y-4">
                    <ScrollCheckpoint index = {0}/>
                    <h4>{strings.sections.character.typeIntro}</h4> {/* ScrollRef 0 */} 
                    <div className='flex flex-row items-end h-48 space-x-16'>
                        <div>
                            <h2>{userList[userName].testResult?.tripCharacter?.prefix}</h2>
                            <h2>{userList[userName].testResult?.tripCharacter?.name}</h2>
                        </div>
                        <div className='h-full'>
                            <LazyImage
                                src={getImgSrc('/result/tripCharacter', userList[userName].testResult?.tripCharacter?.id as string, FORMATPNG)}
                                alt={userList[userName].testResult?.tripCharacter?.name as string}
                                className="h-full"
                            >
                                <Skeleton></Skeleton>
                            </LazyImage>
                        </div>
                    </div>
                    <h5>{userList[userName].testResult?.tripCharacter?.body}</h5>
                </div>

                {/* 여행지 추천 */}
                <div className="space-y-4">

                    {/* 타이틀: 추천 여행지 타입 */}
                    <SectionHeader imageSrc={getImgSrc('/result', `cityGroupTitle-bg-nature`, FORMATWEBP)}>
                        <ScrollCheckpoint index = {1}/> {/* ScrollRef 1 */} 
                        <h2>{cityGroupName}</h2>
                        <h4>{strings.sections.city.citySuffix}</h4>
                    </SectionHeader>

                    {/* 여행지 국가 필터 */}
                    <div className="h-20 py-4 flex flex-row items-center space-x-2">
                        <h5>{strings.sections.city.nationFilterTitle}</h5>
                        <h5> | </h5>                        
                        {Object.entries(nationFilterWithOthers).map(([nationId, isActive])=>{
                            const nation = commonStrings.nation[nationId];
                            console.log(`ResultPage: nationId=${nationId} isActive=${isActive}`)
                            return(
                                <ConditionalWrapper
                                    isWrapped={isActive === undefined}
                                    wrapper={(children: React.ReactElement) => 
                                        <Tooltip title={strings.unsupportedNationTooltip} placement="bottom">
                                            <span className='cursor-pointer w-fit'>
                                                {children}
                                            </span>
                                        </Tooltip>
                                    }
                                >
                                    <ToggleButton isActive={isActive || false} disabled={isActive === undefined} onClick={()=>{toggleNationFilter(nationId);}} variant='round'>
                                        <div className="flex flex-row items-center space-x-1">
                                            <h6>{nation.name}</h6> 
                                            {nation.flag && <span className={`fi fi-${nationId}`}></span>} {/* 국기 */}                                         
                                            {/* <img className='h-4 border-black border-1' src={getImgSrc('/nation', nationId, FORMATSVG)} alt={`flag-${nation}`}></img> */}
                                        </div>
                                    </ToggleButton>
                                </ConditionalWrapper>
                            )
                        })}    
                    </div>

                    {/* 여행지 카드 목록 */}
                    <div className="flex flex-row items-center space-x-2 py-10">
                        {cityGroup?.filter(({nationId})=>(nationFilter as {[key: NationId]: boolean})[nationId as NationId]) 
                            .map(({id, name, body, tripTagList}, index)=>{

                                console.log(getImgSrc('city', `${id}`, FORMATWEBP));
                                const city = commonStrings.city[id]
                                const nation = commonStrings.nation[city.nation]
                                return(                                                
                                    <FocusContainer
                                        classNameWithSize='w-64 h-40'
                                        animation='focusCard'
                                    >                
                                    <Card className='w-full h-fit flex flex-col'>
                                        <CardImage
                                            image={getImgSrc('/city', `${id}`, FORMATWEBP)}
                                            alt={name}                                        
                                        >                                            
                                        <div className='flex flex-row absolute bottom-0 p-2 w-full justify-between'>
                                            <div className='flex flex-row space-x-2 items-center'> {/* 상품 정보: 상품 이름, 위치한 도시, 국가, 국기 */}
                                                <h5 className='font-bold text-white'>{name}</h5> {/* 도시 이름 */}
                                                <h6 className=' text-white'> | </h6> 
                                                <h6 className='text-white'>{nation.name}</h6> {/* 지역 이름 */}
                                                {nation.flag && <span className={`fi fi-${city.nation}`}></span>} {/* 국기 */}
                                                {/* <img className='h-4' src={getImgSrc('/nation', city.nation, FORMATSVG)} alt={`flag-${city.nation}`} loading='lazy'></img> */}
                                            </div>    
                                            <FocusSummary><Icon className='text-white'>play_circle</Icon></FocusSummary>                                        
                                        </div>
                                        </CardImage>
                                        <CardDetail>
                                            <div className='flex flex-col px-4 space-y-2 py-4'>                                    
                                                <p>{body}</p>
                                                <div className='flex flex-wrap space-x-1'>
                                                    {tripTagList?.map((tag)=><Chip label={tag} />)}
                                                </div>
                                                <a href={city.link} target="_blank" rel="noopener noreferrer"> {/* 디테일 보기 (e.g. 음식 -> 타베로그, 식당 자체 웹사이트 / 숙소 -> Hotels.com, 숙소 자체 웹사이트) @TODO: 카드 자체 클릭으로 변경 가능*/}
                                                    <div className='flex flex-row items-center space-x-1'>
                                                        <Logo id = {city.linkType} className='h-5'/>
                                                        <h6>{commonStrings.linkType[city.linkType].name}{commonStrings.linkText}</h6>
                                                        <ArrowRight fontSize='inherit'/>
                                                    </div>
                                                </a>
                                            </div>
                                        </CardDetail>
                                    </Card>
                                    </FocusContainer>
                                )
                        })}         
                    </div>                    
                </div>

                {/* 여행 케미 테스트 시작 */}
                <div className="space-y-10">

                    {/* 타이틀 */}
                    <SectionHeader imageSrc={getImgSrc('/result', `startChemistryTitle-bg-airplane`, FORMATWEBP)}>
                        <ScrollCheckpoint index = {2}/> {/* ScrollRef 2 */} 
                        <h4>{strings.sections.chemistry.startChemistryIntro}</h4>
                        <h2>{strings.sections.chemistry.startChemistryTitle}</h2>
                    </SectionHeader>
                    {/* 여행 일행 카드 리스트
                        {사용자}, {일행1}, {일행2}, ..., {일행 추가 버튼}  */}
                    {/* <div className='pt-12 pb-20'> */}
                    <div className='flex flex-row items-center justify-center py-8 space-x-6'>                        
                        {/* 실제 사용자 카드
                            {사용자}, {일행1}, {일행2}, ... */}
                        {Object.entries(localUserList)?.map(([userId, {testResult}])=>{
                            return(
                                testResult &&
                                <Card className='w-64 h-fit flex flex-col'>
                                    <CardImage
                                        image={getImgSrc('/result/tripCharacter', testResult.tripCharacter.id as string, FORMATPNG)}
                                        alt={testResult.tripCharacter.name}
                                        className='object-contain'
                                    >
                                        {/* <div className='flex flex-row absolute bottom-0 p-4 w-full justify-between'>
                                            <h4>{userId}</h4>
                                        </div> */}
                                    </CardImage>
                                    <div className='flex flex-col p-4 space-y-2'>
                                        <div className='flex flex-row items-center space-x-2'>
                                            <h4>{userId}</h4>
                                            {(userId ===  userName) && <h5>{strings.me}</h5>} 
                                        </div>
                                        <h6>{`${testResult.tripCharacter.prefix} ${testResult.tripCharacter.name}`}</h6>
                                        <div className='flex flex-wrap space-x-1'>
                                            {testResult.tripTagList?.map((tag) => <Chip label={tag} />)}
                                        </div>
                                    </div>
                                </Card>              
                            )
                        })}

                        {/* 일행 추가 버튼 카드
                            일행 추가 여부, 추가된 일행의 수와 무관하게 항상 활성화. 항상 리스트의 마지막에 위치함.
                            클릭시 AddFriend 다이얼로그를 새로 오픈. */}     
                        <Card className='w-64 h-64 flex flex-col'>
                            {
                                openAddFriendCard?             

                                /* 친구 추가 시스템 */
                                <div className='p-4 space-y-8'>                                    
                                    <div className='w-full h-28'>
                                        <AddFriend/>
                                    </div>
                                    <div>
                                        <h6>{strings.sections.chemistry.addFriend.giveMyName}</h6>
                                        <h4 className="text-center">{userName}</h4>
                                    </div>
                                </div>

                                /* 친구 추가하기 버튼 */
                                : <div className='h-full w-full flex justify-center items-center'>
                                <ToggleButton isActive={false} onClick={handleClickAddFriend}>                            
                                    <h4 className=''>{strings.sections.chemistry.addFriendButton}<AddCircleOutline /></h4>
                                </ToggleButton>                                    
                                </div>
                            }
                        </Card>
                    </div>   
                    {/* </div> */}

                    {/* 친구 추가 Dialog */}
                    {/* {openAddFriend && <div><AddFriend setOpen = {setOpenAddFriend} onClose = {handleCloseAddFriend}/></div>} */}
                    
                    {/* 여행 케미 테스트 시작 버튼
                        기본: 비활성화, 호버 시 친구 추가 안내.
                        친구를 한 명 추가했을 때: 활성화 */}
                    <div className='flex justify-center'>
                            <ConditionalWrapper
                                isWrapped={Object.keys(userList).length <= 1}
                                wrapper={(children: React.ReactElement) => 
                                    <Tooltip title={strings.sections.chemistry.startChemistryButtonTooltip} placement="right">
                                        <span className='cursor-pointer w-fit'>
                                            {children}
                                        </span>
                                    </Tooltip>
                                }
                            >
                                <Button disabled={Object.keys(userList).length <= 1}>{strings.sections.chemistry.startChemistryButton}<KeyboardArrowRight/></Button>
                            </ConditionalWrapper>
                    </div>
                </div>                
            </div>
        </div> 
    );
}

function ResultPageWithApi( props : ResultPageProps ){
    
    const fetchPlaceGroupById = useFetchPlaceGroupById();    
    
    /* 사용자 본인의 추천 여행지 Fetch. 최초 렌더링 시 1번만 호출. */
    useEffect(() => {
        console.log(`ResultPage: useEffect: fetchPlaceGroupById`)
        fetchPlaceGroupById(userName);
    }, [ fetchPlaceGroupById ]);

    const [ placeGroupLoadstatus, setPlaceGroupLoadStatus ] = usePlaceGroupLoadStatus({});
    useLoadStatus({ status: placeGroupLoadstatus, setStatus: setPlaceGroupLoadStatus});

    const { status: userListLoadStatus, doWaitApi: doWaitUserList } = useResult(userName);

    return(
        <PageLoader status = {userListLoadStatus} doWaitApi={doWaitUserList}>
            <PageLoader status = {placeGroupLoadstatus}>
                <ResultPage {...props}/>
            </PageLoader>
        </PageLoader>
    )
}

export default ResultPageWithApi;

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