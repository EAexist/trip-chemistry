// https://mui.com/material-ui/react-accordion/
import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Slider } from '@mui/material';
import { useSelector } from "react-redux";

import TaskAccordion from './TaskAccordion';
import withExclusiveAccordionsContext, { ExclusiveAccordionsContextProvider } from '../ExclusiveAccordionsContext';

import { RootState } from '../../store';
import { useSetResponse, useSetBudgetResponse } from '../../reducer/testResponseReducer';
import { TestResponseKey, BudgetResponse, BudgetResponseKey } from '../../interface/interfaces';

interface TestUserBudgetAccordionContainerProps{
    index: number,
    testName: TestResponseKey,
    budgetName: BudgetResponseKey,
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

interface Props{
    expanded?: boolean;
    handleChangeAccordion?: (event: React.SyntheticEvent, isExpanded: boolean)=>void;
};

const valueText = (value: number) => {
    return value ? `${value}원`: '';
}

function TestUserBudgetAccordionContainer({ index, testName, budgetName, title, sliderProps, handleChangeAccordion=()=>{}, expanded=false}:TestUserBudgetAccordionContainerProps) {

    const [isAnswered, setIsAnswerd] = useState(false);

    const setBudgetResponse = useSetBudgetResponse();

    const responseValue = useSelector((state:RootState)=>((state.testResponse[testName] as BudgetResponse)[budgetName])) as number;

    console.log(`TestUserBudgetAccordionContainer - responseValue:${responseValue}`);

    const handleChangeSlider = (event: Event, newValue: number | number[]) => {  
        !isAnswered && setIsAnswerd(true);      
        setBudgetResponse({
            testName: testName,
            budgetName :budgetName,
            value: newValue as number          
        });
    };
    
    return(
        withExclusiveAccordionsContext(({expanded, handleChangeAccordion}:Props) => (
            <TaskAccordion
                expanded = {expanded}
                handleChangeAccordion={handleChangeAccordion}
                title = {title}
                isCompleted = {isAnswered}
                responseSummary = {valueText(responseValue)}             
            >
                <Slider
                    aria-label='budget'
                    defaultValue={responseValue ? responseValue : sliderProps.min}
                    getAriaValueText={valueText}
                    valueLabelDisplay='on'
                    marks
                    onChange={handleChangeSlider}
                    {...sliderProps}
                    sx={{width: '75%'}}
                />
            </TaskAccordion>            
        )
        )(index)({})  
    );
}

export default TestUserBudgetAccordionContainer;
export type { sliderProps };