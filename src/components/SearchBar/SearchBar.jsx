import React, { useState } from "react";
import { Search, X, TrendingUp, Hash } from "lucide-react";
import { trendingHashtags, mockUsers, mockVideos } from "../../data/mockData";

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);

  const handleSearch = (q) => {
    setQuery(q);
    if (!q.trim()) {
      setResults(null);
      return;
    }
    const lq = q.toLowerCase();
    const users = mockUsers.filter(
      (u) => u.username.toLowerCase().includes(lq) || u.displayName.toLowerCase().includes(lq)
    );
    const videos = mockVideos.filter(
      (v) => v.caption.toLowerCase().includes(lq) || v.tags?.some((t) => t.toLowerCase().includes(lq))
    );
    setResults({ users, videos });
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-row">
          <Search size={18} />
          <input
            autoFocus
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search creators, vibes, hashtags..."
            className="search-input"
          />
          {query && (
            <button onClick={() => handleSearch("")} aria-label="Clear query">
              <X size={16} />
            </button>
          )}
        </div>

        {!results ? (
          <div className="search-trends">
            <div className="search-section-title">
              <TrendingUp size={15} />
              <span>Trending Vibes</span>
            </div>
            {trendingHashtags.map((h) => (
              <div
                key={h.tag}
                className="search-trend-item"
                onClick={() => handleSearch(h.tag)}
              >
                <Hash size={14} />
                <span>#{h.tag}</span>
                <span className="trend-count">{h.count} views</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="search-results">
            {results.users.length > 0 && (
              <>
                <div className="search-section-title">Creators</div>
                {results.users.map((u) => (
                  <div key={u.id} className="search-user-item">
                    <img src={u.avatar} alt={u.username} className="search-avatar" />
                    <div>
                      <div className="search-username">{u.displayName}</div>
                      <div className="search-sub">@{u.username}</div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {results.videos.length > 0 && (
              <>
                <div className="search-section-title">Videos</div>
                {results.videos.map((v) => (
                  <div key={v.id} className="search-video-item">
                    <img src={v.thumbnail} alt="thumb" className="search-thumb" />
                    <p>{v.caption.slice(0, 70)}...</p>
                  </div>
                ))}
              </>
            )}
            {results.users.length === 0 && results.videos.length === 0 && (
              <div className="no-results">No results for "{query}" 🔎</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
