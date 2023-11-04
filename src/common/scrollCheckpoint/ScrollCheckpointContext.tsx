import { ComponentType, PropsWithChildren, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type IdToIndex = { [key: string] : number };

interface ScrollCheckpointContextProps{
    idToIndex: IdToIndex;
    setIdToIndex: ( idToIndex: IdToIndex ) => void;
    scrollCheckpointList: React.MutableRefObject<HTMLDivElement[]>;
} 

const ScrollCheckpointContext = createContext<ScrollCheckpointContextProps>({} as ScrollCheckpointContextProps);

function ScrollCheckpointContextProvider({ children }: PropsWithChildren) {

    const [ idToIndex, setIdToIndex ] = useState<IdToIndex>({} as IdToIndex) 
    const scrollCheckpointList = useRef<HTMLDivElement[]>([]); 

    return (
        <ScrollCheckpointContext.Provider value={ { idToIndex : idToIndex, setIdToIndex : setIdToIndex, scrollCheckpointList : scrollCheckpointList } }>
            {children}
        </ScrollCheckpointContext.Provider>
    );
}

/**** Custom Hooks ****/

const useScrollCheckpoint = () => useContext( ScrollCheckpointContext );

const useSetScrollCheckpoint = ( id: string ) => {

    const { idToIndex, scrollCheckpointList } = useScrollCheckpoint();

    return(
        useCallback((element: HTMLDivElement) => {
            if (element) scrollCheckpointList.current[ idToIndex[ id ] ] = element;
        }, [ idToIndex ])
    );
}

const useSetIdToIndex = ( idToIndex: IdToIndex ) => {
    
    const { setIdToIndex } = useScrollCheckpoint();

    useEffect(()=>{
        setIdToIndex( idToIndex );
    }, [ idToIndex ])
};

/**** HOCs ****/
const withScrollCheckpointContext = <T extends {}>( WrappedComponent: ComponentType<T> ) => ( props : T ) => {

    const [ idToIndex, setIdToIndex ] = useState<IdToIndex>({} as IdToIndex) 
    const scrollCheckpointList = useRef<HTMLDivElement[]>([]); 

    return(
        <ScrollCheckpointContext.Provider value={ { idToIndex, setIdToIndex, scrollCheckpointList } }>
            <WrappedComponent {...props}/>
        </ScrollCheckpointContext.Provider>
    )
}

export default ScrollCheckpointContext;

export { ScrollCheckpointContextProvider }
export { useScrollCheckpoint, useSetScrollCheckpoint, useSetIdToIndex };
export { withScrollCheckpointContext };

export type { IdToIndex };