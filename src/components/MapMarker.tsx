import GoogleMapReact from 'google-map-react';
import { PropsWithChildren, useContext, useEffect, useRef } from 'react';
import { useIsHoveringContext } from '../context/IsHoveringContext';
import { useTestResponse } from '../reducer/testResponseReducer';
import { motion } from "framer-motion";
import { MarkerPositionContext } from './TestPage/TestSchedule';

interface MapMarkerProps{
  index: number; 
  subIndex: number; 
  text: string; 
  lat?: any; 
  lng?: any;
  className?: string;
  mapmarkerCoordinates?: any;
};

const MapMarker = ({ mapmarkerCoordinates, index, subIndex, text, lat, lng, className } : MapMarkerProps) => {
  const {isHovering} = useIsHoveringContext();
  const testResponse = useTestResponse('schedule');

  /* Save x, y positions of map markers to draw map paths */
  const {setPositions} = useContext(MarkerPositionContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(()=>{
      setPositions(prev => {
        if (ref && ref.current) {
          prev[index][subIndex]={
            x: ref.current.getBoundingClientRect().x,
            y: ref.current.getBoundingClientRect().y,
          };
        }
        return prev;
      })
  },[ref]);

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 }
        }
      };
    }
  };

  // console.log(`MapMarker: ${isHovering}`);
  return(
    <div id='marker' ref={ref} className='bg-blue-500 h-4 w-4'>
      {
        (
          isHovering === false ?
            testResponse >= index /* 아무 옵션도 hover하지 않고 있으면 응답(마지막으로 클릭한 옵션)에 대응하는 마커만 보여줌 */
            : (isHovering as number >= index) /* 옵션 중 하나를 hover할 경우 해당하는 마커를 보여줌 */
        )
        && <h3 className={`${className}`}>{text}</h3>
      }
    </div>
  );
};


export default MapMarker;