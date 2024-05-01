import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyOTPPage from './pages/VerifyOTPPage';
import SendOTP from './pages/SendOTP';
import Admin from './components/Admin';
import Manager from './components/Manager';
import TeamLeader from './components/TeamLeader';
import Employee from './components/Employee';

const App = () => {
    return (
        <Router>
            <div className="vh-100 gradient-custom">
                <div className="container">
                    <h1 className="page-header text-center">
                        Numetry Technology
                    </h1>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/reset-password" element={<ResetPasswordPage />} />
                        <Route path="/verify-otp" element={<VerifyOTPPage />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/manager" element={<Manager />} />
                        <Route path="/team-leader" element={<TeamLeader />} />
                        <Route path="/employee" element={<Employee />} />
                        <Route path="/send-otp" element={<SendOTP />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
