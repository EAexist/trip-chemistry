import { PropsWithChildren } from 'react';
import { Card as MuiCard, ButtonBase, Paper, SxProps, Theme } from '@mui/material'

interface CardProps{
    className?:string;
    sx?:SxProps<Theme> | undefined;
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

function Card({className, sx, children}: PropsWithChildren<CardProps>){

    return(
        <Paper className = {className? className : 'w-fit h-fit flex flex-col flex-none no-margin'} sx = {sx}>
            {children}
        </Paper>
    );  
}

export default Card;
export { ClickableCard };
export type { CardProps };