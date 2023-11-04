import { createContext, useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';

import { usePageString, useString, useTestString } from "../../texts";
import Button from "../Button";
import IconStepper from "../IconStepper";
import User, { userId } from "../../common/types/User";
import { UserDataKey, deleteUser, useChemistry, useHandleSuccessAll, useLoadData, useLoadDataAll, useLoadStatus, useTestResponseObject, useTestResultObject, useUserIdList, useValueToUserList } from "../../common/reducer/userListReducer";
import { Avatar, ButtonBase, Icon, Skeleton, Tooltip } from "@mui/material";
import Card, { CardImage } from "../Card";
import getImgSrc, { FORMATPNG } from "../../common/utils/getImgSrc";
import { TestResult, UserId } from "../../common/types/interfaces";
import LazyImage from "../LazyImage";
import { useFetchChemistryList } from "../../common/reducer/chemistryReducer";
import useHandleLoadSuccess from "../../common/hook/useHandleLoadSuccess";
import PageLoader from "../../common/load/PageLoader";
import Slider, { MaterialSlider, SliderBackground, SliderItem } from "../Slider";
import { useSetTopNav } from "../TopNav";
import LeftNav, { LeftNavWithScroll } from "../LeftNav";
import useScrollCheckpoint from "../../common/scrollCheckpoint/ScrollCheckpointContainer";
import { ScrollCheckpointContextProvider } from "../../common/scrollCheckpoint/ScrollCheckpointContext";
import ScrollCheckpoint from "../../common/scrollCheckpoint/component/ScrollCheckpoint";
import ToggleButton from "../ToggleButton";
import AvatarList from "../AvatarList";
import { priceText } from "../../common/utils/priceText";
import CityCard from "../cityCard";
import { SubTestName } from "../../common/reducer/testResponseReducer";
import { useSelector } from "react-redux";
import { LoadStatus } from "../../common/types/loadStatus";
import LeaderCard from "./chemistryPage/LeaderCard";
import TestResultCard from "./chemistryPage/TestResultCard";
import ScheduleSliderItem from "./chemistryPage/ScheduleSliderItem";
import BudgetSliderItem from "./chemistryPage/BudgetSliderItem";
import CitySliderItem from "./chemistryPage/CitySliderItem";
import AddFriend from "./resultPage/AddFriend";
import AddFriendCard from "./chemistryPage/AddFriendCard";
import ConditionalWrapper from "../../common/utils/ConditionalWrapper";
import { useDispatch } from "react-redux";
import ScrollCheckpointContainer from "../../common/scrollCheckpoint/ScrollCheckpointContainer";

interface ChemistryPageProps {
};

const userName = "디클1234";

/* 케미 테스트 결과를 확인한느 페이지 */
function ChemistryPage({ }:ChemistryPageProps){

    const page = "chemistry";

    /*** 텍스트 ***/
    const strings = usePageString(page);
    const testStrings = usePageString('test');
    const citySubTestStrings = useTestString({ testName: 'city' }).subTests;

    /* 반응형 디자인 */
    const max_md = false;

    /*** 데이터 ***/
    const dispatch = useDispatch(); 

    /* UserData */
    const chemistry = useChemistry();
    const testResultObject = useTestResultObject();
    const [ localTestResultObject, setLocalTestResultObject ] = useState( testResultObject );

    const userIdList = useUserIdList();
    // const [searchParams, setSearchParams] = useSearchParams();
    // const [ userIdList, setUserIdList ] = useState<userId[]>(searchParams.get('users')?.split(',') ?? []);
    // const [chemistryResultData, setChemistryResultData] = useState();
    
    /*** 컴포넌트 ***/

    /* LeftNav */
    const steps = (Object.entries(strings.sections) as [ id: any, v: { label: string, icon: string } ][]).map(([ id, v ]) => 
        ({ id, label: v.label, icon: v.icon })
    )
    const idToIndex = Object.fromEntries(Object.keys(strings.sections).map((key, index) => [key, index]));

    /* 0. 친구 추가 */
    const isChemistryEnabled = Object.keys(localTestResultObject).length > 1
    
    /*  [여행 케미 확인하기] 버튼 클릭.*/    
    const { getDataAll: getTestResponseAll, status: testResponseLoadStatus, setStatus: setTestResponseLoadStatus, doWaitApi: doWaitTestResponse } = useLoadDataAll( 'testResponse' );

    const handleClickStartChemistry = () => {
        getTestResponseAll();
    };

    /* 친구 삭제 */
    const handleClickDeleteFriend = ( userId : UserId ) => {
        dispatch( deleteUser( userId ) );
    }

    /* 1. 여행 MBTI */
    const [ activeUser, setActiveUser ] = useState<UserId>( userIdList[0] );
    const handleClickCharacterCard = ( userId: UserId ) => setActiveUser(userId);

    const ScheduleSliderItemComponent = ScheduleSliderItem( 'schedule' );
    const BudgetSliderItemComponent = BudgetSliderItem( 'food' );

    /* 5. 여행지 */
    const [ expandedCityAccordion, setExpandedCityAccordion ] = useState<number | undefined>();
    const handleClickExpandButton = ( index: number ) =>{
        if( index === expandedCityAccordion ){
            setExpandedCityAccordion( undefined );
        } 
        else{
            setExpandedCityAccordion( index );
        }
    }
    
    return(
        <div className="full relative page">
        <ScrollCheckpointContainer idToIndex={ idToIndex }>
        <LeftNavWithScroll steps={ steps } />
            <div className='flex flex-col space-y-20 body'>
                <div className="space-y-10">
                    <ScrollCheckpoint id={ 'addFriend' }/>

                    {/* 여행 일행 카드 리스트: {사용자}, {일행1}, {일행2}, ..., {일행 추가 버튼}  */}
                    <div className='flex flex-row items-center justify-center py-8 space-x-6'>

                        {/* 실제 사용자 카드: {사용자}, {일행1}, {일행2}, ... */}
                        {userIdList.map((userId) =>
                            <TestResultCard key={userId} userId={userId} handleClickDelete={(userId === userName) ? undefined : () => handleClickDeleteFriend(userId)} meString={strings.me} variant="md" />
                        )}

                        {/* 일행 추가 버튼 카드: 일행 추가 여부, 추가된 일행의 수와 무관하게 항상 활성화. 항상 리스트의 마지막에 위치함. 클릭시 AddFriend 다이얼로그를 새로 오픈. */}
                        <AddFriendCard/>
                    </div>

                    {/* 친구 추가 Dialog */}
                    {/* 여행 케미 테스트 시작 버튼: [기본] 비활성화, 호버 시 친구 추가 안내. [친구를 한 명 추가했을 때] 활성화 */}
                    <div className='flex justify-center'>
                        <ConditionalWrapper
                            isWrapped={!isChemistryEnabled}
                            wrapper={(children: React.ReactElement) =>
                                <Tooltip title={strings.sections.addFriend.startChemistryButtonTooltip} placement="right">
                                    <span className='cursor-pointer w-fit'>
                                        {children}
                                    </span>
                                </Tooltip>
                            }
                        >
                            <Button onClick={ handleClickStartChemistry } disabled={!isChemistryEnabled}>{strings.sections.addFriend.startChemistryButton}<Icon>keyboard_arrow_right</Icon></Button>
                        </ConditionalWrapper>
                    </div>
                </div>

                {/* 1. 여행 유형 알아보기 */}
                <div> 
                    <ScrollCheckpoint id={ 'tripCharacter' }/>
                    <h4>{strings.sections.tripCharacter.title}</h4>
                    <h5>{strings.sections.tripCharacter.subtitle}</h5>
                    <div className="flex flex-row items-center justify-center py-8 space-x-6">
                        {Object.entries( testResultObject )?.map(([userId, testResult])=>{
                            return(
                                testResult &&
                                <ToggleButton key={userId} isActive={userId === activeUser} onClick={()=>handleClickCharacterCard(userId)}>
                                    <TestResultCard userId={ userId } meString={ strings.me } variant="sm"/>
                                </ToggleButton>       
                            )
                        })}
                    </div>
                    <h5>{activeUser && testResultObject[activeUser].tripCharacter.body}</h5>
                </div>

                {/* 2. 리더 */}
                <div>
                    <ScrollCheckpoint id={ 'leadership' }/>
                    <h4>{strings.sections.leadership.title}</h4>
                    <div className='flex flex-row space-x-16'>
                    {
                        chemistry.data.leader.map(userId => 
                            <LeaderCard key={userId} userId={userId} testResultObject={testResultObject} leaderTitle={strings.sections.leadership.leaderTitle} /> 
                        )
                    }                        
                    </div>

                    <h5>
                        {"리더 디클 님이 여행 계획과 준비를 주도적으로 이끌어 주면 좋을 것 같아요.\n \
                        단, 스스로 지치지 않게 무리하지 말아요. 일행과 이야기를 나누고 함께 설레하는 순간부터 이미 여행이 시작된답니다."}
                    </h5>
                </div>

                {/* 3. 일정 */}
                <div>
                    <ScrollCheckpoint id={ 'schedule' }/>
                    <h4>{strings.sections.schedule.title}</h4>
                    <div className='flex flex-col'>
                        <div className='flex justify-center'>
                        <Slider {...testStrings.schedule.sliderProps} className="w-192 mt-36 mb-24">
                            <ScheduleSliderItemComponent/>
                            {Object.keys(testStrings.schedule.answers).map(value =>
                                <SliderItem key={value} value={Number(value)}>
                                    <div className='-translate-x-1/2 translate-y-1/2'>
                                        <Avatar sx={max_md? { width: 20, height: 20, fontSize: "0.8rem" } : { width: 24, height: 24, fontSize: "1rem" } }>{(Number(value)+1).toString()}</Avatar>
                                    </div>
                                </SliderItem>
                            )}                            
                        </Slider>
                        </div>
                        <h5>
                            {
                                "일정은 힘들지 않게 널널한걸 기본으로 하되, 꼭 가야 하는 곳들을 놓치지 않도록 노력해봐요.\n \
                                우동 님은 디클 님이 여행에서 아쉬움이 남지 않도록 디클 님이 여행에서 꼭 하고 싶은 것들에 대한 이야기를 듣는 시간을 가져 함께 하고 싶은 동기를 만들어보세요.\n \
                                디클 님은 우동 님이 지치지 않도록 체력과 여유를 고려해서 일정에 대한 욕심을 조금은 버려보도록 해요."
                            }
                        </h5>
                    </div>
                </div>

                {/* 4. 예산 */}
                <div>
                    <ScrollCheckpoint id={ 'budget' }/>
                    <h4>{strings.sections.budget.title}</h4>
                    <div className='flex flex-col'>
                        <div className='flex flex-row items-center space-x-32'>
                            <div>
                                <h3 className='w-48'>{testStrings.budget.subTests.food.title}</h3>
                            </div>
                            <div>
                            <Slider {...testStrings.budget.subTests.food.sliderProps} className="w-160 mt-36 mb-16">
                                <SliderBackground/>
                                <BudgetSliderItemComponent/>
                            </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            
                {/* 5. 여행지 */}
                <div>
                    <ScrollCheckpoint id={ 'city' }/>
                    <h4>{strings.sections.city.title}</h4>
                    <div className='flex flex-col'>
                        {(Object.entries(citySubTestStrings) as [k: SubTestName, v: any][]).map(([ subTestName, subTestStrings ] , index) => {                            
                            const CitySliderItemComponent = CitySliderItem( subTestName );
                            return(
                                <div key={subTestName} className='relative'>
                                    <div className='flex flex-col'>
                                    <div className='flex flex-row items-center space-x-12'>
                                        <div className='w-56'>
                                        <h3>{subTestStrings.title}</h3>
                                        </div>
                                        <Slider {...testStrings.city.sliderProps} className="w-160 mt-32 mb-12">
                                            <CitySliderItemComponent/>
                                        </Slider>
                                        <Button onClick={()=>handleClickExpandButton(index)} className='absolute right-4'>
                                            <Icon>{ index !== expandedCityAccordion ? 'expand_more' : 'expand_less' }</Icon>
                                        </Button>
                                    </div>
                                    </div>
                                    { index === expandedCityAccordion &&
                                        /* 응답에 따른 예시 이미지카드 Carousel */
                                        <div className='center flex-row h-52 space-x-2'>
                                            {subTestStrings.examples?.map(( city : string ) => (
                                                <CityCard city={city} />
                                            ))}
                                        </div>
                                    }
                                </div>
                            )
                        })}
                        <h5>
                            여행지 설명
                        </h5>
                    </div>
                </div>

            </div>
            </ScrollCheckpointContainer>
        </div> 
    );
}

function ChemistryPageWithApi( props: ChemistryPageProps ){

    useEffect(()=>{
        console.log(`ChemistryPageWithApi props=${ JSON.stringify( props ) }`);
    }, []);
    
    const { status: userTestResultLoadStatus, setStatus: setUserTestResultLoadStatus, doWaitApi: doWaitResult } = useLoadData( userName, 'testResult' );
    const status =  userTestResultLoadStatus ? userTestResultLoadStatus : LoadStatus.FAIL

    useHandleSuccessAll( status, setUserTestResultLoadStatus, 'testResult' );

    return(
        <PageLoader status = {status} doWaitApi={doWaitResult}>
            <ChemistryPage {...props}/> 
        </PageLoader>      
    )
}

export default ChemistryPageWithApi;

/* Deprecated */

// useSetTopNav({
//     element:   
//         <IconStepper
//             steps={(Object.entries(strings.sections) as [k: any, v: {label: string, icon: string}][]).map(([k, v]) => 
//                 ({label: v.label, icon: v.icon})
//             )}
//             activeStep={activeStep}
//             handleClickStepButton={handleClickStepButton}
//         />,
//     dep: [ activeStep, strings.steps ]
// });

/* Fetch Chemistry Data */
// const fetchChemistryList = (userIdList : userId[]) => {
//     /* ! Check if userIdList.join(',') is required ! */
//     fetch(`${getFriendApiPath}/${userIdList}`) 
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         /* Find Success. 입력한 id가 UserInfo DB에 존재하며 사용자 정보를 응답으로 받음. 
//             * data: user 객체.*/
//         if(data){

//         }         
//         /* Find miss. 입력한 id가 UserInfo DB에 존재하지 않음.  */     
//         else{
//             console.log("MISS");      
//         }
//     })
// }