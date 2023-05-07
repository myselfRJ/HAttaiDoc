import { createSlice } from '@reduxjs/toolkit';

let initialState = {url:null}

const urlSlice = createSlice({
    name : "url",
    initialState,
    reducers : {
        urlupdate : (state,action) => {
            console.log(action)
            state.url = action.payload
            console.log(state,"state")
        },
    }
})

export const urlActions = urlSlice.actions;
export default urlSlice.reducer;