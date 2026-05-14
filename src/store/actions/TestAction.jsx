import { setLoading, setTest, seterror } from "../features/TestSlice";
import { createAiTestApi, createTestApi, getAllTestApi, getPrevTestApi } from "../services/AuthService";

export const getPrevTest = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await getPrevTestApi(id);

        dispatch(setTest(res.data));
        return res.data;
    } catch (error) {
        const errMessage = error.response?.data?.message || "Error occured try again later !"
        dispatch(seterror(errMessage))
        return { error: errMessage };
    } finally{
        dispatch(setLoading(false));
    }
}
export const createTest = (id,data) => async(dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await createTestApi(id,data);

        dispatch(setTest(res.data));
        return res.data;
    } catch (error) {
        const errMessage = error.response?.data?.message || "Error occured try again later !"
        dispatch(seterror(errMessage))
        return { error: errMessage };
    }finally{
        dispatch(setLoading(false));
    }
}
export const createAiTest = (id,prompt,testDuration) => async(dispatch)=> {
    try {
        dispatch(setLoading(true));
        const res = await createAiTestApi(id,prompt,testDuration);

        dispatch(setTest(res.data));
        return res.data;
    } catch (error) {
        const errMessage = error.response?.data?.message || "Error occured try again later !"
        dispatch(seterror(errMessage))
        return { error: errMessage };
    }finally{
        dispatch(setLoading(false));
    }
}
export const getAllTest = () => async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const res = await getAllTestApi();
          dispatch(setTest(res.data));
        return res.data;
    } catch (error) {
        const errMessage = error.response?.data?.message || "Error occured try again later !"
        dispatch(seterror(errMessage))
        return { error: errMessage };
    }finally{
        dispatch(setLoading(false));
    }
}