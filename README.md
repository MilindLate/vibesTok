# ⚡️ VibesTok

A fast, interactive, and responsive TikTok-like short-form social video platform built with React, Vite, and modern CSS.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 🎥 **Snap-Scroll Vertical Video Feed**: Continuous vertical feed with wheel scroll, touch swipe, keyboard arrows (`↑`/`↓`), and desktop navigation buttons.
- ❤️‍🔥 **Double-Tap to Like**: Animated popping heart overlay on double-tap (signature TikTok interaction).
- 💬 **Live Comments Drawer**: Slide-up interactive comments drawer with real-time posting and counters.
- 🔊 **Audio Controls & Visualizer**: Per-video mute/unmute toggle and spinning vinyl sound disc with track info.
- 🔖 **Social Engagement**: Real-time Like, Bookmark/Save, Follow/Unfollow creators, and Native Share API support with clipboard fallback.
- 🧭 **Discover & Trending Hub**: Explore by category pills (*Dance, Food, Tech, Fitness, Comedy, Travel, Music*), trending hashtags with view metrics, and video grid.
- 🔍 **Instant Search Modal**: Quick modal to search creators, vibes, and hashtags simultaneously.
- 📥 **Inbox & Direct Messaging**: Dual-tab notification feed (likes, comments, follows, duets) and real-time interactive Direct Messaging (DM) conversation thread.
- 👤 **Creator Profile Studio**: Stats overview (Followers, Following, Likes), verified creator badges, bio, and multi-tab grids (*Uploaded, Liked, Saved*).
- 📤 **Video Upload Studio**: 3-step upload pipeline with drag-and-drop file picker, video preview, custom sound tags, privacy settings, and animated progress bar.
- 📱 **Fully Responsive Design**: Collapsible desktop sidebar and mobile sticky bottom navigation bar with live unread indicators.

---

## 🛠 Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Custom CSS Design System with dark mode, glow gradients, and animations

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm / yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MilindLate/vibesTok.git
   cd vibesTok
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
vibesTok/
├── index.html                       # HTML entrypoint with Plus Jakarta Sans font
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                     # Application bootstrap
    ├── App.jsx                      # Router & layout wrappers
    ├── App.css                      # Global dark design system & animations
    ├── index.css
    ├── context/
    │   └── AppContext.jsx           # Global state (likes, saves, follows, DMs, notifs)
    ├── data/
    │   └── mockData.js              # Curated mock videos, creators, comments, sounds
    ├── components/
    │   ├── Feed/Feed.jsx            # Snap-scroll vertical video feed
    │   ├── VideoCard/VideoCard.jsx  # Video element, overlay controls, double-tap heart
    │   ├── Comments/CommentsPanel.jsx # Slide-up comment drawer
    │   ├── Sidebar/Sidebar.jsx      # Desktop sidebar navigation
    │   ├── BottomNav/BottomNav.jsx  # Mobile bottom tab navigation
    │   └── SearchBar/SearchBar.jsx  # Instant search overlay
    └── pages/
        ├── HomePage.jsx             # Main For You & Following feeds
        ├── DiscoverPage.jsx         # Search, categories & trending tags
        ├── ProfilePage.jsx          # Creator profile & video grids
        ├── InboxPage.jsx            # Notifications & real-time direct messaging
        └── UploadPage.jsx           # 3-step video upload studio
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
