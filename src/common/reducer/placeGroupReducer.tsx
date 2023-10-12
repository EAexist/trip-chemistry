import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserId } from "../interface/interfaces";
import { useServerAPI } from "../utils/useServerApi";
import { loadStatus } from "../hocs/ApiLoader";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { AppDispatch, RootState } from "../store";
import { useSelector } from "react-redux";


interface placeGroupState {
    placeGroupList: PlaceGroup[];
    loadStatus: loadStatus; 
}; 

interface PlaceGroup {
    name: string | undefined;
    group: Place[];
    nationFilter: {[key: NationId]: boolean};
};

interface Place{
    id: string;
    nationId: NationId;
    name: string;
    body: string;
    tripTagList: string[]
};

type NationId = string;

// interface groupPayload{
//     userId: UserId,
//     value: TestPlace,
// };

const initialState: placeGroupState = {placeGroupList: [], loadStatus:loadStatus.PENDING};

const fetchplaceGroupById = createAsyncThunk("user/id/placeGroup", 
    async (userId: UserId, thunkAPI) => {
        try{
            const data = await useServerAPI({
                path:`user/${userId}/placeGroup`,
                fetchProps:{
                    method: "GET", 
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: undefined,
                }
            })
            console.log(`fetchplaceGroupById:${JSON.stringify(data)}`);
            return data;
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const placeGroupSlice = createSlice({
    name: 'placeGroup',
    initialState: initialState,
    reducers: {
        // add : (state, action: PayloadAction<placeGroupPayload>) => {
        //     if (action.payload.value) 
        //     state[action.payload.userId] = action.payload.value;
        // },
        setStatus: (state, action: PayloadAction<loadStatus>) => {
            state.loadStatus = action.payload;
        },
        setNationFilter: (state, action: PayloadAction<{index: number, nationId: NationId, isOn: boolean}>) => {
            (state.placeGroupList[action.payload.index].nationFilter as {[key: NationId]: boolean})[action.payload.nationId] = action.payload.isOn;
        },
        // activateNation: (state, action: PayloadAction<string>) => {
        //     state.nationFilter[action.payload] = true;
        // },
        // deActivateNation: (state, action: PayloadAction<string>) => {
        //     state.nationFilter[action.payload] = false;
        // },
    },
    extraReducers:(builder) => {
        builder.addCase(fetchplaceGroupById.fulfilled, (state, action: PayloadAction<Place[]>) => {

            /* Convert nationFilter from string[] to {[key: string]: boolean} */
            const nationFilter = Object.fromEntries(
                Array.from(new Set(
                    action.payload.map(({nationId})=>nationId)
                ))
                .map((nationId)=>[nationId, true])
            ); 

            state.placeGroupList.push({
                name: "자연과 테마파크를 좋아하는 당신을 위한 여행지",
                group: action.payload,
                nationFilter: nationFilter
            });

            console.log(`fetchplaceGroupById.fulfilled - 
            \naction.payload=${JSON.stringify(action.payload)}`);

            state.loadStatus = loadStatus.REST;
        });
        builder.addCase(fetchplaceGroupById.pending, (state) => {
            console.log(`fetchPlaceById.pending`);
            state.loadStatus = loadStatus.PENDING;
        });
        builder.addCase(fetchplaceGroupById.rejected, (state) => {
            console.log(`fetchPlaceById.rejected`);
            state.loadStatus = loadStatus.FAIL;
        });
    },
})

const usePlaceGroup = (index: number) => {
    const placeGroupList = useSelector((state:RootState)=>state.placeGroup.placeGroupList);
    
    return( placeGroupList.length > 0 ? [
        placeGroupList[0].name,
        placeGroupList[0].group
    ] as const : [undefined, undefined] as const);
}

const useNationFilter = (index: number) => {
    const dispatch = useDispatch();
    const placeGroupList = useSelector((state:RootState)=>state.placeGroup.placeGroupList);

    return([
        placeGroupList.length > 0 ? placeGroupList[0].nationFilter : undefined,
        useCallback((nationId: NationId) => (isOn: boolean) =>
        placeGroupList.length > 0 && dispatch(placeGroupSlice.actions.setNationFilter({index, nationId, isOn}))
        , [dispatch])
    ] as const);
}

const useFetchPlaceGroupById = () => {
    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    return useCallback((userId: UserId) => 
        dispatch(fetchplaceGroupById(userId))
    , [dispatch]);
}

const usePlaceGroupLoadStatus = () => {
    const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    const status = useSelector((state:RootState)=>state.placeGroup.loadStatus);
    return ([
        status,
        useCallback((status: loadStatus) =>
            dispatch(placeGroupSlice.actions.setStatus(status))
        , [dispatch])
    ] as const);
}

export default placeGroupSlice.reducer;
export { usePlaceGroup, useFetchPlaceGroupById, useNationFilter, usePlaceGroupLoadStatus };
export type { NationId };