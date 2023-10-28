import { useEffect, useState } from "react";
import { Link, Navigate, useSearchParams } from 'react-router-dom';

import { KeyboardArrowLeft, KeyboardArrowRight, AddCircleOutline } from "@mui/icons-material";

import { usePageString, useString } from "../../../texts";
import Button from "../../Button";
import IconStepper from "../../IconStepper";
import User, { userId } from "../../../common/types/User";
import { useChemistryLoadStatus, useGetChemistry, useGetResultById, useResult, useUserList, useUserListLoadStatus, useValueToUserList } from "../../../common/reducer/userListReducer";
import { LoadStatus } from "../../../common/types/loadStatus";
import { useSetElement } from "../../TopNav";
import StepItem, { Connector } from "../../StepItem";
import { FocusContextProvider } from "../../../common/focus/FocusContext";
import { useScrollCheckpoint } from "../../useScrollCheckpoint";
import { Skeleton } from "@mui/material";
import Card, { CardImage } from "../../Card";
import getImgSrc, { FORMATPNG } from "../../../common/utils/getImgSrc";
import { TestResult, UserId } from "../../../common/types/interfaces";
import LazyImage from "../../LazyImage";
import { useFetchChemistryByIdList } from "../../../common/reducer/chemistryReducer";
import useLoadStatus from "../../../common/hooks/useLoadStatus";
import PageLoader from "../../../common/load/PageLoader";
import Slider, { MaterialSlider, SliderItem } from "../../Slider";
import { TestResponse } from "../../../common/reducer/testResponseReducer";
import TestResponseSlider from "./TestResponseSlider";

interface ChemistryPageProps {
};

const userName = "디클1234";

/* 케미 테스트 결과를 확인한느 페이지 */
function ChemistryPage({ }:ChemistryPageProps){

    const page = "chemistry";

    /*** 텍스트 ***/
    const strings = usePageString(page);
    const testStrings = usePageString('test');

    /*** 데이터 ***/
    const getFriendApiPath = 'user';
    const userList = useUserList();
    const scheduleValueToUserList = useValueToUserList({ testName: 'schedule'});
    const budgetValueToUserList = useValueToUserList({ testName: 'budget', subTestName: 'food'});

    useEffect(()=>{
        console.log(`ChemistryPage: valueToUserList=${JSON.stringify(scheduleValueToUserList)}`);
    }, [ scheduleValueToUserList ]);


    const [searchParams, setSearchParams] = useSearchParams();
    const [userIdList, setUserIdList] = useState<userId[]>(searchParams.get('users')?.split(',') ?? []);
    const [chemistryResultData, setChemistryResultData] = useState();


    /*** 페이지 내 네비게이션 ***/ 
    const [ activeStep, setActiveStep ] = useState(0); /* 현재 step */
    const { activeCheckpointIndex, scrollCheckpoints } = useScrollCheckpoint({});

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
            <IconStepper
                steps={(Object.entries(strings.sections) as [k: any, v: {label: string, icon: string}][]).map(([k, v]) => 
                    ({label: v.label, icon: v.icon})
                )}
                activeStep={activeStep}
                handleClickStepButton={handleClickStepButton}
            />,
        dep: [ activeStep, strings.steps ]
    });

    /*** 컴포넌트 ***/

    /* 1. 여행 MBTI */
    const [ activeUser, setActiveUser ] = useState<UserId>();

    const handleClickCharacterCard = (userId: UserId) => setActiveUser(userId);

    /* S
    const handleClickStepButton = (index: number) => {
        setActiveSectionIndex(index); 
        scrollCheckpoints.current[index].scrollIntoView({behavior: "smooth"});
    }




    /* 사용자 모두의 응답, 사용자 모두의 테스트 결과, 사용자 조합의 케미스트리 결과 Fetch. 최초 렌더링 시 1번만 호출. */
    // useEffect(() => {
    //     setStatus && setStatus(LoadStatus.PENDING);
    //     fetchChemistryByIdList(userIdList);
    //     // getResult(); ! Deprecated: 위 Redux리덕스 연동 방식으로 변경 !
    // }, [setStatus, fetchResultById])

    // useEffect(()=> {
    //     setStatus?.(LoadStatus.PENDING);
    //     setSearchParams({'users' : userIdList.join(',')});
    // }, [userIdList, setSearchParams]);

    /* APIs */

    /* Get Chemistry Data */
    // const getChemistry = useServerApi({
    //     path: `${getFriendApiPath}/${userIdList}`,
    //     handleResponse: (data)=>{
    //         setChemistryResultData(data);
    //         setIsLoaded?.(true);
    //     },
    //     handleNoResponse: ()=>{},        
    // });

    /* Fetch Chemistry Data */
    const fetchChemistryByIdList = (userIdList : userId[]) => {
        /* ! Check if userIdList.join(',') is required ! */
        fetch(`${getFriendApiPath}/${userIdList}`) 
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            /* Find Success. 입력한 id가 UserInfo DB에 존재하며 사용자 정보를 응답으로 받음. 
             * data: user 객체.*/
            if(data){

            }         
            /* Find miss. 입력한 id가 UserInfo DB에 존재하지 않음.  */     
            else{
                console.log("MISS");      
            }
        })
    }
    
    return(
        <div className="relative">
            <div className='flex flex-col pt-24 space-y-20 [&>*>*]:pl-16'>
                {/* 1. 여행 유형 알아보기 */}
                <div>
                    <h3>{strings.sections.character.characterTitle}</h3>
                    <h5>{strings.sections.character.characterSubtitle}</h5>
                    <div className="flex flex-row items-center justify-center py-8 space-x-6">
                        {Object.entries(userList)?.map(([userId, {testResult}])=>{
                            return(
                                testResult &&
                                <Card onClick={()=>handleClickCharacterCard(userId)} className='w-52 h-fit flex flex-col'>
                                    <CardImage
                                        image={getImgSrc('/result/tripCharacter', testResult.tripCharacter.id as string, FORMATPNG)}
                                        alt={testResult.tripCharacter.name}
                                        className='object-contain'
                                        size='md'
                                    >
                                    </CardImage>
                                    <div className='flex flex-col p-4 space-y-2'>
                                        <div className='flex flex-row items-center space-x-2'>
                                            <h4>{userId}</h4>
                                            {(userId ===  userName) && <h5>{strings.me}</h5>} 
                                        </div>
                                        <h6>{`${testResult.tripCharacter.prefix} ${testResult.tripCharacter.name}`}</h6>
                                    </div>
                                </Card>              
                            )
                        })}
                    </div>
                    <h5>
                        tripCharacter 설명
                    </h5>
                </div>

                {/* 2. 리더 */}
                <div>
                    <h3>{strings.sections.leadership.leadershipTitle}</h3>
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
                    <h5>
                        리더 설명
                    </h5>
                </div>

                {/* 3. 일정 */}
                <div>
                    <h3>{strings.sections.schedule.scheduleTitle}</h3>
                    <div className='flex flex-col'>
                        {TestResponseSlider({testName: 'schedule'})({})}
                        <h5>
                            일정 설명
                        </h5>
                    </div>
                </div>

                {/* 4. 예산 */}
                <div>
                    <h3>{strings.sections.budget.budgetTitle}</h3>
                    <div className='flex flex-col'>
                        {TestResponseSlider({ testName: 'budget', subTestName: 'food' })({})}
                        <h5>
                            예산 설명
                        </h5>
                    </div>
                </div>
            </div>
        </div> 
    );
}

function ChemistryPageWithApi(props: ChemistryPageProps){

    const fetchResultById = useGetResultById();
    const fetchChemistry = useGetChemistry();    

    const [ doWaitApi, setDoWaitApi ] = useState<boolean>(true);

    /* 사용자 본인의 테스트 결과 Fetch. 최초 렌더링 시 1번만 호출. */
    useEffect(() => {
        console.log(`ChemistryPage: useEffect: fetchResultById`)
        fetchResultById(userName);
        setDoWaitApi(false);
    }, [ fetchResultById ]);
    
    /* 사용자 본인의 추천 여행지 Fetch. 최초 렌더링 시 1번만 호출. */
    // useEffect(() => {
    //     console.log(`ResultPage: useEffect: fetchChemistry`)
    //     fetchChemistry([userName]);
    // }, [ fetchChemistry ]);

    // const [ chemistryLoadstatus, setChemistryLoadStatus ] = useChemistryLoadStatus();
    // useLoadStatus({ status: chemistryLoadstatus, setStatus: setChemistryLoadStatus });
    
    const { status: userListLoadStatus, doWaitApi: doWaitUserList } = useResult(userName);

    return(
        <PageLoader status = {userListLoadStatus} doWaitApi={doWaitUserList}>
            {/* <PageLoader status = {chemistryLoadstatus}> */}
                <ChemistryPage {...props}/> 
            {/* </PageLoader>  */}
        </PageLoader>      
    )
}

export default ChemistryPageWithApi;