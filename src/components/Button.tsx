import { PropsWithChildren} from 'react';
import { ButtonBase, Button as MuiButton } from "@mui/material";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    isActive?: boolean,
    state?: 'hovered' | 'active' | undefined
    classNameHovered? : string,
    classNameActive? : string,
}

function Button({children, className, ...buttonProps} : PropsWithChildren<ButtonProps>){
    return(
        <button className={`${className} ${buttonProps.disabled && 'opacity-50'}`} {...buttonProps}>
            {children}
        </button>
    )
}

export default Button;
export type { ButtonProps };