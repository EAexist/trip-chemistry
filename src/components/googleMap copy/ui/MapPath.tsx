import { PropsWithChildren, useContext } from 'react';
import { useFocusContext, WithActiveOnResponseProps } from '../../../common/focus/FocusContext';
import { useTestResponse } from '../../../common/reducer/testResponseReducer';
import { motion } from "framer-motion";
import { BasisCurve } from "react-svg-curve";
import { Coords } from '../common/types';
import { Polyline } from '@react-google-maps/api';
import { POLYLINE_OPTIONS } from '../common/options';

// import { GoogleMapChildrenProps } from '../common/types';

interface MapPathProps extends WithActiveOnResponseProps {
  index: number; 
  start: Coords;
  end: Coords;
  id?: string;
  text?: string; 
};

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

// const Path = ({ index, id, start, end, text } : MapPathProps) => {

//   const path = `M ${start.x},${start.y} L ${end.x},${end.y}`

//   return(
//     <>
//       <defs>
//         <mask id={id} maskUnits="userSpaceOnUse">
//           <path
//             strokeDasharray='12 6'
//             d={path}
//             className='w-full h-full stroke-4 stroke-white'
//           />
//         </mask>
//       </defs>
//       {/* Aniamted Path */}
//       <motion.path
//         variants={draw}
//         className='w-full h-full stroke-4 stroke-red-500 fill-transparent'
//         d={path}
//         mask={`url(#${id})`}
//       />
//       {/* </motion.svg> */}
//     </>
//   );
// };

// https://developers.google.com/maps/documentation/javascript/examples/overlay-symbol-dashed
const MapPath = ({ index, id, start, end, isActive, text } : MapPathProps) => {

  console.log(`MapPath: isActive=${isActive}`);

  const maps = new google.maps.Polyline();

  return(
      <Polyline
        path={[start, end]}
        options={isActive? {...POLYLINE_OPTIONS.DASHED} : {map: null,...POLYLINE_OPTIONS.DASHED}}
      />
      /* <defs>
        <mask id={id} maskUnits="userSpaceOnUse">
          <path
            strokeDasharray='12 6'
            d={path}
            className='w-full h-full stroke-4 stroke-white'
          />
        </mask>
      </defs> */
      /* Aniamted Path */
      /* <motion.path
        variants={draw}
        className='w-full h-full stroke-4 stroke-red-500 fill-transparent'
        d={path}
        mask={`url(#${id})`}
      /> */
      /* </motion.svg> */
  );
};

export default MapPath;