import { setLoading,setError,setStudent } from "../features/studentSlice";
import { blockStudentApi, getStudentsApi, unblockStudentApi } from "../services/AuthService";

export const getStudent = () => async(dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await getStudentsApi();
        dispatch(setStudent(res.data));
        return res.data;
    } catch (error) {
         const errorMsg = error.response?.data?.message || "No Subjects";
        dispatch(setError(errorMsg));
    }finally{
        dispatch(setLoading(false));
    }
}
export const blockStudent = (stuId) => async(dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await blockStudentApi(stuId);
        
        return res.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || "No Subjects";
        dispatch(setError(errorMsg));
    }finally{
        dispatch(setLoading(false));
    }
}
export const unblockStudent = (stuId) => async(dispatch) =>{
    try {
        dispatch(setLoading(true));
        const res = await unblockStudentApi(stuId);

        return res.data;
    } catch (error) {
         const errorMsg = error.response?.data?.message || "No Subjects";
        dispatch(setError(errorMsg));
    }finally{
        dispatch(setLoading(false));
    }
}