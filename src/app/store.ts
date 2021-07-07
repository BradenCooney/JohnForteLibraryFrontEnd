import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import bookReducerTwo from "../features/booklist/bookReducer";
import deleteReducer from "../features/booklist/deleteReducer";

export const store = configureStore({
  reducer: {
    bookReducerTwo,
    deleteReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
