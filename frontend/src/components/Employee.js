// Employee.js
import React from 'react';
import Sidebar from './Sidebar'; // Import the Sidebar component
const Employee = () => {
    return (
        <div>
            <h1>Welcome Employee Page!</h1>
            {/* Add Employee-specific content here */}
            <Sidebar /> {/* Include the Sidebar component */}
        </div>
    );
};

export default Employee;
