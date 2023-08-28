import React, { PropsWithChildren, useState, useCallback } from "react";
import { Routes, Route, useLocation, useMatch, Navigate } from 'react-router-dom';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import { testPages, testPageRoutes } from '../../pages';

import TestStepper from "../TestStepper";

interface step{
    label: string,
    completed: Boolean
};

interface testPageProps{
    // section : 
};

function TestPage({}:testPageProps){

    // Index(0~) of active section (the section user is currently viewing). 
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    
    // Current state of each steps' completeness.
    const [steps, setSteps] = useState(testPages.map(({ label })=>{
        return(
            {
                label: label, 
                completed: false
            }
        ); 
    }));

    const maxactiveSectionIndex = testPages.length-1
    
    const handleClickNavigationButton = useCallback((sectionOffset: -1 | 1) => {
        setActiveSectionIndex((prev)=>(prev + sectionOffset));
    },[]); 

    return(
        <div className='page h-screen'>
            <TestStepper steps = {steps} activeStepIndex = {activeSectionIndex}/>
            <h1 className='test-title'>{testPages[activeSectionIndex].title}</h1>
            <div className='h-fit'>
            {testPageRoutes}
            </div>
            {/* Render Body Element corresponding to current path.*/}
            <Navigate to={testPages[activeSectionIndex].path} replace/>            
            <div className='relative'>
                {activeSectionIndex > 0 &&
                    <button onClick={()=>handleClickNavigationButton(-1)} className='text-xl absolute left-0'><KeyboardArrowLeft sx={{ fontSize: '32px' }}/>이전 질문</button>
                }
                {activeSectionIndex < maxactiveSectionIndex &&
                    <button onClick={()=>handleClickNavigationButton(1)} className='text-xl absolute right-0' >다음 질문<KeyboardArrowRight sx={{ fontSize: '32px' }}/></button>
                }
            </div>
        </div>
    );
}
export default TestPage;