import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserId } from "../types/interfaces";
import { useServerAPI } from "../utils/useServerApi";
import { useDispatch } from "react-redux";
import { ComponentType, useCallback } from "react";
import { AppDispatch, RootState } from "../store";
import { useSelector } from "react-redux";
import { LoadStatus, LoadStatusProps } from "../types/loadStatus";
import useLoadStatus from "../hook/useHandleLoadSuccess";


interface cityGroupState {
    cityGroupList: PlaceGroup[];
    LoadStatus: LoadStatus; 
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

const initialState: cityGroupState = {cityGroupList: [], LoadStatus:LoadStatus.PENDING};

const fetchCityGroup = createAsyncThunk("cityGroup/getCityGroup", 
    async (userId: UserId, thunkAPI) => {
        try{
            const data = await useServerAPI({
                path:`user/${userId}/cityGroup`,
                fetchProps:{
                    method: "GET", 
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: undefined,
                }
            })
            console.log(`fetchCityGroup:${JSON.stringify(data)}`);
            return data;
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const cityGroupSlice = createSlice({
    name: 'cityGroup',
    initialState: initialState,
    reducers: {
        // add : (state, action: PayloadAction<cityGroupPayload>) => {
        //     if (action.payload.value) 
        //     state[action.payload.userId] = action.payload.value;
        // },
        setStatus: (state, action: PayloadAction<LoadStatus>) => {
            state.LoadStatus = action.payload;
        },
        toggleNationFilter: (state, action: PayloadAction<{index: number, nationId: NationId}>) => {
            console.log("toggleNationFilter");
            (state.cityGroupList[action.payload.index].nationFilter as {[key: NationId]: boolean})[action.payload.nationId] = !(state.cityGroupList[action.payload.index].nationFilter as {[key: NationId]: boolean})[action.payload.nationId];
        },
        // activateNation: (state, action: PayloadAction<string>) => {
        //     state.nationFilter[action.payload] = true;
        // },
        // deActivateNation: (state, action: PayloadAction<string>) => {
        //     state.nationFilter[action.payload] = false;
        // },
    },
    extraReducers:(builder) => {
        builder.addCase(fetchCityGroup.fulfilled, (state, action: PayloadAction<Place[]>) => {

            /* Convert nationFilter from string[] to {[key: string]: boolean} */
            const nationFilter = Object.fromEntries(
                Array.from(new Set(
                    action.payload.map(({nationId})=>nationId)
                ))
                .map((nationId)=>[nationId, true])
            ); 

            state.cityGroupList.push({
                name: "자연과 테마파크를 좋아하는 당신을 위한 여행지",
                group: action.payload,
                nationFilter: nationFilter
            });

            console.log(`fetchCityGroup.fulfilled - 
            \naction.payload=${JSON.stringify(action.payload)}`);

            state.LoadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(fetchCityGroup.pending, (state) => {
            console.log(`fetchPlace.pending`);
            state.LoadStatus = LoadStatus.PENDING;
        });
        builder.addCase(fetchCityGroup.rejected, (state) => {
            console.log(`fetchPlace.rejected`);
            state.LoadStatus = LoadStatus.FAIL;
        });
    },
})

const usePlaceGroup = (index: number) => {
    const cityGroupList = useSelector(( state:RootState )=>state.cityGroup.cityGroupList);
    
    return( cityGroupList.length > 0 ? [
        cityGroupList[0].name,
        cityGroupList[0].group
    ] as const : [undefined, undefined] as const);
}

const useNationFilter = (index: number) => {
    const dispatch = useDispatch();
    const cityGroupList = useSelector(( state:RootState )=>state.cityGroup.cityGroupList);

    return([
        cityGroupList.length > 0 ? cityGroupList[0].nationFilter : undefined,
        useCallback((nationId: NationId) => {
            if(cityGroupList.length > 0) {
                console.log("useNationFilter");
                dispatch(cityGroupSlice.actions.toggleNationFilter({index, nationId}))
            }
        }
        , [dispatch, cityGroupList.length, index])
    ] as const);
}

const useFetchPlaceGroup = () => {
    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    return useCallback((userId: UserId) => 
        dispatch(fetchCityGroup(userId))
    , [dispatch]);
}

interface usePlaceGroupLoadStatusProps{
    delay?: number;
}
const usePlaceGroupLoadStatus = ({ delay }: usePlaceGroupLoadStatusProps) => {
    const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    const status = useSelector(( state:RootState )=>state.cityGroup.LoadStatus);
    const setStatus = useCallback((status: LoadStatus) =>
        dispatch(cityGroupSlice.actions.setStatus(status))
    , [dispatch])
    const successToRestSecond = useLoadStatus({ status, setStatus, delay });
    return ([
        status,
        setStatus,
        successToRestSecond
    ] as const);
}

const withPlaceGroupLoadStatus = <T extends LoadStatusProps>(WrappedComponent: ComponentType<T>) =>
    (props: Omit<T, keyof LoadStatusProps>) => {        
    const [status, setStatus] = usePlaceGroupLoadStatus({});
    return(
        <WrappedComponent {...{status:status, setStatus:setStatus}} {...props as T}/>
    ); 
}

export default cityGroupSlice.reducer;
export { usePlaceGroup, useFetchPlaceGroup, useNationFilter, usePlaceGroupLoadStatus, 
    withPlaceGroupLoadStatus
};
export type { NationId };