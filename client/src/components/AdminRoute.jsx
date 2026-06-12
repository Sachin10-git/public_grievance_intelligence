import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
const admin =
  localStorage.getItem("admin");

const token =
  localStorage.getItem("token");

return admin === "true" && !token
  ? children
  : <Navigate
      to="/admin-login"
    />;
}

export default AdminRoute;