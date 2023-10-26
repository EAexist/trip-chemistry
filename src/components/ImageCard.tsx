import { withHoverProps } from "../common/focus/FocusContext";
import { PropsWithChildren, useState } from "react";
import Card from "./Card";
import { Box, Skeleton, Zoom } from "@mui/material";
import LazyImage from "./LazyImage";

interface CardProps {
    image: string; 
    alt: string;
    label?: string;
};

/* 이미지와 텍스트를 포함한 카드. 마우스를 올리면 확대되며 추가적인 디테일(children componenet) 를 보여줌.*/
function ImageCard({ image, alt, label="", children }: PropsWithChildren<CardProps>){

    const [ focus, setIsFocused ] = useState<boolean>(false);
    // const delay = 0;

    // const handleMouseEnter = () => {let timer = setTimeout(()=>{setIsFocused(true);}, delay)}
    const handleMouseEnter = () => {setIsFocused(true);}
    const handleMouseLeave = () => {setIsFocused(false);}

    return(
        <div className='relative w-64 h-40 flex items-center justify-center'>
            <div
                className={`absolute  
                    transition-size duration-500 ease-out
                    ${focus ? 'w-72 h-64 z-10' : 'w-64 h-40 z-0'} max-md:hover:h-72`
                }
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Card className='w-full h-fit flex flex-col' 
                >
                    <div className='
                        w-full h-40 relative
                        max-md:w-full'
                    >
                        <LazyImage src={image} alt={alt} className='absolute object-cover w-full h-full'>
                            <Skeleton variant="rectangular" width={'100%'} height={'100%'}/>
                        </LazyImage>
                        {/* <img className='absolute object-cover w-full h-full' src={image} alt={alt} loading='lazy'/> */}
                        <h4 className='absolute bottom-2 left-2 font-bold text-white'>{label}</h4>
                    </div>
                    {focus &&
                        <div>{children}</div>}
                </Card>
            </div>
        </div>
    );
};

export default ImageCard;