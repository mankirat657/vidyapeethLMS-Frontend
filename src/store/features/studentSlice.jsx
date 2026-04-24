import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    students :[],
    error : null,
    loading : false
}

const studentSlice = createSlice({
    name : "student",
    initialState,
    reducers : {
        setLoading : (state,action) => {
            state.loading = action.payload;
        },
        setStudent : (state,action) =>{
            state.students = action.payload;
            state.error = null;
        },
        setError : (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        }
    }
})
export const {setLoading,setStudent,setError} = studentSlice.actions;

export default studentSlice.reducer;