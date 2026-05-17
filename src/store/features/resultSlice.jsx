import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    result :[],
    loading : false,
    error : null
}
const resultSlice = createSlice({
    name : "result",
    initialState,
    reducers : {
        setLoading : (state,action) =>{
            state.loading=action.payload;
        },
        setResult : (state,action)=>{
            state.result = action.payload;
            state.error = null;
        },
        setError : (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        }
    }
})
export const {setLoading,setResult,setError} = resultSlice.actions;
export default resultSlice.reducer;