import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { formatNumber } from "../data/mockData";
import {
  Grid, Bookmark, Heart, Settings, Share2, Camera,
  UserPlus, UserCheck, ShieldCheck, Globe
} from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    users,
    videos,
    likedVideos,
    savedVideos,
    followedUsers,
    toggleFollow,
    setActiveFeedVideoId
  } = useApp();
  const [tab, setTab] = useState("videos");

  const userVideos = videos.filter((v) => v.userId === currentUser.id);
  const likedVids = videos.filter((v) => likedVideos.has(v.id));
  const savedVids = videos.filter((v) => savedVideos.has(v.id));

  const tabs = [
    { id: "videos", icon: Grid, label: "Videos", items: userVideos },
    { id: "liked", icon: Heart, label: "Liked", items: likedVids },
    { id: "saved", icon: Bookmark, label: "Saved", items: savedVids },
  ];

  const currentItems = tabs.find((t) => t.id === tab)?.items || [];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${currentUser.displayName} (@${currentUser.username}) on VibesTok`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Profile link copied to clipboard!");
    }
  };

  const handlePlayVideo = (videoId) => {
    setActiveFeedVideoId(videoId);
    navigate("/");
  };

  return (
    <div className="page-container profile-page">
      <div className="profile-header">
        <div className="profile-header-actions">
          <button className="icon-btn" onClick={handleShare} aria-label="Share profile">
            <Share2 size={18} />
          </button>
          <button
            className="icon-btn"
            onClick={() => navigate("/settings")}
            aria-label="Settings"
          >
            <Settings size={18} />
          </button>
        </div>

        <div className="profile-avatar-section">
          <div className="profile-avatar-wrapper">
            <img src={currentUser.avatar} alt={currentUser.username} className="profile-avatar" />
            <button
              className="edit-avatar-btn"
              onClick={() => navigate("/edit-profile")}
              aria-label="Change avatar"
            >
              <Camera size={13} />
            </button>
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

        {currentUser.website && (
          <a
            href={currentUser.website}
            target="_blank"
            rel="noreferrer"
            className="profile-website-link"
          >
            <Globe size={14} />
            <span>{currentUser.website.replace(/^https?:\/\//, "")}</span>
          </a>
        )}

        <div className="profile-btn-row">
          <button
            className="edit-profile-btn"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
          <button className="share-profile-btn" onClick={handleShare}>
            Share Profile
          </button>
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
          <div
            key={video.id}
            className="grid-item"
            onClick={() => handlePlayVideo(video.id)}
          >
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
            {users
              .filter((u) => u.id !== currentUser.id)
              .map((user) => {
                const isF = followedUsers.has(user.id);
                return (
                  <div key={user.id} className="suggested-card">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="suggested-card-avatar"
                      onClick={() => navigate(`/user/${user.id}`)}
                    />
                    <div
                      className="suggested-card-info"
                      onClick={() => navigate(`/user/${user.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="suggested-card-name">{user.displayName}</div>
                      <div className="suggested-sub">
                        @{user.username} · {formatNumber(user.followers)} followers
                      </div>
                    </div>
                    <button
                      className={`follow-btn ${isF ? "following" : ""}`}
                      onClick={() => toggleFollow(user.id)}
                    >
                      {isF ? (
                        <>
                          <UserCheck size={14} /> Following
                        </>
                      ) : (
                        <>
                          <UserPlus size={14} /> Follow
                        </>
                      )}
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
