import {useState, useRef, PropsWithChildren, createContext, useEffect } from 'react';
import Button from '../Button';
import { WithTestResponseProps } from '../withTestResponse';
import { TestName, useSetTestResponse, useTestResponse } from '../../reducer/testResponseReducer';
import { IsHoveringContextProvider, IsHoveringType, WithMouseHoverWrapper,  withMouseHover, withShowIfHovering } from '../../context/IsHoveringContext';
import GoogleMap from '../GoogleMap';
import GoogleMapReact from 'google-map-react';
import MapMarker from '../MapMarker';
import { motion } from "framer-motion";
import MapPath from '../MapPath';
import MenuContainer, { MenuItem } from '../Menu';
import TestContainer from '../TestContainer';


interface TestScheduleProps{

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

function TestSchedule({testName, testResponse, setTestResponse, strings}: WithTestResponseProps ){

  const [isHovering, setIsHovering] = useState<IsHoveringType>(false);
  // console.log('setIsHovering:', setIsHovering);


  const examples = [[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]]; 
  const [positions, setPositions] = useState<markerPositions>(examples.map((list)=>(list.map(()=>undefined))));
  const mapDivRef = useRef<HTMLDivElement>(null);

  const handleClick = (index: IsHoveringType)=>{
    setTestResponse && setTestResponse(index as number);
  }  
  const defaultProps = {
    center: { lat: 25.0474428, lng: 121.5147137 },
    zoom: 12.5
  };

  const API_KEY = "AIzaSyBTIi-NbUzw9gdHynDTSpwng5GWbXA8D6M";

  interface point{
    lat: number;
    lng: number;
  };

  const random = (min: number, max: number) => Math.random() * (max - min) + min;
  const randomPoint = (min: point, max: point) => ({lat: random(min.lat, max.lat), lng: random(min.lng, max.lng)});
  const min = {lat: 24.993544, lng: 121.406567};
  const max = {lat: 25.092974, lng: 121.616632};



  return(
    <>  {/* 페이지 */}
        <div className='flex flex-row flex-1 w-full h-full pl-12'>
        <IsHoveringContextProvider value={{ isHovering: isHovering, setIsHovering: setIsHovering }}>

          <TestContainer 
            title = {strings.title}
            subTitle ={strings.subTitle}
            titleClassName = 'py-12 items-center'
          >           
            <MenuContainer>
              {strings.answers.map(({label, value}: {label: string, value: number}, index: number) => (
                  <MenuItem index={index}>
                    <h3>
                    <Button onClick={() => handleClick(value)} className='
                      py-2 origin-left
                      px-4 origin-center
                      font-light transition duration-300 ease-out 
                      hover:font-bold hover:scale-125 
                      focus:font-bold focus:scale-125 focus:underline
                    '>
                      {label}
                    </Button>
                    </h3>
                  </MenuItem>
              ))}
            </MenuContainer>
          </TestContainer>

          {/* 결과 */}
          <div className='w-full h-full relative'>
          <MarkerPositionContext.Provider value={{positions: positions, setPositions: setPositions, 
            refPosition: mapDivRef.current? {
              x:  mapDivRef.current.getBoundingClientRect().x, 
              y: mapDivRef.current.getBoundingClientRect().y
            } : undefined
          }}>
            
          {/* 결과 마커 */}
          <div className='w-full h-full absolute' ref={mapDivRef}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: API_KEY }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
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
            </GoogleMapReact>
          </div>

          {/* 결과 Path */}
          {/* <div className=''> */}
          {/* { ! positions.some((list)=>list.some((position) => position===undefined)) &&
          <MapPathSvg positions={positions}/> } */}
          <motion.svg
            className="h-full w-full absolute"
            initial="hidden"
            animate="visible"
          >
              {(positions as position[][]).map((positionList: position[], index: number) => (
                  ((isHovering === false) ?
                    (testResponse !== undefined) && (testResponse >= index) /* 아무 옵션도 hover하지 않고 있으면 응답(마지막으로 클릭한 옵션)에 대응하는 마커만 보여줌 */
                    :(isHovering as number >= index)) /* 옵션 중 하나를 hover할 경우 해당하는 마커를 보여줌 */
                  && positionList.map((position: position, subindex) => (
                    (mapDivRef.current) 
                    && <MapPath index={index} id={`${index},${subindex}`} end={{x:position.x-mapDivRef.current.getBoundingClientRect().x, y: position.y-mapDivRef.current.getBoundingClientRect().y,}}/>
                  ))
              ))}
          </motion.svg>
          {/* </div> */}

          </MarkerPositionContext.Provider>
          </div>
        </IsHoveringContextProvider>
        </div>
    </>
  );
}

export default TestSchedule;

// const ResponseButton = withMouseHover(({handleClick, children}:PropsWithChildren<{handleClick: ()=>void}>)=>{
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