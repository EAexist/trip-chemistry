import GoogleMapReact from 'google-map-react';
import { PropsWithChildren } from 'react';
import { Coords } from '../common/types';
import { PROPS_TEST_SCHEDULE_PAGE } from '../common/options';

interface GoogleMapProps{};

function GoogleMap({ children }: PropsWithChildren<GoogleMapProps>){
  return(
  /* Important! Always set the container height explicitly */
  <div className='w-full h-full border-4 border-blue-500 relative'>
    <GoogleMapReact
      {...PROPS_TEST_SCHEDULE_PAGE}
    >
      {children}
    </GoogleMapReact>
  </div>
  );
};

export default GoogleMap;