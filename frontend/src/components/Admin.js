// Admin.js
import React from 'react';
import Sidebar from './Sidebar'; // Import the Sidebar component

const Admin = () => {
    return (
        <div>
            <h1>Welcome Admin Page!</h1>
            {/* Add Admin-specific content here */}
            <Sidebar /> {/* Include the Sidebar component */}
        </div>
    );
};

export default Admin;
