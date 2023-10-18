import { PropsWithChildren } from "react";
import TestSubtitle from "./TestSubtitle";
import TestTitle from "./TestTitle";

interface TestContainerProps{
    title: string;
    subtitle?: string;
    variant?: 'centered' | 'paragraph';
    className?: string;
    titleClassName?: string;
};

/* 테스트 제목 및 옵션 */
function TestContainer({ title, subtitle, variant='paragraph', children }:PropsWithChildren<TestContainerProps>){
    return(
        <div 
            className={`flex flex-col h-full w-full py-8 space-y-8 
                ${variant==='centered' && 'items-center'}`}
        >
            {/* 테스트 제목 */}
            <div 
                className={`flex flex-col max-md:py-6 
                ${variant==='centered' && 'items-center'}`}
            >
                <TestSubtitle>{subtitle}</TestSubtitle>
                <TestTitle>{title}</TestTitle>  
            </div>

            {/* 테스트 입력 */}
            {children}
        </div>
    );
}

export default TestContainer;