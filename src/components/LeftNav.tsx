import { Link, useLocation } from "react-router-dom";
import { BASEPAGES } from "../pages";
import ToggleButton from "./ToggleButton";
import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useElementContext, useSetElement } from "../common/hook/useSetElement";
import IconStepper, { IconStepperProps, Steps } from "./IconStepper";
import { useActiveStep } from "../common/context/ActiveStepContext";
import { useScrollCheckpoint, useSetScrollCheckpoint } from "../common/scrollCheckpoint/ScrollCheckpointContext";

interface LeftNavProps extends IconStepperProps{};
function LeftNav( props : LeftNavProps ){
    
    const { activeStep } = useActiveStep();

    return(
        <div className='fixed z-50 left-4 -translate-y-1/2 top-1/2 flex items-center'>
            <IconStepper {...{ activeStep: activeStep, direction: 'vertical', connectorSize: 'sm', ...props }}/>
        </div>
    );
}

type LeftNavWithScrollProps = Omit<LeftNavProps, keyof { handleClickStepButton : (index:number) => void }> 
function LeftNavWithScroll( props : LeftNavWithScrollProps ) {

    const { scrollCheckpointList } = useScrollCheckpoint();    
    const { setActiveStep } = useActiveStep();

    const handleClickStepButton = useCallback(( index : number )=>{
        console.log(`handleClickStepButton: index=${index} scrollCheckpointList.current.length=${scrollCheckpointList.current.length}`)
        if ( index < scrollCheckpointList.current.length ){
            setActiveStep(index); 
            window.scrollTo({ top: scrollCheckpointList.current[index].offsetTop, behavior: "smooth"}); 
        }
        else {
            console.log(`useScrollCheckpoint: warning: ScrollCheckpoint with index {${index}} is missing.`);
        }
    }, [ scrollCheckpointList ]);

    return(
        <LeftNav handleClickStepButton = { handleClickStepButton } {...props} />        
    );
}

export default LeftNav;
export { LeftNavWithScroll }
// export { LeftNavContextProvider, useSetLeftNav }

// interface LeftNavPropsContext{
//     stepperProps: IconStepperProps;
//     setStepperProps: ( stepperProps: IconStepperProps ) => void;
// };
// const LeftNavPropsContext = createContext<LeftNavPropsContext>({} as LeftNavPropsContext);

// function LeftNavContextProvider({ children }: PropsWithChildren) {

//     const [ stepperProps, setStepperProps ] = useState<IconStepperProps>({} as IconStepperProps);

//     return(
//         <LeftNavPropsContext.Provider value={{stepperProps: stepperProps, setStepperProps: setStepperProps}}>
//             {children}
//         </LeftNavPropsContext.Provider>
//     )
// }

// const useLeftNavProps = () => useContext(LeftNavPropsContext);

// interface useSetLeftNavProps extends IconStepperProps{};
// const useSetLeftNav = ( stepperProps : useSetLeftNavProps) => {

//     const { setStepperProps } = useLeftNavProps();

//     useEffect(()=>{
//         setStepperProps(stepperProps);
//     }, Object.keys(stepperProps));
// }
