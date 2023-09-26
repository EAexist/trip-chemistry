/* @mui
https://mui.com/material-ui/react-accordion/ */
import { PropsWithChildren, createContext, useContext, useState, ComponentType, SyntheticEvent } from 'react';

const ExclusiveAccordionsContext = createContext({expanded: false as number | string | false, setExpanded: (index: number | string | false) => {} });

const ExclusiveAccordionsContextProvider = ({children}:PropsWithChildren) => {

    const [expanded, setExpanded] = useState<number | string | false>(0);

    return(
        <ExclusiveAccordionsContext.Provider value = {{
            expanded: expanded,
            setExpanded: setExpanded
        }}>
            {children}
        </ExclusiveAccordionsContext.Provider>

    )
}

const withExclusiveAccordionsContext = <T extends {}>(WrappedComponent: ComponentType<T>) => (index:number) => (props: T) => {
    const {expanded, setExpanded} = useContext(ExclusiveAccordionsContext);
    const handleChangeAccordion = (index: number | string) => (event: SyntheticEvent, isExpanded: boolean) => {
        // console.log(`withExclusiveAccordionsContext - handleChangeAccordion - index = ${index} isExpanded = ${isExpanded}`);    
        setExpanded(isExpanded ? index : false); 
    };

/*     console.log(`withExclusiveAccordionsContext - 
        index = ${index} 
        expanded = ${expanded} 
        WrappedComponent = ${WrappedComponent}`); */
    return (
        <WrappedComponent
            expanded = {expanded === index}
            handleChangeAccordion = {handleChangeAccordion(index)}
            { ...props as T }
        />
    );
}

/* Deprecated */
// const ExclusiveAccordionsContextCosumer = ({children}:PropsWithChildren) => {

//     const {expanded, setExpanded} = useContext(ExclusiveAccordionsContext);
//     const handleChangeAccordion = (index: number) => {
//         setExpanded(index);
//     };

//     return (
//         <>
//             {Children?.map(children, (child, index) => {
//                 if (isValidElement(child)) {
//                     return (
//                     <>
//                         {cloneElement(child as JSX.Element, {
//                             expanded: expanded === index,
//                             handleChangeAccordion: () => handleChangeAccordion(index),
//                         })}
//                     </>
//                     );
//                 }        
//             })}
//         </>
//     );
// } 
export default withExclusiveAccordionsContext;
export { ExclusiveAccordionsContextProvider };