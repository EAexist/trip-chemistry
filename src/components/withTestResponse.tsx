import { ComponentType } from "react";
import { useSetTestResponse, useTestResponse, TestResponse, TestName, SubTestName } from "../reducer/testResponseReducer";
import { usePageString } from "../texts";
// import { BudgetResponse, SubTestName, TestResponse, TestName } from "../interface/interfaces";

interface WithTestResponseProps{
    testName: TestName;
    subTestName: SubTestName;
    testResponse: number; 
    setTestResponse: (value: TestResponse[TestName]) => void;    
    strings: any;
    // setBudgetResponse?: (SubTestName: SubTestName, value: BudgetResponse[SubTestName]) => void;    
};

const withTestResponse = <P extends WithTestResponseProps>(WrappedComponent: ComponentType<P>) => 
    (testName: TestName, subTestName?: SubTestName) => 
    (props: Omit<P, keyof WithTestResponseProps>) => {
    
    const testResponse = useTestResponse(testName, subTestName);
    const setTestResponse = useSetTestResponse();
    const strings = subTestName? 
        usePageString('test')[testName as TestName].subTests[subTestName as SubTestName]
        : usePageString('test')[testName as TestName];

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
