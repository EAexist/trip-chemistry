import { PropsWithChildren} from 'react';
import { ButtonBase, Button as MuiButton } from "@mui/material";

interface ButtonProps{
    onClick?: ()=>void;
    disabled?: boolean;
    // className?: String,
}

function Button( {children, ...buttonProps} : PropsWithChildren<ButtonProps>){
    return(
        <MuiButton {...buttonProps}>
            {children}
        </MuiButton>
    )
}

export default Button;