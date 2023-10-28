import { PropsWithChildren } from 'react';
import { ButtonBase, Paper, SxProps, Theme , Skeleton } from '@mui/material'
import LazyImage from "./LazyImage";
import { FocusDetail, FocusType } from '../common/focus/FocusContext';

interface ImageProps {
    image: string; 
    alt: string;
    className?: string
};

interface CardProps {
    className?: string;
    onClick?: () => void;
    sx?:SxProps<Theme> | undefined;
    onMouseEnter?: ()=>void;
    onMouseLeave?: ()=>void;
};

function Card({className, children, onClick, ...props}: PropsWithChildren<CardProps>){

    return(
        <ButtonBase onClick={onClick}>
            <Paper className = {className? className : 'w-fit h-fit flex flex-col flex-none no-margin'} {...props}>
                {children}
            </Paper>
        </ButtonBase>
    );  
}

interface CardImageProps extends ImageProps{
    size?: 'sm' | 'md'
};

function CardImage({ image, alt, className, size='md', children }: PropsWithChildren<CardImageProps>){

    return(
        <div className={`
            w-full ${size === 'sm' ? 'h-16' : 'md' ? 'h-24' : 'h-48' } relative
            max-md:w-full`}
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
export { Card, CardImage, CardDetail };
export type { CardProps };