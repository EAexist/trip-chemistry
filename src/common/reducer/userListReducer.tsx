import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { TestResult, TripCharacter, UserId } from "../interface/interfaces";
import { useServerAPI } from "../utils/useServerApi";
import { loadStatus } from "../hocs/ApiLoader";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { AppDispatch, RootState } from "../store";
import { useSelector } from "react-redux";
import { TestResponse } from "./testResponseReducer";

interface UserListState { 
    userList: UserList; 
    chemistry: any;
    loadStatus: loadStatus; 
}; 

type UserList = {[userId: UserId]: UserData};

interface UserData {
    testResponse?: TestResponse;
    testResult?: TestResult;
};

interface userListPayload{
    userId: UserId,
    value: TestResult,
};

const initialState : UserListState = {
    userList:{},
    chemistry: undefined,
    loadStatus:loadStatus.PENDING,
};

const asyncGetResultById = createAsyncThunk("user/id/result", 
    async (userId: UserId, thunkAPI) => {
        console.log("Called: asyncGetResultById")
        try{
            const data = await useServerAPI({
                path:`user/${userId}/result`,
                fetchProps:{
                    method: "GET", 
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            })
            console.log(`asyncGetResultById:${JSON.stringify(data)}`);
            return {userId: userId, testResult: data};
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
        add: (state, action: PayloadAction<UserId>) => {
            if(! Object.keys(state.userList).includes(action.payload)){
                state.userList = {...state.userList, [action.payload]:{}};
            }
        },
        delete: (state, action: PayloadAction<UserId>) => {
            delete state.userList[action.payload];
        },
    },
    extraReducers:(builder) => {
        builder.addCase(asyncGetResultById.fulfilled, (state, action: PayloadAction<{userId: UserId, testResult: TestResult}>) => {
            console.log(`asyncGetResultById.fulfilled: users=${Object.keys(state.userList)}`)
            state.userList[action.payload.userId].testResult = {
                tripTagList: action.payload.testResult.tripTagList || [], 
                tripCharacter: action.payload.testResult.tripCharacter || {} as TripCharacter
            } as TestResult;

            console.log(`asyncGetResultById.fulfilled - 
            \naction.payload=${JSON.stringify(action.payload)} 
            \nstate.userList[${action.payload.userId}]=${JSON.stringify(state.userList[action.payload.userId])}`);

            state.loadStatus = loadStatus.REST;
        });
        builder.addCase(asyncGetResultById.pending, (state) => {
            console.log(`asyncGetResultById.pending`);
            state.loadStatus = loadStatus.PENDING;
        });
        builder.addCase(asyncGetResultById.rejected, (state) => {
            console.log(`asyncGetResultById.rejected`);
            state.loadStatus = loadStatus.FAIL;
        });
    },
})

const useUserList = () => {
    return(useSelector((state:RootState)=>state.userList.userList));
}

const useGetResultById = () => {
    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    return useCallback((userId: UserId) => {
        dispatch(userListSlice.actions.add(userId));
        dispatch(asyncGetResultById(userId));
    }
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
//                     [action.payload.SubTestName]: action.payload.value
//                 }
//             };
//         default : 
//             return state;
//     }
// }

export default userListSlice.reducer;
export { useUserList, useGetResultById, useUserListLoadStatus, }