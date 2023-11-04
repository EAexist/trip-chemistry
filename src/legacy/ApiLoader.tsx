import { ComponentType, PropsWithChildren, ReactNode, createContext, useEffect, useState } from "react";
import Button from "../components/Button";
import { CircularProgress } from "@mui/material";
import { Done, QuestionMark } from "@mui/icons-material"

enum LoadStatus {
    REST = 'rest',
    PENDING = 'pending', 
    SUCCESS = 'success',
    MISS = 'miss',
    FAIL = 'fail',
}

interface LoadStatusProps{
    status: LoadStatus;
    setStatus: (status: LoadStatus)=>void;
}

interface UseApiProps extends LoadStatusProps{
    delay?: number;
};
export const useApi = ({ status, setStatus, delay = 0 }: UseApiProps) => {

    const [ successToRestSecond, setSuccessToRestSecond ] = useState<number>(0);

    /* Handle SUCCESS -> REST*/
    useEffect(()=>{
        if(status === LoadStatus.SUCCESS){
            const timeout = setTimeout(() => setStatus(LoadStatus.REST), delay);
            setSuccessToRestSecond(Math.floor(delay/1000));
            return () => {console.log(`usAPisucess: Unmounting`); clearTimeout(timeout);};
        }
        console.log(`useLoadStatus: useEffect[status, setStatus, delay] status=${status} setStatus=${setStatus} delay=${delay}`);

    }, [status, setStatus, delay]);

    /* Run Timer */
    useEffect(()=>{
        const interval = setInterval(() => setSuccessToRestSecond((prev)=>prev-1) 
        , 1000);

        if(successToRestSecond === 0) {
            clearInterval(interval);
        }
        console.log(`useLoadStatus: useEffect[successToRestSecond] successToRestSecond=${successToRestSecond}`);
        return () => clearInterval(interval);   
    }, [ successToRestSecond ])

    return successToRestSecond;
}

// export { LoadStatus };
// export type { LoadStatusProps };


/* Deprecated */

// interface ApiLoaderProps extends UseApiSuccessProps {
//     className?: string;
// };
// function ApiLoader({ status, setStatus, delay, className, children } : PropsWithChildren<ApiLoaderProps> ) {

//     const successToRestTime = useLoadStatus({ status, setStatus, delay });

//     useEffect(()=>{
//         console.log(`ApiLoader: status: ${status}, setStatus: ${setStatus}, delay: ${delay}`);
//     }, [status, setStatus, delay])

//     return(
//         status === LoadStatus.REST ?
//         children
//         : <div className={`flex flex-col w-full h-full items-center justify-center ${className}`}>
//             <LoadStatusIcon status={status}/>
//             {strings && strings[status].alertText && <h6 className="text-center">{strings[status].alertText}</h6>}
//             {(successToRestTime > 0) && status === LoadStatus.SUCCESS && <h6 className="text-center">{successToRestTime}초 후 닫힘</h6>}
//             {/* Handle MISS, FAIL -> REST */}
//             {strings && strings[status].confirmButtonText && <Button onClick={()=>setStatus(LoadStatus.REST)}>{strings[status].confirmButtonText}</Button>} 
//         </div>
//     )
// }

interface LoaderProps extends LoadStatusProps{
    showOn: LoadStatus;
}; 

function Loader({ status, showOn, children }: PropsWithChildren<LoaderProps>){
    useEffect(
        ()=>{
            console.log(`Loader: status=${status} showOn=${showOn}`);
        }, [ status, showOn ]
    )
    return(
        (status === showOn) && children
    )
};

function LoadStatusIcon({status}: {status: LoadStatus}){

    let WrappedComponent : ReactNode = <></>;

    switch(status) {
        
        case 'pending': 
            WrappedComponent = <CircularProgress/>
            break;

        case 'success': 
            WrappedComponent = <Done/>
            break;

        case 'miss': 
            WrappedComponent = <QuestionMark/>
            break;

        case 'fail': 
            WrappedComponent = <QuestionMark/>
            break;

        default:
            break;
    }

    return(WrappedComponent);
}

interface useHandleApiSuccessProps{
    status: LoadStatus;
    setStatus: (status: LoadStatus)=>void;
    delay?: number;
};

export const useHandleApiSuccess = ({ status, setStatus, delay = 0 }: useHandleApiSuccessProps) => {
    useEffect(()=>{
        if(status === LoadStatus.SUCCESS){
            const timeout = setTimeout(() => setStatus(LoadStatus.REST), delay);
            return () => clearTimeout(timeout);
        }
    }, [status, setStatus, delay])
}

/* https://medium.com/trabe/delayed-render-of-react-components-3482f8ad48ad */
export const  useDelay = (delay: number) => {
    const [ delayed, setDelayed ] = useState(true)

    useEffect(() => {        
        const timeout = setTimeout(() => setDelayed(false), delay);
        return () => clearTimeout(timeout);
    }, [])

    return (props: any) => !delayed && props 
}