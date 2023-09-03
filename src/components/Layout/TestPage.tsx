import React, { useState, useCallback, createContext } from "react";
import { Navigate } from 'react-router-dom';


import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import { testPages, testPageRoutes } from '../../pages';
import TestStepper from "../TestStepper";
import Button from "../Button";
import IndexNavigationButtonWrapper from "../IndexNavigationButtonWrapper";

interface ActiveSectionContextProps{
    activeSectionIndex: number;
    setActiveSectionIndex: (activeSectionIndex: number) => void;
    incrementActiveSectionIndex?: (offset:number) => void;
    maxActiveSectionIndex?: number;
};
const ActiveSectionContext = createContext<ActiveSectionContextProps>({} as ActiveSectionContextProps);

interface step{
    label: string,
    completed: Boolean
};

interface testPageProps{
};

function WithAnimate({keyProp, className, children}:React.PropsWithChildren<{keyProp: any, className: string}>){
    return(
        <div key = {keyProp} className={className}>
            {children}
        </div>
    )
}

function TestPage({}:testPageProps){

    // Index(0~) of active section (the section user is currently viewing). 
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);

    // Current state of each steps' completeness.
    const [steps, setSteps] = useState(testPages.map(({ label }, index)=>{
        return(
            {
                label: label, 
                completed: false
            }
        ); 
    }));

    const maxActiveSectionIndex = testPages.length-1

    return(
        <div className = 'page'>
            <ActiveSectionContext.Provider value = {{activeSectionIndex: activeSectionIndex, incrementActiveSectionIndex: (offset: number) => setActiveSectionIndex((prev)=>(prev+offset)), setActiveSectionIndex: (activeSectionIndex: number)=>setActiveSectionIndex(activeSectionIndex), maxActiveSectionIndex: maxActiveSectionIndex}}>
            {/* Stepper and Next / Previous Navigation Buttons */}
            <div className = 'flex flex-row flex-auto justify-between'>
                <IndexNavigationButtonWrapper offset={-1}><Button><KeyboardArrowLeft/>이전 질문</Button></IndexNavigationButtonWrapper>
                <div className='basis-6/12'>
                <TestStepper 
                    steps = {steps} 
                    activeSectionState = {{activeSectionIndex: activeSectionIndex, setActiveSectionIndex: setActiveSectionIndex}}
                    enableHover = {true}/>
                </div>
                <IndexNavigationButtonWrapper offset={1}><Button>다음 질문<KeyboardArrowRight/></Button></IndexNavigationButtonWrapper>
            </div>
        
            {/* Title */}
            <WithAnimate keyProp={activeSectionIndex} className='test-title opacity-0 animate-reveal-left'>
                {testPages[activeSectionIndex].title}
            </WithAnimate>

            {/* Routing Sections */}
            <div key={activeSectionIndex} className='h-fit opacity-0 animate-reveal-left-d1'>
                {testPageRoutes}
            </div>
            {/* Render Body Element corresponding to current path.*/}
            <Navigate to={testPages[activeSectionIndex].path} replace/>     
            </ActiveSectionContext.Provider>
        </div>
    );
}
export default TestPage;
export { ActiveSectionContext };