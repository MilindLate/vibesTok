import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Video, Music2, Hash, Type, X, Check, Eye } from "lucide-react";
import { useApp } from "../context/AppContext";

const UploadPage = () => {
  const navigate = useNavigate();
  const { currentUser, addVideo } = useApp();

  const [step, setStep] = useState(1); // 1 = select, 2 = details, 3 = success
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [sound, setSound] = useState("");
  const [tags, setTags] = useState("");
  const [privacy, setPrivacy] = useState("everyone");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("video/")) {
      alert("Please select a valid video file.");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setStep(2);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) {
      if (!f.type.startsWith("video/")) {
        alert("Please drop a valid video file.");
        return;
      }
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setStep(2);
    }
  };

  const handlePost = () => {
    if (!caption.trim()) {
      alert("Please add a caption for your vibe!");
      return;
    }
    setUploading(true);
    setTimeout(() => {
      const parsedTags = tags
        .split(",")
        .map((t) => t.trim().replace(/^#/, ""))
        .filter(Boolean);

      const newVideo = {
        id: `v_${Date.now()}`,
        userId: currentUser.id,
        videoUrl: preview || "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnail: "https://picsum.photos/seed/" + Date.now() + "/400/700",
        caption: caption.trim(),
        sound: sound.trim() || `Original Sound - ${currentUser.displayName}`,
        soundCover: currentUser.avatar,
        likes: 1,
        comments: 0,
        shares: 0,
        saves: 0,
        duration: 15,
        tags: parsedTags.length > 0 ? parsedTags : ["VibesTok"],
        createdAt: new Date().toISOString(),
      };

      addVideo(newVideo);
      setUploading(false);
      setStep(3);
    }, 1800);
  };

  const reset = () => {
    setStep(1);
    setFile(null);
    setPreview(null);
    setCaption("");
    setSound("");
    setTags("");
    setPrivacy("everyone");
  };

  return (
    <div className="page-container upload-page">
      <h1 className="page-title">
        <Upload size={24} className="page-title-icon" />
        <span>Upload Vibe</span>
      </h1>

      {step === 1 && (
        <div
          className="upload-dropzone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            accept="video/*"
            onChange={handleFile}
            hidden
          />
          <Video size={60} className="upload-icon-big" />
          <h2>Select video to upload</h2>
          <p>Or drag and drop a video file</p>
          <span className="upload-specs">MP4, WebM or MOV • Up to 500MB • 720p or higher</span>
          <button className="select-file-btn">Select From Device</button>
        </div>
      )}

      {step === 2 && (
        <div className="upload-form">
          <div className="upload-preview-wrapper">
            <video src={preview} controls className="upload-preview-video" />
            <button className="change-video-btn" onClick={reset}>
              <X size={16} /> Choose different video
            </button>
          </div>

          <div className="upload-fields">
            <label className="upload-label">
              <Type size={16} /> Caption *
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Give your vibe an energetic caption! Add hashtags or emojis 🔥"
              maxLength={300}
              className="upload-textarea"
              rows={3}
            />
            <span className="char-count">{caption.length}/300</span>

            <label className="upload-label">
              <Music2 size={16} /> Sound / Music track
            </label>
            <input
              value={sound}
              onChange={(e) => setSound(e.target.value)}
              placeholder={`Original Sound - ${currentUser.displayName}`}
              className="upload-input"
            />

            <label className="upload-label">
              <Hash size={16} /> Tags (comma-separated)
            </label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="DanceChallenge, VibesTok, Summer"
              className="upload-input"
            />

            <label className="upload-label">
              <Eye size={16} /> Who can watch this video
            </label>
            <select
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              className="upload-select"
            >
              <option value="everyone">Everyone (Public)</option>
              <option value="followers">Followers only</option>
              <option value="private">Only me (Private)</option>
            </select>

            <div className="upload-options">
              <label>
                <input type="checkbox" defaultChecked /> Allow comments
              </label>
              <label>
                <input type="checkbox" defaultChecked /> Allow duet
              </label>
              <label>
                <input type="checkbox" defaultChecked /> Allow stitch & sharing
              </label>
            </div>

            <div className="upload-actions">
              <button className="draft-btn" onClick={reset}>
                Discard
              </button>
              <button
                className="post-btn"
                onClick={handlePost}
                disabled={uploading || !caption.trim()}
              >
                {uploading ? "Publishing Vibe..." : "Post Vibe 🚀"}
              </button>
            </div>

            {uploading && (
              <div className="upload-progress">
                <div className="progress-bar">
                  <div className="progress-fill" />
                </div>
                <p>Uploading to VibesTok cloud...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="upload-success">
          <div className="success-icon">
            <Check size={48} />
          </div>
          <h2>Your Vibe is Live! 🎉</h2>
          <p>Your video has been published and is now recommended on the For You feed.</p>
          <div className="success-actions">
            <button className="post-btn" onClick={() => navigate("/")}>
              Watch on For You Feed
            </button>
            <button className="draft-btn" onClick={reset}>
              Upload Another Vibe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
