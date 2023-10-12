import { ComponentType, PropsWithChildren, useEffect, useState } from "react";

interface WithAnimationProps{
    animationName?: string;
    key?: string;
}; 

/* Animation Wrapper. Default animation = fadeIn */
function WithAnimationWrapper({key, animationName='fadeIn', children}:PropsWithChildren<WithAnimationProps>){

    const [animation, setAnimation] = useState(animationName); 

    // useEffect(()=>{
    //     /* 언마운트시 애니메이션 */
    //     return () => {
    //         setAnimation('fadeOut');
    //         console.log(`WithAnimationWrapper: animation=${animation}`)
    //     }
    // }, []);

    return (
        <div key={key} className={`${animation} w-full h-full`}>
            {children}
        </div>
    );
}

/* Deprecated */
/* HOC withTestResponse
    컴포넌트에 테스트 섹션 정보와 해당 정보에 대응하는 testResponse 리듀서 state 와 setter 함수를 연결.   */
// const withAnimationWrapper = <P extends WithAnimationProps>(WrappedComponent: ComponentType<P>) => 
//     ({key, animationName='fadeIn', children}: WithAnimationProps) => 
//     (props: Omit<P, keyof WithAnimationProps>) => {
    
//     const testResponse = useTestResponse(testName, subTestName);
//     const setTestResponse = useSetTestResponse();
//     const strings = subTestName? 
//         usePageString('test')[testName as TestName].subTests[subTestName as SubTestName]
//         : usePageString('test')[testName as TestName];

//     return (
//         <WrappedComponent 
//         {...{
//             testName: testName,
//             subTestName: subTestName,
//             testResponse: testResponse,
//             setTestResponse: (value: number) => {console.log(`withTestResponse-value=${value}`); setTestResponse({
//                 testName: testName,
//                 subTestName: subTestName,
//                 value: value,
//             })},
//             // setBudgetResponse: (value: number, SubTestName: SubTestName) => setTestResponse({
//             //     testName: testName,
//             //     subTestName: SubTestName,
//             //     value: value,
//             // }),            
//             strings: strings
//         }}
//             {...props as P}
//         />
//     );
// }


export { WithAnimationWrapper };
export type { WithAnimationProps };