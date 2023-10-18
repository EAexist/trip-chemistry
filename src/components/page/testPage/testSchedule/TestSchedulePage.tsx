import {useState, useRef, RefObject, useCallback, useEffect, } from 'react';
import { IsHoveringContextProvider, IsHoveringType, WithHoverWrapper, withShowOnResponse, useShowOnResponse, withActiveOnResponse } from '../../../../common/isHovering/IsHoveringContext';

import TestContainer from '../../../TestContainer';
import { Coords } from '../../../googleMap/common/types';
import withTestResponse, { WithTestResponseProps } from '../../../../common/hocs/withTestResponse';
import ToggleButton from '../../../ToggleButton';
import { Icon } from '@mui/material';
import GoogleMapComponentWrapper, { withOnGoogleMap, withOnGoogleMapProps } from '../../../googleMap/common/GoogleMapComponentWrapper';
import { WithAnimationWrapper } from '../../../../common/hocs/withAnimation';

/* Google Map */
import GoogleMap from '../../../googleMap/ui/GoogleMap';
import MapMarker, { MapMarkerProps } from '../../../googleMap/ui/MapMarker';
import MapPath from '../../../googleMap/ui/MapPath';
import { PROPS_TEST_SCHEDULE_PAGE } from '../../../googleMap/common/options';
import { TestResponse } from '../../../../common/reducer/testResponseReducer';
import { withShowByIndex } from '../../../../legacy/ShowContext';
interface TestSchedulePageProps extends WithTestResponseProps{}; 

function TestSchedulePage({testName, testResponse, setTestResponse, strings}: TestSchedulePageProps){

  const [isHovering, setIsHovering] = useState<IsHoveringType>(-1);
  // const [activeResponse, setActiveResponse] = useState<number>(2);
  const [map, setMap] = useState<google.maps.Map>();

  const handleClick = (index: IsHoveringType)=>{
    setTestResponse && setTestResponse(index as number);
  }  

  // const examples = strings.examples.map((places: any[], index: number) => (

  // ));
  const markers = strings.examples.map((places: any[], index: number) => (
    places.map((place, subIndex) => {

      // console.log(`index= ${index}, activeResponse = ${activeResponse}`);

      // const MapMarkerOnGoogleMap = withOnGoogleMap((props: withOnGoogleMapProps)=>{
      //   return(
      //     <WithAnimationWrapper>
      //       <MapMarker {...place as MapMarkerProps} className='z-10' />
      //     </WithAnimationWrapper>   
      //   )
      // }                     
      // )({...place.position});

      // return (                  
        // true &&
        // (index === activeResponse) && 
        /* 결과 마커 */
        // <MapMarkerOnGoogleMap/>

        /* 결과 Path */
            // <MapPath
            //   isActive={index <= activeResponse}
            //   index={index}
            //   start={strings.startPosition}
            //   end={place.position}
            // />
            // <>
          const C = withShowByIndex(()=>
              <WithAnimationWrapper>
                <MapMarker {...place as MapMarkerProps} className='z-10' />
              </WithAnimationWrapper>
          )({compareFunc: (id: IsHoveringType, contextId: IsHoveringType) => (id <= contextId)})

          return(
            <GoogleMapComponentWrapper {...place.position} className='z-10'>
              {/* <C index={index} contextIndex={activeResponse}/> */}
            </GoogleMapComponentWrapper>
            )

          /* HIIIII
          </> */
          /* <MapPathWithShowOnResponse index={index} start={strings.startPosition} end={place.position}/> */
      
    }
  )))

  return(
    /* 페이지 */
    <div 
      className='w-full h-full pl-16 flex flex-row
        max-md:flex-col'
    > 
        <IsHoveringContextProvider value={{ isHovering: isHovering, setIsHovering: setIsHovering }}>

          {/* 테스트 제목 및 내용 레이아웃 */}
          <div className='w-128'>            
          <TestContainer 
            title = {strings.title} 
            subtitle = {strings.subtitle}
          >    
            {/* <WithHoverWrapper listenOnly='leave'> */}
              <div 
                
                className={`flex flex-col items-start justify-center min-w-fit pr-20
                max-md:flex-row max-md:pr-0 max-md:whitespace-nowrap`}
              >
                {strings.answers.map(({label, value}: {label: string, value: number}, index: number) => (                    
                  <WithHoverWrapper id={index}>
                    <h3>
                    <ToggleButton 
                      isActive={testResponse === index} 
                      onClick={() => handleClick(value)} 
                      // onMouseEnter={()=>setActiveResponse(index)}
                      className='
                        py-2
                        hover:font-bold hover:opacity-100'
                    >
                      {label}
                    </ToggleButton>                    
                    </h3>
                  </WithHoverWrapper>                  
                ))}
              </div>
              <h6>{strings.credit}</h6>
            {/* </WithHoverWrapper>   */}
          </TestContainer>
          </div>

          {/* 결과 */}
          <div className='w-full h-full relative'>
            {/* <MarkerPositionContextProvider value={{positions: positions, setPositions: setPositions, 
              refPosition: mapDivRef.current? {
                x:  mapDivRef.current.getBoundingClientRect().x, 
                y: mapDivRef.current.getBoundingClientRect().y
              } : undefined
            }}>        */}

              {/* 타이틀 */}
              <h5 className='absolute bottom-5 right-5 z-20'>{strings.exampleTitle}</h5>

              {/* 구글 지도 */}
              <div className='w-full h-full absolute border-4 border-blue-500'>
                <GoogleMap                    
                  onGoogleApiLoaded={
                    (maps: {map: google.maps.Map, maps: any}) => {
                        console.log(`GoogleMap: onGoogleApiLoaded`);
                        setMap(maps.map)
                    }
                  }
                  {...PROPS_TEST_SCHEDULE_PAGE}
                >                                    
                  {/* 출발 장소 Marker */}                  
                  <GoogleMapComponentWrapper {...strings.startPosition} className='z-10'>
                    <MapMarker label="공항" icon="flight"/>
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
                      )({ id: index, testName: testName, compareFunc: (id: IsHoveringType, contextId: IsHoveringType) => (id <= contextId) });
                      
                      /* 결과 Path */
                      const MapPathWithActiveOnResponse = withActiveOnResponse(MapPath)
                      ({ id: index, testName: testName, compareFunc: (id: IsHoveringType, contextId: IsHoveringType) => (id <= contextId) })
                      
                      return(
                        <GoogleMapComponentWrapper {...place.position} className='z-10'>                          
                          <MapMarkerWithShowOnResponse />
                          {/* 결과 Path */}
                          <MapPathWithActiveOnResponse map={map} start={strings.startPosition} end={place.position}/>
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
                        )({ id: index, testName: testName, compareFunc: (id: IsHoveringType, contextId: IsHoveringType) => (id <= contextId) });

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
                      //       )({ id: index, testName: testName, compareFunc: (id: IsHoveringType, contextId: IsHoveringType) => (id <= contextId) });

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
        </IsHoveringContextProvider>
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

// const ResponseButton = withHover(({handleClick, children}:PropsWithChildren<{handleClick: ()=>void}>)=>{
//   return(
//     <h3>
//     <Button onClick={handleClick}
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