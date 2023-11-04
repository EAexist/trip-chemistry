import {useState, useRef, RefObject, useCallback, useEffect, } from 'react';
import { FocusContextProvider, FocusType, Focusable, withShowOnResponse, withActiveOnResponse } from '../../../common/focus/FocusContext';

import TestTitleContainer from '../../typography/TestTitleContainer';
import { WithTestResponseProps } from '../../../common/hoc/withTestResponse';
import ToggleButton from '../../ToggleButton';
import { Icon } from '@mui/material';
import GoogleMapComponentWrapper from '../../googleMap/common/GoogleMapComponentWrapper';
import { WithAnimationWrapper } from '../../../common/hoc/withAnimation';

/* Google Map */
import GoogleMap from '../../googleMap/ui/GoogleMap';
import MapMarker, { MapMarkerProps } from '../../googleMap/ui/MapMarker';
import MapPath from '../../googleMap/ui/MapPath';
import { PROPS_TEST_SCHEDULE_PAGE } from '../../googleMap/common/options';
import { usePageString, useTestString } from '../../../texts';

interface TestSchedulePageProps extends WithTestResponseProps{}; 

function TestSchedulePage({setTestResponse, strings, testResponse, testIndex}: TestSchedulePageProps){

  const testStrings = useTestString({ testName: 'schedule' });

  const [focus, setFocus] = useState<FocusType>(-1);
  // const [activeResponse, setActiveResponse] = useState<number>(2);
  const [map, setMap] = useState<google.maps.Map>();

  const handleClickResponse = (index: FocusType)=>{
    setTestResponse && setTestResponse(index as number);
  }  

  return(
    /* 페이지 */
    <div>
        <FocusContextProvider value={{ focus: focus, setFocus: setFocus }}>
        <div className='flex flex-row w-full h-full'>

          {/* 테스트 제목 및 내용 레이아웃 */}
          <div className='w-160 page body-left space-y-16'>
            <TestTitleContainer title={strings.title} subtitle={strings.subtitle} />
            <div className={`flex flex-col items-start justify-center min-w-fit pr-8
                max-md:flex-row max-md:pr-0 max-md:whitespace-nowrap`}>
              {(Object.entries(testStrings.answers) as [value: string, answer: { label: string }][]).map(([valueKey, { label }]) => {
                const value = Number(valueKey);

                return (
                  <Focusable id={value}>
                    <h3>
                      <ToggleButton
                        isActive={testResponse === value}
                        onClick={() => handleClickResponse(value)}
                        className='hover:font-bold hover:opacity-100'>
                          <div className='py-2'>
                            {label}
                          </div>
                      </ToggleButton>
                    </h3>
                  </Focusable>
                )
              })}
            </div>
            <h6>{strings.credit}</h6>
            {/* </Focusable>   */}
          </div>

          {/* 결과 */}
          <div className='w-full h-full  border-red-500'>
            {/* <MarkerPositionContextProvider value={{positions: positions, setPositions: setPositions, 
              refPosition: mapDivRef.current? {
                x:  mapDivRef.current.getBoundingClientRect().x, 
                y: mapDivRef.current.getBoundingClientRect().y
              } : undefined
            }}>        */}

            {/* 타이틀 */}
            <h5 className='absolute bottom-5 right-5 z-20'>{strings.exampleTitle}</h5>

            {/* 구글 지도 */}
            <div className='w-full h-full border-4 border-blue-500'>
              <GoogleMap
                onGoogleApiLoaded={
                  (maps: { map: google.maps.Map, maps: any }) => {
                    console.log(`GoogleMap: onGoogleApiLoaded`);
                    setMap(maps.map)
                  }
                }
                {...PROPS_TEST_SCHEDULE_PAGE}
              >
                {/* 출발 장소 Marker */}
                <GoogleMapComponentWrapper {...strings.startPosition} className='z-10'>
                  <MapMarker label="공항" icon="flight" />
                </GoogleMapComponentWrapper>

                {/* 활성화된 응답에 대응되는 장소 Marker 와 출발 장소로부터의 Path */}
                {
                  strings.examples.map((places: any[], index: number) => (
                    places.map((place: any) => {

                      /* 결과 Marker */
                      const MapMarkerWithShowOnResponse = withShowOnResponse(() => /* MapMarker with HOC withShowOnResponse: show componenet according to 1.hovering & 2.testResponse context. */
                        <WithAnimationWrapper>
                          <MapMarker {...place as MapMarkerProps} className='z-10' />
                        </WithAnimationWrapper>
                      )({ id: index, testIndex, compareFunc: (id: FocusType, contextId: FocusType) => (id <= contextId) });

                      /* 결과 Path */
                      const MapPathWithActiveOnResponse = withActiveOnResponse(MapPath)
                        ({ id: index, testIndex, compareFunc: (id: FocusType, contextId: FocusType) => (id <= contextId) })

                      return (
                        <GoogleMapComponentWrapper {...place.position} className='z-10'>
                          <MapMarkerWithShowOnResponse />
                          {/* 결과 Path */}
                          <MapPathWithActiveOnResponse map={map} start={strings.startPosition} end={place.position} />
                        </GoogleMapComponentWrapper>
                      );
                    })
                  ))
                }
                {/* 결과 Path */}
                {/* <GoogleMapComponentWrapper className='z-10 border-4 border-blue-500'> */}
                {/* <motion.svg className="absolute -translate-x-1/2 -translate-y-1/2  w-full h-full" initial="hidden" animate="visible" ref={mapDivRef}> */}
                {/* {(positions as Coords[][]).map((positionList: Coords[], index: number) => { */}
                {/* console.log(`x: ${mapDivRef.current?.getBoundingClientRect().x}, y: ${mapDivRef.current?.getBoundingClientRect().y} `);  */}

                {/* MapPath with HOC withShowOnResponse: show componenet according to 1.hovering & 2.testResponse context. */}
                {/* const MapPathWithShowOnResponse = withShowOnResponse(() => 
                          positionList.map((position: Coords, subindex) => (
                            (mapDivRef.current)
                            && <MapPath
                              index={index}
                              id={`${index},${subindex}`}
                              start={{ x: startPosition.x - mapDivRef.current.getBoundingClientRect().x, y: startPosition.y - mapDivRef.current.getBoundingClientRect().y }}
                              end={{ x: position.x - mapDivRef.current.getBoundingClientRect().x, y: position.y - mapDivRef.current.getBoundingClientRect().y, }}
                            />
                          ))
                        )({ id: index, testName: testName, compareFunc: (id: FocusType, contextId: FocusType) => (id <= contextId) });

                        return ( <MapPathWithShowOnResponse/>
                          positionList.map((position: Coords, subindex) => {
                            const MapPathWithShowOnResponse = withShowOnResponse(() => /* MapPath with HOC withShowOnResponse: show componenet according to 1.hovering & 2.testResponse context. */
                  //         (mapDivRef.current)
                  //         && <MapPath
                  //           index={index}
                  //           id={`${index},${subindex}`}
                  //           start={{ x: startPosition.x - mapDivRef.current.getBoundingClientRect().x, y: startPosition.y - mapDivRef.current.getBoundingClientRect().y }}
                  //           end={{ x: position.x - mapDivRef.current.getBoundingClientRect().x, y: position.y - mapDivRef.current.getBoundingClientRect().y, }}
                  //         />
                  //       )({ id: index, testName: testName, compareFunc: (id: FocusType, contextId: FocusType) => (id <= contextId) });

                  //       return (<MapPathWithShowOnResponse />);
                  //     })
                  //     <MapPathWithShowOnResponse/>
                  //   )
                  // })}
                }
                {/* </motion.svg>
                  </GoogleMapComponentWrapper>
              {/* <div className=''> */}
                {/* { ! positions.some((list)=>list.some((position) => position===undefined)) &&
              <MapPathSvg positions={positions}/> } */}

              </GoogleMap>
            </div>
            {/* </MarkerPositionContextProvider> */}
          </div>
      </div>
        </FocusContextProvider>

    </div>
  );
}

export default TestSchedulePage;

  /* For Debug */
  // const random = (min: number, max: number) => Math.random() * (max - min) + min;
  // const randomPoint = (min: Coords, max: Coords) => ({lat: random(min.lat, max.lat), lng: random(min.lng, max.lng)});
  // const min = {lat: 24.993544, lng: 121.406567};
  // const max = {lat: 25.092974, lng: 121.616632};
  // const examples = [[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]]; 
  // const [startPosition, setStartPosition] = useState<Position>({x:0, y:0});
  // const [positions, setPositions] = useState<MarkerPositionList>(strings.examples.map((list: any)=>(list.map(()=>undefined))));
  // const mapDivRef = useRef<HTMLDivElement>(null);

  /* Deprecated: Report Map Component Coordss to explicitly create paths */
  // const setPositionsByRef = useCallback((index: number, subIndex: number) => (ref: RefObject<HTMLDivElement>)=>{
  //   setPositions(prev => {
  //     if (ref.current) {
  //       prev[index][subIndex]={
  //         x: ref.current.offsetLeft,
  //         y: ref.current.offsetTop,
  //       };
  //     }
  //     return prev;
  //   });}, []);

  // const setStartPositionByRef = useCallback((ref: RefObject<HTMLDivElement>)=>{
  //   if(ref.current){
  //     console.log(`TestSchedulePage: setStartPositionByRef: ref.current=${ref.current}`);
  //     setStartPosition({
  //       x: ref.current.getBoundingClientRect().x,
  //       y: ref.current.getBoundingClientRect().y,
  //     });
  //   } 
  //   }, []);

// const ResponseButton = withHover(({handleClickResponse, children}:PropsWithChildren<{handleClickResponse: ()=>void}>)=>{
//   return(
//     <h3>
//     <Button onClick={handleClickResponse}
//       className='
//       font-light transition duration-300 ease-out origin-left
//       hover:font-bold hover:scale-125 
//       focus:font-bold focus:scale-125 focus:underline
//     '>                
//         {children}                
//     </Button>
//     </h3>
//   )
// })