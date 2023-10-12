import {useState, useRef, } from 'react';
import { IsHoveringContextProvider, IsHoveringType, WithHoverWrapper } from '../../../../common/isHovering/IsHoveringContext';
import GoogleMap from '../../../googleMap/ui/GoogleMap';
import MapMarker from '../../../googleMap/ui/MapMarker';
import { motion } from "framer-motion";
import MapPath from '../../../googleMap/ui/MapPath';
import TestContainer from '../../../TestContainer';
import { GoogleMapPosition, MarkerPositionList, Position } from '../../../googleMap/common/types';
import withTestResponse, { WithTestResponseProps } from '../../../../common/hocs/withTestResponse';
import { MarkerPositionContextProvider } from '../../../googleMap/common/MarkerPositionContext';
import ToggleButton from '../../../ToggleButton';

interface TestScheduleProps extends WithTestResponseProps{}; 


function TestSchedule({testName, testResponse, setTestResponse, strings}: TestScheduleProps){

  const [isHovering, setIsHovering] = useState<IsHoveringType>(false);

  /* For Debug */
  const random = (min: number, max: number) => Math.random() * (max - min) + min;
  const randomPoint = (min: GoogleMapPosition, max: GoogleMapPosition) => ({lat: random(min.lat, max.lat), lng: random(min.lng, max.lng)});
  const min = {lat: 24.993544, lng: 121.406567};
  const max = {lat: 25.092974, lng: 121.616632};
  const examples = [[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]]; 

  const [positions, setPositions] = useState<MarkerPositionList>(examples.map((list)=>(list.map(()=>undefined))));
  const mapDivRef = useRef<HTMLDivElement>(null);
  
  const API_KEY_GOOGLE_MAP = "AIzaSyBTIi-NbUzw9gdHynDTSpwng5GWbXA8D6M";

  const handleClick = (index: IsHoveringType)=>{
    setTestResponse && setTestResponse(index as number);
  }  

  
  return(
    <>  
      <div className='flex flex-row flex-1 w-full h-full 
        max-md:flex-col
      '> {/* 페이지 */}
        <IsHoveringContextProvider value={{ isHovering: isHovering, setIsHovering: setIsHovering }}>

          <TestContainer title = {strings.title} subTitle = {strings.subTitle}> {/* 테스트 제목 및 내용 레이아웃 컴포넌트 */}           
            <WithHoverWrapper listenOnly='leave'>
              <div className={`flex flex-col items-start justify-center min-w-fit pr-20
                max-md:flex-row max-md:pr-0 max-md:whitespace-nowrap
              `}>
                {strings.answers.map(({label, value}: {label: string, value: number}, index: number) => (                    
                    <WithHoverWrapper id={index} listenOnly='enter'>
                      <h3>
                      <ToggleButton isActive={testResponse === index} onClick={() => handleClick(value)} className='
                        py-2
                        hover:font-bold 
                      '>
                        {label}
                      </ToggleButton>
                      </h3>
                      </WithHoverWrapper>
                ))}
              </div>
            </WithHoverWrapper>  
          </TestContainer>

          {/* 결과 */}
          <div className='w-full h-full relative'>
          <MarkerPositionContextProvider value={{positions: positions, setPositions: setPositions, 
            refPosition: mapDivRef.current? {
              x:  mapDivRef.current.getBoundingClientRect().x, 
              y: mapDivRef.current.getBoundingClientRect().y
            } : undefined
          }}>
            
          {/* 결과 마커 */}
          <div className='w-full h-full absolute' ref={mapDivRef}>
            <GoogleMap>
              {
                examples.map((points: any[], index: number) => (
                  points.map((point, subIndex) => {
                    const pointProps = randomPoint(min, max);
                    // console.log("pointProps=" + JSON.stringify(pointProps), "isHovering=", isHovering);
                    return (
                      <MapMarker index={index} subIndex={subIndex} text={`${point}`} {...pointProps} className='z-10' />
                    );
                  })
                ))
              }
            </GoogleMap>
          </div>

          {/* 결과 Path */}
          {/* <div className=''> */}
          {/* { ! positions.some((list)=>list.some((position) => position===undefined)) &&
          <MapPathSvg positions={positions}/> } */}
            <motion.svg className="h-full w-full absolute" initial="hidden" animate="visible">
                {(positions as Position[][]).map((positionList: Position[], index: number) => (
                    ((isHovering === false) ?
                      (testResponse !== undefined) && (testResponse >= index) /* 아무 옵션도 hover하지 않고 있으면 응답(마지막으로 클릭한 옵션)에 대응하는 마커만 보여줌 */
                      :(isHovering as number >= index)) /* 옵션 중 하나를 hover할 경우 해당하는 마커를 보여줌 */
                    && positionList.map((position: Position, subindex) => (
                      (mapDivRef.current) 
                      && <MapPath index={index} id={`${index},${subindex}`} end={{x:position.x-mapDivRef.current.getBoundingClientRect().x, y: position.y-mapDivRef.current.getBoundingClientRect().y,}}/>
                    ))
                ))}
            </motion.svg>
          </MarkerPositionContextProvider>
          </div>
        </IsHoveringContextProvider>
        </div>
    </>
  );
}

export default TestSchedule;

// const ResponseButton = withHover(({handleClick, children}:PropsWithChildren<{handleClick: ()=>void}>)=>{
//   return(
//     <h3>
//     <Button onClick={handleClick}
//       className='
//       font-light transition duration-300 ease-out origin-left
//       hover:font-bold hover:scale-125 
//       focus:font-bold focus:scale-125 focus:underline
//     '>                
//         {children}                
//     </Button>
//     </h3>
//   )
// })