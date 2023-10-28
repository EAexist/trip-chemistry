import { useState, createContext, useEffect, PropsWithChildren, ComponentType, useContext, useCallback } from "react";
import { usePageString } from "../../texts";

/* Test Page Components */
import TestLeadershipPage from "./testPage/testLeadership/TestLeadershipPage";
import TestSchedulePage from "./testPage/testSchedule/TestSchedulePage";
import TestBudgetPage from "./testPage/testBudget/TestBudgetPage";
import TestCityPage from "./testPage/testCity/TestCityPage";
import TestConfirm from "./testPage/testConfirm/TestConfirm";
import TestWithSubTestPage from "./testPage/TestWithSubTestPage";
import withTestResponse from "../../common/hocs/withTestResponse";

// Swiper
import { Navigation, Pagination, Mousewheel, HashNavigation, Parallax } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperType from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

/* Reducer */
import { SubTestName, TestName } from "../../common/reducer/testResponseReducer";
import { LoadStatus } from "../../common/types/loadStatus";
import { TopNavContext, useSetElement } from "../TopNav";
import { Icon } from "@mui/material";
import ToggleButton from "../ToggleButton";
import { FocusContextProvider, FocusDetail, Focusable } from "../../common/focus/FocusContext";
import StepItem, { Connector } from "../StepItem";

interface TestPageProps {
    defaultActiveSectionIndex?: number;
};

interface ActiveSectionContextProps{
    activeStep: number;
    setActiveSectionIndex: (activeStep: number) => void;
    incrementActiveSectionIndex?: (offset:number) => void;
    maxActiveSectionIndex?: number;
};
const ActiveSectionContext = createContext<ActiveSectionContextProps>({} as ActiveSectionContextProps);

function WithAnimationWrapperate({keyProp, className, children}: PropsWithChildren<{keyProp: any, className: string}>){
    return(
        <div key = {keyProp} className={className}>
            {children}
        </div>
    )
}

const sectionElements : {[key: string] : {testName?: TestName, subTestName?: SubTestName, line: boolean, Element: ComponentType<any>}} = {
    leadership:
        {
            testName: 'leadership',
            Element: TestLeadershipPage,
            line: true,
        },
    schedule:
        {
            testName: 'schedule',
            Element: TestSchedulePage,
            line: true,
        },
    bugetFood:
        {
            testName: 'budget',
            subTestName: 'food',
            Element: TestBudgetPage,
            line: true,
        },
    cityMetropolis:
        {
            testName: 'city',
            subTestName: 'metropolis',
            Element: TestCityPage,
            line: false,
        },  
    cityHistory: 
        {
            testName: 'city',
            subTestName: 'history',
            Element: TestCityPage,
            line: false,
        },   
    cityNature:
        {
            testName: 'city',
            subTestName: 'nature',
            Element: TestCityPage,
            line: true,
        },   
    confirm:
        {            
            Element: TestConfirm,
            line: false,
        }
    // {
    //     testName: 'activity',
    //     Element: TestWithSubTestPage,
    // },   
};

function TestPage({}:TestPageProps){


    /* 텍스트 */
    const strings = usePageString('test');
    const sections = Object.keys(strings);

    /* 네비게이션 */    
    
    const [ activeStep, setActiveSectionIndex ] = useState(0);
    const [ hoveringSectionIndex, setHoveringSectionIndex ] = useState(0);
    const [ swiper, setSwiper ] = useState<SwiperType>();

    const slideTime : number = 1000;
    const handleClickStepButton = useCallback((index: number) => {
        setActiveSectionIndex(index);
    }, [ setActiveSectionIndex ]);

    useEffect(() => {
        swiper?.slideTo(activeStep, slideTime);
    }, [ activeStep, swiper ]);

    useSetElement({
        element : 
            /* TopNav 의 Step 컴포넌트 */                
            <div className = 'flex flex-row items-center -translate-y-1'>
            <FocusContextProvider>       
                {Object.entries(sectionElements).map(([key, { line, testName, subTestName }], index: number)=>{

                    const testStrings = testName? (subTestName? strings[testName].subTests[subTestName] : strings[testName]) : strings[key];
                    return (
                        <>
                        <StepItem
                            isActive ={index===activeStep}
                            index={index}
                            icon={testStrings.icon}
                            label={testStrings.label}
                            handleClick={()=>handleClickStepButton(index)}                        
                        />
                        {line && <Connector width='w-12'/>} 
                        </>
                    );
                })}
                </FocusContextProvider>
            </div>,
        dep: [ activeStep, handleClickStepButton, strings ]        
    });

    useEffect(()=>{
        const path = window.location.pathname.split('/').at(-1);
        const pathNameIndex = sections.indexOf(path? path : '')
    }, [])

    /* @TODO: Current state of each steps' completeness. */
    const [steps, setSteps] = useState(sections?.map((label, index)=>{
        return(
            {
                label: label, 
                completed: false
            }
        ); 
    }));
    
    const maxActiveSectionIndex = sections.length-1

    /* Swiper */
    const spaceBetweenTests = 20;

    return(
            /* https://sezzled.tistory.com/262 */
            <Swiper
                // install Swiper modules
                modules={[Mousewheel, Navigation, Pagination, HashNavigation, Parallax]}
                direction={"vertical"}                
                spaceBetween={spaceBetweenTests}
                slidesPerView={1}
                mousewheel={{ thresholdDelta:100, forceToAxis:true }}
                // preventInteractionOnTransition={true} /* Prevent Scrolling on Transition */ 
                // navigation={true}
                pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}

                /* Swiper Element 의 reference를 swiper state에 저장 */
                onSwiper={(swiper) => { 
                    setSwiper(swiper); 
                    swiper.mousewheel.enable(); console.log(swiper);
                }}
                // allowTouchMove={false} 

                /* @TODO Hash Navigation is Not Working */
                hashNavigation={true}

                speed={500}
                parallax={true}
                noSwiping={true}
                noSwipingClass='swiper-no-swiping'
                className='h-screen w-screen'
            >
                {Object.entries(sectionElements).map(([key, {testName, subTestName, Element}])=>{
                    const TestComponent = testName ?
                        withTestResponse(Element)({testName, subTestName})
                        : Element;
                    return(                        
                    <SwiperSlide data-hash={`${testName ? testName : key} ${subTestName ? `-${subTestName}` : ''}`} className='swiper-no-swiping w-full h-full'>
                        <TestComponent/>
                    </SwiperSlide>
                    )
                })}              
            </Swiper> 
    );
}


export default TestPage;
export { ActiveSectionContext };