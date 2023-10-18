import { GoogleMapProps as ReactGoogleMapProps, GoogleMap as ReactGoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { PropsWithChildren } from 'react';
import { API_KEY } from '../common/options';

interface GoogleMapProps extends ReactGoogleMapProps{};

function GoogleMap({ children, ...props }: PropsWithChildren<GoogleMapProps>){
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY
  })

  return(
  /* Important! Always set the container height explicitly */
  <div className='w-full h-full border-4 border-blue-500 relative'>
    {isLoaded ? 
    <ReactGoogleMap
      mapContainerClassName='w-full h-full'
      {...props}
    >
      {children}
    </ReactGoogleMap>
    : <></>
    }
  </div>
  );
};

export default GoogleMap;
export type { GoogleMapProps };