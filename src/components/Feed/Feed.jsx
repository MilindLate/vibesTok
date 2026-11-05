import React, { useState, useEffect, useRef, useCallback } from "react";
import { useApp } from "../../context/AppContext";
import VideoCard from "../VideoCard/VideoCard";
import { ChevronUp, ChevronDown } from "lucide-react";

const Feed = () => {
  const { videos } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const startYRef = useRef(null);
  const isScrollingRef = useRef(false);

  const scrollTo = useCallback((index) => {
    if (index < 0 || index >= videos.length) return;
    setCurrentIndex(index);
  }, [videos.length]);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;
      if (e.deltaY > 30) {
        scrollTo(currentIndex + 1);
      } else if (e.deltaY < -30) {
        scrollTo(currentIndex - 1);
      }
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    };

    const handleKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "j") scrollTo(currentIndex + 1);
      if (e.key === "ArrowUp" || e.key === "k") scrollTo(currentIndex - 1);
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("wheel", handleWheel, { passive: false });
    }
    window.addEventListener("keydown", handleKey);

    return () => {
      if (el) {
        el.removeEventListener("wheel", handleWheel);
      }
      window.removeEventListener("keydown", handleKey);
    };
  }, [currentIndex, scrollTo]);

  const handleTouchStart = (e) => {
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (startYRef.current === null) return;
    const diff = startYRef.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        scrollTo(currentIndex + 1);
      } else {
        scrollTo(currentIndex - 1);
      }
    }
    startYRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="feed-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="feed-track"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}
      >
        {videos.map((video, i) => (
          <div key={video.id} className="feed-slot">
            <VideoCard video={video} isActive={i === currentIndex} />
          </div>
        ))}
      </div>

      {/* Floating navigation controls for desktop */}
      <div className="feed-nav-controls">
        <button
          className="feed-nav-btn"
          disabled={currentIndex === 0}
          onClick={() => scrollTo(currentIndex - 1)}
          aria-label="Previous video"
        >
          <ChevronUp size={22} />
        </button>
        <button
          className="feed-nav-btn"
          disabled={currentIndex === videos.length - 1}
          onClick={() => scrollTo(currentIndex + 1)}
          aria-label="Next video"
        >
          <ChevronDown size={22} />
        </button>
      </div>

      {/* Progress dots indicator */}
      <div className="feed-dots">
        {videos.map((_, i) => (
          <div
            key={i}
            className={`feed-dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
