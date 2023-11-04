import { useSetScrollCheckpoint } from "../ScrollCheckpointContext";

interface scrollCheckpointProps{
    id: string
};

function ScrollCheckpoint({ id }:scrollCheckpointProps){

    const ref = useSetScrollCheckpoint( id );

    return(
        <div ref={ref}/>
    );
}
export default ScrollCheckpoint;