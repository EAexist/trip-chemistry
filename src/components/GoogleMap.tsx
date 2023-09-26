import GoogleMapReact from 'google-map-react';
import { PropsWithChildren } from 'react';
import { useIsHoveringContext } from '../context/IsHoveringContext';

interface GoogleMapProps{

};

const MapMarker = ({ index, text, lat, lng } : {index: number, text: string, lat: any, lng: any}) => {
  const {isHovering} = useIsHoveringContext();
  console.log(`MapMarker: ${isHovering}`);
  return(
    (isHovering !== false && (isHovering as number >= index)) ? <h3>{text}</h3> : null
  );
};
interface point{
  lat: number;
  lng: number;
};
const random = (min: number, max: number) => Math.random() * (max - min) + min;
const randomPoint = (min: point, max: point) => ({lat: random(min.lat, max.lat), lng: random(min.lng, max.lng)});
const min = {lat: 24.993544, lng: 121.406567};
const max = {lat: 25.092974, lng: 121.616632};
const examples = [[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]]; 

function GoogleMap({isHovering, children}:PropsWithChildren<{isHovering: number}>){
    const defaultProps = {
        center: { lat: 25.0474428, lng: 121.5147137 },
        zoom: 12.5
    };

    const API_KEY = "AIzaSyBTIi-NbUzw9gdHynDTSpwng5GWbXA8D6M";
    return(
    // Important! Always set the container height explicitly
    <div className='w-full h-full'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {
          examples.map((points: any[], index: number) => (
            points.map((point) => {
              const pointProps = randomPoint(min, max);
              console.log("pointProps=" + JSON.stringify(pointProps), "isHovering=", isHovering);
              return (
                <MapMarker index = {index} text={`${point}`} {...pointProps} />
              );
            })
          ))
        }
      </GoogleMapReact>
    </div>
    );
};

export default GoogleMap;