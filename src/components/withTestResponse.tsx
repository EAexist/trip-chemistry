import { connect, useSelector } from "react-redux";
import { useSetResponse, useSetBudgetResponse } from "../reducer/testResponseReducer";
import { RootState } from "../store";
import { BudgetResponse, BudgetResponseKey, TestResponse, TestResponseKey } from "../interface/interfaces";

const withTestResponse = <T extends {}>(WrappedComponent: React.ComponentType<T>) => (testName: TestResponseKey, isBudget: boolean) => (props: T) => {
    
    const response = useSelector((state:RootState)=>(state.testResponse[testName as TestResponseKey]));

    // const response = useSelector((state:RootState)=>(state.testResponse.leadership)) as number;
    const setResponse = useSetResponse();
    const setBudgetResponse = useSetBudgetResponse();

    return (
        <WrappedComponent 
            testName = {testName}
            response = {response}
            setResponse = {(value: number) => setResponse({
                testName: testName,
                value: value
            })}
            setBudgetResponse = {(value: number, budgetName: BudgetResponseKey) => setBudgetResponse({
                testName: testName,
                budgetName: budgetName,
                value: value
            })}
            {...props as T}
        />
    );
}

export default withTestResponse;

