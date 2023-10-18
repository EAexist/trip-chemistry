import { PropsWithChildren} from 'react';
import { ButtonBase, Button as MuiButton } from "@mui/material";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    isActive?: boolean,
    disabled?: boolean;
    state?: 'hovered' | 'active' | undefined
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
export type { ButtonProps };