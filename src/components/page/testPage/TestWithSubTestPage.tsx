import {useState, createContext } from 'react';
import withTestResponse, { WithTestResponseProps} from '../../../common/hocs/withTestResponse';
import { SubTestName, } from '../../../common/reducer/testResponseReducer';
import TestContainer from '../../TestContainer';

/* Swiper */
import { Parallax, EffectCards, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import getImgSrc, { formatWebp } from '../../../common/utils/getImgSrc';
import { WithAnimationWrapper } from '../../../common/hocs/withAnimation';
import ExpandableTestResponseButton from './ExpandableTestResponseButton';

interface TestWithSubTestPageProps extends WithTestResponseProps{}; 

function TestWithSubTestPage({testName, strings}: TestWithSubTestPageProps){

  const [activeSubTest, setActiveSubTest] = useState<SubTestName>(Object.keys(strings.subTests)[0] as SubTestName);
  const subTestStrings = activeSubTest && strings.subTests[activeSubTest]

  console.log(activeSubTest, JSON.stringify(strings.subTests));

  const spaceBetweenTests = 30;

  return(
    <div className='flex flex-row w-full h-full
        max-md:flex-col
      '>  {/* 페이지 */}
      <TestContainer title={strings.title} subTitle={strings.subTitle}> {/* 테스트 제목 및 내용 레이아웃 컴포넌트 */}   
        <div className='w-full h-full flex flex-col items-start space-y-8
          max-md:flex-row max-md:whitespace-nowrap max-md:flex-wrap max-md:space-y-1
        '> {/* 질문 목록 */}
          {
            Object.entries(strings.subTests).map(([id, subTest]: [id: string, subTest: any]) => {
              console.log(`TestWithSubTestPage testName=${testName}, id=${id}`);
              const ExpandableResponseButtonWithResponse = withTestResponse(ExpandableTestResponseButton)(testName, id as SubTestName);
              return (
                <ExpandableResponseButtonWithResponse isActive={id === activeSubTest} onClick={() => setActiveSubTest(id as SubTestName)}>
                  {`#${subTest.title}`}
                </ExpandableResponseButtonWithResponse>
              );
            })
          }
        </div>
      </TestContainer>

      <div className='w-8/12 h-full p-9
        max-md: w-full
      '>{/* 결과 */}
        <WithAnimationWrapper key={activeSubTest}>
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
                  cardsEffect={{ slideShadows: false }}
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
                  {subTestStrings.examples.map((example: string) => {
                    const exampleImageStyle = { backgroundImage: `url("${getImgSrc('/place', `${example}`, formatWebp)}")` };

                    return (
                      <SwiperSlide className='w-full h-full flex flex-col items-center'>
                        <div style={exampleImageStyle} className={`w-full h-full bg-cover relative`}> {/* 도시 이름 */}
                          <h5 className='absolute bottom-2 right-2 text-white'>{example}</h5>
                        </div>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
                <h2>{subTestStrings.title}</h2>  {/* 제목 (도시 타입) */}
              </>
            )}
          </SwiperSlide>
          {/* </div> */}
        </WithAnimationWrapper>
      </div>
    </div>
  );
}

export default TestWithSubTestPage;