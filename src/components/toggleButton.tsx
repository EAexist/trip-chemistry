import { PropsWithChildren, useState } from "react";
import Button from "./Button";
import { ShowContextProvider } from "./ShowContext";

interface ToggleButtonProps{
    isActive: boolean;
    onClick?: () => void;
    variant?: 'default' | 'round' | 'round-filled';
    className?: string;
    classNameActive?: string;
};

function ToggleButton({isActive, onClick, variant='default', children, className}:PropsWithChildren<ToggleButtonProps>){

    var classNames;
    switch(variant) {
        case 'round':
            classNames={
                default: 'origin-left origin-center transition duration-300 ease-out px-5 py-1 rounded-full',
                inActive: 'font-light border-2 border-gray-300 hover:font-bold hover:border-4 hover:border-black',
                active: 'font-bold border-4 border-black',
            }
            break;
        case 'round-filled':
            classNames={
                default: 'origin-left origin-center transition duration-300 ease-out px-3 py-1 rounded-full',
                inActive: 'font-light border-2 border-gray-300 hover:font-bold hover:bg-red-300',
                active: 'font-bold bg-red-300',
            }
            break;
        default:
            classNames={
                default: 'origin-left origin-center transition duration-300 ease-out',
                inActive: 'font-light hover:font-bold',
                active: 'font-bold',
            }
            break;
    }

    return(
        <Button onClick = {onClick} className={`${classNames.default} ${className} ${isActive ? classNames.active : classNames.inActive}`}>      
            <ShowContextProvider show={isActive}>
                {children}
            </ShowContextProvider>
        </Button>
    );
}

export default ToggleButton;