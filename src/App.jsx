import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ExamPage from "./pages/ExamPage"; import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./store/actions/AuthAction";
import AuthSuccess from "./components/AuthSuccess";
import QuestionBank from "./pages/Admin/QuestionBank";
import CreateTest from "./pages/Admin/CreateTest";
import { AdminRoute } from "./routes/AdminRoute";
import Material from "./pages/Admin/Material";
import SubjectTest from "./pages/Admin/SubjectTest";
import ManageStudentsPage from "./pages/ManageStudentsPage";
import BlockedPage from "./pages/Admin/BlockedPage";
import StudentKnowledgeBank from "./pages/StudentKnowledgeBank";
import StudentViewMaterial from "./components/StudentViewMaterial";
import StudentTest from "./pages/StudentTest";
import StartTest from "./components/StartTest";
import TestPage from "./pages/TestPage";



function App() {
  const { user, loading, error } = useSelector((state) => state.auth);
  console.log(user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  if (user?.role === "user" && user?.isBlocked) {
    return <BlockedPage user={user} />;
  }
  return (
    <BrowserRouter>

      <Routes>
        {/* Login WITHOUT layout */}
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/" element={<Login />} />
        {/* Dashboards */}
        <Route path="/student/exam" element={<ExamPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/test-attempt" element={<TestPage />} />
        <Route path="/admin/dashboard" element={<AdminRoute user={user}>
          <AdminDashboard />
        </AdminRoute>} />
        
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/tests">
          <Route
            index
            element={<StudentTest />}
          />
          <Route 
            path="startTest"
            element={<StartTest />}
          />
        </Route>
        <Route path="/student/question-bank">
         <Route
            index
            element={
              <StudentKnowledgeBank />
            }
          />
           <Route
            path="materials"
            element={
              <StudentViewMaterial />
            }
          />
        </Route>
        <Route path="/admin/question-bank">

          <Route
            index
            element={
              <AdminRoute user={user}>
                <QuestionBank />
              </AdminRoute>
            }
          />

          <Route
            path="material"
            element={
              <AdminRoute user={user}>
                <Material />
              </AdminRoute>
            }
          />

        </Route>


        <Route path="/admin/create-test">

          <Route
            index
            element={
              <AdminRoute user={user}>
                <CreateTest />
              </AdminRoute>
            }
          />

          <Route
            path="subjectTest"
            element={
              <AdminRoute user={user}>
                <SubjectTest />
              </AdminRoute>
            }
          />

        </Route>
        <Route path="/admin/manage-students" element={<ManageStudentsPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

