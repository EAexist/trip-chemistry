import { PropsWithChildren } from 'react';
import { Card as MuiCard, ButtonBase, Paper, SxProps, Theme } from '@mui/material'

interface CardProps{
    className?:string;
    sx?:SxProps<Theme> | undefined;
    onMouseEnter?: ()=>void;
    onMouseLeave?: ()=>void;
};

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

function Card({className, children, ...props}: PropsWithChildren<CardProps>){

    return(
        <Paper className = {className? className : 'w-fit h-fit flex flex-col flex-none no-margin'} {...props}>
            {children}
        </Paper>
    );  
}

export default Card;
export { ClickableCard };
export type { CardProps };