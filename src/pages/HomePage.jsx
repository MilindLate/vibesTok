import React, { useState } from "react";
import Feed from "../components/Feed/Feed";
import Sidebar from "../components/Sidebar/Sidebar";
import BottomNav from "../components/BottomNav/BottomNav";
import SearchBar from "../components/SearchBar/SearchBar";
import { Search, Zap } from "lucide-react";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("foryou");
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-area">
        <header className="feed-header">
          <button
            className={`tab-btn ${activeTab === "following" ? "active" : ""}`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </button>
          <div className="header-divider">|</div>
          <button
            className={`tab-btn ${activeTab === "foryou" ? "active" : ""}`}
            onClick={() => setActiveTab("foryou")}
          >
            For You
          </button>
          <button className="search-icon-btn" onClick={() => setShowSearch(true)} aria-label="Search">
            <Search size={20} />
          </button>
        </header>

        <Feed />

        {showSearch && <SearchBar onClose={() => setShowSearch(false)} />}
      </main>

      <BottomNav />
    </div>
  );
};

export default HomePage;
