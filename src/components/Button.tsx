import { PropsWithChildren} from 'react';
import { ButtonBase, Button as MuiButton } from "@mui/material";

interface ButtonProps{
    isActive?: boolean,
    disabled?: boolean;
    variant?: "text" | "contained" | "outlined";
    onClick?: ()=>void;
    state?: 'hovered' | 'active' | undefined
    className?: string;
    classNameHovered? : string,
    classNameActive? : string,
}

function Button({state, classNameHovered, classNameActive, children, ...buttonProps} : PropsWithChildren<ButtonProps>){

    return(
        <button {...buttonProps}>
            {children}
        </button>
    )
}

export default Button;