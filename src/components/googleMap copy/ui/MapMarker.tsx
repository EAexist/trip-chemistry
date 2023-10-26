import GoogleMapReact from 'google-map-react';
import { PropsWithChildren, useContext, useEffect, useRef } from 'react';
import { useFocusContext } from '../../../common/focus/FocusContext';
import { useTestResponse } from '../../../common/reducer/testResponseReducer';
import { Icon } from '@mui/material';

interface MapMarkerProps {
  label: string; 
  icon?: string;
  className?: string;
  mapmarkerCoordinates?: any;
};

const MapMarker = ({ label, icon, className } : MapMarkerProps) => (
  <div className='w-14 h-16 flex flex-col align-center -translate-x-1/2 -translate-y-14'>        
    <div className='h-14 flex-none relative border-blue-500'>
      <Icon className='absolute left-0 right-0 m-auto' sx={{ fontSize: 52, color: "gray", }}>location_on</Icon>
      <Icon className='absolute left-0 right-0 m-auto top-1.5' sx={{ fontSize: 28, color: "white", }}>circle</Icon>
      <Icon className='absolute left-0 right-0 m-auto top-2.5' sx={{ fontSize: 20}}>{icon}</Icon>
    </div>
    <h6 className={`text-center ${className}`}>{label}</h6>
  </div>
);


interface AnswerItemWrapperProps {
  index: number; 
}

const ShowTestResponseDetailWrapper = ({ index, children } : PropsWithChildren<AnswerItemWrapperProps>) => {
  const {focus} = useFocusContext();
  const testResponse = useTestResponse('schedule');

  return(
      <>
        {
          (
            focus === false ?
              testResponse >= index /* 아무 옵션도 hover하지 않고 있으면 응답(마지막으로 클릭한 옵션)에 대응하는 마커만 보여줌 */
              : (focus as number >= index) /* 옵션 중 하나를 hover할 경우 해당하는 마커를 보여줌 */
          )
          && {children}
        }
      </>
  );
};

export default MapMarker;
export { ShowTestResponseDetailWrapper };