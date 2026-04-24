import { Routes,Route } from "react-router-dom";
import Home from "../pages/Home";
import KnowledgeBank from "../pages/KnowledgeBank";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Reports from "../pages/Reports";
import Result from "../pages/Result";
import Test from "../pages/Test";
const AppRoutes = () =>{
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />}  />
            <Route path="/login" element={<Login />}  />
            <Route path="/knowledgeBank" element={<KnowledgeBank />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/result" element={<Result />} />
            <Route path="/test" element={<Test />} />
        
        </Routes>
    )
   


}

export default AppRoutes;