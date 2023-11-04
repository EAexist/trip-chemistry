import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

interface ElementContextProps{
    element: React.ReactNode;
    setElement: ( element: React.ReactNode ) => void;
};
const ElementContext = createContext<ElementContextProps>({} as ElementContextProps);

function ElementContextProvider({ children }: PropsWithChildren) {

    const [ element, setElement ] = useState<React.ReactNode>();

    return(
        <ElementContext.Provider
            value={{element : element, setElement: setElement}}
        >
            {children}
        </ElementContext.Provider>
    )
}

const useElementContext = () => useContext(ElementContext);

interface UseSetElementProps{
    element?: React.ReactNode;
    dep?: any[];
};
const useSetElement = ({element, dep=[]} : UseSetElementProps) => {

    const { setElement } = useElementContext();

    useEffect(()=>{
        setElement(element);
    }, [ setElement, ...dep ]);
}

export { ElementContextProvider, useElementContext, useSetElement }; 