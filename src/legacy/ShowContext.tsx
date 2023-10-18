import { createContext, useContext, useState, PropsWithChildren } from "react";
import Button from "../components/Button";
import { ComponentType } from "@react-spring/web";

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

interface withShowByIndexProps{
    index: number;
    contextIndex: number;
};
interface withShowByIndexHOCProps{
    compareFunc?: (index: number, contextIndex:number)=>boolean;
};

const withShowByIndex = <T extends withShowByIndexProps>(WrappedComponent: ComponentType<Omit<T, keyof withShowByIndexProps>>) =>
    ({compareFunc = (index:number, contextIndex:number)=>(index === contextIndex)}: withShowByIndexHOCProps) => /* id: 인덱스, force: true 일 경우 로직을 비활성화하고 컴포넌트를 항상 보여줌.(디버깅) defaultShow: true 일 경우 마우스를 올리지 않았을 때에도 컴포넌트를 보여줌. */
    (props: T) => {      
    console.log(`index=${props.index} contextIndex=${props.contextIndex}`);
    return(
        compareFunc(props.index, props.contextIndex) 
        && <WrappedComponent {...props as Omit<T, keyof withShowByIndexProps>}/> 
    );
}

export default ShowContext;

export { ShowContextProvider, WithShow, withShowByIndex }