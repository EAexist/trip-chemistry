import { useState, createContext, useEffect, PropsWithChildren, ComponentType, useContext, useCallback } from "react";
import { usePageString } from "../../texts";

/* Test Page Components */
import TestLeadershipPage from "./testPage/TestLeadershipPage";
import TestSchedulePage from "./testPage/TestSchedulePage";
import TestBudgetPage from "./testPage/TestBudgetPage";
import TestCityPage from "./testPage/TestCityPage";
import TestConfirmPage from "./testPage/TestConfirmPage";
import withTestResponse from "../../common/hoc/withTestResponse";

/* Swiper */
import { Navigation, Pagination, Mousewheel, HashNavigation, Parallax } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperType from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

/* Reducer */
import { SubTestName, TestIndex, TestName } from "../../common/reducer/testResponseReducer";
import IconStepper from "../IconStepper";
import { useSetTopNav } from "../TopNav";
import LeftNav from "../LeftNav";

interface TestPageProps {
    defaultActiveSectionIndex?: number;
};

interface ActiveSectionContextProps{
    activeStep: number;
    setActiveStep: (activeStep: number) => void;
    incrementActiveSectionIndex?: (offset:number) => void;
    maxActiveSectionIndex?: number;
};
const ActiveSectionContext = createContext<ActiveSectionContextProps>({} as ActiveSectionContextProps);

const sectionElements : {[key: string] : {testIndex?: TestIndex, postConnector?: boolean, Element: ComponentType<any>}} = {
    leadership:
        {
            testIndex: {
                testName: 'leadership',
                subTestName: 'leadership',
            },
            Element: TestLeadershipPage,
            postConnector: true,
        },
    schedule:
        {
            testIndex: {
                testName: 'schedule',
                subTestName: 'schedule',
            },
            Element: TestSchedulePage,
            postConnector: true,
        },
    bugetFood:
        {
            testIndex: {
                testName: 'budget',
                subTestName: 'food',
            },
            Element: TestBudgetPage,
            postConnector: true,
        },
    cityMetropolis:
        {
            testIndex: {
                testName: 'city',
                subTestName: 'metropolis',
            },
            Element: TestCityPage,
            postConnector: false,
        },  
    cityHistory: 
        {
            testIndex: {
                testName: 'city',
                subTestName: 'history',
            },
            Element: TestCityPage,
            postConnector: false,
        },   
    cityNature:
        {
            testIndex: {
                testName: 'city',
                subTestName: 'nature',
            },
            Element: TestCityPage,
            postConnector: true,
        },   
    confirm:
        {            
            Element: TestConfirmPage,
            postConnector: false,
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
    
    const [ activeStep, setActiveStep ] = useState(0);
    const [ swiper, setSwiper ] = useState<SwiperType>();

    const slideTime : number = 1000;

    /* LeftNav */
    const handleClickStepButton = useCallback(( index: number ) => {
        setActiveStep(index);
    }, [ setActiveStep ]);

    useEffect(() => {
        swiper?.slideTo(activeStep, slideTime);
    }, [ activeStep, swiper ]);


    const steps = (Object.entries(sectionElements)).map(([ id, { testIndex, postConnector } ]) => {
        const testStrings = testIndex? strings[ testIndex.testName ].subTests[ testIndex.subTestName ] : strings[ id ];
        return({ id, label: testStrings.label, icon: testStrings.icon, postConnector: postConnector });
    });

    useEffect(()=>{
        const path = window.location.pathname.split('/').at(-1);
        const pathNameIndex = sections.indexOf(path? path : '')
    }, [])

    /* @TODO: Current state of each steps' completeness. */
    // const [steps, setSteps] = useState(sections?.map((label, index)=>{
    //     return(
    //         {
    //             label: label, 
    //             completed: false
    //         }
    //     ); 
    // }));

    /* Swiper */
    const spaceBetweenTests = 20;

    return(
        <div className='full min-h-0 relative'>
            <LeftNav steps={ steps } handleClickStepButton={ handleClickStepButton } activeStep={activeStep}/>
        {/* https://sezzled.tistory.com/262 */}
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
            onActiveIndexChange={(swiper) => { 
                setActiveStep(swiper.activeIndex); 
            }}
            // allowTouchMove={false} 

            /* @TODO Hash Navigation is Not Working */
            hashNavigation={true}

            speed={500}
            parallax={true}
            noSwiping={true}
            noSwipingClass='swiper-no-swiping'
            className=''
        >
            {Object.entries(sectionElements).map(([key, {testIndex, Element}])=>{
                const TestComponent = testIndex ?
                    withTestResponse(Element)(testIndex)
                    : Element;
                return(                        
                <SwiperSlide data-hash={`${testIndex ? `${testIndex.testName}-${testIndex.subTestName}` : key}`} className='full'>
                    <TestComponent/>
                </SwiperSlide>
                )
            })}              
        </Swiper> 
        </div>
    );
}


export default TestPage;
export { ActiveSectionContext };

/* Deprecated */
// useSetTopNav({
//     element : 
//         <IconStepper
//             steps={(Object.entries(sectionElements)).map(([key, {testName, subTestName, postConnector}]) => {
//                 const testStrings = testName? (subTestName? strings[testName].subTests[subTestName] : strings[testName]) : strings[key];
//                 return({label: testStrings.label, icon: testStrings.icon, postConnector: postConnector});
//             })}
//             // activeStep={activeStep}
//             activeStep={activeStep}
//             handleClickStepButton={handleClickStepButton}
//             connectorSize="sm"
//         />,
//     dep: [ activeStep, handleClickStepButton, strings, swiper ]        
// });