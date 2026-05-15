import { setLoading, setUser, setError } from "../features/authSlice";
import { loadUserApi, loginApi, logoutApi, registerApi } from "../services/AuthService";


export const loginUser = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await loginApi(data);

        dispatch(setUser(res.data.user));
    } catch (error) {
        const errorMsg = error.response?.data?.message || "Login failed";
        dispatch(setError(errorMsg));
    } finally {
        dispatch(setLoading(false));
    }
}
export const registerUser = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        const res = await registerApi(data);
        dispatch(setUser(res.data.newUser));

    } catch (err) {
        const errorMsg = err.response?.data?.message || "Register failed";
        dispatch(setError(errorMsg));
    } finally {
        dispatch(setLoading(false));
    }
};
export const loadUser = () => async (dispatch) => {
  try {
    const res = await loadUserApi();
    dispatch(setUser(res.data.user));
  } catch (err) {
    dispatch(setError(err.response?.data?.message || "Failed to load user"));
      dispatch(setUser(null));
  }
};
export const logoutUser = () => async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const res = await logoutApi();
        dispatch(setUser(null))
        return res.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || "Register failed";
        dispatch(setError(errorMsg));
    }finally{
        dispatch(setLoading(false));
    }
}