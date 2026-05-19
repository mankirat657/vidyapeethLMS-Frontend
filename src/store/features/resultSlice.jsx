import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    result :[],
    loading : false,
    error : null,
    adminResult : []
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
        setAdminResult : (state,action)=>{
            state.adminResult = action.payload;
        },  
        setError : (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        }
    }
})
export const {setLoading,setResult,setError,setAdminResult} = resultSlice.actions;
export default resultSlice.reducer;