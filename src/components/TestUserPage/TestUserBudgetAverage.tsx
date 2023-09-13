import TestUserBudgetAccordionContainer from './TestUserBudgetAccordionContainer';
import {ExclusiveAccordionsContextProvider} from '../ExclusiveAccordionsContext';
import React, { useState } from 'react';
import { BudgetResponseKey, TestResponseKey, withTestResponseProps } from '../../interface/interfaces';

interface TestUserBudgetAverageProps{

};



function TestUserBudgetAverage({testName, response, setResponse}: withTestResponseProps){

    const subTests = [
        {
            budgetName: 'food',
            title: '한끼 식사',
            min: 5000,
            max: 50000,
            step: 5000
        },
        {
            budgetName: 'accomodate',
            title: '하룻밤 묵을 숙소',
            min: 10000,
            max: 100000,
            step: 10000
        },
    ]

    const testUserBudgetAccordionContainers = subTests?.map(({ budgetName , title, ...sliderProps }, index) => {
        return (              
            <TestUserBudgetAccordionContainer
                index = {index}
                testName = {testName as TestResponseKey} 
                budgetName = {budgetName as BudgetResponseKey}
                title = {title}
                sliderProps = {sliderProps}
            />
        )
    })

    return(
        <div>
            <ExclusiveAccordionsContextProvider>
                {testUserBudgetAccordionContainers}   
            </ExclusiveAccordionsContextProvider>         
        </div>
    
    );
}
export default TestUserBudgetAverage;