import { PropsWithChildren} from 'react';
import { ButtonBase, Button as MuiButton, Paper } from "@mui/material";
import { ButtonVariant } from './types';

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    isActive?: boolean;
    state?: 'hovered' | 'active' | undefined;
    classNameHovered? : string;
    classNameActive? : string;
    variant?: ButtonVariant;
}

function Button({children, className, variant, ...buttonProps} : PropsWithChildren<ButtonProps>){
    return(
        <button className={`flex  ${className} ${buttonProps.disabled && 'opacity-25'}`} {...buttonProps}>
            {
            variant === 'filled' ?
                <Paper className={`flex`}>
                    {children}
                </Paper>
                : children
            }
        </button>
    )
}

export default Button;
export type { ButtonProps };