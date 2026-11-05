import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { mockUsers, mockVideos, formatNumber } from "../data/mockData";
import {
  Grid, Bookmark, Heart, Settings, Share2, Camera,
  UserPlus, UserCheck, ShieldCheck
} from "lucide-react";

const ProfilePage = () => {
  const { currentUser, likedVideos, savedVideos, followedUsers, toggleFollow } = useApp();
  const [tab, setTab] = useState("videos");

  const userVideos = mockVideos.filter((v) => v.userId === currentUser.id);
  const likedVids = mockVideos.filter((v) => likedVideos.has(v.id));
  const savedVids = mockVideos.filter((v) => savedVideos.has(v.id));

  const tabs = [
    { id: "videos", icon: Grid, label: "Videos", items: userVideos },
    { id: "liked", icon: Heart, label: "Liked", items: likedVids },
    { id: "saved", icon: Bookmark, label: "Saved", items: savedVids },
  ];

  const currentItems = tabs.find((t) => t.id === tab)?.items || [];

  return (
    <div className="page-container profile-page">
      <div className="profile-header">
        <div className="profile-header-actions">
          <button className="icon-btn" aria-label="Share profile"><Share2 size={18} /></button>
          <button className="icon-btn" aria-label="Settings"><Settings size={18} /></button>
        </div>

        <div className="profile-avatar-section">
          <div className="profile-avatar-wrapper">
            <img src={currentUser.avatar} alt={currentUser.username} className="profile-avatar" />
            <button className="edit-avatar-btn" aria-label="Change avatar"><Camera size={13} /></button>
          </div>
          <div className="profile-titles">
            <h2 className="profile-display-name">{currentUser.displayName}</h2>
            <div className="profile-handle-row">
              <span className="profile-username">@{currentUser.username}</span>
              {currentUser.verified && (
                <span className="verified-pill">
                  <ShieldCheck size={14} /> Verified
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat">
            <span className="stat-value">{formatNumber(currentUser.following)}</span>
            <span className="stat-label">Following</span>
          </div>
          <div className="stat">
            <span className="stat-value">{formatNumber(currentUser.followers)}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat">
            <span className="stat-value">{formatNumber(currentUser.likes)}</span>
            <span className="stat-label">Likes</span>
          </div>
        </div>

        <p className="profile-bio">{currentUser.bio}</p>

        <div className="profile-btn-row">
          <button className="edit-profile-btn">Edit Profile</button>
          <button className="share-profile-btn">Share Profile</button>
        </div>
      </div>

      <div className="profile-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`profile-tab ${tab === t.id ? "active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            <t.icon size={17} />
            <span>{t.label} ({t.items.length})</span>
          </button>
        ))}
      </div>

      <div className="video-grid">
        {currentItems.length === 0 && (
          <div className="empty-grid">
            {tab === "videos" && "No uploaded videos yet. Create your first vibe! 🎬"}
            {tab === "liked" && "Videos you like will appear here ❤️"}
            {tab === "saved" && "Saved videos will appear here 🔖"}
          </div>
        )}
        {currentItems.map((video) => (
          <div key={video.id} className="grid-item">
            <img src={video.thumbnail} alt="video thumbnail" className="grid-thumb" />
            <div className="grid-overlay">
              <Heart size={14} fill="white" />
              <span>{formatNumber(video.likes)}</span>
            </div>
          </div>
        ))}
      </div>

      {tab === "videos" && (
        <div className="suggested-section">
          <h3>Discover Other Creators</h3>
          <div className="suggested-list">
            {mockUsers.slice(1).map((user) => {
              const isF = followedUsers.has(user.id);
              return (
                <div key={user.id} className="suggested-card">
                  <img src={user.avatar} alt={user.username} className="suggested-card-avatar" />
                  <div className="suggested-card-info">
                    <div className="suggested-card-name">{user.displayName}</div>
                    <div className="suggested-sub">@{user.username} · {formatNumber(user.followers)} followers</div>
                  </div>
                  <button
                    className={`follow-btn ${isF ? "following" : ""}`}
                    onClick={() => toggleFollow(user.id)}
                  >
                    {isF ? <><UserCheck size={14} /> Following</> : <><UserPlus size={14} /> Follow</>}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
