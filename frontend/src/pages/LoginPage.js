import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA_O9qvif2uNOHlr7Lq1SKAjdlmLwLBDsRaGDvPItN9xIkbOFbOT3CLHSxf_zUDB1bvWs&usqp=CAU';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const logInUser = () => {
        if (email.length === 0 || password.length === 0) {
            alert('Email and password cannot be blank.');
            return;
        }

        axios
            .post('http://127.0.0.1:5000/login', {
                email: email,
                password: password
            })
            .then(function (response) {
                console.log(response);
                const accessToken = response.data.access_token;
                localStorage.setItem('accessToken', accessToken); // Store JWT token in local storage
                const role = response.data.user.role;
                if (role === 'admin') {
                    navigate('/admin');
                } else if (role === 'manager') {
                    navigate('/manager');
                } else if (role === 'team leader') {
                    navigate('/team-leader');
                } else {
                    navigate('/employee');
                }
            })
            .catch(function (error) {
                console.log(error);
                if (error.response && error.response.status === 401) {
                    alert('Invalid email or password.');
                } else {
                    alert('An error occurred. Please try again later.');
                }
            });
    };

    return (
        <div>
            <div className="container h-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-1 col-lg-3 col-xl-2">
                            {/* Add your background image here */}
                            <img src={imageUrl} alt="Background" style={{ width: '200%',  height: '420px', objectFit: 'cover' }} />
                        </div>
                        <div className="col-md-9 col-lg-6 col-xl-5"></div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">Log Into Your Account</p>
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="form3Example3"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"
                                    />
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                </div>
                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        id="form3Example4"
                                        className="form-control form-control-lg"
                                        placeholder="Enter password"
                                    />
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to="/send-otp" className="text-body">Forgot password?</Link>
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg"
                                        onClick={logInUser}
                                    >
                                        Login
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Don't have an account?{' '}
                                        <Link to="/register" className="link-danger">Register</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
