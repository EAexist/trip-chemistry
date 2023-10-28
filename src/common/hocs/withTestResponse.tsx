import { ComponentType } from "react";
import { useSetTestResponse, useTestResponse, TestResponse, TestName, SubTestName } from "../reducer/testResponseReducer";
import { useTestString } from "../../texts";
// import { BudgetResponse, SubTestName, TestResponse, TestName } from "../interface/interfaces";

interface WithTestResponseProps{
    testName: TestName;
    subTestName: SubTestName;
    testResponse: number; 
    setTestResponse: (value: TestResponse[TestName]) => void;    
    strings: any;
    // setBudgetResponse?: (SubTestName: SubTestName, value: BudgetResponse[SubTestName]) => void;    
};

interface WithTestResponseHOCProps{
    testName: TestName;
    subTestName?: SubTestName;
}

/* HOC withTestResponse
    컴포넌트에 테스트 섹션 정보와 해당 정보에 대응하는 testResponse 리듀서 state 와 setter 함수를 연결.   */
const withTestResponse = <P extends WithTestResponseProps>(WrappedComponent: ComponentType<P>) => 
    ({testName, subTestName}: WithTestResponseHOCProps) => 
    (props: Omit<P, keyof WithTestResponseProps>) => {
    
    const testResponse = useTestResponse(testName, subTestName);
    const setTestResponse = useSetTestResponse();
    const strings = useTestString({testName, subTestName});
    
    return (
        <WrappedComponent 
        {...{
            testName: testName,
            subTestName: subTestName,
            testResponse: testResponse,
            setTestResponse: (value: number) => {console.log(`withTestResponse-value=${value}`); setTestResponse({
                testName: testName,
                subTestName: subTestName,
                value: value,
            })},
            // setBudgetResponse: (value: number, SubTestName: SubTestName) => setTestResponse({
            //     testName: testName,
            //     subTestName: SubTestName,
            //     value: value,
            // }),            
            strings: strings
        }}
            {...props as P}
        />
    );
}

export default withTestResponse;
export type { WithTestResponseProps };
