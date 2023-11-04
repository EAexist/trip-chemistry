import { useState, useRef, useEffect, UIEvent, useContext, useCallback, PropsWithChildren } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Icon, Skeleton, Tooltip, } from '@mui/material';

import { KeyboardArrowRight, AddCircleOutline, ArrowRight } from "@mui/icons-material";

import { usePageString, useString } from "../../texts";
import Button from "../Button";
import IconStepper from "../IconStepper";
import AddFriend from "./resultPage/AddFriend";
import { deleteUser, useUserIdList, useTestResultObject, useLoadStatusAll, useLoadData } from "../../common/reducer/userListReducer";
import { UserId } from "../../common/types/interfaces";
import { NationId, useFetchPlaceGroup, useNationFilter, usePlaceGroup, usePlaceGroupLoadStatus } from "../../common/reducer/cityGroupReducer";
import ToggleButton from "../ToggleButton";
import getImgSrc, { FORMATPNG, FORMATSVG, FORMATWEBP } from "../../common/utils/getImgSrc";
import Chip from "../Chip";

/* Swiper */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Card, CardImage, CardDetail } from "../Card";
import FocusContainer from "../FocusContainer";

import Logo from "../Logo";
import { FocusSummary, } from "../../common/focus/FocusContext"; 
import LazyImage from "../LazyImage";

import ReactCountryFlag from "react-country-flag"
import ConditionalWrapper from "../../common/utils/ConditionalWrapper";
import { LoadStatus } from "../../common/types/loadStatus";
import useLoadStatus from "../../common/hook/useHandleLoadSuccess";
import SectionHeader from "../SectionHeader";
import PageLoader from "../../common/load/PageLoader";
import { useSetTopNav } from "../TopNav";
import LeftNav, { LeftNavWithScroll } from "../LeftNav";
import useScrollCheckpoint from "../../common/scrollCheckpoint/ScrollCheckpointContainer";
import { ScrollCheckpointContextProvider } from "../../common/scrollCheckpoint/ScrollCheckpointContext";
import ScrollCheckpoint from "../../common/scrollCheckpoint/component/ScrollCheckpoint";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CityCard from "../cityCard";
import TestResultCard from "./chemistryPage/TestResultCard";
import ScrollCheckpointContainer from "../../common/scrollCheckpoint/ScrollCheckpointContainer";

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
    const dispatch = useDispatch(); 

    /* 사용자 데이터 Fetch 및 사용자 데이터 */
    const userIdList = useUserIdList();
    const testResultObject = useTestResultObject();
    // const [ testResultObjectLoadStatus ] = useLoadStatus({});
    const [ localTestResultObject, setLocalTestResultObject ] = useState( testResultObject );
    const [ testResultLoadStatus, ] = useLoadStatusAll( 'testResult' );

    /* 모든 Result 의 로드 상태가 REST 일 때에만 local 데이터를 업데이트. ( 사용자 새로 추가 시 자연스러운 UI를 위해 필요. ) */
    useEffect(()=>{
        if( testResultLoadStatus === LoadStatus.REST ){
            setLocalTestResultObject( testResultObject );
        }
    }, [ userIdList, testResultLoadStatus]);

    /* 장소 데이터 Fetch 장소 데이터 */
    const [ cityGroupIndex, setPlaceGroupIndex ] = useState(0); 
    const [ cityGroupName, cityGroup ] = usePlaceGroup(cityGroupIndex);
    const [ nationFilter, toggleNationFilter ] = useNationFilter(cityGroupIndex);

    /* 지원되는 지역 필터(일본, 홍콩)와 를 지원하지 않는 지역(한국, 동남아시아)를 포함한 전체 지역 필터 */
    const nationFilterWithOthers = {...nationFilter, kr: undefined, sea: undefined }; 

    /* URL Parameter Setter. URL의 Parameter를 {?users={id0},{id1},{id2},...} 과 같이 설정함. */
    useEffect(() => {
        const testResultObjectPath = `?users=${userIdList.join(',')}`
        /* https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState */
        window.history.replaceState(null, "", testResultObjectPath);
    }, [ userIdList ]) 

    /*** 컴포넌트 ***/

    /* LeftNav */
    const steps = (Object.entries(strings.sections) as [id: any, v: {label: string, icon: string}][]).map(([ id,  v ]) => 
        ({id, label: v.label, icon: v.icon})
    )
    const idToIndex = Object.fromEntries(Object.keys(strings.sections).map(( id, index ) => [ id, index ]));

    /*** Section 2. 케미스트리 ***/

    /* Chemistry 페이지 이동 */
    const navigate = useNavigate();

    /*  [여행 케미 확인하기] 버튼 클릭.*/    
    const handleClickNavigateToChemistry = () => {
        navigate('/chemistry');    
    }
        
    return(
        <div className="full relative page">
            <ScrollCheckpointContainer idToIndex={ idToIndex }>
            <LeftNavWithScroll steps={steps} />
            {/* <div className='page'> */}
                {/* <ScrollCheckpointContextProvider idToIndex={idToIndex} scrollCheckpointList={scrollCheckpointList}> */}
                    <div className='flex flex-col space-y-20 body'>
                        {/* 사용자 테스트 결과 */}
                        <div className="space-y-4">
                            <ScrollCheckpoint id={'tripCharacter'} />
                            <h4>{strings.sections.tripCharacter.typeIntro}</h4> {/* ScrollRef 0 */}
                            <div className='flex flex-row items-end h-48 space-x-16'>
                                <div>
                                    <h2>{testResultObject[userName].tripCharacter?.prefix}</h2>
                                    <h2>{testResultObject[userName].tripCharacter?.name}</h2>
                                </div>
                                <div className='h-full'>
                                    <LazyImage
                                        src={getImgSrc('/result/tripCharacter', testResultObject[userName].tripCharacter?.id as string, FORMATPNG)}
                                        alt={testResultObject[userName].tripCharacter?.name as string}
                                        className="h-full"
                                    >
                                        <Skeleton variant="rectangular" width={'100%'} height={'100%'}/>
                                    </LazyImage>
                                </div>
                            </div>
                            <h5>{testResultObject[userName].tripCharacter?.body}</h5>
                        </div>

                        {/* 여행지 추천 */}

                        {/* 타이틀: 추천 여행지 타입 */}
                        <SectionHeader imageSrc={getImgSrc('/result', `cityGroupTitle-bg-nature`, FORMATWEBP)}>
                            <ScrollCheckpoint id={'city'} /> {/* ScrollRef 1 */}
                            <h2>{cityGroupName}</h2>
                            <h4>{strings.sections.city.citySuffix}</h4>
                        </SectionHeader>
                        <div className="space-y-4">
                            {/* 여행지 국가 필터 */}
                            <div className="h-20 py-4 flex flex-row items-center space-x-2">
                                <h5>{strings.sections.city.nationFilterTitle}</h5>
                                <h5> | </h5>
                                {Object.entries(nationFilterWithOthers).map(([nationId, isActive]) => {
                                    const nation = commonStrings.nation[nationId];
                                    console.log(`ResultPage: nationId=${nationId} isActive=${isActive}`)
                                    return (
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
                                            <ToggleButton isActive={isActive || false} disabled={isActive === undefined} onClick={() => { toggleNationFilter(nationId); }} variant='round'>
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
                                {cityGroup?.filter(({ nationId }) => (nationFilter as { [key: NationId]: boolean })[nationId as NationId])
                                    .map(({ id, name, body, tripTagList }, index) => <CityCard city={id}/>
                                    //  {

                                    //     console.log(getImgSrc('city', `${id}`, FORMATWEBP));
                                    //     const city = commonStrings.city[id]
                                    //     return (
                                    //         <CityCard city={id}/>
                                    //     )
                                    // }
                                    )}

                            </div>
                        </div>

                        {/* 여행 케미 테스트 시작 */}
                        {/* 타이틀 */}
                        <SectionHeader imageSrc={getImgSrc('/result', `startChemistryTitle-bg-airplane`, FORMATWEBP)}>
                            <ScrollCheckpoint id={'chemistry'} /> {/* ScrollRef 2 */}
                            <h4>{strings.sections.chemistry.startChemistryIntro}</h4>
                            <h2>{strings.sections.chemistry.startChemistryTitle}</h2>
                        </SectionHeader>
                        <div>
                            <Button onClick={ handleClickNavigateToChemistry }>{strings.sections.chemistry.navigateToChemistryButton}<Icon>keyboard_arrow_right</Icon></Button>
                        </div>
                    </div>
                {/* </ScrollCheckpointContextProvider> */}
                </ScrollCheckpointContainer>
            </div>
    );
}

function ResultPageWithApi( props : ResultPageProps ){
    
    const fetchPlaceGroup = useFetchPlaceGroup();    
    
    /* 사용자 본인의 추천 여행지 Fetch. 최초 렌더링 시 1번만 호출. */
    useEffect(() => {
        console.log(`ResultPage: useEffect: fetchPlaceGroup`)
        fetchPlaceGroup(userName);
    }, [ fetchPlaceGroup ]);

    const [ placeGroupLoadstatus, setPlaceGroupLoadStatus ] = usePlaceGroupLoadStatus({});
    const { status: testResultLoadStatus, doWaitApi: doWaitUserList } = useLoadData( userName, 'testResult' );

    return(
        <PageLoader status = {testResultLoadStatus ? testResultLoadStatus : LoadStatus.PENDING} doWaitApi={doWaitUserList}>
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

// useSetTopNav({
//     /* TopNav 의 Step 컴포넌트 */                
//     element:              
//         <IconStepper
//             steps={(Object.entries(strings.sections) as [k: any, v: {label: string, icon: string}][]).map(([k, v]) => 
//                 ({label: v.label, icon: v.icon})
//             )}
//             activeStep={activeStep}
//             handleClickStepButton={handleClickStepButton}
//         />,
//     dep: [ activeStep, strings.sections ]
// });