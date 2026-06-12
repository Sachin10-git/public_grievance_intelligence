import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
const token =
  localStorage.getItem("token");

const admin =
  localStorage.getItem("admin");

return token && !admin
  ? children
  : <Navigate to="/" />;
}

export default PrivateRoute;