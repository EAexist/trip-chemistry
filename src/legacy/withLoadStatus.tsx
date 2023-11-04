import { useState, ComponentType } from "react";
import { CircularProgress } from "@mui/material";
import { LoadStatus } from "../common/types/loadStatus";

/*  HOC <withIsLoaded/>.
    Add Loading Phase to Component.
    https://blog.bitsrc.io/building-a-universal-higher-order-component-page-loader-for-your-react-app-46d74f7a6958 */

/* Deprecated */

interface IsLoaded{
    isLoaded: boolean;
    status: LoadStatus;
}

const withLoadStatus = <T extends {}>(WrappedComponent: ComponentType<T>) =>
    (LoaderComponent: ComponentType<IsLoaded>, isLoaded: boolean, status?: LoadStatus, setStatus?:(status:LoadStatus)=>void) => 
    (props: T) => {

    return(
        <>
        {/* <LoaderComponent isLoaded={isLoaded} status={status}/> */}
        <WrappedComponent isLoaded={isLoaded} status={status} setStatus={setStatus} {...props as T} />                        
        </>
    ); 
}

interface LoaderProps extends IsLoaded{
    variant?: 'full';
    text?: React.ReactNode;
};

function Loader({ isLoaded, variant, text } : LoaderProps){
    return(
        <>
        {!isLoaded &&
        <div className='w-full h-full flex items-center justify-center'>
            <CircularProgress/>
            {text}
        </div> 
        // <h2>Loading...</h2>
        }
        </>
    );
}

// const [setStatus] = useState<LoadStatus>(LoadStatus.REST);
// const status = useSelector(( state:RootState )=>state.userDataObject.LoadStatus);
// const fetchResult = useGetResult();

export default withLoadStatus;
export { Loader };