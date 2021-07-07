import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import BookWithId from "../../types/bookWithId";

interface deleteState {
  deleteBookAlertVisibility: boolean;
  bookToDelete: {};
}

const initialState: deleteState = {
  deleteBookAlertVisibility: false,
  bookToDelete: {},
};

const deleteSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {
    setDeleteAlertVisibility: (state, action: PayloadAction<boolean>) => {
      state.deleteBookAlertVisibility = action.payload;
    },
    setBookToDelete: (state, action: PayloadAction<BookWithId>) => {
      state.bookToDelete = action.payload;
    },
  },
});

export const { setDeleteAlertVisibility, setBookToDelete } =
  deleteSlice.actions;
export default deleteSlice.reducer;

export const selectDeleteAlertVisibility = (state: any) =>
  state.deleteReducer.deleteBookAlertVisibility;
export const selectBookToDelete = (state: any) =>
  state.deleteReducer.bookToDelete;
