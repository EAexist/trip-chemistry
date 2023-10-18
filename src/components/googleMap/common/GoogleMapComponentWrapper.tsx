import { CENTER_FUKUOKA_TENJIN } from './options';
import { Coords } from './types';
import { ComponentType, PropsWithChildren, RefObject, useEffect, useRef } from 'react';

interface GoogleMapComponentWrapperProps extends Coords{
  className?: string;
};

function GoogleMapComponentWrapper({lat = CENTER_FUKUOKA_TENJIN.lat, lng = CENTER_FUKUOKA_TENJIN.lng, children }: PropsWithChildren<GoogleMapComponentWrapperProps>) {
  return(
    <>{children}</>
  );
};

interface withOnGoogleMapProps extends Coords{
  className?: string;
};
const withOnGoogleMap = <T extends withOnGoogleMapProps>(WrappedComponent: ComponentType<T>) => 
  (coords : Coords) =>   
  (props: Omit<T, keyof withOnGoogleMapProps>) => {

  // console.log(`coords: ${JSON.stringify(coords)}`);
  // console.log(`{...coords, ...props}: ${JSON.stringify({...coords, ...props})}`);
  return(
      <WrappedComponent {...{lat:coords.lat, lng:coords.lng, ...props} as T}/>
  );
};

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


export default GoogleMapComponentWrapper;
export { withOnGoogleMap };
export type { withOnGoogleMapProps };
