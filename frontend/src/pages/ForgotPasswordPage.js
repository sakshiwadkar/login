import React, { useState } from 'react';
import axios from 'axios';
import VerifyOTPPage from './VerifyOTPPage'; // Import VerifyOTPPage component

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false); // State to track whether OTP is sent

    const sendOTP = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/send-otp', { email });
            console.log(response);
            const { data } = response;
            if (data && data.message) {
                alert('OTP has been sent to your email.');
                setOtpSent(true); // Update state to indicate OTP sent
            } else {
                alert('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to send OTP. Please try again.');
        }
    };

    return (
        <div>
            {!otpSent ? (
                <div>
                    <h2>Forgot Password</h2>
                    <form onSubmit={e => { e.preventDefault(); sendOTP(); }}>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <button type="submit">Send OTP</button>
                    </form>
                </div>
            ) : (
                <VerifyOTPPage email={email} /> // Render VerifyOTPPage component with email prop
            )}
        </div>
    );
};

export default ForgotPasswordPage;
