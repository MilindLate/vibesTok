import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Compass, PlusSquare, Bell, User, Zap, TrendingUp } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { trendingHashtags, mockUsers, formatNumber } from "../../data/mockData";

const Sidebar = () => {
  const { followedUsers, toggleFollow, unreadCount } = useApp();
  const suggestedUsers = mockUsers.slice(1, 5);

  return (
    <aside className="sidebar">
      <NavLink to="/" className="sidebar-logo">
        <Zap size={28} className="logo-icon" />
        <span className="logo-text">VibesTok</span>
      </NavLink>

      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`} end>
          <Home size={22} />
          <span>For You</span>
        </NavLink>
        <NavLink to="/discover" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
          <Compass size={22} />
          <span>Discover</span>
        </NavLink>
        <NavLink to="/inbox" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
          <div className="sidebar-link-inner">
            <Bell size={22} />
            <span>Inbox</span>
            {unreadCount > 0 && <span className="sidebar-badge">{unreadCount}</span>}
          </div>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
          <User size={22} />
          <span>Profile</span>
        </NavLink>
      </nav>

      <NavLink to="/upload" className="sidebar-upload-btn">
        <PlusSquare size={18} />
        <span>Upload Video</span>
      </NavLink>

      <div className="sidebar-section">
        <div className="sidebar-section-title">
          <TrendingUp size={15} />
          <span>Trending Hashtags</span>
        </div>
        {trendingHashtags.slice(0, 5).map((h) => (
          <NavLink key={h.tag} to={`/discover?tag=${h.tag}`} className="trending-item">
            <span className="trending-tag">
              <span className="trending-emoji">{h.emoji}</span> #{h.tag}
            </span>
            <span className="trending-count">{h.count}</span>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">
          <span>Suggested Creators</span>
        </div>
        {suggestedUsers.map((user) => {
          const isFollowed = followedUsers.has(user.id);
          return (
            <div key={user.id} className="suggested-user">
              <img src={user.avatar} alt={user.username} className="suggested-avatar" />
              <div className="suggested-info">
                <div className="suggested-name">{user.displayName}</div>
                <div className="suggested-followers">{formatNumber(user.followers)} followers</div>
              </div>
              <button
                className={`suggested-follow-btn ${isFollowed ? "following" : ""}`}
                onClick={() => toggleFollow(user.id)}
              >
                {isFollowed ? "Following" : "Follow"}
              </button>
            </div>
          );
        })}
      </div>

      <footer className="sidebar-footer">
        <p>© 2026 VibesTok, Inc.</p>
        <p>Built for short-form entertainment & creators.</p>
      </footer>
    </aside>
  );
};

export default Sidebar;
