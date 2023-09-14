import { PropsWithChildren, useState } from "react";
import Button from "./Button";

interface ToggleButtonProps{
    isOn: boolean,
    setIsOn: (isOn: boolean) => void
};

function ToggleButton({isOn, setIsOn, children}:PropsWithChildren<ToggleButtonProps>){

    return(
        <Button variant={isOn? "contained" : "outlined"} onClick = {()=>setIsOn(!isOn)}>{children}</Button>
    );
}

export default ToggleButton;