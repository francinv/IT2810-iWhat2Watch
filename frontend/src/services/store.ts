import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import mainPageReducer from "../pages/mainPageSlice";
import userReducer from "../components/login/loginslice";

export const store = configureStore({
    reducer: {
        mainPage: mainPageReducer,
        userSlice: userReducer
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
