import { setQuestionAnswer, setLoading,setError } from "../features/questionAnswerSlice";
import { aiQuestionAnswerCreationApi, createQuestionAnswerApi, deletePdfApi, deleteQuestionAnswersApi, getQuestionAnswersApi, updateQuestionAnswersApi, uploadPdfApi } from "../services/AuthService";

export const getQuestionAnswerss = (id) => async(dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await getQuestionAnswersApi(id);
        console.log(res);
        
        dispatch(setQuestionAnswer(res.data));
        return res.data;
    } catch (error) {
         const errMessage = error.response?.data?.message || "Error occured try again later !"
        dispatch(setError(errMessage))
        return { error: errMessage };
    }finally{
        dispatch(setLoading(false));
    }
}

export const createQuestionAnswers = (id,data) => async(dispatch) =>{
    try {
        dispatch(setLoading(true));
        const res = await createQuestionAnswerApi(id,data);

        dispatch(setQuestionAnswer(res.data));
        return res.data;
    } catch (error) {
        const errMessage = error.response?.data?.message || "Error occured try again later !"
        dispatch(setError(errMessage))
        return { error: errMessage };
    } finally{
        dispatch(setLoading(false));
    }
}
export const aiQuestionAnswerCreation = (id,prompt,subjectWeightage) => async(dispatch)=>{
    try {
        dispatch(setLoading(true))
        const res = await aiQuestionAnswerCreationApi(id,prompt,subjectWeightage);

        dispatch(setQuestionAnswer(res.data));
        return res.data
    } catch (error) {
        const errMessage = error.response?.data?.message || "Error occured try again later !"
        dispatch(setError(errMessage))
        return { error: errMessage };        
    }finally{
        dispatch(setLoading(false));
    }
}
export const questionAnswersUpdation = (id,quesId,ansId,data) => async(dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await updateQuestionAnswersApi(id,quesId,ansId,data);
        return res.data;
    } catch (error) {
        const errMessage = error.response?.data?.message || "Error occured try again later !"
        dispatch(setError(errMessage))
        return { error: errMessage };   
    } finally{
        dispatch(setLoading(false))
    }
}
export const deleteQuestionAnswerDeletion = (id,quesId) => async(dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await deleteQuestionAnswersApi(id,quesId);
        return res.data;
    } catch (error) {
         const errMessage = error.response?.data?.message || "Error occured try again later !"
        dispatch(setError(errMessage))
        return { error: errMessage };   
    }finally{
        dispatch(setLoading(false));
    }
}
export const uploadPdfFile = (id,file) => async(dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await uploadPdfApi(id,file);
        return res.data;
    } catch (error) {
        const errMessage = error.response?.data?.message || "Error occured try again later !"
        dispatch(setError(errMessage))
        return { error: errMessage }; 
    }finally{
        dispatch(setLoading(false));
    }
}
export const deletePdf = (id) => async(dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await deletePdfApi(id);
        return res.data;
    } catch (error) {
         const errMessage = error.response?.data?.message || "Error occured try again later !"
        dispatch(setError(errMessage))
        return { error: errMessage }; 
    }finally{
        dispatch(setLoading(false))
    }
}