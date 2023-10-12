import { PropsWithChildren, useContext } from 'react';
import { useIsHoveringContext } from '../../../common/isHovering/IsHoveringContext';
import { useTestResponse } from '../../../common/reducer/testResponseReducer';
import { motion } from "framer-motion";
import { BasisCurve } from "react-svg-curve";
import { GoogleMapPosition, Position } from '../common/types';

// import { GoogleMapChildrenProps } from '../common/types';

interface MapPathProps extends Partial<GoogleMapPosition> {
  index: number; 
  id: string;
  end?: {
    x: number,
    y: number
  }
  text?: string; 
};

const MapPathSvg = ({positions, index}: {positions: Position[], index: number}) => {
  // console.log("MapPathSvg positions=", positions)

  const {isHovering} = useIsHoveringContext();
  const testResponse = useTestResponse('schedule');
  
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay: 0, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay: 0, duration: 0.01 }
        }
      }
    }

  return(
    (
      isHovering === false ?
      testResponse >= index /* 아무 옵션도 hover하지 않고 있으면 응답(마지막으로 클릭한 옵션)에 대응하는 마커만 보여줌 */
      :(isHovering as number >= index) /* 옵션 중 하나를 hover할 경우 해당하는 마커를 보여줌 */
    )
    &&
<>
<motion.svg
      // width="600"
      // height="600"
      // viewBox="0 0 600 600"
      className="h-full w-full absolute"
      initial="hidden"
      animate="visible"
    >
      {
        positions.map((position: Position, index) => {
          // console.log('MapPathSvg return position=', position)
          return (
            <>
              <motion.circle
                  cx={`${100*index}`}
                  cy={`${100*index}`}
                  r="80"
                  stroke="#ff0055"
                  variants={draw}
                  // custom={1}
              />
              {/* <MapPath index={index} end={position} /> */}
            </>
          );
        })
      }
</motion.svg>
</>
  )
}
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 2, bounce: 0 },
        opacity: { delay, duration: 0.01 }
      }
    };
  }
};  

const MapPath = ({ index, id, end, text, lat, lng } : MapPathProps) => {

  const d = `M${index%2===0? '415' : '500' },275Q422,310,417.5,354Q413,398,378,423Q343,448,299,423Q255,398,227.5,389.5Q200,381,151,401.5Q102,422,86,383.5Q70,345,65,309.5Q60,274,78.5,243.5Q97,213,87.5,176.5Q78,140,107.5,122Q137,104,160.5,74Q184,44,222,33Q260,22,293.5,43.5Q327,65,362,81Q397,97,386,142.5Q375,188,391.5,214Q408,240,415,275Z`
  const d2 = `M 400,400 ${end&&`L ${end.x},${end.y}`}`

  return(
    <> 
        {/* <motion.svg
        // width="600"
        // height="600"
        // viewBox="0 0 600 600"
        className="h-full w-full absolute"
      > */}
        {/* Mask for Dashed Line */}
          {/* <defs>
            <mask id="mask" maskUnits="userSpaceOnUse">
              <path 
                strokeDasharray='12 6'
                d={d}
                className='stroke-6 stroke-white'
              />
            </mask>
          </defs> */}
        {/* Aniamted Path */}
          {/* <motion.path
            variants={draw}
            className='stroke-6 stroke-red-500 fill-transparent'
            d={d}
            mask="url(#mask)"
          /> */}
        {/* Mask for Dashed Line */}
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse">
          <path
            strokeDasharray='12 6'
            d={d2}
            className='stroke-6 stroke-white'
          />
        </mask>
      </defs>
        {/* Aniamted Path */}
          <motion.path
            variants={draw}
            className='stroke-6 stroke-red-500 fill-transparent'
            d={d2}
            mask={`url(#${id})`}
          />
        {/* </motion.svg> */}
      </>
  );
};

const MapMaskpath = ({ index, end, text, lat, lng } : MapPathProps) => {

  const d = `M${index%2===0? '415' : '500' },275Q422,310,417.5,354Q413,398,378,423Q343,448,299,423Q255,398,227.5,389.5Q200,381,151,401.5Q102,422,86,383.5Q70,345,65,309.5Q60,274,78.5,243.5Q97,213,87.5,176.5Q78,140,107.5,122Q137,104,160.5,74Q184,44,222,33Q260,22,293.5,43.5Q327,65,362,81Q397,97,386,142.5Q375,188,391.5,214Q408,240,415,275Z`
  const d2 = `M 400,400 ${end&&`L ${end.x},${end.y}`}`

  return(
    <> 
        {/* <motion.svg
        // width="600"
        // height="600"
        // viewBox="0 0 600 600"
        className="h-full w-full absolute"
      > */}
        {/* Mask for Dashed Line */}
          {/* <defs>
            <mask id="mask" maskUnits="userSpaceOnUse">
              <path 
                strokeDasharray='12 6'
                d={d}
                className='stroke-6 stroke-white'
              />
            </mask>
          </defs> */}
        {/* Aniamted Path */}
          {/* <motion.path
            variants={draw}
            className='stroke-6 stroke-red-500 fill-transparent'
            d={d}
            mask="url(#mask)"
          /> */}
        {/* Mask for Dashed Line */}
        <defs>
            <mask id="mask" maskUnits="userSpaceOnUse">
              <path 
                strokeDasharray='12 6'
                d={d2}
                className='stroke-6 stroke-white'
              />
            </mask>
          </defs>
        {/* Aniamted Path */}
          <motion.path
            variants={draw}
            className='stroke-6 stroke-red-500 fill-transparent'
            d={d2}
            mask="url(#mask)"
          />
        {/* </motion.svg> */}
      </>
  );
};


export default MapPath;
export { MapPathSvg };