import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { TestResult, TripCharacter, UserId } from "../types/interfaces";
import { useServerAPI } from "../utils/useServerApi";
import { useLoadStatus } from "../../common/hooks/useLoadStatus";
import { useDispatch } from "react-redux";
import { ComponentType, useCallback, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../store";
import { useSelector } from "react-redux";
import { SubTestName, TestIndex, TestName, TestResponse, useTestResponse } from "./testResponseReducer";
import { LoadStatus, LoadStatusProps } from "../types/loadStatus";
import { usePageString, useTestString } from "../../texts";

interface UserListState { 
    userList: UserList; 
    chemistry: Chemistry;
    currentloadUser: UserId | undefined; 
    loadStatus: LoadStatus; 
}; 

type UserList = {[userId: UserId]: UserData};

type Chemistry = {
    loadStatus: LoadStatus; 
}

interface UserData {
    // LoadStatus: LoadStatus; 
    testResponse?: TestResponse;
    testResult?: TestResult;
};

const initialState : UserListState = {
    userList: {},
    chemistry: {
        loadStatus: LoadStatus.PENDING
    },
    // getResultCallerList: [],
    // nextCallerId: 0,
    currentloadUser: undefined,
    loadStatus:LoadStatus.PENDING,
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
            return { userId: userId, testResult: data };
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const asyncGetChemistry = createAsyncThunk("user/idList/chemistry", 
    async (userIdList: UserId[], thunkAPI) => {
        console.log("Called: asyncGetChemistryById")
        try{
            const data = await useServerAPI({
                path:`user/${userIdList}/result`,
                fetchProps:{
                    method: "GET", 
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            })
            console.log(`asyncGetChemistryById:${JSON.stringify(data)}`);
            return { userIdList: userIdList, chemistry: data };
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
            state.loadStatus = action.payload;
        },
        setChemistryLoadStatus: (state, action: PayloadAction<LoadStatus>) => {
            state.chemistry.loadStatus = action.payload;
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

        /* asyncGetResultById */
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
            state.loadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncGetResultById.pending, (state, action) => {
            console.log(`asyncGetResultById.pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncGetResultById.rejected, (state, action) => {
            console.log(`asyncGetResultById.rejected`);
            state.loadStatus = LoadStatus.FAIL;
        });

        /* asyncGetChemistry */
        builder.addCase(asyncGetChemistry.fulfilled, (state, action: PayloadAction<{userIdList: UserId[], chemistry: any}>) => {
            console.log(`asyncGetChemistry.fulfilled: users=${Object.keys(state.userList)}`)
            state.chemistry = action.payload.chemistry;

            console.log(`asyncGetChemistry.fulfilled - 
            \naction.payload=${JSON.stringify(action.payload)} 
            `);
            state.loadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncGetChemistry.pending, (state, action) => {
            console.log(`asyncGetChemistry.pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncGetChemistry.rejected, (state, action) => {
            console.log(`asyncGetChemistry.rejected`);
            state.loadStatus = LoadStatus.FAIL;
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

const useResult = ( userId: UserId ) => {
    const [ doWaitApi, setDoWaitApi ] = useState<boolean>(true);
    const [ status, setStatus ] = useUserListLoadStatus({userId: userId});
    const getResultById = useGetResultById();
    useLoadStatus({ status, setStatus });

    /* 사용자 본인의 테스트 결과 Fetch. 최초 렌더링 시 1번만 호출. */
    useEffect(() => {
        getResultById(userId);
        setDoWaitApi(false);
    }, [ getResultById, userId ]);

    useLoadStatus({ status: status, setStatus: setStatus});

    return ({
        status: status, 
        doWaitApi: doWaitApi
    });
};

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

const useGetChemistry = () => {
    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    return useCallback((userIdList: UserId[]) => {
        console.log("useGetResultById");
        
        dispatch(userListSlice.actions.setChemistryLoadStatus(LoadStatus.PENDING));
        dispatch(asyncGetChemistry(userIdList));
    }
    , [dispatch]);
}

interface useUserListLoadStatusProps{
    userId?: UserId;
}
const useUserListLoadStatus = ({ userId }: useUserListLoadStatusProps) => {
    const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    const currentloadUser = useSelector((state:RootState)=>state.userList.currentloadUser);
    const currentLoadStatus = useSelector((state:RootState)=>state.userList.loadStatus);
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
const useChemistryLoadStatus = () => {
    const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

    return ([
        useSelector((state:RootState)=>state.userList.chemistry.loadStatus),
        useCallback((status: LoadStatus) =>
        dispatch(userListSlice.actions.setChemistryLoadStatus(status))
    , [dispatch]),
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
interface useValueToUserListProps extends TestIndex {
};

const useValueToUserList = ( { testName, subTestName } : useValueToUserListProps ) => {
    
    const userList = useUserList();
    const testResponseDefault = useSelector((state:RootState)=>(state.testResponse));
    const [ valueToUserList, setValueToUserList ] = useState<{[value: string] : UserId[]}>({});

    useEffect(() => {    
        (Object.entries(userList) as [k: UserId, v: { testResponse: TestResponse }][]).map(([userId, { testResponse }])=>{
            const testResponse_ = testResponse ? testResponse : testResponseDefault;  
            if(testResponse_){
                if(testResponse_[testName]){
                    const valueKey = testResponse_[testName]?.toString() as string;
                    console.log(`useValueToUserList: testResponse_[testName]=${valueKey}`)

                    setValueToUserList(prev => {
                        console.log(`useValueToUserList: testName=${testName} prev=${JSON.stringify(prev)}`);
                        return(
                            Object.keys(prev).includes(valueKey) ?
                            {
                                ...prev, 
                                [valueKey]: [...(prev[valueKey]),  userId]
                            }
                            :{
                                ...prev,                                 
                                [valueKey]: [userId]
                            }
                        );
                    })
                };
            }
            return null;
        });        
    }, [ userList, testName ]);

    return( valueToUserList );
}

export default userListSlice.reducer;
export { useUserList, useGetResultById, useResult, useGetChemistry, useUserListLoadStatus, useChemistryLoadStatus, withUserListLoadStatus, useFindUser, useValueToUserList };

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