import { Card as MuiCard, CardContent, CardMedia, Chip, ButtonBase } from '@mui/material'
import { ElementType } from '@react-spring/web';

interface CardProps{
    onClick?: ()=>void;
    title: String | React.ReactElement;
    body: String | React.ReactElement;
    tags: String[];
    replaceCardMedia? : React.ReactNode;
    cardMediaComponent? : ElementType;
    image?: String;    
    imageTitle?: String;
    useSkeleton?: boolean;
};

function ClickableCard({onClick = ()=>{}, ...CardProps}: CardProps){
    return(
        <ButtonBase onClick={onClick}>
            <Card {...CardProps}></Card>
        </ButtonBase>           
    )
}

function Card({cardMediaComponent = 'img', ...props}: CardProps){
    // if(props.useSkeleton){
    //     Object.keys(props).forEach((key, index) => {
    //         props[key]
    //     })
    // }

    return(
        
            <MuiCard className='w-80 h-96 flex flex-col flex-none'>
                <div className='h-full flex items-center justify-center'>
                {props.replaceCardMedia ?
                    props.replaceCardMedia :
                    <CardMedia
                    component={cardMediaComponent}                
                    // sx={{ height:140 }}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="green iguana"
                    />
                }
                </div>
                <CardContent className=''>
                    <h2>
                        {props.title}
                    </h2>
                    <p>
                        {props.body}
                    </p>
                    <div className='flex flex-wrap'>
                        {props.tags.map((tag)=>{
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