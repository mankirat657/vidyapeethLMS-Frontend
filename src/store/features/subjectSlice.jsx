import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    subject : [],
    loading : false,
    error : null
}
const subjectSlice = createSlice({
    name : "subject",
    initialState,
    reducers : {
        setLoading : (state,action) =>{
            state.loading = action.payload;
        },
        setSubject : (state,action) => {
            state.subject = action.payload;
            state.error = null;
        },
          setError : (state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
    }
})
export const {setLoading,setSubject, setError} = subjectSlice.actions;

export default subjectSlice.reducer;