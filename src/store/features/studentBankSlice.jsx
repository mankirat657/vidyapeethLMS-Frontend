import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questionAnswers : [],
    loading : false,
    error : null 
}
const studentBankSlice = createSlice({
    name : "studentBankData",
    initialState,
    reducers : {
        setLoading : (state,action) => {
            state.loading = action.payload;
        },
        setQuestionAnswer : (state,action) =>{
            state.questionAnswers = action.payload;
            state.error = null;
        },
        setError : (state,action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})


export const {setLoading,setQuestionAnswer, setError}  = studentBankSlice.actions;
export default studentBankSlice.reducer;