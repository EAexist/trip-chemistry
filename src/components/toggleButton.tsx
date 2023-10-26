import { PropsWithChildren, useState } from "react";
import Button, { ButtonProps } from "./Button";
import { ShowContextProvider } from "../legacy/ShowContext";

interface ToggleButtonProps extends ButtonProps{
    isActive: boolean;
    variant?: 'default' | 'round' | 'round-filled' | 'icon' | 'material';
};

function ToggleButton({isActive, variant='default', children, disabled=false, className, ...props}:PropsWithChildren<ToggleButtonProps>){

    var classNames;
    switch(variant) {
        case 'round':
            classNames={
                default: 'origin-center transition duration-300 ease-out font-light px-3 py-1 rounded-md',
                disabled: `opacity-50`,
                inActive: `border-1 opacity-50 hover:opacity-100 hover:font-bold hover:border-2 hover:border-black`,
                active: 'font-bold border-2 border-black',
            }
            break;
        case 'round-filled':
            classNames={
                default: 'origin-center transition duration-300 ease-out font-light px-3 py-1 rounded-md',
                disabled: `opacity-50`,
                inActive: `border-1 opacity-50 hover:opacity-100 hover:font-bold hover:border-2 hover:border-black`,
                active: 'font-bold bg-red-300',
            }
            break;
        case 'icon':
            classNames={
                default: 'origin-center transition duration-300 ease-out font-light',
                disabled: 'bg-gray-300',
                inActive: `opacity-50 hover:opacity-100 hover:font-bold hover:scale-150`,
                active: 'font-bold opacity-100 scale-150',
            }
            break;
        case 'material':
            classNames={
                default: 'origin-center transition duration-300 ease-out font-light',
                disabled: 'bg-gray-300',
                inActive: `opacity-50 hover:opacity-100 hover:font-bold hover:scale-150`,
                active: 'font-bold opacity-100 scale-150',
            }
            break;
        default:
            classNames={
                default: 'origin-center transition duration-300 ease-out font-light',
                disabled: 'text-gray-300',
                inActive: `opacity-50 hover:opacity-100 hover:font-bold`,
                active: 'font-bold opacity-100',
            }
            break;
    }

    return(
        <Button className={`${className} ${classNames.default} ${disabled ? classNames.disabled : (isActive ? classNames.active : classNames.inActive)}`} disabled={disabled} {...props}>      
            <ShowContextProvider show={isActive}>
                {children}
            </ShowContextProvider>
        </Button>
    );
}

export default ToggleButton;