import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    navTitle: ""
}


export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducer: {
        setNavIndex: (state, action)=>{
            state.navTitle = action.payload
        }
    }
})

export const {setNavTitle} = navSlice.actions

export const selectNavTitle = (state) => state.nav.navTitle


export default navSlice.reducer