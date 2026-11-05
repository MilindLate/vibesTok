import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Heart, MessageCircle, Share2, Bookmark, Music2,
  VolumeX, Volume2, Play, MoreHorizontal, UserPlus, UserCheck
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { mockUsers, formatNumber } from "../../data/mockData";
import CommentsPanel from "../Comments/CommentsPanel";

const VideoCard = ({ video, isActive }) => {
  const { likedVideos, savedVideos, followedUsers, toggleLike, toggleSave, toggleFollow } = useApp();
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const [doubleTapHeart, setDoubleTapHeart] = useState(false);
  const videoRef = useRef(null);
  const lastTapRef = useRef(0);

  const author = mockUsers.find((u) => u.id === video.userId);
  const isLiked = likedVideos.has(video.id);
  const isSaved = savedVideos.has(video.id);
  const isFollowed = followedUsers.has(video.userId);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isActive) {
      el.play().then(() => setPlaying(true)).catch(() => {
        setPlaying(false);
      });
    } else {
      el.pause();
      el.currentTime = 0;
      setPlaying(false);
    }
  }, [isActive]);

  const handleVideoClick = useCallback(() => {
    const now = Date.now();
    const el = videoRef.current;
    if (!el) return;

    if (now - lastTapRef.current < 300) {
      if (!isLiked) {
        toggleLike(video.id);
      }
      setDoubleTapHeart(true);
      setTimeout(() => setDoubleTapHeart(false), 900);
    } else {
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        el.play().catch(() => {});
        setPlaying(true);
      }
    }
    lastTapRef.current = now;
  }, [playing, isLiked, toggleLike, video.id]);

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: "VibesTok",
        text: video.caption,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="video-card">
      <video
        ref={videoRef}
        src={video.videoUrl}
        loop
        muted={muted}
        playsInline
        onClick={handleVideoClick}
        className="video-element"
      />

      {doubleTapHeart && (
        <div className="doubletap-heart">❤️</div>
      )}

      {!playing && (
        <div className="play-overlay" onClick={handleVideoClick}>
          <Play size={64} fill="white" color="white" />
        </div>
      )}

      <div className="video-top-controls">
        <button
          className="mute-btn"
          onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
          aria-label="Toggle mute"
        >
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <button className="more-btn" onClick={(e) => e.stopPropagation()} aria-label="More options">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="action-bar">
        <div className="avatar-wrapper">
          <img src={author?.avatar} alt={author?.username} className="author-avatar" />
          <button
            className={`follow-bubble ${isFollowed ? "followed" : ""}`}
            onClick={(e) => { e.stopPropagation(); toggleFollow(video.userId); }}
            aria-label="Follow user"
          >
            {isFollowed ? <UserCheck size={11} /> : <UserPlus size={11} />}
          </button>
        </div>

        <button
          className={`action-btn ${isLiked ? "liked" : ""}`}
          onClick={(e) => { e.stopPropagation(); toggleLike(video.id); }}
          aria-label="Like video"
        >
          <Heart size={30} fill={isLiked ? "#fe2c55" : "transparent"} color={isLiked ? "#fe2c55" : "white"} />
          <span>{formatNumber(video.likes)}</span>
        </button>

        <button
          className="action-btn"
          onClick={(e) => { e.stopPropagation(); setShowComments(true); }}
          aria-label="View comments"
        >
          <MessageCircle size={30} color="white" />
          <span>{formatNumber(video.comments)}</span>
        </button>

        <button
          className={`action-btn ${isSaved ? "saved" : ""}`}
          onClick={(e) => { e.stopPropagation(); toggleSave(video.id); }}
          aria-label="Save video"
        >
          <Bookmark size={30} fill={isSaved ? "#fed700" : "transparent"} color={isSaved ? "#fed700" : "white"} />
          <span>{formatNumber(video.saves)}</span>
        </button>

        <button className="action-btn" onClick={handleShare} aria-label="Share video">
          <Share2 size={30} color="white" />
          <span>{formatNumber(video.shares)}</span>
        </button>

        <div className="sound-disc">
          <img src={video.soundCover} alt="sound cover" className="disc-img" />
        </div>
      </div>

      <div className="video-info">
        <div className="author-row">
          <span className="author-name">@{author?.username}</span>
          {author?.verified && <span className="verified-badge">✓</span>}
          {!isFollowed && (
            <button
              className="follow-text-btn"
              onClick={(e) => { e.stopPropagation(); toggleFollow(video.userId); }}
            >
              Follow
            </button>
          )}
        </div>

        <p
          className={`caption ${showCaption ? "expanded" : ""}`}
          onClick={(e) => { e.stopPropagation(); setShowCaption(!showCaption); }}
        >
          {showCaption ? video.caption : video.caption.slice(0, 80)}
          {video.caption.length > 80 && (
            <span className="caption-toggle">{showCaption ? " less" : "... more"}</span>
          )}
        </p>

        <div className="sound-row">
          <Music2 size={14} />
          <span>{video.sound}</span>
        </div>

        <div className="tags-row">
          {video.tags?.map((tag) => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
      </div>

      {showComments && (
        <CommentsPanel videoId={video.id} onClose={() => setShowComments(false)} />
      )}
    </div>
  );
};

export default VideoCard;
