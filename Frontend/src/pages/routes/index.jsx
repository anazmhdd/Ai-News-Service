import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "../pages/Dashboard";
import DashboardOverview from "../pages/Dashboard/DashboardOverview";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
