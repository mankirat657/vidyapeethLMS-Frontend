import { setQuestionAnswer, setLoading,setError } from "../features/studentBankSlice";
import { getBankDataApi } from "../services/AuthService";
export const getBankData = (subId) => async(dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await getBankDataApi(subId);
        dispatch(setQuestionAnswer(res.data))
        return res.data;
    } catch (error) {
        const errMessage = error.response?.data?.message || "Error occured try again later !"
        dispatch(setError(errMessage))
        return { error: errMessage };
    }finally{
        setLoading(false);
    }
}
