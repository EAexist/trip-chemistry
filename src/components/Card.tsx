import { PropsWithChildren } from 'react';
import { ButtonBase, Paper, SxProps, Theme , Skeleton } from '@mui/material'
import LazyImage from "./LazyImage";
import { FocusDetail, FocusType } from '../common/focus/FocusContext';


interface ImageProps {
    image: string; 
    alt: string;
    className?: string
};

interface CardProps{
    className?:string;
    sx?:SxProps<Theme> | undefined;
    onMouseEnter?: ()=>void;
    onMouseLeave?: ()=>void;
};

function Card({className, children, ...props}: PropsWithChildren<CardProps>){

    return(
        <Paper className = {className? className : 'w-fit h-fit flex flex-col flex-none no-margin'} {...props}>
            {children}
        </Paper>
    );  
}

interface ClickableCardProps extends CardProps{
    onClick?: ()=>void;
};

function ClickableCard({onClick = ()=>{}, children, ...CardProps}: PropsWithChildren<ClickableCardProps>){
    return(
        <ButtonBase onClick={onClick}>
            <Card {...CardProps}>{children}</Card>
        </ButtonBase>           
    )
}

function CardImage({ image, alt, className, children }: PropsWithChildren<ImageProps>){

    return(
        <div className='
            w-full h-40 relative
            max-md:w-full'
        >
            <LazyImage src={image} alt={alt} className={`absolute w-full h-full ${className ? className : 'object-cover'}`}>
                <Skeleton variant="rectangular" width={'100%'} height={'100%'}/>
            </LazyImage>
            {/* <img className='absolute object-cover w-full h-full' src={image} alt={alt} loading='lazy'/> */}
            <div className='absolute w-full h-full'>
                {children}
            </div>
        </div>
    )
}

interface CardDetailProps{
    id?: FocusType
};

function CardDetail({ id = true, children }: PropsWithChildren<CardDetailProps>){
    
    return(
        <FocusDetail>
            {children}            
        </FocusDetail>
    )
}

export default Card;
export { Card, CardImage, CardDetail, ClickableCard };
export type { CardProps };