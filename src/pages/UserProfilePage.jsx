import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Heart, Grid, Share2, MessageCircle, UserPlus, UserCheck, ShieldCheck, Globe
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { formatNumber } from "../data/mockData";

const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const {
    getUserById,
    currentUser,
    videos,
    followedUsers,
    toggleFollow,
    setActiveFeedVideoId
  } = useApp();

  const [activeTab, setActiveTab] = useState("videos");

  const targetUser = getUserById(userId) || currentUser;
  const isMe = targetUser.id === currentUser.id;
  const isFollowed = followedUsers.has(targetUser.id);

  const userVideos = videos.filter((v) => v.userId === targetUser.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${targetUser.displayName} on VibesTok`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Creator profile link copied to clipboard!");
    }
  };

  const handleOpenVideo = (videoId) => {
    setActiveFeedVideoId(videoId);
    navigate("/");
  };

  return (
    <div className="page-container user-profile-page">
      <div className="subpage-header">
        <button className="subpage-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="subpage-title">@{targetUser.username}</h1>
        <button className="icon-btn" onClick={handleShare} aria-label="Share creator">
          <Share2 size={18} />
        </button>
      </div>

      <div className="profile-header">
        <div className="profile-avatar-section">
          <div className="profile-avatar-wrapper">
            <img src={targetUser.avatar} alt={targetUser.username} className="profile-avatar" />
          </div>
          <div className="profile-titles">
            <h2 className="profile-display-name">{targetUser.displayName}</h2>
            <div className="profile-handle-row">
              <span className="profile-username">@{targetUser.username}</span>
              {targetUser.verified && (
                <span className="verified-pill">
                  <ShieldCheck size={14} /> Verified
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat">
            <span className="stat-value">{formatNumber(targetUser.following)}</span>
            <span className="stat-label">Following</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {formatNumber(targetUser.followers + (isFollowed ? 1 : 0))}
            </span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat">
            <span className="stat-value">{formatNumber(targetUser.likes)}</span>
            <span className="stat-label">Likes</span>
          </div>
        </div>

        <p className="profile-bio">{targetUser.bio || "No bio yet."}</p>

        {targetUser.website && (
          <a
            href={targetUser.website}
            target="_blank"
            rel="noreferrer"
            className="profile-website-link"
          >
            <Globe size={14} />
            <span>{targetUser.website.replace(/^https?:\/\//, "")}</span>
          </a>
        )}

        <div className="profile-btn-row">
          {isMe ? (
            <button className="edit-profile-btn" onClick={() => navigate("/edit-profile")}>
              Edit Profile
            </button>
          ) : (
            <>
              <button
                className={`follow-btn-main ${isFollowed ? "following" : ""}`}
                onClick={() => toggleFollow(targetUser.id)}
              >
                {isFollowed ? (
                  <>
                    <UserCheck size={16} /> Following
                  </>
                ) : (
                  <>
                    <UserPlus size={16} /> Follow
                  </>
                )}
              </button>
              <button
                className="secondary-btn icon-flex-btn"
                onClick={() => navigate("/inbox")}
              >
                <MessageCircle size={16} />
                <span>Message</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={`profile-tab ${activeTab === "videos" ? "active" : ""}`}
          onClick={() => setActiveTab("videos")}
        >
          <Grid size={17} />
          <span>Vibes ({userVideos.length})</span>
        </button>
      </div>

      <div className="video-grid">
        {userVideos.length === 0 ? (
          <div className="empty-grid">This creator hasn't posted any vibes yet 🎬</div>
        ) : (
          userVideos.map((video) => (
            <div
              key={video.id}
              className="grid-item"
              onClick={() => handleOpenVideo(video.id)}
            >
              <img src={video.thumbnail} alt="video thumbnail" className="grid-thumb" />
              <div className="grid-overlay">
                <Heart size={14} fill="white" />
                <span>{formatNumber(video.likes)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
