import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import SubmitComplaint from "../pages/SubmitComplaint";
import MyComplaints from "../pages/MyComplaints";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/submit"
          element={<SubmitComplaint />}
        />

        <Route
          path="/my-complaints"
          element={<MyComplaints />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;