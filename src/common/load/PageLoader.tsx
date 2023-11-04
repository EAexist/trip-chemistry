import { PropsWithChildren } from "react";
import { LoadStatus } from "../types/loadStatus";
import { CircularProgress, Icon } from '@mui/material';

interface PageLoaderProps{
    status: LoadStatus;
    // setStatus: ( loadStatus: LoadStatus) => void;
    doWaitApi?: boolean;
    missMessage?: React.ReactNode;
};

function PageLoader({ status, doWaitApi=false, missMessage, children } : PropsWithChildren<PageLoaderProps>) {

    return(
        <div className={`full ${ (doWaitApi || (status !== LoadStatus.SUCCESS)) && 'flex items-center justify-center space-y-8'}`}>
            {
        doWaitApi ?
        <CircularProgress />
        : (() => {
            switch ( status ) {
                case LoadStatus.REST:
                    return (
                        children
                    )
                case LoadStatus.PENDING:
                    return (
                        <CircularProgress />
                    )
                case LoadStatus.SUCCESS:
                    return (
                        <CircularProgress />
                    )
                case LoadStatus.FAIL:
                    return (
                        <>
                            <Icon>warning</Icon>
                            <h4 className="text-center">지금 서버에 연결할 수 없어요.<br />잠시 후 다시 시도해주세요.</h4>
                        </>
                    )
                case LoadStatus.MISS:
                    return (
                        missMessage ? 
                        missMessage
                        : <>
                            <Icon>question_mark</Icon>
                            <h6 className="text-center">페이지를 찾을 수 없어요.<br />관리자에게 문의해주세요.</h6>
                        </>
                    )
                default:
                    return null;
            }
        })()
    }
        </div>
    )
}

export default PageLoader;