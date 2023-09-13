import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserId, TestResultSummary, TestResult } from "../interface/interfaces";
import { useServerAPI } from "../components/utils/useServerApi";
import { loadStatus } from "../components/ApiLoader";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { AppDispatch, RootState } from "../store";
import { useSelector } from "react-redux";

interface UserListState { 
    userList: UserList; 
    loadStatus: loadStatus; 
}; 

type UserList = {[userid: UserId]: TestResult}

interface userListPayload{
    userId: UserId,
    value: TestResult,
};

const initialState : UserListState = {userList:{}, loadStatus:loadStatus.PENDING};

const fetchResultById = createAsyncThunk("user/id/result", 
    async (userId: UserId, thunkAPI) => {
        try{
            const data = await useServerAPI({
                path:`user/${userId}/result`,
                fetchProps:{
                    method: "GET", 
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: undefined,
                }
            })
            console.log(`fetchResultById:${JSON.stringify(data)}`);
            return {userId: userId, data: data};
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const userListSlice = createSlice({
    name: 'userList',
    initialState: initialState,
    reducers: {
        // add : (state, action: PayloadAction<userListPayload>) => {
        //     if (action.payload.value) 
        //     state[action.payload.userId] = action.payload.value;
        // },
        setStatus: (state, action: PayloadAction<loadStatus>) => {
            state.loadStatus = action.payload;
        },
        delete: (state, action: PayloadAction<userListPayload>) => {
            delete state.userList[action.payload.userId];
        },
    },
    extraReducers:(builder) => {
        builder.addCase(fetchResultById.fulfilled, (state, action: PayloadAction<{userId: UserId, data: TestResult}>) => {
            state.userList[action.payload.userId] = action.payload.data as TestResult;

            console.log(`fetchResultById.fulfilled - 
            \naction.payload=${JSON.stringify(action.payload)} 
            \nstate.userList[${action.payload.userId}]=${JSON.stringify(state.userList[action.payload.userId])}`);

            state.loadStatus = loadStatus.REST;
        });
        builder.addCase(fetchResultById.pending, (state) => {
            console.log(`fetchResultById.pending`);
            state.loadStatus = loadStatus.PENDING;
        });
        builder.addCase(fetchResultById.rejected, (state) => {
            console.log(`fetchResultById.rejected`);
            state.loadStatus = loadStatus.FAIL;
        });
    },
})

const useUserList = () => {
    return(useSelector((state:RootState)=>state.userList.userList));
}

const useFetchResultById = () => {
    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    return useCallback((userId: UserId) => 
        dispatch(fetchResultById(userId))
    , [dispatch]);
}

const useUserListLoadStatus = () => {
    const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    const status = useSelector((state:RootState)=>state.userList.loadStatus);
    return ([
        status,
        useCallback((status: loadStatus) =>
            dispatch(userListSlice.actions.setStatus(status))
        , [dispatch])
    ] as const);
}

/* Deprecated */
// function userListReducer(state=initialState, action: userListAction) {
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

export default userListSlice.reducer;
export { useUserList, useFetchResultById, useUserListLoadStatus, }