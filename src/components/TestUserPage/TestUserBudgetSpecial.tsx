import TestUserBudgetAccordionContainer from './TestUserBudgetAccordionContainer';
import {ExclusiveAccordionsContextProvider} from '../ExclusiveAccordionsContext';
import React, { useState } from 'react';
import { BudgetResponseKey, TestResponseKey, withTestResponseProps } from '../../interface/interfaces';

interface TestUserBudgetSpecialProps{

};

function TestUserBudgetSpecial({testName, response, setResponse}: withTestResponseProps){
    
    const subTests = [
        {
            budgetName: 'food',
            title: '비싸고 맛있는 유명 맛집',
            min: 5000,
            max: 50000,
            step: 5000
        },
        {
            budgetName: 'accomodate',
            title: '근사한 숙소에서의 하룻밤',
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
export default TestUserBudgetSpecial;