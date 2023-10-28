import { PropsWithChildren, useState } from "react";
import { LoadStatus } from "../types/loadStatus";
import { CircularProgress } from '@mui/material';
import { QuestionMark } from "@mui/icons-material";

interface PageLoaderProps{
    status: LoadStatus;
    doWaitApi?: boolean;
    missMessage?: React.ReactNode;
};

function PageLoader({ status, doWaitApi=false, missMessage, children } : PropsWithChildren<PageLoaderProps>) {

    return(
        doWaitApi ?
        <CircularProgress />
        : (() => {
            switch (status) {
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
                            <QuestionMark />
                            <h6 className="text-center">지금 서버에 연결할 수 없어요.<br />잠시 후 다시 시도해주세요.</h6>
                        </>
                    )
                case LoadStatus.MISS:
                    return (
                        missMessage ? 
                        missMessage
                        : <>
                            <QuestionMark />
                            <h6 className="text-center">페이지를 찾을 수 없어요.<br />관리자에게 문의해주세요.</h6>
                        </>
                    )
                default:
                    return null;
            }
        })()
    )
}

export default PageLoader;