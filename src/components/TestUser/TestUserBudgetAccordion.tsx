// https://mui.com/material-ui/react-accordion/
import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Slider } from '@mui/material';

import { CheckCircle, Pending } from '@mui/icons-material';

interface TestUserBudgetAccordionProps{
    title: string;
    sliderProps: sliderProps;
    expanded?: boolean;
    handleChangeAccordion?: ()=>void;
};

interface sliderProps {
    step: number;
    min: number;
    max: number; 
}

const valueText = (value: number) => {
    return `${value}원`;
}

function TestUserBudgetAccordion({ title, sliderProps, handleChangeAccordion=()=>{}, expanded=false}:TestUserBudgetAccordionProps) {

    const [isAnswered, setIsAnswerd] = useState(false);
    const [budgetValue, setBudgetValue] = useState<number | undefined>(undefined);
    const handleChangeSlider = (event: Event, newValue: number | number[]) => {
        
        setBudgetValue(newValue as number);
    };
    const handleFirstChangeSlider = (event: Event, newValue: number | number[]) => {
        setIsAnswerd(true);
        handleChangeSlider(event, newValue);
    };

    return(
        <Accordion expanded={expanded} onChange={handleChangeAccordion} className={`${isAnswered && 'border-4 border-slate-500'}`}>
        <AccordionSummary className='h-16 py-8'>
            <div className='flex flex-row space-x-6 text-xl'>
                {isAnswered ? <CheckCircle /> : <Pending />}
                <h2>{title}</h2>
                {!expanded && budgetValue && <h3>{valueText(budgetValue)}</h3>}
            </div>
        </AccordionSummary>
        <AccordionDetails className='flex flex-col justify-center items-center h-64 py-8'>
                AccordionDetails
                <Slider
                    aria-label='budget'
                    defaultValue={sliderProps.min}
                    getAriaValueText={valueText}
                    valueLabelDisplay='on'
                    marks
                    onChange={isAnswered ? ()=>handleChangeSlider : handleFirstChangeSlider}
                    {...sliderProps}
                    sx={{width: '75%'}}
                />
        </AccordionDetails>
        </Accordion>
    )
}

export default TestUserBudgetAccordion;
export type { sliderProps };