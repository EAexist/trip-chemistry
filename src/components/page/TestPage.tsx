import { useState, createContext, useEffect, PropsWithChildren, ComponentType } from "react";
import { usePageString } from "../../texts";
import withLoadStatus, { Loader, withLoadStatusProps } from "../../common/hocs/withLoadStatus";
import { loadStatus } from "../../common/hocs/ApiLoader";

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
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

/* Reducer */
import { SubTestName, TestName } from "../../common/reducer/testResponseReducer";

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

function WithAnimationWrapperate({keyProp, className, children}: PropsWithChildren<{keyProp: any, className: string}>){
    return(
        <div key = {keyProp} className={className}>
            {children}
        </div>
    )
}

const testElements: {testName: TestName, subTestName?: SubTestName, Element: ComponentType<any>}[] = [
    {
        testName: 'leadership',
        Element: TestLeadershipPage,
    },
    {
        testName: 'schedule',
        Element: TestSchedulePage,
    },
    {
        testName: 'budget',
        subTestName: 'food',
        Element: TestBudgetPage,
    },
    // {
    //     testName: 'budget',
    //     subTestName:'accomodate',
    //     Element: TestBudget,
    // },   
    // {
    //     testName: 'budget',
    //     subTestName:'accomodateSpecial',
    //     Element: TestBudget,
    // },   
    // {
    //     testName: 'budget',
    //     subTestName:'food',
    //     Element: TestBudget,
    // },
    // {
    //     testName: 'budget',
    //     subTestName:'foodSpecial',
    //     Element: TestBudget,
    // },   
    {
        testName: 'city',
        subTestName: 'metropolis',
        Element: TestCityPage,
    },   
    {
        testName: 'city',
        subTestName: 'history',
        Element: TestCityPage,
    },   
    {
        testName: 'city',
        subTestName: 'nature',
        Element: TestCityPage,
    },   
    // {
    //     testName: 'activity',
    //     Element: TestWithSubTestPage,
    // },   
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
                className='h-screen w-screen'
            >
                {testElements.map(({testName, subTestName, Element})=>{
                    const TestComponent = withTestResponse(Element)(testName as TestName, subTestName ? (subTestName as SubTestName): undefined);
                    return(                        
                    <SwiperSlide data-hash={`${testName}${subTestName ? `-${subTestName}` : ''}`} className='swiper-no-swiping w-full h-full'>
                        <TestComponent/>
                        {/* https://swiperjs.com/react#swiperslide-render-function */}   
                        {/* {({ isActive }) => (
                            isActive && <TestComponent/>
                        )}            */}
                    </SwiperSlide>
                    )
                })}
                <SwiperSlide data-hash={`confirm`} className='swiper-no-swiping w-full h-full'>
                    {/* https://swiperjs.com/react#swiperslide-render-function */}   
                    <TestConfirm/>
                    {/* {({ isActive }) => (
                        isActive && <TestConfirm/>
                    )}            */}
                </SwiperSlide>                
            </Swiper> 
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