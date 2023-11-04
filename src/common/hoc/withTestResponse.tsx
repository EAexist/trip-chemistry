import { ComponentType } from "react";
import { useSetTestResponse, useTestResponse, TestResponse, TestName, SubTestName, TestIndex } from "../reducer/testResponseReducer";
import { useTestString } from "../../texts";
// import { BudgetResponse, SubTestName, TestResponse, TestName } from "../interface/interfaces";

interface WithTestResponseProps{
    testIndex: TestIndex;
    testResponse: number; 
    setTestResponse: (value: TestResponse[TestName][SubTestName]) => void;    
    testStrings: any;
    strings: any;
    // setBudgetResponse?: (SubTestName: SubTestName, value: BudgetResponse[SubTestName]) => void;    
};

interface WithTestResponseHOCProps extends TestIndex{
};

/* HOC withTestResponse
    컴포넌트에 테스트 섹션 정보와 해당 정보에 대응하는 testResponse 리듀서 state 와 setter 함수를 연결.   */
const withTestResponse = <P extends WithTestResponseProps>(WrappedComponent: ComponentType<P>) => 
    (testIndex: WithTestResponseHOCProps) => 
    (props: Omit<P, keyof WithTestResponseProps>) => {
    
    const testResponse = useTestResponse(testIndex);
    const setTestResponse = useSetTestResponse();
    const testStrings = useTestString({ testName: testIndex.testName });
    const strings = useTestString(testIndex);
    
    return (
        <WrappedComponent 
        {...{
            testIndex,
            testResponse: testResponse,
            setTestResponse: (value: number) => {console.log(`withTestResponse-value=${value}`); setTestResponse({
                ...testIndex,
                value: value,
            })},
            // setBudgetResponse: (value: number, SubTestName: SubTestName) => setTestResponse({
            //     testName: testName,
            //     subTestName: SubTestName,
            //     value: value,
            // }),            
            testStrings: testStrings,
            strings: strings,
        }}
            {...props as P}
        />
    );
}

export default withTestResponse;
export type { WithTestResponseProps };
