import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookmarkState {
  value: string[];
}

const initialState: BookmarkState = {
  value: [],
};

export const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(image => image !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBookmark, removeBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
