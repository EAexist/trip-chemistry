import { createContext, useContext, useState, PropsWithChildren } from "react";
import Button from "../components/Button";

interface ShowContextProps{
    show: boolean;
};

interface ShowContextProps{
    show: boolean
};

const ShowContext = createContext<ShowContextProps>({} as ShowContextProps)

function ShowContextProvider({show, children}: PropsWithChildren<ShowContextProps>){

    return(
        <ShowContext.Provider value={{show: show}}>
            {children}
        </ShowContext.Provider>
    );
}

interface ShowContextDetailProps{

};

function WithShow({children}: PropsWithChildren<ShowContextDetailProps>){

    const {show} = useContext(ShowContext);
    console.log('show: ', show)
    return(
        <>
        {show &&children}
        </>
    )
}

export default ShowContext;

export { ShowContextProvider, WithShow }