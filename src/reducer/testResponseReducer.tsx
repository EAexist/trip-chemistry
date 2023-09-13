import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TestResponse, BudgetResponseKey } from "../interface/interfaces";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

interface TestResponseState extends TestResponse {}; 

type TestResponseKey = keyof TestResponseState;

interface testResponsePayload{
    testName: TestResponseKey;
    value: TestResponse[TestResponseKey];
};

interface budgetTestResponsePayload extends testResponsePayload{
    budgetName: BudgetResponseKey;
};

const initialState : TestResponse = {
    leadership : undefined,
    schedule : undefined,
    budgetAverage : {
        food: undefined,
        accomodate: undefined
    },
    budgetSpecial : {
        food: undefined,
        accomodate: undefined
    },
    activityPreference : undefined
};

const testResponseSlice = createSlice({
    name: 'testResponse',
    initialState: initialState,
    reducers:
    {
        setResponse : (state, action: PayloadAction<testResponsePayload>) => {
            console.log(`testResponseSlice - setResponse - state=${JSON.stringify(state)} payload=${action.payload}` );
            return {...state,
                [action.payload.testName] : action.payload.value
            };
        },
        setBudgetResponse : (state, action: PayloadAction<budgetTestResponsePayload>) => {
            console.log(`testResponseSlice - setBudgetResponse - value=${action.payload.value}`)
            return {...state,
                [action.payload.testName] : {
                    ...state[action.payload.testName] as {},
                    [action.payload.budgetName]: action.payload.value
                }
            };
        }
    }
});

const useSetResponse = () => {
    const dispatch = useDispatch();
    return useCallback((payload: testResponsePayload) => 
        dispatch(testResponseSlice.actions.setResponse(payload))
    , [dispatch]);
}

const useSetBudgetResponse = () => {
    const dispatch = useDispatch();
    return useCallback((payload: budgetTestResponsePayload) => 
        dispatch(testResponseSlice.actions.setBudgetResponse(payload))
    , [dispatch]);
}

/* Deprecated */
// function testResponseReducer(state=initialState, action: testResponseAction) {
//     switch(action.type) {
//         case SET : 
//             return {...state,
//                 [action.payload.testName] : action.payload.value
//             };
//         case SETBUDGET : 
//             return {...state,
//                 [action.payload.testName] : {
//                     ...state[action.payload.testName] as {},
//                     [action.payload.budgetName]: action.payload.value
//                 }
//             };
//         default : 
//             return state;
//     }
// }

/* Deprecated */
// const mapState = (testResponsekey: TestResponseKey) => (state: RootState) => ({
//     response: state.testResponse[testResponsekey]
// });

// const mapDispatch = (testName : TestResponseKey) => (
//     {   
//         setResponse: (value: TestResponse[TestResponseKey]) => {testResponseSlice.actions.setResponse({
//         testName: testName,
//         value: value
//     })},
//         setBudgetResponse: (budgetName: BudgetResponseKey, value: BudgetResponse[BudgetResponseKey]) => {testResponseSlice.actions.setBudgetResponse({
//         testName: testName,
//         budgetName: budgetName,
//         value: value
//     })}, 
//     }
// );

// const connector = (testResponsekey: TestResponseKey) => connect(
//     mapState(testResponsekey), 
//     mapDispatch(testResponsekey)
// )

// type PropsFromReduxTestResponse = ConnectedProps<typeof connector>;

// const useConnectTestResponse = (component : React.ComponentType) => {
//     const mapStateToProps = (state : RootState, testResponsekey: TestResponseKey) => ({
//         response: state.testResponse
//     });
      
//     const mapDispatchToProps = testResponseSlice.actions   
    
//     return(
//         connect(mapStateToProps, mapDispatchToProps)(component)
//     )
// }

export default testResponseSlice.reducer;
export { useSetResponse, useSetBudgetResponse }
export type { testResponsePayload }