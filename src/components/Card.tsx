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

interface CardImageProps extends ImageProps{
    size?: 'sm' | 'md' | 'lg'
};

function CardImage({ image, alt, className, size='md', children }: PropsWithChildren<CardImageProps>){

    return(
        <div className={`
            w-full ${size === 'sm' ? 'h-16' : size === 'md' ? 'h-24' : 'h-40' } relative
            max-md:w-full`}
        >
            <div className='absolute w-full h-full'>
                <LazyImage src={image} alt={alt} className={`absolute w-full h-full ${className ? className : 'object-cover'}`}>
                    <Skeleton variant="rectangular" width={'100%'} height={'100%'}/>
                </LazyImage>
            </div>
            {/* <img className='absolute object-cover w-full h-full' src={image} alt={alt} loading='lazy'/> */}
            <div className='absolute w-full h-full border-blue-500 border-2'>
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
            <div className='animate-expand'>
            {children}  
            </div>          
        </FocusDetail>
    )
}

export default Card;
export { Card, CardImage, CardDetail };
export type { CardProps };