import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import SubmitComplaint from "../pages/SubmitComplaint";
import MyComplaints from "../pages/MyComplaints";
import AdminDashboard from "../pages/AdminDashboard";
import AdminLogin from "../pages/AdminLogin";
import LandingPage from "../pages/LandingPage";
import PrivateRoute from "../components/PrivateRoute";
import AdminRoute from "../components/AdminRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/submit"
          element={
            <PrivateRoute>
              <SubmitComplaint />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-complaints"
          element={
            <PrivateRoute>
              <MyComplaints />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={<AdminRoute>
      <AdminDashboard />
    </AdminRoute>}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;