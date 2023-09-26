import { useContext, useState, Key } from 'react';

import { Stepper, Step, StepLabel } from "@mui/material";

import ConditionalWrapper from './utils/ConditionalWrapper';
import { IsHoveringContextProvider, withMouseHover, withShowIfHovering, WithMouseHoverWrapper, WithShowIfHoveringWrapper } from '../context/IsHoveringContext'

interface StepperProps{
    steps: step[]; 
    activeSectionIndex : number; 
    handleClickStepLabel: (index: number) => void;
    // activeSectionState: {
    //   activeSectionIndex : number, 
    //   setActiveSectionIndex : (index: number) => void
    // };
    enableHover: boolean; /* True 이면 각 step label 에 대한 마우스 호버를 활성화함. False 이면 이를 비활성화함. */
};

interface step{
  label: String,
  completed?: Boolean,
  active?: Boolean,
};

function NavStepper({ steps, activeSectionIndex, handleClickStepLabel, enableHover }:StepperProps){

  const Label = (index : number, label: string) => withMouseHover(()=>
  (
    <StepLabel
      className='cursor-pointer h-2'
      onClick={() => {
        handleClickStepLabel(index)
      }}
    >
      <WithShowIfHoveringWrapper  index={index}>
        <div className={`text-xs`}>
          {label}
        </div>
      </WithShowIfHoveringWrapper>
    </StepLabel>           
  ))

  return(
      <Stepper nonLinear activeStep={activeSectionIndex} alternativeLabel className='h-fill'>
        {steps?.map(({label}, index) => (
          <Step>
            {/* <button onClick = {()=>setActiveSectionIndex(index)}> */}
            {/* <ConditionalWrapper 
              isWrapped = {enableHover} 
              wrapper = {IsHoveringContextProvider}
            > */}
            {
              // withMouseHover(()=> /* withMouseHover(HOC): StepLabel 호버 가능하도록 함. */
              // (
              //   // <StepLabel
              //   //   className='cursor-pointer h-2'
              //   //   onClick={() => {
              //   //     handleClickStepLabel(index)
              //   //   }}
              //   // >
              //   //   {
              //   //     withShowIfHovering(() => ( /* withShowIfHovering(HOC): StepLabel 호버 시 아래 <div> 가 보이도록 함. */
              //   //       <div className={`text-xs`}>
              //   //         {label}
              //   //       </div>
              //   //     ))({})
              //   //   }
              //   // </StepLabel>           
              // ))({})              
            }

            <WithMouseHoverWrapper index={index}>   
              <StepLabel
                className='cursor-pointer h-2'
                onClick = {()=>{
                  handleClickStepLabel(index)}}
              >
                <WithShowIfHoveringWrapper index={index}>
                  <div className={`text-xs`}>
                    {label}
                  </div>
                </WithShowIfHoveringWrapper>
              </StepLabel>       
            </WithMouseHoverWrapper>           
             {/* </ConditionalWrapper> */}
            {/* </button> */}
          </Step>
        ))}
      </Stepper>       
    );
};

export default NavStepper;