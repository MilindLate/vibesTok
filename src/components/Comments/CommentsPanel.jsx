import React, { useState } from "react";
import { X, Send, Heart } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { mockUsers, formatNumber } from "../../data/mockData";

const CommentsPanel = ({ videoId, onClose }) => {
  const { comments, currentUser, addComment } = useApp();
  const [text, setText] = useState("");
  const videoComments = comments[videoId] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(videoId, text.trim());
    setText("");
  };

  return (
    <div className="comments-overlay" onClick={onClose}>
      <div className="comments-panel" onClick={(e) => e.stopPropagation()}>
        <div className="comments-header">
          <h3>{formatNumber(videoComments.length)} Comments</h3>
          <button onClick={onClose} aria-label="Close comments">
            <X size={20} />
          </button>
        </div>

        <div className="comments-list">
          {videoComments.length === 0 && (
            <div className="no-comments">Be the first to comment! 💬</div>
          )}
          {videoComments.map((comment) => {
            const user = mockUsers.find((u) => u.id === comment.userId) || currentUser;
            return (
              <div key={comment.id} className="comment-item">
                <img src={user.avatar} alt={user.username} className="comment-avatar" />
                <div className="comment-body">
                  <div className="comment-username">@{user.username}</div>
                  <div className="comment-text">{comment.text}</div>
                  <div className="comment-time">{new Date(comment.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="comment-likes">
                  <Heart size={14} />
                  <span>{formatNumber(comment.likes)}</span>
                </div>
              </div>
            );
          })}
        </div>

        <form className="comment-input-row" onSubmit={handleSubmit}>
          <img src={currentUser.avatar} alt="me" className="comment-avatar-sm" />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            className="comment-input"
          />
          <button type="submit" className={`send-btn ${text.trim() ? "active" : ""}`} disabled={!text.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentsPanel;
