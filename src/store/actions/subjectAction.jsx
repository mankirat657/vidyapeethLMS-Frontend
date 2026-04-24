import { setSubject,setLoading,setError } from "../features/subjectSlice";
import { createSubjectApi, deleteSubjectApi, loadSubjectApi, updateSubjectApi } from "../services/AuthService";

export const getSubject = (data) => async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const res = await loadSubjectApi(data);
        console.log(res);
        
        dispatch(setSubject(res.data))
    } catch (error) {
        const errorMsg = error.response?.data?.message || "No Subjects";
        dispatch(setError(errorMsg));
    }finally{
        dispatch(setLoading(false));
    }
}
export const createSubject = (data) => async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const res = await createSubjectApi(data);
        
        dispatch(setSubject(res.data));
       return res.data
    } catch (error) {
        const errorMsg = error.response?.data?.message || "No Subjects";
        dispatch(setError(errorMsg));
        return { error: errorMsg };
    } finally{
        dispatch(setLoading(false));
    }
}
export const updateSubject = (id,data) => async(dispatch) =>{
    try {
        dispatch(setLoading(true))
        const res = await updateSubjectApi(id,data);
        dispatch(setSubject(res.data))
        return res.data
    } catch (error) {
        const errMessage = error.response?.data?.message || "Error occured try again later !"
        dispatch(setError(errMessage))
        return { error: errMessage };
    }finally{
        dispatch(setLoading(false))
    }
}
export const deleteSubject = (id) => async(dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await deleteSubjectApi(id);
        return res.data;
    } catch (error) {
        const errMessage = error.response?.data?.message || "Error occured try again later !"
        dispatch(setEror(errMessage));
        return {error : errMessage};
    } finally{
        dispatch(setLoading(false))
    }
}
