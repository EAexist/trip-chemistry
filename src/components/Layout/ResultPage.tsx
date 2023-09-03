import React, { useState, createContext } from "react";
import { Link, Navigate } from 'react-router-dom';

// import { Card, CardContent, CardMedia, Chip } from '@mui/material'
import { ButtonBase, Skeleton, Tooltip } from '@mui/material';

import { KeyboardArrowLeft, KeyboardArrowRight, AddCircleOutline } from "@mui/icons-material";

import Card, { ClickableCard, CardProps } from "../Card";
import { usePageString } from "../../texts";
import Button from "../Button";
import TestStepper from "../TestStepper";
import AddFriendDialog from "../ResultPage/AddFriendDialog";

interface ResultPageProps{
    // section : 
};

interface place{
    title: string;
    body: string;
    tags: string[]
}

const userName = "꿀벌1234";

/* 사용자 1인의 여행 타입 테스트 결과를 확인하고, 케미 테스트를 위해 친구를 추가해 일행을 구성하는 페이지 */
function ResultPage({}:ResultPageProps){

    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const [isFriendAdded, setIsFriendAdded] = useState(false);
    const [openAddFriendDialogue, setOpenAddFriendDialogue] = useState(false);
    const [showAddFriendTooltip, setShowAddFriendTooltip] = useState(false);

    const handleClickAddFriend = () => {
        setOpenAddFriendDialogue(true);
    }; 
    const handleCloseAddFriendDialogue = () => {
        setOpenAddFriendDialogue(false);
    };
    
    const page = 'result'
    const strings = usePageString(page);

    return(
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
                    <TestStepper 
                        steps = {(strings.steps as string[]).map((label)=>{
                            return {label:label};
                        })}
                        activeSectionState={{
                            activeSectionIndex: activeSectionIndex,
                            setActiveSectionIndex: setActiveSectionIndex
                        }}
                        enableHover = {false}
                    />
                </div>
                <Button>{strings.startChemistryButton}<KeyboardArrowRight/></Button>
            </div>
            <div className='flex flex-col'>
                {/* 사용자 테스트 결과 */}
                <div>
                    <div><h3>{strings.typeIntro}</h3></div>
                    <h1>{strings.typePrefix}</h1>
                    <h1>{strings.typeName}</h1>
                    <p>{strings.typeBody}</p>
                </div>

                {/* 여행지 추천 */}
                <div>
                    <h3>{strings.placeIntro}</h3>
                    <h1>{strings.placeTitle}</h1>
                    <h3>{strings.placeListIntro}</h3>
                    <div className='flex flex-row justify-center'>
                        {(strings.placeCards as CardProps[]).map((cardProps, index)=>{
                            return(
                                <ClickableCard {...cardProps}/>
                            )
                        })}                      
                    </div>                    
                </div>
                {/* 여행 케미 테스트 시작 */}
                <div>
                    <h3>{strings.startChemistryIntro}</h3>
                    <h1>{strings.startChemistryTitle}</h1>
                    {/* 여행 일행 카드 리스트
                        {사용자}, {일행1}, {일행2}, ..., {일행 추가 버튼}  */}
                    <div className='flex flex-row justify-center'>
                        {/* 사용자 카드 */}
                        <Card {...{
                            title: userName,
                            body: `${strings.typePrefix} ${strings.typeName}`,
                            tags: strings.userTags,
                        }}/>           
                        {/* 일행 추가 버튼 카드
                            일행 추가 여부, 추가된 일행의 수와 무관하게 항상 활성화. 항상 리스트의 마지막에 위치함.
                            클릭시 AddFriendDialogue 다이얼로그를 새로 오픈. */}              
                        <ClickableCard {...{
                            onClick: handleClickAddFriend,
                            replaceCardMedia: <h3>{strings.addFriendButton}<AddCircleOutline/></h3>,
                            title: <Skeleton variant="text" width='64px'/>,
                            body: <Skeleton variant="text" width='128px'/>,
                            tags: [10, 6, 8, 12].map((count)=>{
                                return('\xa0'.repeat(count));
                            })
                        }}/>                                                             
                    </div>   
                </div>
                <AddFriendDialog {...{onClose: handleCloseAddFriendDialogue, open: openAddFriendDialogue}}/>
                {/* 여행 케미 테스트 시작 버튼
                    기본: 비활성화, 호버 시 친구 추가 안내.
                    친구를 한 명 추가했을 때: 활성화 */}
                <div className='flex justify-center'>
                    {isFriendAdded ?
                    <span className='cursor-pointer w-fit'>
                        <Button>{strings.startChemistryButton}<KeyboardArrowRight/></Button>
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
    );
}
export default ResultPage;