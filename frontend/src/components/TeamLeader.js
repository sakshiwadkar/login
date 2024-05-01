// TeamLeader.js
import React from 'react';
import Sidebar from './Sidebar'; // Import the Sidebar component
const TeamLeader = () => {
    return (
        <div>
            <h1>Welcome Team Leader Page!</h1>
            {/* Add Team Leader-specific content here */}
            <Sidebar /> {/* Include the Sidebar component */}
        </div>
    );
};

export default TeamLeader;
