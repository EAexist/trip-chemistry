import React, { PropsWithChildren, useState, useCallback } from "react";
import { Routes, Route, useLocation, useMatch, Navigate } from 'react-router-dom';

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
        <div>
            <TestStepper steps = {steps} activeStepIndex = {activeSectionIndex}/>
            <Navigate to={testPages[activeSectionIndex].path} replace/>
            <h1 className='test-title'>{testPages[activeSectionIndex].title}</h1>
            {activeSectionIndex > 0 &&
                <button onClick={()=>handleClickNavigationButton(-1)}>{'<'}</button>
            }
            {activeSectionIndex < maxactiveSectionIndex &&
                <button onClick={()=>handleClickNavigationButton(1)}>{'>'}</button>
            }
            {testPageRoutes}
            {/* Render Body Element corresponding to current path.*/}
        </div>
    );
}
export default TestPage;