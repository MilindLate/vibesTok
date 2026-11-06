import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Check, Globe, AtSign, Tv, Sparkles, Link } from "lucide-react";
import { useApp } from "../context/AppContext";

const AVATAR_PRESETS = [
  "Ava", "Jay", "Priya", "Max", "Sara", "Leo", "Alex", "Zoe", "Kai"
];

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, updateCurrentUser } = useApp();

  const [displayName, setDisplayName] = useState(currentUser.displayName || "");
  const [username, setUsername] = useState(currentUser.username || "");
  const [bio, setBio] = useState(currentUser.bio || "");
  const [avatar, setAvatar] = useState(currentUser.avatar || "");
  const [website, setWebsite] = useState(currentUser.website || "https://vibestok.app/@" + currentUser.username);
  const [category, setCategory] = useState(currentUser.category || "Dance & Choreography");
  const [instagram, setInstagram] = useState(currentUser.instagram || currentUser.username);
  const [youtube, setYoutube] = useState(currentUser.youtube || currentUser.displayName);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleCustomAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  const handleSelectPreset = (seed) => {
    setAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!displayName.trim()) {
      alert("Display name cannot be empty");
      return;
    }
    const cleanUsername = username.trim().replace(/^@/, "").toLowerCase();
    if (!cleanUsername) {
      alert("Username cannot be empty");
      return;
    }

    updateCurrentUser({
      displayName: displayName.trim(),
      username: cleanUsername,
      bio: bio.trim(),
      avatar,
      website: website.trim(),
      category,
      instagram: instagram.trim(),
      youtube: youtube.trim(),
    });

    setSavedSuccess(true);
    setTimeout(() => {
      navigate("/profile");
    }, 900);
  };

  return (
    <div className="page-container edit-profile-page">
      <div className="subpage-header">
        <button className="subpage-back-btn" onClick={() => navigate("/profile")}>
          <ArrowLeft size={20} />
          <span>Back to Profile</span>
        </button>
        <h1 className="subpage-title">Edit Profile</h1>
        <button className="save-pill-btn" onClick={handleSave} disabled={savedSuccess}>
          {savedSuccess ? (
            <>
              <Check size={16} /> Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>

      {savedSuccess && (
        <div className="toast-success-banner">
          <Check size={18} />
          <span>Profile updated successfully! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSave} className="edit-profile-form">
        {/* Avatar Section */}
        <div className="edit-avatar-container">
          <div className="edit-avatar-preview-wrap">
            <img src={avatar} alt="Profile Avatar" className="edit-avatar-large" />
            <button
              type="button"
              className="change-photo-badge"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload custom photo"
            >
              <Camera size={16} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleCustomAvatarUpload}
              accept="image/*"
              hidden
            />
          </div>

          <div className="avatar-meta-actions">
            <button
              type="button"
              className="upload-photo-text-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Custom Photo
            </button>
            <div className="avatar-presets-title">
              <Sparkles size={14} />
              <span>Or Pick an Avatar Style</span>
            </div>
            <div className="avatar-presets-row">
              {AVATAR_PRESETS.map((seed) => (
                <button
                  type="button"
                  key={seed}
                  className={`avatar-preset-chip ${
                    avatar.includes(seed) ? "selected" : ""
                  }`}
                  onClick={() => handleSelectPreset(seed)}
                >
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                    alt={seed}
                  />
                  <span>{seed}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="edit-fields-card">
          <h2 className="edit-section-title">About You</h2>

          <div className="edit-form-group">
            <label className="edit-form-label">Display Name *</label>
            <input
              type="text"
              className="edit-form-input"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your public name"
              maxLength={40}
              required
            />
            <span className="field-hint">This appears on your profile and videos.</span>
          </div>

          <div className="edit-form-group">
            <label className="edit-form-label">Username *</label>
            <div className="input-with-prefix">
              <span className="input-prefix">@</span>
              <input
                type="text"
                className="edit-form-input with-prefix"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_.]/g, ""))}
                placeholder="username"
                maxLength={30}
                required
              />
            </div>
            <span className="field-hint">Letters, numbers, underscores, and periods only.</span>
          </div>

          <div className="edit-form-group">
            <label className="edit-form-label">Bio</label>
            <textarea
              className="edit-form-textarea"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell the VibesTok community what you vibe about..."
              maxLength={160}
              rows={3}
            />
            <div className="field-counter">{bio.length} / 160</div>
          </div>

          <div className="edit-form-group">
            <label className="edit-form-label">Creator Category</label>
            <select
              className="edit-form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Dance & Choreography">Dance & Choreography</option>
              <option value="Comedy & Skits">Comedy & Skits</option>
              <option value="Food & Cooking">Food & Cooking</option>
              <option value="Tech & Coding">Tech & Coding</option>
              <option value="Fitness & Health">Fitness & Health</option>
              <option value="Travel & Adventure">Travel & Adventure</option>
              <option value="Music & Beats">Music & Beats</option>
              <option value="Gaming & Esports">Gaming & Esports</option>
              <option value="Art & Design">Art & Design</option>
            </select>
          </div>
        </div>

        {/* Links & Socials */}
        <div className="edit-fields-card">
          <h2 className="edit-section-title">Links & Social Profiles</h2>

          <div className="edit-form-group">
            <label className="edit-form-label">
              <Globe size={15} /> Website Link
            </label>
            <input
              type="url"
              className="edit-form-input"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div className="edit-form-group">
            <label className="edit-form-label">
              <AtSign size={15} /> Instagram Handle
            </label>
            <input
              type="text"
              className="edit-form-input"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="Instagram username"
            />
          </div>

          <div className="edit-form-group">
            <label className="edit-form-label">
              <Tv size={15} /> YouTube Channel
            </label>
            <input
              type="text"
              className="edit-form-input"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              placeholder="YouTube channel name"
            />
          </div>
        </div>

        <div className="edit-form-actions">
          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>
          <button type="submit" className="primary-save-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
