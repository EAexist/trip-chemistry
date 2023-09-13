import React, { useState } from "react";
import ApiLoader, { loadStatus } from "../ApiLoader";

/*  HOC <withIsLoaded/>.
    Add Loading Phase to Component.
    https://blog.bitsrc.io/building-a-universal-higher-order-component-page-loader-for-your-react-app-46d74f7a6958 */

interface withLoadStatusProps{
    status?: loadStatus,
    setStatus?: (status: loadStatus)=>void
};

const withLoadStatus = <T extends {}>(WrappedComponent: React.ComponentType<T>) =>(LoaderComponent: React.ComponentType<withLoadStatusProps>, status: loadStatus, setStatus:(status:loadStatus)=>void) => (props: T) => {

    return(
        <>
        <LoaderComponent status={status} setStatus={setStatus}/>
        <WrappedComponent status={status} setStatus={setStatus} {...props as T} />                                
        </>
    ); 
}

function Loader({status}:withLoadStatusProps){
    return(
        <>
        {(status as loadStatus) !== loadStatus.REST && 
        <h1>Loading...</h1>}
        </>
    );
}

// const [setStatus] = useState<loadStatus>(loadStatus.REST);
// const status = useSelector((state:RootState)=>state.userList.loadStatus);
// const fetchResultById = useFetchResultById();

export default withLoadStatus;
export { Loader };
export type { withLoadStatusProps };