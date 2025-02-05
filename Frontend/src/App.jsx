import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Report_Lost_Found from "./pages/Report_lost_found/Report_Lost_Found";
import Authentication from "./pages/Login_SignUp/Authentication";
import { ProtectedRoute } from "./pages/Login_SignUp/Authentication";
import UserInfo from "./pages/UserDashboard.jsx/UserInfo";
import { Navigate } from "react-router-dom";
import Search from "./pages/Search/Search";
import AboutUs from "./AboutUs";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Protected Route for Home */}
          <Route
            path="/"
            element={
              // <ProtectedRoute>
                <Home />
              // </ProtectedRoute>
            }
          />

          {/* Protected Route for Reporting Lost/Found */}
          <Route path="/reportlostfound" element={<Report_Lost_Found />} />

          <Route path="/user-info*" element={<UserInfo />} />
          <Route path="/search" element={<Search />} />

          <Route path="/AboutUs" element={<AboutUs />} />

          {/* Authentication Component */}
          <Route path="/*" element={<Authentication />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
