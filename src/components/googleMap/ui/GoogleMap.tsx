import GoogleMapReact from 'google-map-react';
import { ComponentType, PropsWithChildren, useState } from 'react';
import { Coords } from '../common/types';
import { API_KEY, PROPS_TEST_SCHEDULE_PAGE } from '../common/options';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapProps{};

const withGoogleAPI = <T extends {}>(WrappedComponent: ComponentType<T>) =>
    (apiKey: string) =>
    (props: T) => {      
    
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const loader = new Loader({
      apiKey: apiKey,
    });

    loader.importLibrary("maps").then(async () => {
      setIsLoaded(true);
    })

    return(
      isLoaded && <WrappedComponent {...props as T}/> 
    );
}

function GoogleMap({ children, ...props }: PropsWithChildren<GoogleMapProps>){
  return(
  /* Important! Always set the container height explicitly */
  <div className='w-full h-full border-4 border-blue-500 relative'>
    <GoogleMapReact
      {...props}
    >
      {children}
    </GoogleMapReact>
  </div>
  );
};

// export default withGoogleAPI(GoogleMap)(API_KEY);
export default GoogleMap;