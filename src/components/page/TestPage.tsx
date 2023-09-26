import { useState, createContext, useEffect, PropsWithChildren } from "react";
import { usePageString } from "../../texts";
import withLoadStatus, { Loader, withLoadStatusProps } from "../utils/withLoadStatus";
import { loadStatus } from "../ApiLoader";

/* Test Page Components */
import TestLeadership from "../TestPage/TestLeadership";
import TestSchedule from "../TestPage/TestSchedule";
import TestConfirm from "../TestPage/TestConfirm";
import TestBudget from "../TestPage/TestBudget";
import TestWithSubTestPage from "../TestPage/TestWithSubTestPage";

import withTestResponse from "../withTestResponse";

// Swiper
import { Navigation, Pagination, Mousewheel, HashNavigation, Parallax } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

/* Reducer */
import { SubTestName, TestName } from "../../reducer/testResponseReducer";

interface TestPageProps extends withLoadStatusProps{
    defaultActiveSectionIndex?: number;
};

interface ActiveSectionContextProps{
    activeSectionIndex: number;
    setActiveSectionIndex: (activeSectionIndex: number) => void;
    incrementActiveSectionIndex?: (offset:number) => void;
    maxActiveSectionIndex?: number;
};
const ActiveSectionContext = createContext<ActiveSectionContextProps>({} as ActiveSectionContextProps);

function WithAnimate({keyProp, className, children}: PropsWithChildren<{keyProp: any, className: string}>){
    return(
        <div key = {keyProp} className={className}>
            {children}
        </div>
    )
}

const testElements = [
    {
        testName: 'leadership',
        Element: TestLeadership,
    },
    {
        testName: 'schedule',
        Element: TestSchedule,
    },
    // {
    //     testName: 'budget',
    //     subTestName:'accomodate',
    //     Element: TestBudget,
    // },   
    {
        testName: 'budget',
        subTestName:'accomodateSpecial',
        Element: TestBudget,
    },   
    // {
    //     testName: 'budget',
    //     subTestName:'food',
    //     Element: TestBudget,
    // },
    {
        testName: 'budget',
        subTestName:'foodSpecial',
        Element: TestBudget,
    },   
    {
        testName: 'city',
        Element: TestWithSubTestPage,
    },   
    {
        testName: 'activity',
        Element: TestWithSubTestPage,
    },   
    {
        testName: 'confirm',
        Element: TestConfirm,
    },   
];

function TestPage({status, setStatus, defaultActiveSectionIndex}:TestPageProps){

    // Index(0~) of active section (the section user is currently viewing). 
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);

    useEffect(()=>{
        const path = window.location.pathname.split('/').at(-1);
        const pathNameIndex = sections.indexOf(path? path : '')
        setActiveSectionIndex( pathNameIndex < 0 ? 0 : pathNameIndex );
        setStatus && setStatus(loadStatus.REST);
    }, [])

    const strings = usePageString('test');
    const sections = Object.keys(strings);

    // Current state of each steps' completeness.
    const [steps, setSteps] = useState(sections?.map((label, index)=>{
        return(
            {
                label: label, 
                completed: false
            }
        ); 
    }));
    
    const maxActiveSectionIndex = sections.length-1

    const spaceBetweenTests = 20;
    return(
        status === loadStatus.REST ?
            /* https://sezzled.tistory.com/262 */
            <Swiper
                // install Swiper modules
                // modules={[Navigation, Pagination, Scrollbar, A11y]}
                modules={[Mousewheel, Navigation, Pagination, HashNavigation, Parallax]}
                direction={"vertical"}                
                spaceBetween={spaceBetweenTests}
                slidesPerView={1}
                mousewheel={{ thresholdDelta:100, forceToAxis:true }}
                // preventInteractionOnTransition={true} /* Prevent Scrolling on Transition */ 
                // navigation={true}
                pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                onSwiper={(swiper) => {swiper.mousewheel.enable(); console.log(swiper);}}
                onSlideChange={() => console.log('slide change')}
                // allowTouchMove={false} 
                /* @TODO Hash Navigation is Not Working */
                hashNavigation={true}
                speed={500}
                parallax={true}
                noSwiping={true}
                noSwipingClass='swiper-no-swiping'
                className='h-screen'
            >
                {testElements.map(({testName, subTestName, Element})=>{
                    const TestComponent = withTestResponse(Element)(testName as TestName, subTestName ? (subTestName as SubTestName): undefined);
                    return(
                        
                    <SwiperSlide data-hash={`${testName}${subTestName ? `-${subTestName}` : ''}`} className='swiper-no-swiping w-screen h-screen'>
                        {/* https://swiperjs.com/react#swiperslide-render-function */}   
                        {({ isActive }) => (
                            <TestComponent/>
                        )}           
                    </SwiperSlide>
                    )
                })}                
            </Swiper> 
        // <div className = ''>
        //     <ActiveSectionContext.Provider value = {{activeSectionIndex: activeSectionIndex, incrementActiveSectionIndex: (offset: number) => setActiveSectionIndex((prev)=>(prev+offset)), setActiveSectionIndex: (activeSectionIndex: number)=>setActiveSectionIndex(activeSectionIndex), maxActiveSectionIndex: maxActiveSectionIndex}}>
        //     <div className = 'z-10'>
        //     {/* Stepper and Next / Previous Navigation Buttons */}
        //     <TopNavTest/>       
        //     {/* Title */}
        //     <WithAnimate keyProp={activeSectionIndex} className='test-title opacity-0 animate-reveal-left'>
        //         {strings[sections[activeSectionIndex]].title}
        //     </WithAnimate>
        //     </div>
        //     {/* Routing Sections */}
        //     {/* <div key={activeSectionIndex} className='h-fit opacity-0 animate-reveal-left-d1'>
        //         {testPageRoutes()}
        //     </div> */}
        //     {/* Render Body Element corresponding to current path.*/}
        //     {/* <div className =''><Navigate to={testRoutePropsWithResponse[activeSectionIndex].path} replace/></div> */}
              
        //     </ActiveSectionContext.Provider>
        // </div>:
        : <></>
    );
}

function TestPageWithLoadStatus(props:TestPageProps){
    const [status, setStatus] = useState(loadStatus.PENDING);

    console.log(`TestPageWithLoadStatus- status=${status}`)
    return(
        withLoadStatus(TestPage)(Loader, status===loadStatus.REST, status, setStatus)(props)        
    )
}

export default TestPageWithLoadStatus;
export { ActiveSectionContext };