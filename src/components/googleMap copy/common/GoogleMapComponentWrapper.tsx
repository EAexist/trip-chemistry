import { Marker, OverlayView } from '@react-google-maps/api';
import { CENTER_FUKUOKA_TENJIN } from './options';
import { Coords } from './types';
import { PropsWithChildren, RefObject, useEffect, useRef } from 'react';

interface GoogleMapComponentWrapperProps{
  position: Coords;
  setPositions?: (ref: RefObject<HTMLDivElement>)=>void;
  className?: string;
};

function GoogleMapComponentWrapper({position = { lat : CENTER_FUKUOKA_TENJIN.lat, lng : CENTER_FUKUOKA_TENJIN.lng}, className, setPositions, children }: PropsWithChildren<GoogleMapComponentWrapperProps>) {

  /* Save x, y positions of map markers */
  // const ref = useRef<HTMLDivElement>(null);
  // useEffect(()=>{
  //   console.log(`withGoogleMap: useEffect: ref.current=${ref.current}`)
  //   setPositions && setPositions(ref);
  // },[]);

  return(
    <OverlayView
      position = {position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      {children}
    </OverlayView>
  );
};

export default GoogleMapComponentWrapper;

/* Depreacted: HOC */

// interface GoogleMapComponentWrapperProps extends Partial<Position>{
//   ref: RefObject<HTMLDivElement>;
//   className?: string;
//   GoogleMapComponentWrapperCoordinates?: any;
// };
// const withOnGoogleMap = <P extends withOnGoogleMapProps>(WrappedComponent: ComponentType<P>) => 
//   ({lat, lng, setPositions} : {lat?: number, lng?: number, setPositions?: (ref: RefObject<HTMLDivElement>)=>void}) =>
//   (props: Omit<P, keyof withOnGoogleMapProps>) => {

//   /* Save x, y positions of map markers */
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(()=>{
//     console.log(`withGoogleMap: useEffect: ref.current=${ref.current}`)
//     setPositions && setPositions(ref);
//   },);

//   return(
//     // <div id='marker' ref={ref}>
//       // <WrappedComponent {...{lat: lat, lng: lng, ref: ref}} {...props as P}/>
//       <WrappedComponent {...{ref: ref, ...props} as P}/>
//     // </div>
//   );
// };
