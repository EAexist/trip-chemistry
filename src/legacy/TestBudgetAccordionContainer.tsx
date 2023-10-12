// // https://mui.com/material-ui/react-accordion/
// import { PropsWithChildren, useState } from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import { Slider } from '@mui/material';
// import { useSelector } from "react-redux";

import TestBudgetAverage from "./TestBudgetAverage";

// import TaskAccordion from './TaskAccordion';
// import withExclusiveAccordionsContext, { ExclusiveAccordionsContextProvider } from '../ExclusiveAccordionsContext';

// import { RootState } from '../../store';
// import { useSetTestResponse, useSetBudgetResponse } from '../../reducer/testResponseReducer';
// import { TestName, BudgetResponse, SubTestName } from '../../interface/interfaces';
// import LeveledContainer, { SteppedFilterItem } from './SteppedFilterContainer';
// import SteppedFilterContainer from './SteppedFilterContainer';
// import FallingWrapper from './FallingWrapper';

// interface TestBudgetAccordionContainerProps{
//     index: number,
//     testName: TestName,
//     SubTestName: SubTestName,
//     title: string;
//     sliderProps: sliderProps;
//     expanded?: boolean;
//     handleChangeAccordion?: ()=>void;
// };

// interface sliderProps {
//     step: number;
//     min: number;
//     max: number; 
// }

// interface Props{
//     expanded?: boolean;
//     handleChangeAccordion?: (event: SyntheticEvent, isExpanded: boolean)=>void;
// };

// const valueText = (value: number) => {
//     return value ? `${value}원`: '';
// }

// function TestBudgetAccordionContainer({ expanded, handleChangeAccordion, index, testName, SubTestName, title, sliderProps, children}:PropsWithChildren<TestBudgetAccordionContainerProps>) {

//     const [isAnswered, setIsAnswerd] = useState(false);

//     const setBudgetResponse = useSetBudgetResponse();

//     const responseValue = useSelector((state:RootState)=>((state.testResponse[testName] as BudgetResponse)[SubTestName])) as number;

//     console.log(`TestBudgetAccordionContainer - responseValue:${responseValue}`);

//     const handleChangeSlider = (event: Event, newValue: number | number[]) => {  
//         !isAnswered && setIsAnswerd(true);      
//         setBudgetResponse({
//             testName: testName,
//             SubTestName :SubTestName,
//             value: newValue as number          
//         });
//     };

//     const levelIndicatorList = ["burger", "donutSprinkles", "sausageHalf", "bowlSoup", "plateDinner", "makiSalmon", "pancakes", "sushiSalmon"];

//     const imgPathBase = '/static/images/test/budget/food/kenny-food-kit';
//     const imgFormat = 'png';

//     const getImageSrc = (filename: string) => `${imgPathBase}/${filename}.${imgFormat}`
    
//     console.log("children: "+children?.toString());

//     return(
//         // withExclusiveAccordionsContext(({}:Props) => (
//             <TaskAccordion
//                 // expanded = {expanded}
//                 expanded = {true}
//                 handleChangeAccordion={handleChangeAccordion}
//                 title = {title}
//                 isCompleted = {isAnswered}
//                 responseSummary = {valueText(responseValue)}             
//             >
//                 {children}
//                 <Slider
//                     aria-label='budget'
//                     defaultValue={responseValue ? responseValue : sliderProps.min}
//                     getAriaValueText={valueText}
//                     valueLabelDisplay='on'
//                     marks
//                     onChange={handleChangeSlider}
//                     {...sliderProps}
//                     sx={{width: '75%'}}
//                 />
//             </TaskAccordion>            
//         // ))(index)({})  
//     );
// }

// const WithExclusive = (index: number) => (
//     withExclusiveAccordionsContext(TestBudgetAccordionContainer)(index)  
// )

// export default TestBudgetAccordionContainer;
// // export { WithExclusive };
// export type { sliderProps };
function TestBudgetAccordionContainer(){};
export default TestBudgetAccordionContainer;