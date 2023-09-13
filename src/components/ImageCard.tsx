import { Card, CardHeader, CardMedia, Avatar } from '@mui/material';
import React, { PropsWithChildren, createContext, useContext, useState } from 'react';

interface selectedItemContextProps {
  selectedItemId: number,
  setSelectedItemId: (id: number)=>void, 
  isHoveringContainer: boolean, 
  // setisHoveringContainer: (isHovering: boolean) => void,
};

const SelectedItemContext = createContext<selectedItemContextProps>({
  selectedItemId: 0, 
  setSelectedItemId: ()=>{},
  isHoveringContainer: false,
  // setisHoveringContainer: ()=>{},
});

interface CardCarouselContainerProps{
  selectedItemId: number, 
  setSelectedItemId: (id: number) => void,
  direction?: 'row' | 'column'
};

function CardCarouselContainer({ selectedItemId, setSelectedItemId, direction = 'row', children }: PropsWithChildren<CardCarouselContainerProps>){

  const [isHovering, setIsHovering] = useState(false);

  return(
    <SelectedItemContext.Provider value = {{
      selectedItemId: selectedItemId,
      setSelectedItemId: setSelectedItemId,
      isHoveringContainer: isHovering
    }}>
    {/* <Stack spacing={2} direction={direction}> */}
    <div 
      className={`flex flex-${direction} items-stretch space-x-2`} 
      onMouseEnter={()=>setIsHovering(true)} 
      onMouseLeave={()=>setIsHovering(false)}
    >
      {children}
    </div>
    {/* </Stack> */}
    </SelectedItemContext.Provider>
  )
}

interface CardCarouselItemProps{
  id: number;
  onHoverElement?: React.ReactNode;
}

function CardCarouselItem({ id, onHoverElement, children }: PropsWithChildren<CardCarouselItemProps>){
    
  const { selectedItemId, setSelectedItemId, isHoveringContainer } = useContext(SelectedItemContext); 
  const isSelected = selectedItemId === id;
  const [isHovering, setIsHovering] = useState(false)  
  const handleClick = () => {
    console.log('CardCarouselItem handleClick')
    setSelectedItemId(id);
  }

  return(
    <div 
      className={`
        flex basis-8/12 shrink-1 duration-500 opacity-50
        ${isSelected && !isHoveringContainer && 'shrink-0 opacity-100'}         
        hover:shrink-0 hover:opacity-100
        `} 
      onClick={handleClick}
      onMouseEnter={()=>setIsHovering(true)} 
      onMouseLeave={()=>setIsHovering(false)}
    >
      <Card className={`w-full relative
      ${isSelected && 'border-4 border-slate-500'}`}>
        {children}
        {isSelected ?
        (!isHoveringContainer || isHovering) && onHoverElement
        : isHovering && onHoverElement}
      </Card>
    </div>    
  );
}

interface ImageCardProps{
  cardHeaderAvatarText: string;
  cardHeaderTitle: string;
  cardMediaProps: {
    image: string
    alt: string
    sx?: {
      height: number
    }
    // component = 'img'
    // height: nubmer
  };
};

function ImageCard({ cardHeaderAvatarText, cardHeaderTitle, cardMediaProps, }:ImageCardProps){    

  return(
    <div 
      className = 'w-full'
    >
      {/* <div className = 'relative h-128'> */}
        <CardMedia className = 'sticky z-0 w-full' component = 'img' sx={{ height: 384 }} {...cardMediaProps}/>
    
      {/* </div> */}
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
export { CardCarouselContainer, CardCarouselItem };
