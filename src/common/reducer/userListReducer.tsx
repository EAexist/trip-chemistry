import { createSlice, PayloadAction, createAsyncThunk, ThunkDispatch } from "@reduxjs/toolkit";
import { TestResult, TripCharacter, UserId } from "../types/interfaces";
import { useServerAPI } from "../utils/useServerApi";
import { useHandleLoadSuccess } from "../hook/useHandleLoadSuccess";
import { shallowEqual, useDispatch } from "react-redux";
import { ComponentType, useCallback, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../store";
import { useSelector } from "react-redux";
import { SubTestName, TestIndex, TestName, TestResponse, InterfaceWithLoadStatus } from "./testResponseReducer";
import { LoadStatus, LoadStatusProps } from "../types/loadStatus";
import { usePageString, useTestString } from "../../texts";
import { TestResponseState } from "../types/TestResponse";
import { useHandleApiSuccess } from "../../legacy/ApiLoader";

interface UserDataState {
    userIdList: UserId[]
    userDataObject: UserDataObject; 
    chemistry: Chemistry;
    currentloadUser: UserId | undefined; 
    loadStatus: LoadStatus; 
}; 

type UserDataObject = {[userId: UserId]: UserData};

interface UserData {
    // LoadStatus: LoadStatus; 
    testResponse: InterfaceWithLoadStatus<TestResponse>;
    testResult: InterfaceWithLoadStatus<TestResult>;
};
type UserDataKey = keyof UserData

type Chemistry = InterfaceWithLoadStatus<{
    leader: UserId[]; 
}>;

const userName ='디클1234'

const initialState : UserDataState = {
    userIdList: [],
    userDataObject: {
        [ userName ]: {
            testResponse: {
                data: {} as TestResponse,
                loadStatus: LoadStatus.PENDING,
            },
            testResult: {
                data: {} as TestResult,
                loadStatus: LoadStatus.PENDING,
            }
        }
    },
    chemistry: {
        loadStatus: LoadStatus.PENDING,
        data: {
            leader: ["디클1234"],
        } 
    },
    // getResultCallerList: [],
    // nextCallerId: 0,
    currentloadUser: undefined,
    loadStatus: LoadStatus.PENDING,
};

const asyncSearchUser = createAsyncThunk("userList/searchUser", 
    async (userId: UserId, thunkAPI) => {
        console.log("Called: asyncSearchUser")
        try{
            const data = await useServerAPI({
                path:`user/${userId}`,
                fetchProps:{
                    method: "GET", 
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            })
            console.log(`asyncSearchUser:${JSON.stringify(data)}`);
            return { userId: userId };
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const asyncGetTestResult = createAsyncThunk("userList/getResult", 
    async (userId: UserId, thunkAPI) => {
        console.log("Called: asyncGetTestResult");
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
            console.log(`asyncGetTestResult:${JSON.stringify(data)}`);
            return { userId: userId, testResult: data };
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const asyncGetTestResponse = createAsyncThunk("userList/getResponse", 
    async (userId: UserId, thunkAPI) => {
        console.log("Called: asyncGetTestResponse");

        try{
            const data = await useServerAPI({
                path:`user/${userId}/response`,
                fetchProps:{
                    method: "GET", 
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            })
            console.log(`asyncGetTestResponse:${JSON.stringify(data)}`);
            return { userId: userId, testResponse: data };
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const asyncGetChemistry = createAsyncThunk("userList/getChemistry", 
    async (userIdList: UserId[], thunkAPI) => {
        console.log("Called: asyncGetChemistry")
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
            console.log(`asyncGetChemistry:${JSON.stringify(data)}`);
            return { userIdList: userIdList, chemistry: data };
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);


const userDataSlice = createSlice({
    name: 'userData',
    initialState: initialState,
    reducers: {
        addUser : (state, action: PayloadAction<UserId>) => {
            if ( Object.keys(state.userDataObject).includes( action.payload ) ){
                console.log("userData.addUser: warning: id already exists.")
            }
            else {
                state.userDataObject[action.payload] = {
                    testResponse: {
                        data : {
                            
                        } as TestResponse,
                        loadStatus: LoadStatus.PENDING
                    },
                    testResult: {
                        data : {} as TestResult,
                        loadStatus: LoadStatus.PENDING
                    }
                };
            }
            // if ( state.userIdList.includes( action.payload ) ){
            //     console.log("userData.addUser: warning: id already exists.");
            // }
            // else {
            //     state.userIdList.push( action.payload );
            // }
        },
        setStatus: (state, action: PayloadAction<{loadStatus : LoadStatus, userId?: UserId, userDataKey?: keyof UserData}>) => {
            if (action.payload.userId !== undefined){
                if (action.payload.userDataKey !== undefined){
                    state.userDataObject[action.payload.userId][action.payload.userDataKey].loadStatus = action.payload.loadStatus; 
                }
            }
            else {
                state.loadStatus = action.payload.loadStatus;
            }
        },
        setStatusAll: (state, action: PayloadAction<{loadStatus : LoadStatus, userDataKey: keyof UserData}>) => {
            Object.entries( state.userDataObject ).forEach(([, userData]) => {
                userData[action.payload.userDataKey].loadStatus = action.payload.loadStatus; 
            })
        },
        setChemistryLoadStatus: (state, action: PayloadAction<LoadStatus>) => {
            state.chemistry.loadStatus = action.payload;
        },
        // add: (state, action: PayloadAction<UserId>) => {
        //     if(! Object.keys(state.userDataObject).includes(action.payload)){
        //         state.userDataObject = {...state.userDataObject, [action.payload]:{}};
        //     }
        // },
        setCurrentloadUser: (state, action: PayloadAction<UserId>) => {
            state.currentloadUser = action.payload;
        },
        deleteUser: (state, action: PayloadAction<UserId>) => {
            delete state.userDataObject[action.payload];
        },
    },
    extraReducers:(builder) => {

        /* asyncGetTestResult */
        builder.addCase(asyncGetTestResult.fulfilled, (state, action: PayloadAction<{userId: UserId, testResult: TestResult}>) => {
            console.log(`asyncGetTestResult.fulfilled:\n    users=${Object.keys(state.userDataObject)}\n   action.payload=${JSON.stringify(action.payload)}\n   loadStatus=${state.userDataObject[action.payload.userId].testResult.loadStatus}`)

            if(Object.keys(state.userDataObject).includes(action.payload.userId)){
                state.userDataObject[action.payload.userId].testResult = {       
                    data:{
                        tripTagList: action.payload.testResult.tripTagList || [], 
                        tripCharacter: action.payload.testResult.tripCharacter || {} as TripCharacter 
                    },
                    loadStatus: LoadStatus.SUCCESS, 
                }
            }     
        });
        builder.addCase(asyncGetTestResult.pending, (state, action) => {
            console.log(`asyncGetTestResult.pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.userDataObject[action.meta.arg].testResult.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncGetTestResult.rejected, (state, action) => {
            console.log(`asyncGetTestResult.rejected`);
            state.userDataObject[action.meta.arg].testResult.loadStatus = LoadStatus.FAIL;

        });
        
        /* asyncGetTestResponse */
        builder.addCase(asyncGetTestResponse.fulfilled, (state, action: PayloadAction<{userId: UserId, testResponse: TestResponse}>) => {
            console.log(`asyncGetTestResponse.fulfilled: userId=${action.payload.userId} action.payload=${JSON.stringify(action.payload)}`);

            if(Object.keys(state.userDataObject).includes(action.payload.userId)){
                state.userDataObject[action.payload.userId].testResponse = {   
                    data: action.payload.testResponse, 
                    loadStatus: LoadStatus.SUCCESS, 
                }
            };
        });
        builder.addCase(asyncGetTestResponse.pending, (state, action) => {
            console.log(`asyncGetTestResponse.pending`);             
            state.userDataObject[action.meta.arg].testResponse.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncGetTestResponse.rejected, (state, action) => {
            console.log(`asyncGetTestResponse.rejected`);
            state.userDataObject[action.meta.arg].testResponse.loadStatus = LoadStatus.FAIL;
        });

        /* asyncGetChemistry */
        builder.addCase(asyncGetChemistry.fulfilled, (state, action: PayloadAction<{userIdList: UserId[], chemistry: any}>) => {
            console.log(`asyncGetChemistry.fulfilled: users=${Object.keys(action.payload.userIdList)} action.payload=${JSON.stringify(action.payload)}`)
            state.chemistry = {
                data: action.payload.chemistry,
                loadStatus: LoadStatus.SUCCESS,
            } 
        });
        builder.addCase(asyncGetChemistry.pending, (state, action) => {
            console.log(`asyncGetChemistry.pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.chemistry.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncGetChemistry.rejected, (state, action) => {
            console.log(`asyncGetChemistry.rejected`);
            state.chemistry.loadStatus = LoadStatus.FAIL;
        });
    },
})

const useUserDataObject = () => {
    return(useSelector(( state:RootState ) => state.userData.userDataObject ));
}

const useUserIdList = () => {
    const userIdList = useSelector(( state:RootState ) => Object.keys( state.userData.userDataObject ), shallowEqual);
    // const userIdList = useSelector(( state:RootState ) => state.userData.userIdList );
    useEffect(()=>{
        console.log(`useUserIdList: userIdList=${userIdList}`);
    }, [ userIdList ])
    /* Use ShallowEqual */
    return ( userIdList );
}

const useTestResponseObject = ( testIndex: TestIndex ) => {

    const ob = useSelector(( state:RootState ) => state.userData.userDataObject);
    useEffect(()=>{
        Object.entries( ob ).map(( [ userId, userData ] ) => {
            console.log(`useTestResponseObject: userId=${ userId }, loadStatus=${ userData.testResponse.loadStatus }`);            
        })
    }, [ ob ])

    return(
        useSelector(( state:RootState ) => 
            Object.fromEntries(
                Object.entries( state.userData.userDataObject ).filter(([ , userData ]) => userData.testResponse.loadStatus === LoadStatus.REST )
                .map( ([ userId, userData ])=>
                    [userId, userData.testResponse.data[testIndex.testName][testIndex.testName]]
                )
            ), shallowEqual   
        )
    );
};

const useTestResultObject = () => {
    return(
        useSelector(( state:RootState ) => 
            Object.fromEntries(
                Object.entries( state.userData.userDataObject ).map( ([ userId, userData ])=>
                    [userId, userData.testResult.data]
                )
            )
        )
    );
};

const useChemistry = () => {
    return(useSelector(( state:RootState )=>state.userData.chemistry));
}

const useFindUser = () => {
    const userIdList = useUserIdList();
    
    return useCallback((userId: UserId) => (
        userIdList.includes(userId) 
    )        
    , [userIdList]);    
}


/* 데이터 Fetch, 로드 상태 관리, 로드 전 초기 렌더 방지. */

/* 1 userId */
const useLoadData = ( userId : UserId, userDataKey : UserDataKey ) => {
    const [ doWaitApi, setDoWaitApi ] = useState<boolean>(true);
    const [ status, setStatus ] = useLoadStatus( userId, userDataKey );

    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

    /* 테스트 결과 Fetch */
    useEffect(() => {
        dispatch(userDataSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, userId, userDataKey}));
        if(userDataKey === 'testResult'){
            dispatch(asyncGetTestResult(userId));
        }
        else if(userDataKey === 'testResponse'){                
            dispatch(asyncGetTestResponse(userId));
        }
        setDoWaitApi(false);
    }, [ userId, userDataKey, dispatch ]);

    useEffect(()=>{
        if(status === LoadStatus.SUCCESS){
            setStatus(LoadStatus.REST);
        }
    }, [ status, setStatus ])

    return ({ status: status, setStatus: setStatus, doWaitApi: doWaitApi });
};

const useHandleSuccessAll = ( status : LoadStatus, setStatus: ( loadStatus: LoadStatus ) => void, userDataKey : UserDataKey ) => {
    const dispatch = useDispatch();
    const isSuccess = status === LoadStatus.SUCCESS;

    useEffect(()=>{
        console.log(`useHandleSuccessAll: useEffect[ status === LoadStatus.SUCCESS ]: status=${status}`);
        if( status === LoadStatus.SUCCESS ){
            dispatch(setStatusAll({ loadStatus: LoadStatus.REST, userDataKey : userDataKey }));
            setStatus( LoadStatus.REST );        
        }        
    }, [ isSuccess ])
}

/* All Users */
const useLoadDataAll = ( userDataKey : UserDataKey ) => {
    const [ doWaitApi, setDoWaitApi ] = useState<boolean>(true);
    const [ status, setStatus ] = useLoadStatusAll( userDataKey );
    const userIdList : UserId[] = useUserIdList();

    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

    useEffect(()=>{
        console.log(`useLoadDataAll`);
    }, [])    
    useEffect(()=>{
        console.log(`useLoadDataAll: userIdList`);
    }, [userIdList])
    useEffect(()=>{
        console.log(`useLoadDataAll userDataKey`);
    }, [userDataKey])

    /* 테스트 결과 Fetch */

    const getDataAll =  useCallback(()=>{
        console.log(`useLoadDataAll: useEffect: userIdList=${userIdList} userDataKey=${userDataKey}`);

        const fetch = userDataKey === 'testResult' ? 
            ( userId : UserId ) => dispatch(asyncGetTestResult( userId )) 
            : ( userId : UserId ) => dispatch(asyncGetTestResponse( userId ));

        userIdList.forEach(( userId )=>{        
            dispatch(userDataSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, userId, userDataKey}));
            fetch( userId );
        })
        setDoWaitApi(false);
    }, [ userIdList, userDataKey, dispatch ]);

    return ({ 
        getDataAll: getDataAll,
        status: status, 
        setStatus: setStatus, 
        doWaitApi: doWaitApi });
};

// const useGetResult = () => {
//     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
//     return useCallback((userId: UserId) => {
//         console.log("userListReducer: useGetResult");        
//         dispatch(userDataSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, userId: userId, userDataKey: 'testResult'}));
//         if(true) dispatch(asyncGetTestResult(userId));
//     }
//     , [dispatch]);
// }

// const useGetTestResponse = () => {
//     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
//     return useCallback((userId: UserId) => {
//         console.log("userListReducer: useGetTestResponse");        
//         dispatch(userDataSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, userId: userId, userDataKey: 'testResponse'}));
//         dispatch(asyncGetTestResponse(userId));
//     }
//     , [dispatch]);
// }

const useGetChemistry = () => {
    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    return useCallback((userIdList: UserId[]) => {
        console.log("userListReducer: useGetChemistry");        
        dispatch(userDataSlice.actions.setChemistryLoadStatus(LoadStatus.PENDING));
        dispatch(asyncGetChemistry(userIdList));
    }
    , [dispatch]);
}

const useLoadStatus = ( userId : UserId, userDataKey : UserDataKey ) => {
    const isAdded = useUserIdList().includes( userId );
    const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    return ([
        useSelector(( state:RootState ) => isAdded ? state.userData.userDataObject[userId][userDataKey].loadStatus : undefined),
        useCallback(( loadStatus : LoadStatus ) => {
            if ( isAdded ){
                dispatch(userDataSlice.actions.setStatus({ loadStatus, userId, userDataKey }));
            }
        }, [ dispatch, userId, userDataKey, isAdded ])
    ] as const);
}

const useLoadStatusAll = ( userDataKey : UserDataKey ) => {
    
    const [ status, setStatus ] = useState<LoadStatus>( LoadStatus.PENDING );

    /* 리스트의 모든 user 에 대한 loadStatus 리스트 */
    const loadStatusList : LoadStatus[] = useSelector(( state:RootState ) =>
        Object.entries(state.userData.userDataObject).map(([, userData]) => 
            userData[userDataKey].loadStatus
        )
    )

    /* 리스트의 모든 loadStatus를 조합해 최종 loadStatus 를 반환. */
    useEffect(()=>{
        console.log(`useLoadStatusAll: userDataKey=${userDataKey} useEffect[ loadStatusList ]: loadStatusList=${loadStatusList} status=${status}`);
        if( status === LoadStatus.PENDING || status === LoadStatus.REST ){
            if( loadStatusList.includes( LoadStatus.FAIL ) ){
                setStatus( LoadStatus.FAIL );
            } 
            else if( loadStatusList.includes( LoadStatus.MISS ) ){
                setStatus( LoadStatus.MISS );            
            } 
            else if ( loadStatusList.every( (status) => (status === LoadStatus.SUCCESS) ) ){      
                console.log('useLoadStatusAll: useEffect: SCUEESS')          
                setStatus( LoadStatus.SUCCESS );            
            }
        }
        // else if( status === LoadStatus.REST ){
        //     if( loadStatusList.includes( LoadStatus.PENDING ) ){
        //         setStatus( LoadStatus.PENDING );
        //     } 
        // }
    }, [ loadStatusList ])

    return ([ status, setStatus ] as const);
}

const useChemistryLoadStatus = () => {
    const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

    return ([
        useSelector(( state:RootState )=>state.userData.chemistry.loadStatus),
        useCallback((status: LoadStatus) =>
        dispatch( userDataSlice.actions.setChemistryLoadStatus(status) )
    , [ dispatch ]),
    ] as const);
}

// const withUserListLoadStatus = <T extends LoadStatusProps>(WrappedComponent: ComponentType<T>) =>
//     (userName?: UserId) =>
//     (props: Omit<T, keyof LoadStatusProps>) => {        
//     const [status, setStatus] = useLoadStatus({ userId: userName });
//     return(
//         <WrappedComponent {...{status:status, setStatus:setStatus}} {...props as T}/>
//     ); 
// }

interface useValueToUserListProps{};

const useValueToUserList = ( testIndex : TestIndex ) => {
    
    /* @TODO 완성 후 testResponseDefault 제거 */
    // const testResponseDefault = useSelector(( state:RootState )=>(state.testResponse.data[testIndex.testName][testIndex.subTestName]));
    const testResponseObject = useTestResponseObject( testIndex );
    let valueToUserList : {[value: string] : UserId[]} = {};

    /* Debug */
    useEffect(()=>{
        console.log(`useValueToUserList`);
    }, [])

    Object.entries( testResponseObject ).forEach(( [ userId, value ] )=>{
        // const value_= ( value ? value : testResponseDefault)?.toString() as string;  
        const value_= value?.toString() as string;  
        if( value_ ){
                if( Object.keys(valueToUserList).includes( value_ ) ){
                    valueToUserList[ value_ ].push( userId );
                }
                else {
                    valueToUserList[ value_ ] = [ userId ];
                }
        }
    });        
    
    return(valueToUserList);
}

export default userDataSlice.reducer;
export const { addUser, deleteUser, setStatusAll } = userDataSlice.actions;
export { asyncGetTestResult };
export { useUserIdList, useChemistry, useLoadStatus, useLoadStatusAll,
    useLoadData, useLoadDataAll, 
    useTestResponseObject, useTestResultObject,
    useGetChemistry, 
    // useGetResult, useGetTestResponse, 
    useChemistryLoadStatus,  
    useFindUser, useValueToUserList, useHandleSuccessAll };

export type { UserDataKey };

/* Deprecated */
// function userDataObjectReducer(state=initialState, action: userDataObjectAction) {
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