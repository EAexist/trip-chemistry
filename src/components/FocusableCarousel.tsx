import { Card, CardHeader, CardMedia, Avatar } from '@mui/material';
import React, { PropsWithChildren, createContext, useContext, useState } from 'react';
import { IsHoveringContextProvider, IsHoveringType, useIsHoveringContext, withHover,  withShowOnHover } from '../common/isHovering/IsHoveringContext';
import { WithAnimationProps, WithAnimationWrapper } from '../common/hocs/withAnimation';
import { TestName, useTestResponse } from '../common/reducer/testResponseReducer';

interface selectedItemContextProps {
  selectedItemId: number,
  setSelectedItemId: (id: number)=>void, 
  // isHoveringContainer: boolean,
  // hoveringItemId: IsHoveringType, 
  // setHoveringItemId: (isHovering: IsHoveringType) => void,
};

const SelectedItemContext = createContext<selectedItemContextProps>({
  selectedItemId: 0, 
  setSelectedItemId: ()=>{}, 
  // isHoveringContainer: false,
  // hoveringItemId: false,
  // setHoveringItemId: ()=>{},
});

/* FocusableCarouselContainer: 컨테이너. 
  Focus 된 아이템이 확대되고 디테일이 표시됨. Focus 되는 아이템의 기준은 다음과 같음.
  1. 마우스를 호버하는 아이템. 
  2. 어느 아이템에도 마우스를 호버하지 않은 경우에는 가장 마지막에 마우스 클릭을 통해 선택해둔 아이템. */
interface FocusableCarouselContainerProps{
  selectedItemId: number, 
  setSelectedItemId: (id: number) => void,
  direction?: 'row' | 'col'
};
function FocusableCarouselContainer({ selectedItemId, setSelectedItemId, direction = 'row', children }: PropsWithChildren<FocusableCarouselContainerProps>){

  const [isHovering, setIsHovering] = useState<IsHoveringType>(false);

  return(
    <SelectedItemContext.Provider value = {{
      selectedItemId: selectedItemId,
      setSelectedItemId: setSelectedItemId, 
      // isHoveringContainer: isHoveringContainer,
      // hoveringItemId: false,
      // setHoveringItemId: ()=>{},
    }}>        
    <IsHoveringContextProvider value={{isHovering: isHovering, setIsHovering: setIsHovering}}>
      <div 
        className={`h-full flex flex-${direction} space-x-2
          max-md:flex-col max-md:space-x-0 max-md:space-y-2
        `}
      >
          {children}
      </div>
    </IsHoveringContextProvider>
    </SelectedItemContext.Provider>
  )
}

/* FocusableCarouselItem: 캐러샐의 각 아이템 컴포넌트의 wrapper */
interface FocusableCarouselItemProps{
  id: number; /* Carousel 에서 아이템을 특정하는 id */
};
function FocusableCarouselItem({ id, children }: PropsWithChildren<FocusableCarouselItemProps>){
    
  const { selectedItemId, setSelectedItemId } = useContext(SelectedItemContext); 
  const { isHovering, setIsHovering } = useIsHoveringContext();   
  const isSelected = selectedItemId === id;
  const handleClick = () => {
    setSelectedItemId(id);
    setIsHovering(false);
  }

  return(
    withHover(({onMouseEnter, onMouseLeave}) => ( /* 마우스 호버 Listener */
      <div
        className={`
        duration-300 hover:shrink-0 hover:opacity-100
        basis-7/12
        max-md:basis-6/12
        ${isSelected && 'border-4 border-slate-500'} 
        ${isSelected && (isHovering === false) ? 'shrink-0 opacity-100' : 'shrink-1 opacity-50'}        
        `}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </div>
    ))({id: id, isDisabled: isSelected})({})
  );
}

/* FocusableCarouselDetail: 아이템이 Focus 되었을 때에만 렌더링되는 디테일 컴포넌트의 wrapper */
interface FocusableCarouselDetailProps{
  id: number; /* Carousel 에서 아이템을 특정하는 id */
  withAnimationProps?: WithAnimationProps; /* hover로 디테일이 렌더링 될 때 애니메이션을 실행하기 위한 WithAnimationWrapper 의 props */
};
function FocusableCarouselDetail({ id, withAnimationProps, children }: PropsWithChildren<FocusableCarouselDetailProps>){
  const { selectedItemId } = useContext(SelectedItemContext); 
  const { isHovering } = useIsHoveringContext();   
  const isSelected = selectedItemId === id;

  return(
    // <>
    //   {
        isSelected && (isHovering === false) ?
        children
        : withShowOnHover(() => ( /* 마우스를 올렸을 때 보이는 Element */
            <WithAnimationWrapper {...withAnimationProps}>{children}</WithAnimationWrapper>
          ))({id: id})({})
    //   }
    // </>
  )
}
interface TestResponseDetailProps{
  id: number; /* Carousel 에서 아이템을 특정하는 id */
  testName: TestName;
  compareFunc?: (id:IsHoveringType, contextId:IsHoveringType)=>boolean;
  withAnimationProps?: WithAnimationProps; /* hover로 디테일이 렌더링 될 때 애니메이션을 실행하기 위한 WithAnimationWrapper 의 props */
};
function TestResponseDetailWrapper({ id, testName, withAnimationProps, compareFunc = (id:IsHoveringType, contextId:IsHoveringType)=>(id === contextId), children }: PropsWithChildren<TestResponseDetailProps>){
  // const { isHovering } = useIsHoveringContext();   
  // const testResponse = useTestResponse(testName);
  // const isActive = compareFunc(id, testResponse as IsHoveringType);

  return(
      // isActive && (isHovering === -1) ?
      //   children
      //   : 
          withShowOnHover(() => ( /* 마우스를 올렸을 때 보이는 Element */
            children
          ))({id: id, compareFunc: compareFunc})({})
  )
}

// const withTestResponseDetail({ id, testName, withAnimationProps, compareFunc = (id:IsHoveringType, contextId:IsHoveringType)=>(id === contextId), children }: PropsWithChildren<TestResponseDetailProps>){
//   const { isHovering } = useIsHoveringContext();   
//   const testResponse = useTestResponse(testName);
//   const isActive = compareFunc(id, testResponse as IsHoveringType);

//   return(
//       isActive && (isHovering === -1) ?
//         children
//         : withShowOnHover(() => ( /* 마우스를 올렸을 때 보이는 Element */
//             children
//           ))({id: id, compareFunc: compareFunc})({})
//   )
// }

interface ImageCardProps{
  cardHeaderAvatarText: string;
  cardHeaderTitle: string;
  cardMediaProps: {
    image: string
    alt: string
    sx?: {
      height: number
    }
  };
};
function ImageCard({ cardHeaderAvatarText, cardHeaderTitle, cardMediaProps, }:ImageCardProps){    

  return(
    <div className = 'w-full'>
        <CardMedia className = 'sticky z-0 w-full' component = 'img' sx={{ height: "10%" }} {...cardMediaProps}/>
    
      <CardHeader
        avatar={
          <Avatar>
            {cardHeaderAvatarText}
          </Avatar>
        }
        title={cardHeaderTitle}
      />
    </div>    
  );
} 

// "/static/images/test/leadership/lead.jpg"
export default ImageCard;
export { FocusableCarouselContainer, FocusableCarouselItem, FocusableCarouselDetail, TestResponseDetailWrapper };
