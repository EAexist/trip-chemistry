import { ComponentType, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useFocusContext, WithActiveOnResponseProps } from '../../../common/focus/FocusContext';
import { useTestResponse } from '../../../common/reducer/testResponseReducer';
import { motion } from "framer-motion";
import { BasisCurve } from "react-svg-curve";
import { Coords } from '../common/types';
import { Polyline } from '@react-google-maps/api';
import { API_KEY, POLYLINE_OPTIONS } from '../common/options';
import { Loader } from "@googlemaps/js-api-loader"

// import { GoogleMapChildrenProps } from '../common/types';

interface MapPathProps extends WithActiveOnResponseProps {
  map?: google.maps.Map
  index?: number; 
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

const MapPath = ({ map, index, id, start, end, isActive, text } : MapPathProps) => {

  console.log(`MapPath: isActive=${isActive}`);
  console.log(`MapPath: map=${map}`);

  const [polyline, setPolyline] = useState<google.maps.Polyline|null>(
    new google.maps.Polyline({
      path: [start, end],
      ...POLYLINE_OPTIONS.DASHED
    })
  );

  useEffect(()=>{
    if(isActive){
      if(map){
        console.log(`MapPath: polyline.setMap(map)`);
        polyline && polyline.setMap(map);
      }
    }

    else{
      console.log(`MapPath: polyline.setMap(null)`);
      polyline && polyline.setMap(null);
    }
  },[isActive, map, polyline]);

  return(null);
}

// export default withGoogleAPI(MapPath)(API_KEY);
export default MapPath;