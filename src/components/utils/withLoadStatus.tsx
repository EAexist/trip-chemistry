import { useState, ComponentType } from "react";
import ApiLoader, { loadStatus } from "../ApiLoader";

/*  HOC <withIsLoaded/>.
    Add Loading Phase to Component.
    https://blog.bitsrc.io/building-a-universal-higher-order-component-page-loader-for-your-react-app-46d74f7a6958 */

interface withLoadStatusProps{
    isLoaded?: boolean,
    status?: loadStatus,
    setStatus?: (status: loadStatus)=>void
};

const withLoadStatus = <T extends {}>(WrappedComponent: ComponentType<T>) =>(LoaderComponent: ComponentType<withLoadStatusProps>, isLoaded: boolean, status?: loadStatus, setStatus?:(status:loadStatus)=>void) => (props: T) => {

    return(
        <>
        <LoaderComponent isLoaded={isLoaded} status={status}/>
        <WrappedComponent isLoaded={isLoaded} status={status} setStatus={setStatus} {...props as T} />                        
        </>
    ); 
}

function Loader({isLoaded}:withLoadStatusProps){
    return(
        <>
        {!isLoaded && 
        <h2>Loading...</h2>}
        </>
    );
}

// const [setStatus] = useState<loadStatus>(loadStatus.REST);
// const status = useSelector((state:RootState)=>state.userList.loadStatus);
// const fetchResultById = useGetResultById();

export default withLoadStatus;
export { Loader };
export type { withLoadStatusProps };