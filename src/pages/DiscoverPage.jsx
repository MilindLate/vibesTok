import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, Hash, TrendingUp, Compass, Play } from "lucide-react";
import { useApp } from "../context/AppContext";
import { trendingHashtags, mockVideos, mockUsers, formatNumber } from "../data/mockData";

const DiscoverPage = () => {
  const navigate = useNavigate();
  const { setActiveFeedVideoId } = useApp();
  const [searchParams] = useSearchParams();
  const initialTag = searchParams.get("tag") || "";
  const [query, setQuery] = useState(initialTag);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    if (initialTag) {
      setQuery(initialTag);
    }
  }, [initialTag]);

  const categories = ["All", "Dance", "Food", "Tech", "Fitness", "Comedy", "Travel", "Music"];

  const filteredVideos = mockVideos.filter((v) => {
    const matchesQuery =
      !query ||
      v.caption.toLowerCase().includes(query.toLowerCase()) ||
      v.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()));

    const matchesCategory =
      activeCategory === "All" ||
      v.tags?.some((t) => t.toLowerCase().includes(activeCategory.toLowerCase()));

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="page-container discover-page">
      <div className="page-header-row">
        <h1 className="page-title">
          <Compass size={24} className="page-title-icon" />
          <span>Discover</span>
        </h1>
      </div>

      <div className="discover-search">
        <Search size={18} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search videos, hashtags, sounds, creators..."
        />
        {query && (
          <button className="clear-search-btn" onClick={() => setQuery("")}>
            ×
          </button>
        )}
      </div>

      <div className="category-pills">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="trending-section">
        <h2>
          <TrendingUp size={18} />
          <span>Trending Hashtags</span>
        </h2>
        <div className="hashtag-grid">
          {trendingHashtags.map((h, i) => (
            <div
              key={h.tag}
              className="hashtag-card"
              onClick={() => setQuery(h.tag)}
            >
              <div className="hashtag-top">
                <span className="hashtag-rank">#{i + 1}</span>
                <span className="hashtag-emoji">{h.emoji}</span>
              </div>
              <span className="hashtag-name">#{h.tag}</span>
              <span className="hashtag-views">{h.count} views</span>
            </div>
          ))}
        </div>
      </div>

      <div className="discover-videos">
        <h2>
          {query
            ? `Results for "${query}"`
            : activeCategory === "All"
            ? "Popular Vibes"
            : `#${activeCategory}`}
        </h2>
        <div className="discover-grid">
          {filteredVideos.map((video) => {
            const author = mockUsers.find((u) => u.id === video.userId);
            return (
              <div
                key={video.id}
                className="discover-card"
                onClick={() => {
                  setActiveFeedVideoId(video.id);
                  navigate("/");
                }}
              >
                <div className="discover-thumb-wrapper">
                  <img src={video.thumbnail} alt="video thumbnail" className="discover-thumb" />
                  <span className="discover-duration">{video.duration}s</span>
                  <div className="discover-overlay">
                    <Play size={12} fill="white" />
                    <span>{formatNumber(video.likes)}</span>
                  </div>
                </div>
                <div className="discover-meta">
                  <img
                    src={author?.avatar}
                    alt={author?.username}
                    className="discover-avatar"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (author) navigate(`/user/${author.id}`);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="discover-text-col">
                    <p className="discover-caption">{video.caption}</p>
                    <span
                      className="discover-author"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (author) navigate(`/user/${author.id}`);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      @{author?.username}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredVideos.length === 0 && (
            <div className="empty-state">No vibes found matching your search 😿</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
