import { createContext, useContext, useState, PropsWithChildren } from "react";
import Button from "./Button";

interface ExpandableButtonProps{
    isExpanded: boolean;
    onClick: ()=>void;
};

interface ExpandableButtonContextProps{
    isExpanded: boolean
};

const ExpandableButtonContext = createContext<ExpandableButtonContextProps>({} as ExpandableButtonContextProps)

function ExpandableButton({isExpanded, onClick, children}: PropsWithChildren<ExpandableButtonProps>){

    return(
        <ExpandableButtonContext.Provider value={{isExpanded: isExpanded}}>
            <Button onClick={()=>{
                onClick();
            }}>
            {children}
            </Button>
        </ExpandableButtonContext.Provider>
    );
}

function ExpandableButtonContextProvider({isExpanded, onClick, children}: PropsWithChildren<ExpandableButtonProps>){

    return(
        <ExpandableButtonContext.Provider value={{isExpanded: isExpanded}}>
            <Button onClick={()=>{
                onClick();
            }}>
            {children}
            </Button>
        </ExpandableButtonContext.Provider>
    );
}

interface ExpandableButtonDetailProps{

};

function ExpandableButtonDetail({children}: PropsWithChildren<ExpandableButtonDetailProps>){

    const {isExpanded} = useContext(ExpandableButtonContext);
    console.log('isExpanded: ', isExpanded)
    return(
        <>
        {isExpanded &&children}
        </>
    )
}

export default ExpandableButton;

export { ExpandableButton, ExpandableButtonDetail }