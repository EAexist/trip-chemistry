import { PropsWithChildren } from "react";

/* 테스트 부제목 */
function TestSubtitle({ children }:PropsWithChildren<{}>){
    return(
        <h6 className='flex-none'>{children}</h6>
    );
}

export default TestSubtitle;