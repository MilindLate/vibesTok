import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Compass, PlusSquare, Bell, User } from "lucide-react";
import { useApp } from "../../context/AppContext";

const BottomNav = () => {
  const { unreadCount } = useApp();

  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} end>
        <Home size={22} />
        <span>Home</span>
      </NavLink>

      <NavLink to="/discover" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <Compass size={22} />
        <span>Discover</span>
      </NavLink>

      <NavLink to="/upload" className="nav-item upload-btn" aria-label="Upload video">
        <div className="upload-icon">
          <PlusSquare size={24} />
        </div>
      </NavLink>

      <NavLink to="/inbox" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <div className="notification-wrapper">
          <Bell size={22} />
          {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
        </div>
        <span>Inbox</span>
      </NavLink>

      <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <User size={22} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
