import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { TestResult, TripCharacter, UserId } from "../types/interfaces";
import { useServerAPI } from "../utils/useServerApi";
import { useLoadStatus } from "../../common/hooks/useLoadStatus";
import { useDispatch } from "react-redux";
import { ComponentType, useCallback } from "react";
import { AppDispatch, RootState } from "../store";
import { useSelector } from "react-redux";
import { TestResponse } from "./testResponseReducer";
import { LoadStatus, LoadStatusProps } from "../types/loadStatus";

interface UserListState { 
    userList: UserList; 
    chemistry: any;
    // getResultCallerList: {[callerId: number]: LoadStatus};
    // nextCallerId: number;
    // loadingUserList: LoadingUserList
    currentloadUser: UserId | undefined; 
    LoadStatus: LoadStatus; 
}; 

const successToRestDelay = 3000;

type UserList = {[userId: UserId]: UserData};

interface UserData {
    // LoadStatus: LoadStatus; 
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
    // getResultCallerList: [],
    // nextCallerId: 0,
    currentloadUser: undefined,
    LoadStatus:LoadStatus.PENDING,
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
        setStatus: (state, action: PayloadAction<LoadStatus>) => {
            state.LoadStatus = action.payload;
        },
        // add: (state, action: PayloadAction<UserId>) => {
        //     if(! Object.keys(state.userList).includes(action.payload)){
        //         state.userList = {...state.userList, [action.payload]:{}};
        //     }
        // },
        setCurrentloadUser: (state, action: PayloadAction<UserId>) => {
            state.currentloadUser = action.payload;
        },
        delete: (state, action: PayloadAction<UserId>) => {
            delete state.userList[action.payload];
        },
    },
    extraReducers:(builder) => {
        builder.addCase(asyncGetResultById.fulfilled, (state, action: PayloadAction<{userId: UserId, testResult: TestResult}>) => {
            console.log(`asyncGetResultById.fulfilled: users=${Object.keys(state.userList)}`)

            /* Add to userlist */
            if(! Object.keys(state.userList).includes(action.payload.userId)){
                state.userList = {...state.userList, [action.payload.userId]:{
                    testResult: {
                        tripTagList: action.payload.testResult.tripTagList || [], 
                        tripCharacter: action.payload.testResult.tripCharacter || {} as TripCharacter
                    } as TestResult
                }};

            console.log(`asyncGetResultById.fulfilled - 
            \naction.payload=${JSON.stringify(action.payload)} 
            \nstate.userList[${action.payload.userId}]=${JSON.stringify(state.userList[action.payload.userId])}`);
            }     
            state.LoadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncGetResultById.pending, (state, action) => {
            console.log(`asyncGetResultById.pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.LoadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncGetResultById.rejected, (state, action) => {
            console.log(`asyncGetResultById.rejected`);
            state.LoadStatus = LoadStatus.FAIL;
        });
    },
})

const useUserList = () => {
    return(useSelector((state:RootState)=>state.userList.userList));
}


const useFindUser = () => {
    const userList = useSelector((state:RootState)=>state.userList.userList)

    return useCallback((userId: UserId) => (
        Object.keys(userList).includes(userId) 
    )        
    , [userList]);    
}

const useGetResultById = () => {
    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    return useCallback((userId: UserId) => {
        console.log("useGetResultById");
        
        dispatch(userListSlice.actions.setCurrentloadUser(userId));
        dispatch(userListSlice.actions.setStatus(LoadStatus.PENDING));
        dispatch(asyncGetResultById(userId));
    }
    , [dispatch]);
}
interface useUserListLoadStatusProps{
    userId?: UserId;
    delay?: number;
}
const useUserListLoadStatus = ({ userId, delay }: useUserListLoadStatusProps) => {
    const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    const currentloadUser = useSelector((state:RootState)=>state.userList.currentloadUser);
    const currentLoadStatus = useSelector((state:RootState)=>state.userList.LoadStatus);
    const status = userId && (userId !== currentloadUser) ?
        LoadStatus.REST
        : currentLoadStatus;
    const setStatus = useCallback((status: LoadStatus) =>
        dispatch(userListSlice.actions.setStatus(status))
    , [dispatch])
    // const successToRestSecond = useLoadStatus({ status, setStatus, delay });
    return ([
        status,
        setStatus,
        // successToRestSecond
    ] as const);
}

const withUserListLoadStatus = <T extends LoadStatusProps>(WrappedComponent: ComponentType<T>) =>
    (userName?: UserId) =>
    (props: Omit<T, keyof LoadStatusProps>) => {        
    const [status, setStatus] = useUserListLoadStatus({ userId: userName });
    return(
        <WrappedComponent {...{status:status, setStatus:setStatus}} {...props as T}/>
    ); 
}

export default userListSlice.reducer;
export { useUserList, useGetResultById, useUserListLoadStatus, withUserListLoadStatus, useFindUser };

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