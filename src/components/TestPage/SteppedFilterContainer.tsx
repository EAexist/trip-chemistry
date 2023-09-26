import { PropsWithChildren, ComponentType } from "react";
import { LevelContextProvider, useLevelContext } from "./LevelContext";

interface SteppedFilterContainerProps{
    value: number;
    step: number;
    min: number;
    max: number; 
};

function SteppedFilterContainer({ value, step, min, max, children }: PropsWithChildren<SteppedFilterContainerProps>){ 

    const level = Math.floor((value-min)/step);

    console.log(`<SteppedFilterItem>
        value=${level} step=${step} min=${min} max = ${max}
        level=${level}
    `);

    return(
        <LevelContextProvider level={level}>{children}</LevelContextProvider>
    )
}


function SteppedFilterItem({ id, children }: PropsWithChildren<{id: number}>) {

    const {level} = useLevelContext();

    // console.log(`<SteppedFilterItem>
    //     \nlevel=${level}
    //     \id=${id}
    // `);

    return(
        // <ShowWrapper show = {(id < level)}>{children}</ShowWrapper>
        <>{children}</>
        // <>{(id < level) && children}</>
    )
}

const withShow = <T extends {}>(WrappedComponent: ComponentType<T>) => (show: boolean) => (props: T) => (
    <WrappedComponent show={show} {...props as T} />
);

function ShowWrapper({show, children}:PropsWithChildren<{show?: boolean}>) {
    return(
        <>{ show && children}</>
    )
} 

export default SteppedFilterContainer;

export {SteppedFilterItem, ShowWrapper};