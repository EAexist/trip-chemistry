import { Card as MuiCard, CardContent, CardMedia, Chip, ButtonBase } from '@mui/material'
import { ElementType } from '@react-spring/web';

interface CardProps{
    onClick?: ()=>void;
    title: string | React.ReactElement;
    body: string | React.ReactElement;
    tags: string[];
    replaceCardMedia? : React.ReactNode;
    cardMediaComponent? : ElementType;
    image?: string;    
    imageTitle?: string;
    useSkeleton?: boolean;
};

function ClickableCard({onClick = ()=>{}, ...CardProps}: CardProps){
    return(
        <ButtonBase onClick={onClick}>
            <Card {...CardProps}></Card>
        </ButtonBase>           
    )
}

function Card({cardMediaComponent = 'img', replaceCardMedia, ...props}: CardProps){
    // if(props.useSkeleton){
    //     Object.keys(props).forEach((key, index) => {
    //         props[key]
    //     })
    // }

    return(
        
            <MuiCard className='w-80 h-96 flex flex-col flex-none no-margin'>
                <div className='h-full flex items-center justify-center'>
                {replaceCardMedia ?
                    replaceCardMedia :
                    <CardMedia
                        component={cardMediaComponent}                
                        // sx={{ height:140 }}
                        image={props.image}
                        title={props.imageTitle}
                    />
                }
                </div>
                <CardContent className=''>
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
                </CardContent>
            </MuiCard>
    );  
}

export default Card;
export { ClickableCard };
export type { CardProps };