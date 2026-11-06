import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import HomePage from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";
import ProfilePage from "./pages/ProfilePage";
import InboxPage from "./pages/InboxPage";
import UploadPage from "./pages/UploadPage";
import EditProfilePage from "./pages/EditProfilePage";
import SettingsPage from "./pages/SettingsPage";
import UserProfilePage from "./pages/UserProfilePage";
import BottomNav from "./components/BottomNav/BottomNav";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

const PageWrapper = ({ children }) => (
  <div className="app-layout">
    <Sidebar />
    <main className="main-area page-main">
      {children}
    </main>
    <BottomNav />
  </div>
);

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/discover" element={<PageWrapper><DiscoverPage /></PageWrapper>} />
          <Route path="/upload" element={<PageWrapper><UploadPage /></PageWrapper>} />
          <Route path="/inbox" element={<PageWrapper><InboxPage /></PageWrapper>} />
          <Route path="/profile" element={<PageWrapper><ProfilePage /></PageWrapper>} />
          <Route path="/edit-profile" element={<PageWrapper><EditProfilePage /></PageWrapper>} />
          <Route path="/settings" element={<PageWrapper><SettingsPage /></PageWrapper>} />
          <Route path="/user/:userId" element={<PageWrapper><UserProfilePage /></PageWrapper>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
