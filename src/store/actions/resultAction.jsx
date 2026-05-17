import { setLoading,setResult,setError } from "../features/resultSlice";
import { validateTestApi } from "../services/AuthService";


export const validateTest = (testId,subjectId,answers)=> async(dispatch) =>{
    try {
        console.log("validateTest action started");
        dispatch(setLoading(true));
        const res = await validateTestApi(testId,subjectId,{answers});
        console.log("API response:", res.data);
        dispatch(setResult(res.data));
        return res.data;
    } catch (error) {
        console.log(error);
        
        const errMessage = error.response?.data?.message || "Error occured try again later !"
        dispatch(setError(errMessage))
        return { error: errMessage };
    }finally{
        dispatch(setLoading(false));
    }
}