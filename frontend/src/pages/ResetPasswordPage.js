import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordPage = () => {
    const [email, setEmail] = useState(''); // Add email state variable
    const [newPassword, setNewPassword] = useState('');

    const handleResetPassword = () => {
        // Make a request to reset password
        axios.post('http://127.0.0.1:5000/reset_password', { email, newPassword })
            .then(response => {
                // Handle password reset success
                console.log(response);
                alert('Password reset successfully');
                // Redirect the user to login page or any other page
            })
            .catch(error => {
                // Handle password reset error
                console.error(error);
                alert('Failed to reset password. Please try again.');
            });
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <label>Email:</label> {/* Add input for email */}
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <label>New Password:</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;
