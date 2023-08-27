import { Card, CardHeader, CardMedia, Avatar, Stack } from '@mui/material';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

const ActiveCardContext = createContext(0);

interface CardCarouselContainerProps{
  direction?: 'row' | 'column'
};

function CardCarouselContainer({ direction = 'row', children }: PropsWithChildren<CardCarouselContainerProps>){

  return(
    <ActiveCardContext.Provider value = {0}>
    {/* <Stack spacing={2} direction={direction}> */}
    <div className='flex equal-columns space-x-2 justify-between w-full'>
        {children}
    </div>
    {/* </Stack> */}
    </ActiveCardContext.Provider>
  )
}

interface CardCarouselItemProps{
  id: number
}

function CardCarouselItem({ id, children }: PropsWithChildren<CardCarouselItemProps>){
    
  const activeCardId = useContext(ActiveCardContext); 
  const isActive = activeCardId === id;

  return(
    <div className=''>
      {isActive ?
      <div className='card-carousel-item-active'>{children}</div> 
      : <div className='card-carousel-item-active'>{children}</div>
      } 
    </div>    
  );
}

interface CardItemProps{
  cardHeaderAvatarText: string
  cardHeaderTitle: string
  cardMediaProps: {
    image: string
    alt: string
    sx?: {
      height: number
    }
    // component = 'img'
    // height: nubmer
  }
};

function ImageCard({ cardHeaderAvatarText, cardHeaderTitle, cardMediaProps }:CardItemProps){
    
  const activeCardContext = useContext(ActiveCardContext); 

  return(
    <Card>
      <CardMedia component = 'img' sx={{ height: 512 }} {...cardMediaProps}/>
      <CardHeader
        avatar={
          <Avatar>
            {cardHeaderAvatarText}
          </Avatar>
        }
        title={cardHeaderTitle}
      />
    </Card>        
  );
}

// "/static/images/test/leadership/lead.jpg"
export default ImageCard;
export { CardCarouselContainer, CardCarouselItem };
