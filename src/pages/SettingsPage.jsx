import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Shield, Bell, Moon, Sun, Lock, Eye, Users,
  Smartphone, Database, HelpCircle, LogOut, Check, Info, Trash2
} from "lucide-react";
import { useApp } from "../context/AppContext";

const SettingsPage = () => {
  const navigate = useNavigate();
  const {
    settings,
    updateSettings,
    darkMode,
    toggleDarkMode,
    currentUser
  } = useApp();

  const [cacheCleared, setCacheCleared] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const handleToggle = (key) => {
    updateSettings({ [key]: !settings[key] });
    showToast("Setting updated");
  };

  const handleSelect = (key, value) => {
    updateSettings({ [key]: value });
    showToast("Preference saved");
  };

  const handleClearCache = () => {
    setCacheCleared(true);
    showToast("Cache cleared (142.8 MB freed)");
    setTimeout(() => setCacheCleared(false), 3000);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out of VibesTok?")) {
      showToast("Logged out successfully");
      setTimeout(() => navigate("/"), 600);
    }
  };

  return (
    <div className="page-container settings-page">
      <div className="subpage-header">
        <button className="subpage-back-btn" onClick={() => navigate("/profile")}>
          <ArrowLeft size={20} />
          <span>Profile</span>
        </button>
        <h1 className="subpage-title">Settings & Privacy</h1>
        <div style={{ width: 60 }} />
      </div>

      {toastMessage && (
        <div className="toast-success-banner floating-toast">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Account Info Pill */}
      <div className="settings-account-card">
        <img src={currentUser.avatar} alt="avatar" className="settings-account-avatar" />
        <div className="settings-account-meta">
          <div className="settings-account-name">{currentUser.displayName}</div>
          <div className="settings-account-handle">@{currentUser.username}</div>
        </div>
        <button
          className="settings-edit-link-btn"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </button>
      </div>

      <div className="settings-sections-list">
        {/* Privacy Section */}
        <div className="settings-group-card">
          <div className="settings-group-header">
            <Shield size={18} className="settings-group-icon" />
            <span>Privacy & Safety</span>
          </div>

          <div className="settings-item-row">
            <div className="settings-item-text">
              <span className="settings-item-title">Private Account</span>
              <span className="settings-item-desc">
                Only users you approve can follow you and watch your vibes.
              </span>
            </div>
            <label className="switch-toggle">
              <input
                type="checkbox"
                checked={!!settings.privateAccount}
                onChange={() => handleToggle("privateAccount")}
              />
              <span className="slider-round" />
            </label>
          </div>

          <div className="settings-item-row">
            <div className="settings-item-text">
              <span className="settings-item-title">Who Can Comment</span>
              <span className="settings-item-desc">
                Choose who can leave comments on your published vibes.
              </span>
            </div>
            <select
              className="settings-inline-select"
              value={settings.allowComments}
              onChange={(e) => handleSelect("allowComments", e.target.value)}
            >
              <option value="everyone">Everyone</option>
              <option value="followers">Followers</option>
              <option value="no_one">No One</option>
            </select>
          </div>

          <div className="settings-item-row">
            <div className="settings-item-text">
              <span className="settings-item-title">Allow Duet & Stitch</span>
              <span className="settings-item-desc">
                Allow other creators to duet or stitch your videos.
              </span>
            </div>
            <label className="switch-toggle">
              <input
                type="checkbox"
                checked={!!settings.allowDuet}
                onChange={() => handleToggle("allowDuet")}
              />
              <span className="slider-round" />
            </label>
          </div>

          <div className="settings-item-row">
            <div className="settings-item-text">
              <span className="settings-item-title">Direct Messages</span>
              <span className="settings-item-desc">
                Control who can send you direct messages in Inbox.
              </span>
            </div>
            <select
              className="settings-inline-select"
              value={settings.directMessages}
              onChange={(e) => handleSelect("directMessages", e.target.value)}
            >
              <option value="everyone">Everyone</option>
              <option value="followers">Followers Only</option>
              <option value="no_one">No One</option>
            </select>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="settings-group-card">
          <div className="settings-group-header">
            <Bell size={18} className="settings-group-icon" />
            <span>Notifications</span>
          </div>

          <div className="settings-item-row">
            <div className="settings-item-text">
              <span className="settings-item-title">Push Notifications</span>
              <span className="settings-item-desc">
                Get alerted for new likes, comments, mentions, and followers.
              </span>
            </div>
            <label className="switch-toggle">
              <input
                type="checkbox"
                checked={!!settings.pushNotifications}
                onChange={() => handleToggle("pushNotifications")}
              />
              <span className="slider-round" />
            </label>
          </div>

          <div className="settings-item-row">
            <div className="settings-item-text">
              <span className="settings-item-title">Email Digest</span>
              <span className="settings-item-desc">
                Receive weekly trending vibes and creator insights.
              </span>
            </div>
            <label className="switch-toggle">
              <input
                type="checkbox"
                checked={!!settings.emailNotifications}
                onChange={() => handleToggle("emailNotifications")}
              />
              <span className="slider-round" />
            </label>
          </div>
        </div>

        {/* Content & Display */}
        <div className="settings-group-card">
          <div className="settings-group-header">
            <Smartphone size={18} className="settings-group-icon" />
            <span>Content & Display</span>
          </div>

          <div className="settings-item-row">
            <div className="settings-item-text">
              <span className="settings-item-title">Dark Theme</span>
              <span className="settings-item-desc">
                Optimized high-contrast dark aesthetic.
              </span>
            </div>
            <label className="switch-toggle">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <span className="slider-round" />
            </label>
          </div>

          <div className="settings-item-row">
            <div className="settings-item-text">
              <span className="settings-item-title">Autoplay Feed Videos</span>
              <span className="settings-item-desc">
                Videos automatically play as you scroll through the For You feed.
              </span>
            </div>
            <label className="switch-toggle">
              <input
                type="checkbox"
                checked={!!settings.autoplayVideos}
                onChange={() => handleToggle("autoplayVideos")}
              />
              <span className="slider-round" />
            </label>
          </div>

          <div className="settings-item-row">
            <div className="settings-item-text">
              <span className="settings-item-title">Data Saver</span>
              <span className="settings-item-desc">
                Lowers video resolution to consume less mobile network bandwidth.
              </span>
            </div>
            <label className="switch-toggle">
              <input
                type="checkbox"
                checked={!!settings.dataSaver}
                onChange={() => handleToggle("dataSaver")}
              />
              <span className="slider-round" />
            </label>
          </div>

          <div className="settings-item-row">
            <div className="settings-item-text">
              <span className="settings-item-title">Feed Language</span>
              <span className="settings-item-desc">
                Prioritize videos created in your preferred language.
              </span>
            </div>
            <select
              className="settings-inline-select"
              value={settings.contentLanguage}
              onChange={(e) => handleSelect("contentLanguage", e.target.value)}
            >
              <option value="English">English</option>
              <option value="Spanish">Español</option>
              <option value="French">Français</option>
              <option value="Hindi">हिन्दी</option>
              <option value="Japanese">日本語</option>
              <option value="German">Deutsch</option>
            </select>
          </div>
        </div>

        {/* Data & Storage */}
        <div className="settings-group-card">
          <div className="settings-group-header">
            <Database size={18} className="settings-group-icon" />
            <span>Data & Storage</span>
          </div>

          <div className="settings-item-row">
            <div className="settings-item-text">
              <span className="settings-item-title">Cached Video Data</span>
              <span className="settings-item-desc">
                {cacheCleared ? "Cache is clean (0 B)" : "Temporary video thumbnails and clips (142.8 MB)"}
              </span>
            </div>
            <button
              className="danger-outline-btn"
              onClick={handleClearCache}
              disabled={cacheCleared}
            >
              <Trash2 size={14} />
              <span>{cacheCleared ? "Cleaned" : "Clear Cache"}</span>
            </button>
          </div>
        </div>

        {/* Support & About */}
        <div className="settings-group-card">
          <div className="settings-group-header">
            <HelpCircle size={18} className="settings-group-icon" />
            <span>About VibesTok</span>
          </div>

          <div className="settings-action-link" onClick={() => alert("Community Guidelines: Be respectful, authentic, and spread good vibes!")}>
            <span>Community Guidelines</span>
            <span className="settings-arrow">→</span>
          </div>
          <div className="settings-action-link" onClick={() => alert("Terms of Service: VibesTok version 1.2.0")}>
            <span>Terms of Service</span>
            <span className="settings-arrow">→</span>
          </div>
          <div className="settings-action-link" onClick={() => alert("Privacy Policy: Your data is secure and under your control.")}>
            <span>Privacy Policy</span>
            <span className="settings-arrow">→</span>
          </div>
          <div className="settings-action-link non-clickable">
            <span>App Version</span>
            <span className="settings-meta-tag">v1.2.0 (VibesTok Beta)</span>
          </div>
        </div>

        {/* Log Out */}
        <div className="settings-logout-wrap">
          <button className="settings-logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Log Out of @{currentUser.username}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
