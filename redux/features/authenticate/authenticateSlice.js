import { createSlice } from '@reduxjs/toolkit';

const initialState ={
    access : null,
    refresh : null,
    lastLogin : null
}

const authenticateSlice = createSlice({
    name : "authenticate",
    initialState,
    reducers : {
        tokenupdate : (state,action) => {
            state = {...action.payload}
        },
        tokenrevoke : (state) => {
            state = initialState
        }
    }
})

export const authenticateActions = authenticateSlice.actions;
export default authenticateSlice.reducer;