import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const imageUrl = 'https://media.istockphoto.com/id/497347644/photo/hand-pressing-register-now.jpg?s=612x612&w=0&k=20&c=XzXNw7_71cx23yPATWsSnYwGytZW-KU3eTpy3WCFQgw=';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee'); // Default role
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const registerUser = () => {
        axios.post('http://127.0.0.1:5000/register', {
            email: email,
            password: password,
            role: role,
            mobilenumber: mobileNumber,
            address: address
             // Include the mobile number in the request
        })
        .then(function (response) {
            console.log(response);
            navigate('/login'); // Redirect to login page after successful registration
        })
        .catch(function (error) {
            console.log(error, 'error');
            if (error.response && error.response.status === 401) {
                alert('Invalid credentials');
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
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">
                                        Create Your Account
                                    </p>
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
                                    <label
                                        className="form-label"
                                        htmlFor="form3Example3"
                                    >
                                        Email address
                                    </label>
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
                                    <label
                                        className="form-label"
                                        htmlFor="form3Example4"
                                    >
                                        Password
                                    </label>
                                </div>

                                <div className="form-outline mb-3">
                                    <input
                                        type="text"
                                        value={mobileNumber}
                                        onChange={(e) => setMobileNumber(e.target.value)}
                                        id="form3Example5"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your mobile number"
                                    />
                                    <label
                                        className="form-label"
                                        htmlFor="form3Example5"
                                    >
                                        Mobile number
                                    </label>
                                </div>
                                <div className="form-outline mb-3">
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        id="form3Example6"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your address"
                                    />
                                    <label
                                        className="form-label"
                                        htmlFor="form3Example6"
                                    >
                                        Address
                                    </label>
                                </div>


                                {/* Role selection */}
                                <div className="form-outline mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="form3Example6"
                                    >
                                        Select Role
                                    </label>
                                    <select
                                        className="form-select"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="employee">Employee</option>
                                        <option value="manager">Manager</option>
                                        <option value="team leader">Team Leader</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                {/* End of role selection */}

                                
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg"
                                        onClick={registerUser}
                                    >
                                        Sign Up
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Login to your account{' '}
                                        <a
                                            href="/login"
                                            className="link-danger"
                                        >
                                            Login
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src={imageUrl} alt="Background" style={{ width: '100%',  height: '420px', objectFit: 'cover' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
