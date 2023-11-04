import { PropsWithChildren } from "react";
import TestSubtitle from "./TestSubtitle";
import TestTitle from "./TestTitle";

interface TestTitleContainerProps{
    title: string;
    subtitle?: string;
    variant?: 'centered' | 'paragraph';
    className?: string;
    titleClassName?: string;
};

/* 테스트 제목 및 옵션 */
function TestTitleContainer({ title, subtitle, className }:TestTitleContainerProps){
    return(
        /* 테스트 제목 */
        <div className={`flex flex-col max-md:py-6 ${className}`}
        >
            <TestSubtitle>{subtitle}</TestSubtitle>
            <TestTitle>{title}</TestTitle>  
        </div>
    );
}

export default TestTitleContainer;