import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  note: '',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNote: (state, action) => {
      state.note = action.payload;
    },
  },
});

export const { setNote } = notesSlice.actions;

export default notesSlice.reducer;