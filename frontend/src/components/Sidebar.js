// Sidebar.js
import React from 'react';
import './Sidebar.css'; // Import the Sidebar CSS file
import SidebarItem from './SidebarItem'; // Import SidebarItem component
import items from '../data/sidebar.json'; // Import the JSON data for sidebar items

const Sidebar = () => {
    return (
        
        <div className="sidebar">
            {items.map((item, index) => <SidebarItem key={index} item={item} />)}
        </div>
    );
}

export default Sidebar;
