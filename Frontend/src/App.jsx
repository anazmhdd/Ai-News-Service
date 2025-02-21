// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Category from "./pages/Category";
// import AdminDashboard from "./pages/Dashboard";
// import Home from "./pages/Home";
// import LoginPage from "./pages/Login/login";
// import RegisterPage from "./pages/register/register";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/admin/*" element={<AdminDashboard />} />
//         <Route path="/news/category/:cat" element={<Category />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Loader from "./components/Loader/Loader";
import { LoadContext } from "./Contexts/LoaderContext";
import Category from "./pages/Category";
import {
  default as AdminDashboard,
  default as Dashboard,
} from "./pages/Dashboard";
import Home from "./pages/Home";
import OldHome from "./pages/Home/Home";
import LoginPage from "./pages/Login/login";
import RegisterPage from "./pages/register/register";
import SubmitPromoContent from "./pages/SubmitPromo";
import NewsViewPage from "./pages/ViewNews";
import { auth } from "./services/firebase";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { loading, setLoading } = useContext(LoadContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    setLoading(true);

    return () => {
      unsubscribe();
      setLoading(false);
    };
  }, [setLoading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/home" /> : <RegisterPage />
            }
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/home"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/news/:newsTitle"
            element={
              isAuthenticated ? <NewsViewPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
          />
          <Route
            path="/news/category/:cat"
            element={isAuthenticated ? <Category /> : <Navigate to="/login" />}
          />
          <Route path="/submit-promo" element={<SubmitPromoContent />} />
          <Route path="/oldhome" element={<OldHome />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
