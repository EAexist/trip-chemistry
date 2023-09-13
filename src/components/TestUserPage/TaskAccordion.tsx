// https://mui.com/material-ui/react-accordion/
import React, { PropsWithChildren, useState } from 'react';
import MuiAccordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { CheckCircle, Pending } from '@mui/icons-material';

interface TaskAccordionProps{
    title: string,
    isCompleted?: boolean;
    expanded?: boolean;
    handleChangeAccordion?: (event: React.SyntheticEvent, isExpanded: boolean)=>void;
    responseSummary?: React.ReactNode
};

function TaskAccordion({title, isCompleted=false, expanded=false, handleChangeAccordion=()=>{console.log('handleChangeAccordion')}, responseSummary, children}: PropsWithChildren<TaskAccordionProps>) {

    // console.log(`TaskAccordion - title = ${title} expanded = ${expanded} handleChangeAccordion = ${handleChangeAccordion}` );
    return(
        <MuiAccordion expanded={expanded} onChange={handleChangeAccordion} className={`${isCompleted && 'border-4 border-slate-500'}`}>
            <AccordionSummary className='h-16 py-8'>
                <div className='flex flex-row space-x-6 text-xl'>
                    {isCompleted ? <CheckCircle /> : <Pending />}
                    <h2>{title}</h2>
                    {!expanded && responseSummary}
                </div>
            </AccordionSummary>
            <AccordionDetails className='flex flex-col justify-center items-center h-64 py-8'>
                    {children}
            </AccordionDetails>
        </MuiAccordion>
    )
}

interface sliderProps {
    step: number;
    min: number;
    max: number; 
}

{/* <Slider
    aria-label='budget'
    defaultValue={sliderProps.min}
    getAriaValueText={valueText}
    valueLabelDisplay='on'
    marks
    onChange={isCompleted ? ()=>handleChangeSlider : handleFirstChangeSlider}
    {...sliderProps}
    sx={{width: '75%'}}
/> */}

export default TaskAccordion;
export type { sliderProps };