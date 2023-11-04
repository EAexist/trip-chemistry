import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from "react";
import useValueToBound from "../hook/useValueToBound";
import ScrollCheckpointContext, { IdToIndex, useScrollCheckpoint, useSetIdToIndex, withScrollCheckpointContext } from "./ScrollCheckpointContext";
import { useActiveStep, withActiveStepContext } from "../context/ActiveStepContext";

interface useScrollCheckpointProps{
    idToIndex: IdToIndex;
};

function ScrollCheckpointContainer({ idToIndex, children }: PropsWithChildren<useScrollCheckpointProps>) {

    const { scrollCheckpointList } = useScrollCheckpoint();
    useSetIdToIndex( idToIndex );

    const { setActiveStep } = useActiveStep(); /* 현재 step */

    const [ value, setValue ] = useState<number>(0);
    const [ activeCheckpointIndex, ] = useValueToBound({ 
        boundList: scrollCheckpointList.current.map((checkpoint)=>checkpoint.offsetTop-(window.innerHeight-(checkpoint.offsetParent as HTMLDivElement).offsetTop)/2), 
        value: value,
        returnIndex: true, 
    }); /* Current active index */

    const handleScroll = useCallback((e: Event) => {
        // setActiveCheckpointIndex(window.scrollY);
        setValue( window.scrollY );
    }, [ setValue ]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); //clean up
        };
      }, [ handleScroll ]);


    useEffect(()=>{        
        console.log(`ScrollCheckpointContainer: window.scrollY=${window.scrollY} activeCheckpointIndex=${activeCheckpointIndex}`);
        setActiveStep( activeCheckpointIndex as number );
    }, [ activeCheckpointIndex ]);

    useEffect(()=>{        
        scrollCheckpointList.current.map((checkpoint, index)=>{
            console.log(`ScrollCheckpointContainer: checkpoints[${index}]=${checkpoint.offsetTop}`);
        })
    }, [ scrollCheckpointList ]);

    return( children );
}

export default withActiveStepContext(withScrollCheckpointContext(ScrollCheckpointContainer));