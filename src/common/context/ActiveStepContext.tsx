import { ComponentType, PropsWithChildren, createContext, useContext, useState } from "react";

interface ActiveStepContextProps{
    activeStep: number;
    setActiveStep: ( activeStep : number ) => void;
} 

const ActiveStepContext = createContext<ActiveStepContextProps>({} as ActiveStepContextProps);

const withActiveStepContext = <T extends {}>( WrappedComponent: ComponentType<T> ) => ( props : T ) => {

    const [ activeStep, setActiveStep ] = useState<number>(0); 

    return(
        <ActiveStepContext.Provider value={ { activeStep, setActiveStep } }>
            <WrappedComponent {...props}/>
        </ActiveStepContext.Provider>
    )
}
function ActiveStepContextProvider({ children }: PropsWithChildren) {

    const [ activeStep, setActiveStep ] = useState<number>(0); 

    return (
        <ActiveStepContext.Provider value={ { activeStep : activeStep, setActiveStep : setActiveStep } }>
                {children}
        </ActiveStepContext.Provider>
    );
}

const useActiveStep = ()  => useContext(ActiveStepContext);

export default ActiveStepContext;

export { ActiveStepContextProvider, withActiveStepContext, useActiveStep }