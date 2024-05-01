import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const SidebarItem = ({ item }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div className={open ? "sidebar-item open" : "sidebar-item"}>
            {item.path ? ( // Check if item has a path
                <Link to={item.path} className="sidebar-link">
                    <div className="sidebar-title" onClick={handleClick}>
                        <span>
                            {item.icon && <i className={item.icon}></i>}
                            {item.title}
                        </span>
                        {item.childrens && <i className="bi-chevron-down toggle-btn"></i>}
                    </div>
                </Link>
            ) : (
                <div className="sidebar-title" onClick={handleClick}>
                    <span>
                        {item.icon && <i className={item.icon}></i>}
                        {item.title}
                    </span>
                    {item.childrens && <i className="bi-chevron-down toggle-btn"></i>}
                </div>
            )}
            {item.childrens && (
                <div className="sidebar-content">
                    {item.childrens.map((child, index) => (
                        <SidebarItem key={index} item={child} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default SidebarItem;
