import { useEffect, useState } from "react";
import { LoadStatus, LoadStatusProps } from "../types/loadStatus";

interface UseLoadStatusProps extends LoadStatusProps{
    delay?: number;
};
export const useHandleLoadSuccess = ({ status, setStatus, delay = 0 }: UseLoadStatusProps) => {

    const [ successToRestSecond, setSuccessToRestSecond ] = useState<number>(0);

    /* Handle SUCCESS -> REST*/
    useEffect(()=>{
        if(status === LoadStatus.SUCCESS){
            const timeout = setTimeout(() => setStatus(LoadStatus.REST), delay);
            setSuccessToRestSecond(Math.floor(delay/1000));
            return () => {console.log(`usAPisucess: Unmounting`); clearTimeout(timeout);};
        }
        console.log(`useHandleLoadSuccess: useEffect[status, setStatus, delay] status=${status} setStatus=${setStatus} delay=${delay}`);

    }, [status, setStatus, delay]);

    /* Run Timer */
    useEffect(()=>{
        const interval = setInterval(() => setSuccessToRestSecond((prev)=>prev-1) 
        , 1000);

        if(successToRestSecond === 0) {
            clearInterval(interval);
        }
        console.log(`useHandleLoadSuccess: useEffect[successToRestSecond] successToRestSecond=${successToRestSecond}`);
        return () => clearInterval(interval);   
    }, [ successToRestSecond ])

    return successToRestSecond;
}

export default useHandleLoadSuccess;