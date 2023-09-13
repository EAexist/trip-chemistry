import { configureStore } from "@reduxjs/toolkit";
import testResponseReducer from "../reducer/testResponseReducer";
import userListReducer from "../reducer/userListReducer";
import placeListReducer from "../reducer/placeListReducer";
import chemistryReducer from "../reducer/chemistryReducer";

export const store = configureStore({
    reducer: {
        testResponse: testResponseReducer,
        userList: userListReducer,
        placeList: placeListReducer,
        chemistry: chemistryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;