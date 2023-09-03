import React, { useContext, useState } from 'react';

import { Stepper, Step, StepLabel } from "@mui/material";

import ConditionalWrapper from './utils/ConditionalWrapper';
import { IsHoveringContextProvider, WithMouseHover, WithShowIfHovering } from '../contexts/isHoveringContext'

interface StepperProps{
    steps: step[]; 
    activeSectionState: {
      activeSectionIndex : number, 
      setActiveSectionIndex : (index: number) => void
    };
    enableHover: boolean; /* True 이면 각 step label 에 대한 마우스 호버를 활성화함. False 이면 이를 비활성화함. */
};

interface step{
  label: String,
  completed?: Boolean,
  active?: Boolean,
};

function TestStepper({ steps, activeSectionState: {activeSectionIndex, setActiveSectionIndex}, enableHover }:StepperProps){

  return(
      <Stepper nonLinear activeStep={activeSectionIndex} alternativeLabel className='h-fill'>
        {steps.map(({label}, index) => (
          <Step key={label as React.Key} >
            {/* <button onClick = {()=>setActiveSectionIndex(index)}> */}
            <ConditionalWrapper 
              isWrapped = {enableHover} 
              wrapper = {IsHoveringContextProvider}
            >
            <WithMouseHover>   
              <StepLabel
                className='cursor-pointer h-2'
                onClick = {()=>setActiveSectionIndex(index)}
              >
                <WithShowIfHovering>
                  <div className={`text-xs`}>
                    {label}
                  </div>
                </WithShowIfHovering>
              </StepLabel>       
            </WithMouseHover>           
             </ConditionalWrapper>
            {/* </button> */}
          </Step>
        ))}
      </Stepper>       
    );
};



function InteractiveStepLabel({onClick, children, childrenHeightTw='h-2'}: React.PropsWithChildren<{onClick:()=>void, childrenHeightTw?:string}>){
  const [isHovering, setIsHovering] = useState(false);
  return(
    <StepLabel
      className='cursor-pointer'
      onClick = {onClick}
      onMouseEnter={()=>setIsHovering(true)} 
      onMouseLeave={()=>setIsHovering(false)}    >
      <div className={childrenHeightTw}>
        {isHovering ?
          <span className={`text-xs ${childrenHeightTw}`}>{children}</span>:
          <span></span>
        }
      </div>
    </StepLabel>    
  )
}

export default TestStepper;