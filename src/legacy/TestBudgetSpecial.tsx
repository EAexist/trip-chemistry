// import TestBudgetAccordionContainer from './TestBudgetAccordionContainer';
// import {ExclusiveAccordionsContextProvider} from '../ExclusiveAccordionsContext';
// import { useState } from 'react';
// import { SubTestName, TestName, WithTestResponseProps } from '../../interface/interfaces';
// import Slider from '../Slider';
// import { useSetBudgetResponse, useBudgetResponse } from '../../reducer/testResponseReducer';
// import { useSelector } from 'react-redux';
// import { url } from 'inspector';
// import useValueToBound from '../useValueToBound';

// interface TestBudgetProps extends WithTestResponseProps{

// };

// const SubTestName = 'food'
// const sliderProps = {
//     min: 20000,
//     max: 200000,
//     step: 20000,
// };

// const budgetLevelStep = 20000;
// const budgetToExampleEntries : {level: number, item: string}[] = [
//     {level:20000, item:"iida-shouten-ramen"},
//     {level:60000, item: "tomoei"},
//     {level:100000, item: "mandarin-grill"},
//     {level:140000, item: "torishiki"},
// ]

// const valueText = (value: number) => {
//     const valueString = value < 10000 ? value.toString() : `${value/10000}만`
//     return `${valueString}원`;
// }

// const imgPathBase = '/static/images/test/budget/';
// const imgFormat = 'webp';

// const getImageSrc = (pathname: string, filename: string) => `${imgPathBase}/${pathname}/${filename}.${imgFormat}`

// function TestBudget({testName}: TestBudgetProps){
    
//     const SubTestName = 'food'
//     const budgetValue = useBudgetResponse(testName as TestName, SubTestName);
//     const setBudgetResponse = useSetBudgetResponse();

//     const [example, setExample] = useValueToBound(budgetToExampleEntries);
//     setExample(budgetValue);

//     const exampleImageStyle = {backgroundImage: `url(${getImageSrc('food', `${example}-1`)})`};

//     const [isAnswered, setIsAnswered] = useState(false);

//     console.log(`TestBudgetAccordionContainer - responseValue:${budgetValue}`);

//     const handleChangeSlider = (event: Event, newValue: number | number[]) => {  
//         !isAnswered && setIsAnswered(true);      
//         setBudgetResponse({
//             SubTestName :SubTestName,
//             value: newValue as number          
//         });
//     };

//     return(
//         <div className='w-screen h-screen'>
//             <div className='flex flex-col items-center'>
//             <h2>{valueText(budgetValue)}</h2>         
//                 <Slider
//                     aria-label='budget'
//                     getAriaValueText={valueText}
//                     valueLabelDisplay='on'                
//                     onChange={handleChangeSlider}
//                     sx={{width: '75%'}}
//                     {...sliderProps}
//             />
//             </div>
//             <div 
//                 style={exampleImageStyle}                   
//                 className={`w-6/12 h-screen
//                     bg-cover bg-gray-500 bg-blend-multiply`}
//             >   
//             </div>
//         </div>    
//     );
// }
// export default TestBudgetSpecial;

function TestBudgetSpecial(){};
export default TestBudgetSpecial;