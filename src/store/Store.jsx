import { configureStore } from "@reduxjs/toolkit";
import authSlice from './features/authSlice'
import subjectSlice from './features/subjectSlice'
import questionAnswerSlice from './features/questionAnswerSlice'
import testSlice from './features/TestSlice'
import studentSlice from './features/studentSlice'
export const store = configureStore({
    reducer : {
        auth : authSlice,
        subject : subjectSlice,
        questionAnswer : questionAnswerSlice,
        test : testSlice,
        student : studentSlice
    }
})