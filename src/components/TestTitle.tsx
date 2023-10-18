import { PropsWithChildren } from "react";

/* 테스트 제목 */
function TestTitle({ children }:PropsWithChildren<{}>){
    return(
        <h4 className='flex-none'>{children}</h4>
    );
}

export default TestTitle;