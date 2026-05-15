import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import google from '../assets/icons8-google-48.png'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/actions/AuthAction";
import { toast } from "react-toastify";
function Register(){

const navigate = useNavigate();
const dispatch = useDispatch();
const{user,loading,error} = useSelector((state) => state.auth);
const [form,setForm] = useState({
name:"",
email:"",
password:"",
lastName : "",
role:"student"
});
const[file,setFile] = useState(null);
const[showPassword,setShowPassword] = useState(false);
function handleShowPassword(){
    setShowPassword(prev => !prev);
}
function handleChange(e){

setForm({
...form,
[e.target.name]:e.target.value
});

}
useEffect(() => {
        if (user) {
            toast.success("Register successful 🎉");

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
function handleRegister(e){

e.preventDefault();
const formData  = new FormData();
formData.append("file",file);
formData.append("firstName",form.name);
formData.append("lastName", form.lastName);
formData.append("password",form.password);
formData.append("email",form.email);
dispatch(registerUser(formData))


}
useEffect(() => {
  if (user) {
    toast.success("Registered Successfully 🎉");

    const timer = setTimeout(() => {
      navigate("/");
    }, 1500); 

    return () => clearTimeout(timer); 
  }

  if (error) {
    toast.error(error || "Registration Failed ❌");
  }
}, [user, error]);

const handleGoogleLonging = () => {
        window.location.href = "http://localhost:3000/api/auth/google"
    }
return(

<div className="login-page">

<div className="login-brand">
<h1>LMS Portal</h1>
</div>

<form className="login-modal" onSubmit={handleRegister}>

<h2 className="text-2xl">Register</h2>
<div className="">

<input
type="text"
name="name"
placeholder="Full Name"
onChange={handleChange}
required
/>
</div>
<div className="">

<input
type="email"
name="email"
placeholder="Email Address"
onChange={handleChange}
required
/>
</div>
<div className="relative">

<input
type={showPassword ? "password" : "text"}
name="password"
placeholder="Password"
onChange={handleChange}
required
/>
<div onClick={handleShowPassword} className="showpassword cursor-pointer absolute right-2 top-1/2 -translate-y-1/2">
{showPassword ? <IoMdEyeOff size={20} /> :  <IoEye size={20} />}
</div>
</div>
<div className="flex flex-col gap-2">

  {/* Hidden Input */}
  <input
    type="file"
    id="fileUpload"
    className="hidden"
    onChange={(e) => setFile(e.target.files[0])}
  />

  <label
    htmlFor="fileUpload"
    className="cursor-pointer flex items-center justify-center bg-blue-600 h-10 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition"
  >
    Upload Profile Pic
  </label>

  <p className="text-sm text-gray-500">
    {file ? file.name : "No file selected"}
  </p>

</div>



<button className="btn-primary" disabled={loading}>
  {loading ? "Registering..." : "Register"}
</button>

<div onClick={handleGoogleLonging} id="googleLogin" className="hover:bg-[#dbdbdb] cursor-pointer ease-linear transition-all flex h-10 justify-center rounded-md border border-[#b9b9b9]  items-center gap-2  bg-[#ededed]">
   <div className="logo "><img className="w-7" src={google} alt="" /></div>
   <p className="">Continue with Google</p>
</div>
<p style={{textAlign:"center"}}>

Already have an account?

<span
style={{color:"#2563eb",cursor:"pointer"}}
onClick={()=>navigate("/")}
>
 Login
</span>

</p>

</form>

</div>

)

}

export default Register;