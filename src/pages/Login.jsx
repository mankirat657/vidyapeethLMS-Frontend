import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/actions/AuthAction";
import { toast } from "react-toastify";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import google from '../assets/icons8-google-48.png'
function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    function handleShowPassword() {
        setShowPassword(prev => !prev);
    }
    function handleLogin(e) {

        e.preventDefault();
        dispatch(loginUser({
            "email": email,
            "password": password
        }))


    }
    useEffect(() => {
        if (user) {
            toast.success("Login successful 🎉");

            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/student/dashboard");
            }
        }

        if (error) {
            toast.error(error);
        }
    }, [user, error, navigate]);
    console.log(user);
    const handleGoogleLonging = () => {
        window.location.href = "http://localhost:3000/api/auth/google"
    }
    return (

        <div className="login-page">

            <div className="login-brand">
                <h1>LMS Portal</h1>
                <p>Smart Learning & Assessment Platform</p>
            </div>

            <form className="login-modal" onSubmit={handleLogin}>

                <h2>Welcome...</h2>

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div className="relative">

                    <input
                        type={showPassword ? "password" : "text"}
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div onClick={handleShowPassword} className="showpassword cursor-pointer absolute right-2 top-1/2 -translate-y-1/2">
                        {showPassword ? <IoMdEyeOff size={20} /> : <IoEye size={20} />}
                    </div>
                </div>


                <button className="btn-primary" >
                    Login
                </button>
                <div onClick={handleGoogleLonging} id="googleLogin" className="hover:bg-[#dbdbdb] cursor-pointer ease-linear transition-all flex h-10 justify-center rounded-md border border-[#b9b9b9]  items-center gap-2  bg-[#ededed]">
                    <div className="logo "><img className="w-7" src={google} alt="" /></div>
                    <p className="">Continue with Google</p>
                </div>
                <p style={{ textAlign: "center", marginTop: "10px" }}>

                    Don't have an account?

                    <span
                        style={{ color: "#2563eb", cursor: "pointer", fontWeight: "600" }}
                        onClick={() => navigate("/register")}
                        
                    >
                        Register
                    </span>

                </p>

            </form>

        </div>

    )

}

export default Login;