import AxiosInstance from "../../Axios/AxiosInstance"
export const loginApi = (data) =>{
    return AxiosInstance.post("/login",data);
}
export const registerApi = (data) =>{
    return AxiosInstance.post("/register",data);
}
export const loadUserApi = () => {
  return AxiosInstance.get("/me", { withCredentials: true });
};
export const loadSubjectApi = () => {
    return AxiosInstance.get("/admin/getSubject",{withCredentials : true});
}
export const createSubjectApi = (data) => {
    return AxiosInstance.post(
        "/admin/createSubject",
        data,
        { withCredentials: true }
    );
};
export const updateSubjectApi = (id,data) =>{
    return AxiosInstance.post(
        `/admin/updateSubject/${id}`,
        data,
        {withCredentials : true}
    )
}
export const deleteSubjectApi = (id) => {
    return AxiosInstance.delete(
        `/admin/deleteSubject/${id}`,
        {withCredentials : true}
    )
}
export const createQuestionAnswerApi = (id,data) =>{
    return AxiosInstance.post(
        `/admin/questionAnswers/${id}`,
        data,
        {withCredentials : true}
    )
}

export const uploadPdfApi = (id,file) => {
    const formData = new FormData();
    formData.append("file",file);
    return AxiosInstance.post(
        `admin/questionAnswers/${id}`,
        formData,
        {withCredentials : true}
    )
}
export const getQuestionAnswersApi = (id) => {
    return AxiosInstance.get(
        `/admin/getQuestionAnswers/${id}`,
        {withCredentials : true}
    )
}
export const aiQuestionAnswerCreationApi = (id,prompt,subjectWeightage) =>{
    return AxiosInstance.post(
        `/admin/questionAnswers/${id}`,
        {prompt,subjectWeightage},
        {withCredentials : true}
    )
}
export const updateQuestionAnswersApi = (id,quesId,ansId,data) => {
    return AxiosInstance.post(
        `/admin/updateQuestionAnswer/${id}/question/${quesId}/answer/${ansId}`,
        data,
        {withCredentials : true}
    )
}
export const deleteQuestionAnswersApi = (id,quesId) => {
    return AxiosInstance.post(
        `/admin/deleteQuestionAnswer/${id}/questionAnswerId/${quesId}`,
        {},
        {withCredentials : true}
    )
}
export const deletePdfApi = (id) => {
    return AxiosInstance.delete(
        `/admin/deleteContent/${id}`,
        { withCredentials: true }
    );
};
export const getPrevTestApi = (id) => {
    return AxiosInstance.get(
        `/admin/getTest/${id}`,
        {withCredentials : true}
    )
}
export const createTestApi = (id,data) => {
    return AxiosInstance.post(
        `/admin/createTest/${id}`,
        data,
        {withCredentials : true}
    )
}
export const createAiTestApi = (id,prompt,testDuration) => {
    return AxiosInstance.post(
        `/admin/createTest/${id}`,
        {prompt,testDuration},
        {withCredentials : true}
    )
}
export const getStudentsApi = () =>{
    return AxiosInstance.get(
        `/admin/getStudents`,
        {withCredentials : true}
    )
}
export const blockStudentApi = (stuId) => {
    return AxiosInstance.post(
        `/admin/block/${stuId}`,
        {withCredentials : true}
    )
}
export const unblockStudentApi = (stuId) => {
    return AxiosInstance.post(
        `/admin/unblock/${stuId}`,
        {withCredentials : true}
    )
}
export const getAllTestApi = () => {
    return AxiosInstance.get(
        `/admin/getAllTest`,
        {withCredentials : true}
    )
}
export const getAllquestionAnswersApi = () => {
    return AxiosInstance.get(
        `/admin/getAllQuestionAnswers`,
        {withCredentials : true}
    )
}
export const logoutApi = () => {
    return AxiosInstance.delete(
        `/logout`,
        {withCredentials : true}
    )
}
export const getBankDataApi= (subId) => {
    return AxiosInstance.get(
        `/knowledgeBank/${subId}`,
        {withCredentials : true}
    )
}
export const publishTestApi = (testId) => {
    return AxiosInstance.post(
        `/admin/publishTest/${testId}`,
        {},
        {withCredentials : true}
    )
}
export const deleteTestApi = (testId) => {
    return AxiosInstance.delete(
        `/admin/deleteTest/${testId}`,
        {withCredentials : true}
    )
}