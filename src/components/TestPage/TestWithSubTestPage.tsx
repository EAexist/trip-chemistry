import {useState, useRef, PropsWithChildren, createContext, useEffect } from 'react';
import Button from '../Button';
import withTestResponse, { WithTestResponseProps } from '../withTestResponse';
import { SubTestName, TestName,  } from '../../reducer/testResponseReducer';
import { IsHoveringContextProvider, IsHoveringType, WithMouseHoverWrapper,  WithShowIfHoveringWrapper,  withMouseHover, withShowIfHovering } from '../../context/IsHoveringContext';
import GoogleMap from '../GoogleMap';
import GoogleMapReact from 'google-map-react';
import MapMarker from '../MapMarker';
import { motion } from "framer-motion";
import MapPath from '../MapPath';
import MenuContainer, { ExpandableResponseButton, MenuItem } from '../Menu';
import TestContainer from '../TestContainer';

// Swiper
import { Navigation, Parallax, EffectCards, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import getImgSrc, { formatWebp } from '../utils/getImgSrc';
import ExpandableButton, { ExpandableButtonDetail } from '../ExpandableButton';
import { ShowContextProvider, WithShow } from '../ShowContext';
import { WithAnim } from '../Card';

interface TestWithSubTestPageProps{

}; 

interface Answer {
  title: String;
};

interface position {x: number, y:number};
type markerPositions = ( position | undefined)[][];

export type { position, markerPositions };

interface markerPositionContextProps {
  positions: markerPositions;
  setPositions: (func: (prev: markerPositions) => markerPositions) => void;
  refPosition: position | undefined
}

export const MarkerPositionContext = createContext<markerPositionContextProps>({} as markerPositionContextProps);

function TestWithSubTestPage({testName, strings}: WithTestResponseProps){

  const [activeSubTest, setActiveSubTest] = useState<SubTestName>(Object.keys(strings.subTests)[0] as SubTestName);
  const subTestStrings = activeSubTest && strings.subTests[activeSubTest]

  console.log(activeSubTest, JSON.stringify(strings.subTests));

  const spaceBetweenTests = 30;

  return(
    <>  {/* 페이지 */}
        <div className ='flex flex-row w-full h-full pl-12'>  
        {/* <IsHoveringContextProvider value={{ isHovering: isHovering, setIsHovering: setIsHovering }}> */}

          {/* 테스트 */}
          <TestContainer 
            title =  {strings.title}
            subTitle = {strings.subTitle}
            titleClassName = 'py-12 items-center'
          >
          {/* 질문 목록 */}
          <div className='w-full h-full min-w-96 flex flex-col items-start space-y-8'>
          {
            Object.entries(strings.subTests).map(([id, subTest]:[id: string, subTest: any])=>{
              const ExpandableResponseButtonWithResponse = withTestResponse(ExpandableResponseButton)(testName, id as SubTestName);

              return(
                <ExpandableResponseButtonWithResponse
                  isActive={id===activeSubTest}
                  onClick={() => setActiveSubTest(id as SubTestName)}
                >
                  {`#${subTest.title}`}
                </ExpandableResponseButtonWithResponse>
              );
            })
          }          </div>
          </TestContainer>

          {/* 결과 */}
          
              <div className='w-8/12 h-full p-9'>
              <WithAnim key={activeSubTest}>
                    {/* <div className='w-24 h-24'>  */}
                    <SwiperSlide className='flex flex-col justify-center items-center'>
                        {/* https://swiperjs.com/react#swiperslide-render-function */}   
                        {({ isActive }) => (
                          <>
                            <Swiper
                              modules={[EffectCards, Autoplay, Parallax]}
                              // direction={"vertical"}                
                              spaceBetween={spaceBetweenTests}
                              slidesPerView={1}
                              // preventInteractionOnTransition={true} /* Prevent Scrolling on Transition */ 
                              // navigation={true}
                              // scrollbar={{ draggable: true }}
                              // onSwiper={(swiper) => {swiper.mousewheel.enable(); console.log(swiper);}}
                              // onSlideChange={(swiper) => {setActiveSubTest(swiper.realIndex);}}
                              effect='cards'
                              cardsEffect={{slideShadows: false}}
                              speed={500}
                              parallax={true}
                              noSwiping={true}
                              noSwipingClass='swiper-no-swiping'
                              className='w-full h-full'        
                              centeredSlides={true}    
                              autoplay={{                            
                                delay: 2000,
                              }}
                              loop={true}
                            >
                              {subTestStrings.examples.map((example: string)=>{
                                const exampleImageStyle = {backgroundImage: `url("${getImgSrc('/place', `${example}`, formatWebp)}")`};

                                return(
                                  <SwiperSlide
                                  className='w-full h-full flex flex-col items-center'
                                  >
                                      <div
                                        style={exampleImageStyle}
                                        className={`w-full h-full
                                            bg-cover
                                            relative 
                                        `}
                                      >
                                        {/* 도시 이름 */}
                                        <h5 className='absolute bottom-2 right-2 text-white'>{example}</h5>
                                      </div>
                                  </SwiperSlide>  
                                )   
                              })}                         
                            </Swiper>

                            {/* 제목 (도시 타입) */}
                            <h2>{subTestStrings.title}</h2>
                          </>
                        )}           
                    </SwiperSlide>
                    {/* </div> */}
                </WithAnim>
              </div>        
        {/* </IsHoveringContextProvider> */}
        </div>
    </>
  );
}

export default TestWithSubTestPage;