import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tests : [],
    loading : false,
    error : null
}
const testSlice = createSlice({
    name : "test",
    initialState,
    reducers : {
        setLoading : (state,action) => {
            state.loading = action.payload
        },
        setTest : (state,action) => {
            state.tests = action.payload;
            state.error = null;
        },
        seterror : (state,action) =>{ 
            state.error = action.payload;
        }

    }
})
export const {setLoading,setTest,seterror} = testSlice.actions;

export default testSlice.reducer;