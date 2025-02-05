import React, { useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "../Home/Navbar";
import FloatingShape from "../../components/FloatingShape";
import SignUp from "./SignUp";
import Login from "./Login";
import Verify from "./Verify";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import UserInfo from "../UserDashboard.jsx/UserInfo";

import ForgotPassword from "./ForgotPassword";
import ResetPasswordPage from "./ResestPasswordPage";
import { useAuthStore } from "../../store/authStore";

// Protected Route Component
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

// Redirect Authenticated Users Component
export const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const Authentication = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-dark-blue-1000 to-blue-600 flex items-center justify-center relative overflow-hidden">
        <FloatingShape
          color="bg-blue-300"
          size="w-60 h-60"
          top="-5%"
          left="5%"
          delay={0}
        />
        <FloatingShape
          color="bg-sky-300"
          size="w-48 h-48"
          top="10%"
          left="80%"
          delay={4}
        />
        <FloatingShape
          color="bg-cyan-200"
          size="w-32 h-32"
          top="40%"
          left="-10%"
          delay={2}
        />

        <div className="w-full max-w-md px-4">
          <Routes>
            <Route
              path="/signup"
              element={
                <RedirectAuthenticatedUser>
                  <SignUp />
                </RedirectAuthenticatedUser>
              }
            />

            <Route
              path="/login"
              element={
                <RedirectAuthenticatedUser>
                  <Login />
                </RedirectAuthenticatedUser>
              }
            />

            <Route path="/verify-email" element={<Verify />} />

            <Route
              path="/forgot-password"
              element={
                <RedirectAuthenticatedUser>
                  <ForgotPassword />
                </RedirectAuthenticatedUser>
              }
            />

            <Route
              path="/reset-password/:token"
              element={
                <RedirectAuthenticatedUser>
                  <ResetPasswordPage />
                </RedirectAuthenticatedUser>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default Authentication;
