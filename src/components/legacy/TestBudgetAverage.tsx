// import TestBudgetAccordionContainer from './TestBudgetAccordionContainer';
// import withExclusiveAccordionsContext, {ExclusiveAccordionsContextProvider} from '../ExclusiveAccordionsContext';
// import { useState } from 'react';
// import { SubTestName, TestName, WithTestResponseProps } from '../../interface/interfaces';

// import SteppedFilterContainer, { SteppedFilterItem } from '../TestPage/SteppedFilterContainer';
// import FallingWrapper from '../TestPage/FallingWrapper';

// interface TestBudgetAverageProps{

// };



// function TestBudgetAverage({testName, response, setTestResponse}: WithTestResponseProps){

//     const subTests = [
//         {
//             SubTestName: 'food',
//             title: '한끼 식사',
//             min: 5000,
//             max: 50000,
//             step: 5000, 
//             levelIndicatorList: ["burger", "donutSprinkles", "sausageHalf", "bowlSoup", "plateDinner", "makiSalmon", "pancakes", "sushiSalmon"]
//         },
//         {
//             SubTestName: 'accomodate',
//             title: '하룻밤 묵을 숙소',
//             min: 10000,
//             max: 100000,
//             step: 10000,
//             levelIndicatorList: ["burger", "donutSprinkles", "sausageHalf", "bowlSoup", "plateDinner", "makiSalmon", "pancakes", "sushiSalmon"]
//         },
//     ]

//     const imgPathBase = '/static/images/test/budget/food/kenny-food-kit';
//     const imgFormat = 'png';

//     const getImageSrc = (filename: string) => `${imgPathBase}/${filename}.${imgFormat}`

//     const testUserBudgetAccordionContainers = subTests?.map(({ SubTestName , title, levelIndicatorList, ...sliderProps }, index) => {
//         return (         
//             <TestBudgetAccordionContainer
//                 index = {index}
//                 testName = {testName as TestName} 
//                 SubTestName = {SubTestName as SubTestName}
//                 title = {title}
//                 sliderProps = {sliderProps}
//                 expanded = {true}
//             >
//                 <h2>BIBDDUD</h2>
//             </TestBudgetAccordionContainer>
//         )
//     })

//     return(
//         <div>
//             <ExclusiveAccordionsContextProvider>
//                 {subTests?.map(({ SubTestName , title, levelIndicatorList, ...sliderProps }, index) => {
//         return (         
//             <TestBudgetAccordionContainer
//                 index = {index}
//                 testName = {testName as TestName} 
//                 SubTestName = {SubTestName as SubTestName}
//                 title = {title}
//                 sliderProps = {sliderProps}
//                 expanded = {true}
//             >
//                 <h2>BIBDDUD</h2>
//             </TestBudgetAccordionContainer>
//         )
//     })}   
//             </ExclusiveAccordionsContextProvider>         
//         </div>
    
//     );
// }
function TestBudgetAverage(){};
export default TestBudgetAverage;