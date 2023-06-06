import { createSlice } from '@reduxjs/toolkit';

let initialState = {auth:{
    access : null,
    refresh : null,
    lastLogin : null
}}

const authenticateSlice = createSlice({
    name : "authenticate",
    initialState,
    reducers : {
        accessupdate : (state,action) => {
            console.log(action)
            state.access = action.payload
            console.log(state,"state")
        },
        tokenupdate : (state,action) => {
            console.log(action)
            state.auth = action.payload
            console.log(state,"state")
        },
        tokenrevoke : (state) => {
            console.log("1")
            state = initialState
        }
    }
})

export const authenticateActions = authenticateSlice.actions;
export default authenticateSlice.reducer;