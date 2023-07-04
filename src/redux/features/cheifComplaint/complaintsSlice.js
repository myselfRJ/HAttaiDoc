import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedComplaint: '',
};

const complaintsSlice = createSlice({
  name: 'complaints',
  initialState,
  reducers: {
    setSelectedComplaint: (state, action) => {
      state.selectedComplaint = action.payload;
    },
  },
});

export const { setSelectedComplaint } = complaintsSlice.actions;

export default complaintsSlice.reducer;
