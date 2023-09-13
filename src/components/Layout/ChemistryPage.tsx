import React, { useState, useEffect, createContext } from "react";
import { Link, Navigate, useSearchParams } from 'react-router-dom';

// import { Card, CardContent, CardMedia, Chip } from '@mui/material'
import { ButtonBase, Skeleton, Tooltip } from '@mui/material';

import { KeyboardArrowLeft, KeyboardArrowRight, AddCircleOutline } from "@mui/icons-material";

import Card, { ClickableCard, CardProps } from "../Card";
import { usePageString } from "../../texts";
import Button from "../Button";
import NavStepper from "../NavStepper";
import User, { userId } from "../../interface/User";
import useServerApi from "../utils/useServerApi";
import withLoadStatus, { Loader, withLoadStatusProps } from "../utils/withLoadStatus";
import { loadStatus } from "../ApiLoader";
import { useUserListLoadStatus } from "../../reducer/userListReducer";

interface ChemistryPageProps extends withLoadStatusProps{
};

interface place{
    title: string;
    body: string;
    tags: string[]
}

const userName = "꿀벌1234";

/* 케미 테스트 결과를 확인한느 페이지 */
function ChemistryPage({ status, setStatus }:ChemistryPageProps){

    const strings = usePageString('result');
    const getFriendApiPath = 'user';
    /* States: Navigation */
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);

    /* States: useLocation */
    const [searchParams, setSearchParams] = useSearchParams();
    const [userIdList, setUserIdList] = useState<userId[]>(searchParams.get('users')?.split(',') ?? []);
    const [chemistryResultData, setChemistryResultData] = useState();

    /* 사용자 모두의 응답, 사용자 모두의 테스트 결과, 사용자 조합의 케미스트리 결과 Fetch. 최초 렌더링 시 1번만 호출. */
    // useEffect(() => {
    //     setStatus && setStatus(loadStatus.PENDING);
    //     fetchChemistryByIdList(userIdList);
    //     // getResult(); ! Deprecated: 위 Redux리덕스 연동 방식으로 변경 !
    // }, [setStatus, fetchResultById])

    // useEffect(()=> {
    //     setStatus?.(loadStatus.PENDING);
    //     setSearchParams({'users' : userIdList.join(',')});
    // }, [userIdList, setSearchParams]);

    const handleClickStepLabel = () => {

    }   

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
        status === loadStatus.REST ?
        <div className='page'>
            {/* TopNaV 네비게이션 */}
            <div className = 'flex flex-row flex-auto justify-between'>
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
            <div className='flex flex-col'>
                {/* 1. 여행 유형 알아보기 */}
                <div>
                    <h1>{strings.characeterTitle}</h1>
                    <h3>{strings.characeterSubtitle}</h3>
                </div>

                {/* 2. 리더 */}
                <div>
                    <h1>{strings.leadershipTitle}</h1>           
                </div>
                {/* 3. 일정 */}
                <div>
                    <h1>{strings.scheduleTitle}</h1>           
                </div>
                {/* 2. 예산 */}
                <div>
                    <h1>{strings.budgetTitle}</h1>           
                </div>                
            </div>
        </div> :
        <></>
    );
}

function ChemistryPageWithLoadStatus(props: ChemistryPageProps){
    const [status, setStatus] = useUserListLoadStatus();

    return(
        withLoadStatus(ChemistryPage)(Loader, status, setStatus)(props)        
    )
}

export default ChemistryPageWithLoadStatus;