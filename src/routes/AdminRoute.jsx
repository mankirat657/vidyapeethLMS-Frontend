import { Navigate } from "react-router-dom";

export const AdminRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/" />;
  if (user.role !== "admin") return <Navigate to="/student/dashboard" />;

  return children;
};
