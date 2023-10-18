import { PropsWithChildren, useState } from "react";
import Button, { ButtonProps } from "./Button";
import { ShowContextProvider } from "../legacy/ShowContext";

interface ToggleButtonProps extends ButtonProps{
    isActive: boolean;
    variant?: 'default' | 'round' | 'round-filled' | 'icon';
};

function ToggleButton({isActive, variant='default', children, className, ...props}:PropsWithChildren<ToggleButtonProps>){

    var classNames;
    switch(variant) {
        case 'round':
            classNames={
                default: 'origin-center transition duration-300 ease-out px-5 py-1 rounded-full',
                inActive: 'font-light border-2 border-gray-300 hover:font-bold hover:border-4 hover:border-black',
                active: 'font-bold border-4 border-black',
            }
            break;
        case 'round-filled':
            classNames={
                default: 'origin-center transition duration-300 ease-out px-3 py-1 rounded-full',
                inActive: 'font-light border-2 border-gray-300 hover:font-bold hover:bg-red-300',
                active: 'font-bold bg-red-300',
            }
            break;
        case 'icon':
            classNames={
                default: 'origin-center transition duration-300 ease-out',
                inActive: 'font-light opacity-50 hover:opacity-100 hover:font-bold hover:scale-150',
                active: 'font-bold opacity-100 scale-150',
            }
            break;
        default:
            classNames={
                default: 'origin-center transition duration-300 ease-out',
                inActive: 'font-light opacity-50 hover:opacity-100 hover:font-bold ',
                active: 'font-bold opacity-100',
            }
            break;
    }

    return(
        <Button className={`${classNames.default} ${className} ${isActive ? classNames.active : classNames.inActive}`} {...props}>      
            <ShowContextProvider show={isActive}>
                {children}
            </ShowContextProvider>
        </Button>
    );
}

export default ToggleButton;