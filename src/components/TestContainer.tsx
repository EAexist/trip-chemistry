import { PropsWithChildren } from "react";

interface TestContainerProps{
    title?: string;
    subTitle?: string;
    titleClassName?: string;
};

{/* 테스트 제목 및 옵션 */}
function TestContainer({ title, subTitle, children, titleClassName }:PropsWithChildren<TestContainerProps>){
    return(
        <div className='flex flex-col min-w-fit h-full'>

            {/* 테스트 제목 */}
            <div className={`flex flex-col py-12 pr-20 max-md:py-6 ${titleClassName}`}>
                <h6 className='flex-none'>{subTitle}</h6>
                <h4 className='flex-none'>{title}</h4>
            </div>

            {/* 테스트 입력 */}
            <div className="h-full w-full">{children}</div>
        </div>
    );
}

export default TestContainer;