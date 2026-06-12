import { Navigate } from "react-router-dom";

function AdminRoute({
  children,
}) {
  const isAdmin =
    localStorage.getItem("admin");

  return isAdmin ? (
    children
  ) : (
    <Navigate
      to="/admin-login"
      replace
    />
  );
}

export default AdminRoute;