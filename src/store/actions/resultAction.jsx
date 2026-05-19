import { setLoading,setResult,setError, setAdminResult } from "../features/resultSlice";
import { getResultApi, getTestResultApi, validateTestApi } from "../services/AuthService";


export const validateTest = (testId,subjectId,payload)=> async(dispatch) =>{
    try {
        console.log(payload);
        dispatch(setLoading(true));
        const res = await validateTestApi(testId,subjectId,payload);
        console.log("API response:", res.data);
        dispatch(setResult(res.data));
        return res.data;
    } catch (error) {
        const errMessage = error.response?.data?.message || "Error occured try again later !"
        dispatch(setError(errMessage))
        return { error: errMessage };
    }finally{
        dispatch(setLoading(false));
    }
}
// student resultApi
export const getResult = (stuId,subjectId,testId) => async(dispatch) =>{
    try {
        dispatch(setLoading(true));
        const res = await getResultApi(stuId,subjectId,testId);
        dispatch(setResult(res.data));
        return res.data;
    } catch (error) {
        const errMessage = error.response?.data?.message || "Error occured try again later !"
        dispatch(setError(errMessage))
        return { error: errMessage };
    } finally{
        dispatch(setLoading(false));
    }
}
//result of all student for admin
export const getAllStudentResult = (testId) => async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const res = await getTestResultApi(testId);
        dispatch(setAdminResult(res.data));
        return res.data;
    } catch (error) {
        const errMessage = error.response?.data?.message || "Error occured try again later !"
        dispatch(setError(errMessage))
        return { error: errMessage };
    } finally{
        dispatch(setLoading(false))
    }
}