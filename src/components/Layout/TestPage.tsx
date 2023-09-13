import React, { useState, useCallback, createContext, useEffect } from "react";
import { Navigate, useLocation } from 'react-router-dom';

import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import { testRoutePropsWithResponse, testPageRoutes } from '../../pages';
import Button from "../Button";
import NavStepper from "../NavStepper";
import IndexNavigationButtonWrapper from "../IndexNavigationButtonWrapper";
import { usePageString } from "../../texts";
import withLoadStatus, { Loader, withLoadStatusProps } from "../utils/withLoadStatus";
import { loadStatus } from "../ApiLoader";

interface TestPageProps extends withLoadStatusProps{
};

interface ActiveSectionContextProps{
    activeSectionIndex: number;
    setActiveSectionIndex: (activeSectionIndex: number) => void;
    incrementActiveSectionIndex?: (offset:number) => void;
    maxActiveSectionIndex?: number;
};
const ActiveSectionContext = createContext<ActiveSectionContextProps>({} as ActiveSectionContextProps);

function WithAnimate({keyProp, className, children}:React.PropsWithChildren<{keyProp: any, className: string}>){
    return(
        <div key = {keyProp} className={className}>
            {children}
        </div>
    )
}

function TestPage({status, setStatus}:TestPageProps){

    // Index(0~) of active section (the section user is currently viewing). 
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);

    const strings = usePageString('test');
    const sections = Object.keys(strings);

    // Current state of each steps' completeness.
    const [steps, setSteps] = useState(sections?.map((label, index)=>{
        return(
            {
                label: label, 
                completed: false
            }
        ); 
    }));

    useEffect(()=>{
        const path = window.location.pathname.split('/').at(-1);
        const index = sections.indexOf(path? path : '')
        console.log(`TestPage - path=${path} index=${index}`);
        setActiveSectionIndex(index < 0 ? 0 : index);
        setStatus && setStatus(loadStatus.REST);
    }, [sections])

    const handleClickStepLabel = (index: number) => {
        setActiveSectionIndex(index); 
        // scrollRefs.current[index].scrollIntoView();
    }
    
    const maxActiveSectionIndex = sections.length-1


    return(
        status === loadStatus.REST ?
        <div className = 'page'>
            <ActiveSectionContext.Provider value = {{activeSectionIndex: activeSectionIndex, incrementActiveSectionIndex: (offset: number) => setActiveSectionIndex((prev)=>(prev+offset)), setActiveSectionIndex: (activeSectionIndex: number)=>setActiveSectionIndex(activeSectionIndex), maxActiveSectionIndex: maxActiveSectionIndex}}>
            {/* Stepper and Next / Previous Navigation Buttons */}
            <div className = 'flex flex-row flex-auto justify-between'>
                <IndexNavigationButtonWrapper offset={-1}><Button><KeyboardArrowLeft/>이전 질문</Button></IndexNavigationButtonWrapper>
                <div className='basis-6/12'>
                <NavStepper 
                    steps = {steps} 
                    activeSectionIndex = {activeSectionIndex}
                    handleClickStepLabel = {handleClickStepLabel}                    
                    enableHover = {true}/>
                </div>
                <IndexNavigationButtonWrapper offset={1}><Button>다음 질문<KeyboardArrowRight/></Button></IndexNavigationButtonWrapper>
            </div>
        
            {/* Title */}
            <WithAnimate keyProp={activeSectionIndex} className='test-title opacity-0 animate-reveal-left'>
                {strings[sections[activeSectionIndex]].title}
            </WithAnimate>

            {/* Routing Sections */}
            <div key={activeSectionIndex} className='h-fit opacity-0 animate-reveal-left-d1'>
                {testPageRoutes()}
            </div>
            {/* Render Body Element corresponding to current path.*/}
            <Navigate to={testRoutePropsWithResponse[activeSectionIndex].path} replace/>     
            </ActiveSectionContext.Provider>
        </div>:
        <></>
    );
}

function TestPageWithLoadStatus(props:TestPageProps){
    const [status, setStatus] = useState(loadStatus.PENDING);

    return(
        withLoadStatus(TestPage)(Loader, status, setStatus)(props)        
    )
}

export default TestPageWithLoadStatus;
export { ActiveSectionContext };