import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useServerAPI } from "../utils/useServerApi";
import { UserId } from "../types/interfaces";
import { HttpStatusCode } from "axios";
import { LoadStatus } from "../types/loadStatus";

interface TestResponseState extends TestResponse{
    loadStatus: LoadStatus; 
};

interface TestResponse{
    leadership: number | undefined;       
    schedule: number | undefined;   
    budget: {
        food: number | undefined;
    }
    city: {
        metropolis: number | undefined;
        history: number | undefined;
        nature: number | undefined;
    };
    activity:{
        food: number | undefined;
        walk: number | undefined;
        shopping: number | undefined;
        mesuem: number | undefined;
        themePark: number | undefined;
    };
};

type subTestResponse = {[key: string]: number | undefined};

type SubTestName = keyof TestResponse['budget'] | keyof TestResponse['city']

type TestName = keyof TestResponse;

interface TestIndex{
    testName: TestName;
    subTestName?: SubTestName;
}

interface TestResponsePayload extends TestIndex{
    value: TestResponse[TestName];
};

const initialState : TestResponseState = {
    leadership : 2,
    schedule : 2,
    budget : {
        food: 2, /* 식사 평균 */
        // foodSpecial: 2, /* 특별한 식사 */
        // accomodate: 2, /* 숙소 평균 */
        // accomodateSpecial: 2, /* 특별한 숙소 */
    },
    city: {
        metropolis: 2,
        history: 2,
        nature: 2,
    },
    activity:{
        food: 2,
        walk: 2,
        shopping: 2,
        mesuem: 2,
        themePark: 2,
    },
    loadStatus: LoadStatus.PENDING,
};

interface asyncPutResponseByIdProps{
    userId: UserId;
    response: TestResponse;
};
const asyncPutResponseById = createAsyncThunk("user/id/response", 
    async ({userId, response}: asyncPutResponseByIdProps, thunkAPI) => {
        try{
            
            const path = `user/${userId}/response`;
            const fetchProps = {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(response)
            };

            const data = await fetch(path, fetchProps) 
                .then((response) => {
                    console.log(`useServerAPI- response=${JSON.stringify(response)}`);
                    if(!response.ok) throw new Error(response.statusText);
                    else return response.status;
                })

            console.log(`asyncPutResponseById: data=${JSON.stringify(data)}`);
            return data;
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const testResponseSlice = createSlice({
    name: 'testResponse',
    initialState: initialState,
    reducers:
    {
        setTestResponse : (state, action: PayloadAction<TestResponsePayload>) => {
            console.log(`testResponseSlice: setTestResponse: state=${JSON.stringify(state)} payload=${JSON.stringify(action.payload)}` );
            return {...state,
                [action.payload.testName] : 
                action.payload.subTestName === undefined ? 
                action.payload.value
                :{
                    ...state[action.payload.testName] as object,
                    [action.payload.subTestName as SubTestName]: action.payload.value
                }
            };
        },
        setStatus: (state, action: PayloadAction<LoadStatus>) => {
            state.loadStatus = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder.addCase(asyncPutResponseById.fulfilled, (state, action: PayloadAction<HttpStatusCode>) => {
            
            console.log(`asyncPutResponseById.fulfilled - 
            \naction.payload=${JSON.stringify(action.payload)}`);
            state.loadStatus = LoadStatus.REST;
        });
        builder.addCase(asyncPutResponseById.pending, (state) => {
            console.log(`asyncPutResponseById.pending`);
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncPutResponseById.rejected, (state) => {
            console.log(`asyncPutResponseById.rejected`);
            state.loadStatus = LoadStatus.FAIL;
        });
    },
});

const useTestResponse = (testName: TestName, SubTestName?: SubTestName) => (
    useSelector((state:RootState)=>((SubTestName? (state.testResponse[testName] as subTestResponse)[SubTestName] : state.testResponse[testName]))) as number
);

const useSetTestResponse = () => {
    const dispatch = useDispatch();
    return useCallback((payload: TestResponsePayload) => 
        dispatch(testResponseSlice.actions.setTestResponse(payload))
    , [dispatch]);
};

const usePutResponseById = () => {
    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    const { loadStatus, ...testResponse } = useSelector((state:RootState)=>state.testResponse)
    return useCallback((userId: UserId) => 
        dispatch(asyncPutResponseById({userId: userId, response: testResponse}))
    , [dispatch, testResponse]);
}

const useTestResponseStatus = () => {
    const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    const status = useSelector((state:RootState)=>state.testResponse.loadStatus);
    return ([
        status,
        useCallback((status: LoadStatus) =>
            dispatch(testResponseSlice.actions.setStatus(status))
        , [dispatch])
    ] as const);
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
//                     [action.payload.SubTestName]: action.payload.value
//                 }
//             };
//         default : 
//             return state;
//     }
// }

/* Deprecated */
// const mapState = (TestName: TestName) => (state: RootState) => ({
//     response: state.testResponse[TestName]
// });

// const mapDispatch = (testName : TestName) => (
//     {   
//         setTestResponse: (value: TestResponse[TestName]) => {testResponseSlice.actions.setTestResponse({
//         testName: testName,
//         value: value
//     })},
//         setBudgetResponse: (SubTestName: SubTestName, value: BudgetResponse[SubTestName]) => {testResponseSlice.actions.setBudgetResponse({
//         testName: testName,
//         SubTestName: SubTestName,
//         value: value
//     })}, 
//     }
// );

// const connector = (TestName: TestName) => connect(
//     mapState(TestName), 
//     mapDispatch(TestName)
// )

// type PropsFromReduxTestResponse = ConnectedProps<typeof connector>;

// const useConnectTestResponse = (component : ComponentType) => {
//     const mapStateToProps = (state : RootState, TestName: TestName) => ({
//         response: state.testResponse
//     });
      
//     const mapDispatchToProps = testResponseSlice.actions   
    
//     return(
//         connect(mapStateToProps, mapDispatchToProps)(component)
//     )
// }

export default testResponseSlice.reducer;
export { useTestResponse, useSetTestResponse, usePutResponseById, useTestResponseStatus }
export type { TestResponsePayload, TestResponse, TestName, SubTestName, TestIndex }