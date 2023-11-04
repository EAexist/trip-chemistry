import { configureStore } from "@reduxjs/toolkit";
import testResponseReducer from "../reducer/testResponseReducer";
import userDataReducer from "../reducer/userListReducer";
import cityGroupReducer from "../reducer/cityGroupReducer";
import chemistryReducer from "../reducer/chemistryReducer";

export const store = configureStore({
    reducer: {
        testResponse: testResponseReducer,
        userData: userDataReducer,
        cityGroup: cityGroupReducer,
        chemistry: chemistryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;