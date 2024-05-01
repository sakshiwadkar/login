// Manager.js
import React from 'react';
import Sidebar from './Sidebar'; // Import the Sidebar component
const Manager = () => {
    return (
        <div>
            <h1>Welcome Manager Page!</h1>
            {/* Add Manager-specific content here */}
            <Sidebar /> {/* Include the Sidebar component */}
        </div>
    );
};

export default Manager;
