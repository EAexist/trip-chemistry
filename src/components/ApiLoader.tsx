import { PropsWithChildren, ReactNode } from "react";
import Button from "./Button";
import { CircularProgress } from "@mui/material";
import { Done, QuestionMark } from "@mui/icons-material"

enum loadStatus {
    REST = 'rest',
    PENDING = 'pending', 
    SUCCESS = 'success',
    MISS = 'miss',
    FAIL = 'fail',
}

interface ApiLoaderProps{
    status: loadStatus;
    setStatus: (status: loadStatus)=>void;
    alertText?: string;
    confirmButtonText?: string;
};

function ApiLoader({status, setStatus, alertText, confirmButtonText, children}: PropsWithChildren<ApiLoaderProps>){

    let WrappedComponent : ReactNode;

    switch(status) {
        case 'rest':
            WrappedComponent = children;
            break;
        
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

    return(
        <>
            {WrappedComponent}
            {alertText && <p>{alertText}</p>}
            {confirmButtonText &&<Button onClick={()=>setStatus(loadStatus.REST)}>{confirmButtonText}</Button>}
        </>
    )
}

export default ApiLoader;
export { loadStatus };