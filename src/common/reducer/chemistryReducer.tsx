import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { TestResult, UserId } from "../types/interfaces";
import { useServerAPI } from "../utils/useServerApi";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { AppDispatch, RootState } from "../store";
import { useSelector } from "react-redux";
import { useUserList } from "./userListReducer";
import { TestResponse } from "./testResponseReducer";
import { LoadStatus } from "../types/loadStatus";


interface ChemistryState { 
    userData: {[userid: UserId]: {
        testResponse: TestResponse
        testResult: TestResult
    }};
    chemistry: any
    LoadStatus: LoadStatus; 
}; 
interface Place {
    id: string;
    name: string;
    body: string;
    tripTagList: string[]
};

// interface chemistryPayload{
//     userId: UserId,
//     value: TestResult,
// };
const getUserIdString = (userIdList: UserId[]) => (userIdList.sort().join(','));

const initialState: ChemistryState = {userData:{}, chemistry:{}, LoadStatus:LoadStatus.PENDING};

const fetchChemistryByIdList = createAsyncThunk("user/chemistry/idList", 
    async (userIdList: UserId[], thunkAPI) => {
        try{
            const data = await useServerAPI({
                path:`user/chemistry/${getUserIdString(userIdList)}`,
                fetchProps:{
                    method: "GET", 
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: undefined,
                }
            })
            console.log(`fetchChemistryByIdList:${JSON.stringify(data)}`);
            return data;
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const chemistrySlice = createSlice({
    name: 'chemistry',
    initialState: initialState,
    reducers: {
        // add : (state, action: PayloadAction<chemistryPayload>) => {
        //     if (action.payload.value) 
        //     state[action.payload.userId] = action.payload.value;
        // },
        setTestResult: (state, action: PayloadAction<{[userId: UserId]: TestResult}>) => {
            Object.entries(action.payload)?.map(([userId, testResult])=>{
                state.userData[userId].testResult = testResult;    
            }) 
        },
        setStatus: (state, action: PayloadAction<LoadStatus>) => {
            state.LoadStatus = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder.addCase(fetchChemistryByIdList.fulfilled, (state, action: PayloadAction<{
            userData: {[userid: UserId]: TestResponse}
            chemistry:{}
        }>) => {
            /* Set TestResponses */
            Object.entries(action.payload.userData)?.map(([userId, testResponse])=>{
                state.userData[userId].testResponse = testResponse;    
            }) 
            
            /* Set Chemistry */
            state.chemistry = action.payload.chemistry;

            console.log(`fetchChemistryByIdList.fulfilled - 
            \naction.payload=${JSON.stringify(action.payload)}`);

            state.LoadStatus = LoadStatus.REST;
        });
        builder.addCase(fetchChemistryByIdList.pending, (state) => {
            console.log(`fetchChemistryByIdList.pending`);
            state.LoadStatus = LoadStatus.PENDING;
        });
        builder.addCase(fetchChemistryByIdList.rejected, (state) => {
            console.log(`fetchChemistryByIdList.rejected`);
            state.LoadStatus = LoadStatus.FAIL;
        });
    },
})

// const useChemistry = () => {
//     return([
//         useSelector((state:RootState)=>state.chemistry.chemistry),
//         useSelector((state:RootState)=>state.chemistry.nationFilter),
//     ] as const);
// }

    /* Initiate state based on userList */
// const useSetChemistryTestResult = () => {
//     const dispatch = useDispatch();
//     const userList = useUserList();   
//     dispatch(chemistrySlice.actions.setTestResult(userList));
// }

/* Fetch Chemistry from Id */
const useFetchChemistryByIdList = () => {
    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */   
    return useCallback((userIdList: UserId[]) => 
        dispatch(fetchChemistryByIdList(userIdList))
    , [dispatch]);
}

const useChemistryLoadStatus = () => {
    const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    const status = useSelector((state:RootState)=>state.chemistry.LoadStatus);
    return ([
        status,
        useCallback((status: LoadStatus) =>
            dispatch(chemistrySlice.actions.setStatus(status))
        , [dispatch])
    ] as const);
}

export default chemistrySlice.reducer;
export { useFetchChemistryByIdList, useChemistryLoadStatus }