import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { loadUserApi } from "../store/services/AuthService";

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    loadUserApi()
      .then((res) => {
        const user = res.data.user;

        dispatch(setUser(user));

        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/student/dashboard");
        }
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  return <h1>Logging you in...</h1>;
};

export default AuthSuccess;
