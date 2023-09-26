import { useState, useEffect, cloneElement, isValidElement, Children } from 'react' 
import { Card as MuiCard, CardContent, CardMedia, Chip, ButtonBase } from '@mui/material'
import { PropsWithChildren, ReactNode, ElementType, ReactElement } from 'react';

interface CardProps{
    onClick?: ()=>void;
    title?: string | ReactElement;
    body?: string | ReactElement;
    tags?: string[];
    replaceCardMedia? : ReactNode;
    cardMediaComponent? : ElementType;
    image?: string;    
    imageTitle?: string;
    useSkeleton?: boolean;
    className?:string;
};

function ClickableCard({onClick = ()=>{}, children, ...CardProps}: PropsWithChildren<CardProps>){
    return(
        <ButtonBase onClick={onClick}>
            <Card {...CardProps}>{children}</Card>
        </ButtonBase>           
    )
}

function WithAnim({key, animName='fadeIn', children}:PropsWithChildren<{animName?: string, key: string}>){

    const [anim, setAnim] = useState(animName); 

    useEffect(()=>{
        return () => {

        }
    }, [])

    return (
        <div key={key} className={`${anim} w-full h-full`}>
            {/* {Children?.map(children, (child) => {
                if (isValidElement(child)) {
                    return (
                        <>
                            {cloneElement(child as JSX.Element)}
                        </>
                    );
                }
            })} */}
            {children}
        </div>
    );
}

function Card({cardMediaComponent = 'img', replaceCardMedia, className, children, ...props}: PropsWithChildren<CardProps>){
    // if(props.useSkeleton){
    //     Object.keys(props).forEach((key, index) => {
    //         props[key]
    //     })
    // }

    return(
        <div>
            <MuiCard className= {className? className : 'w-fit h-fit flex flex-col flex-none no-margin'}>
                {/* <div className='h-full flex items-center justify-center'>
                {replaceCardMedia ?
                    replaceCardMedia :
                    <CardMedia
                        component={cardMediaComponent}                
                        // sx={{ height:140 }}
                        image={props.image}
                        title={props.imageTitle}
                    />
                }
                </div> */}
                {children}
                {/* <CardContent className=''>
                    <h3>
                        {props.title}
                    </h3>
                    <p>
                        {props.body}
                    </p>
                    <div className='flex flex-wrap mx-2'>
                        {props.tags?.map((tag)=>{
                            return(
                                <Chip label={tag} />
                            )
                        })}
                    </div>
                </CardContent> */}
            </MuiCard>
        </div>
    );  
}

export default Card;
export { ClickableCard, WithAnim };
export type { CardProps };