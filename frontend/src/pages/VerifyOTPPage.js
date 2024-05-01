import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VerifyOTPPage = ({ email: initialEmail }) => {
    const [email, setEmail] = useState(initialEmail || '');
    const [otp, setOtp] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);

    // Use useEffect to set the email state when the component mounts
    useEffect(() => {
        setEmail(initialEmail || '');
    }, [initialEmail]);

    const verifyOTP = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/verify-otp', { email, otp });
            console.log(response.data);
            if (response.data && response.data.message === "OTP verified successfully") {
                setOtpVerified(true);
                alert('OTP verified successfully. You can reset your password now.');
            } else {
                alert('Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to verify OTP. Please try again.');
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        verifyOTP();
    };

    return (
        <div>
            {!otpVerified ? (
                <div>
                    <h2>Verify OTP</h2>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>OTP:</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={e => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Verify OTP</button>
                    </form>
                </div>
            ) : (
                <div>
                    <p>OTP verified successfully. You can reset your password now.</p>
                </div>
            )}
        </div>
    );
};

export default VerifyOTPPage;
