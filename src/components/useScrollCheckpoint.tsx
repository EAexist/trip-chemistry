import { useCallback, useEffect, useRef, useState } from "react";
import useValueToBound from "../common/hooks/useValueToBound";

interface pageProps{

};

function Page({}:pageProps){
    return(<></>);
}

interface useScrollCheckpointProps{

};

const useScrollCheckpoint = ({}: useScrollCheckpointProps) => {

    const scrollCheckpoints = useRef<(HTMLDivElement)[]>([]);
    const [ offsetYList, setOffsetYList ] = useState<number[]>([]); /* List of checkpoints' offset */
    const [ activeCheckpointIndex, setActiveCheckpointIndex ] = useValueToBound({ boundList: offsetYList, returnIndex: true }); /* Current active index */

    const handleScroll = useCallback((e: Event) => {
        console.log(`ResultPage: handleScroll: window.scrollY=${window.scrollY}`);
        setActiveCheckpointIndex(window.scrollY);
    }, [ setActiveCheckpointIndex ]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); //clean up
        };
      }, [ handleScroll ]);

    useEffect(()=>{
        setOffsetYList(scrollCheckpoints.current.map((element, index)=>{
            console.log(`ResultPage: scrollCheckpoints[${index}]: element.offsetTop=${element.offsetTop}`);
            return element.offsetTop - scrollCheckpoints.current[0].offsetTop
        })) 
    }, [ scrollCheckpoints ]);

    return(
        { 
            activeCheckpointIndex: activeCheckpointIndex,
            scrollCheckpoints: scrollCheckpoints,
            getRef: useCallback(( index: number )=>
                ( element: HTMLDivElement ) => {
                    if (element) scrollCheckpoints.current[index] = element;
                }
            , [])
        }
    );
}

export default Page;

export { useScrollCheckpoint }