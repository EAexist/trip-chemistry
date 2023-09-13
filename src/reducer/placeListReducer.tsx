import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserId, TestResultSummary, TestResult } from "../interface/interfaces";
import { useServerAPI } from "../components/utils/useServerApi";
import { loadStatus } from "../components/ApiLoader";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { AppDispatch, RootState } from "../store";
import { useSelector } from "react-redux";


interface PlaceListState { 
    placeList: Place[];
    nationFilter: {[key: NationId]: boolean};
    loadStatus: loadStatus; 
}; 
interface Place{
    id: string;
    name: string;
    body: string;
    tripTagList: string[]
};

type NationId = string;

// interface placeListPayload{
//     userId: UserId,
//     value: TestResult,
// };

const initialState: PlaceListState = {placeList:[], nationFilter:{}, loadStatus:loadStatus.PENDING};

const fetchPlaceListById = createAsyncThunk("user/id/placeList", 
    async (userId: UserId, thunkAPI) => {
        try{
            const data = await useServerAPI({
                path:`user/${userId}/placeList`,
                fetchProps:{
                    method: "GET", 
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: undefined,
                }
            })
            console.log(`fetchPlaceListById:${JSON.stringify(data)}`);
            return data;
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const placeListSlice = createSlice({
    name: 'placeList',
    initialState: initialState,
    reducers: {
        // add : (state, action: PayloadAction<placeListPayload>) => {
        //     if (action.payload.value) 
        //     state[action.payload.userId] = action.payload.value;
        // },
        setStatus: (state, action: PayloadAction<loadStatus>) => {
            state.loadStatus = action.payload;
        },
        activateNation: (state, action: PayloadAction<NationId>) => {
            state.nationFilter[action.payload] = true;
        },
        deActivateNation: (state, action: PayloadAction<NationId>) => {
            state.nationFilter[action.payload] = false;
        },
    },
    extraReducers:(builder) => {
        builder.addCase(fetchPlaceListById.fulfilled, (state, action: PayloadAction<{placeList:Place[], nationIdList: NationId[]}>) => {
            state.placeList = action.payload.placeList;
            state.nationFilter = Object.fromEntries(
                action.payload.nationIdList?.map(k => [k, true]) || []
            );

            console.log(`fetchPlaceListById.fulfilled - 
            \naction.payload=${JSON.stringify(action.payload)}`);

            state.loadStatus = loadStatus.REST;
        });
        builder.addCase(fetchPlaceListById.pending, (state) => {
            console.log(`fetchResultById.pending`);
            state.loadStatus = loadStatus.PENDING;
        });
        builder.addCase(fetchPlaceListById.rejected, (state) => {
            console.log(`fetchResultById.rejected`);
            state.loadStatus = loadStatus.FAIL;
        });
    },
})

const usePlaceList = () => {
    return([
        useSelector((state:RootState)=>state.placeList.placeList),
        useSelector((state:RootState)=>state.placeList.nationFilter),
    ] as const);
}

const useFetchPlaceListById = () => {
    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    return useCallback((userId: UserId) => 
        dispatch(fetchPlaceListById(userId))
    , [dispatch]);
}

const usePlaceListLoadStatus = () => {
    const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    const status = useSelector((state:RootState)=>state.placeList.loadStatus);
    return ([
        status,
        useCallback((status: loadStatus) =>
            dispatch(placeListSlice.actions.setStatus(status))
        , [dispatch])
    ] as const);
}

export default placeListSlice.reducer;
export { usePlaceList, useFetchPlaceListById, usePlaceListLoadStatus }