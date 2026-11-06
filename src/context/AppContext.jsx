import { createContext, useContext, useState, useCallback } from "react";
import { mockVideos, mockUsers, mockComments, messages as mockMessages } from "../data/mockData";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(mockUsers[0]);
  const [users, setUsers]               = useState(mockUsers);
  const [videos, setVideos]             = useState(mockVideos);
  const [likedVideos, setLikedVideos]   = useState(new Set());
  const [savedVideos, setSavedVideos]   = useState(new Set());
  const [followedUsers, setFollowedUsers] = useState(new Set(["u3", "u5"]));
  const [comments, setComments]         = useState(mockComments);
  const [messages, setMessages]         = useState(mockMessages);
  const [darkMode, setDarkMode]         = useState(true);
  const [activeFeedVideoId, setActiveFeedVideoId] = useState(null);

  const [settings, setSettings] = useState({
    privateAccount: false,
    allowComments: "everyone",
    allowDuet: true,
    allowStitch: true,
    pushNotifications: true,
    emailNotifications: false,
    directMessages: "everyone",
    autoplayVideos: true,
    dataSaver: false,
    contentLanguage: "English",
  });

  const [notifications, setNotifications] = useState([
    { id: "n1", type: "like",    message: "Jay Thompson liked your video", time: "2m ago",  read: false, avatar: mockUsers[1].avatar },
    { id: "n2", type: "follow",  message: "Priya Sharma started following you", time: "15m ago", read: false, avatar: mockUsers[2].avatar },
    { id: "n3", type: "comment", message: "Sara Wilson commented: 'Amazing! 🔥'", time: "1h ago", read: true,  avatar: mockUsers[4].avatar },
    { id: "n4", type: "duet",    message: "Max Chen duetted your video", time: "2h ago", read: true, avatar: mockUsers[3].avatar },
  ]);

  const updateCurrentUser = useCallback((fields) => {
    setCurrentUser((prev) => {
      const updated = { ...prev, ...fields };
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === prev.id ? updated : u))
      );
      return updated;
    });
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const toggleLike = useCallback((videoId) => {
    setLikedVideos((prev) => {
      const next = new Set(prev);
      const delta = next.has(videoId) ? (next.delete(videoId), -1) : (next.add(videoId), 1);
      setVideos((vs) => vs.map((v) => v.id === videoId ? { ...v, likes: v.likes + delta } : v));
      return next;
    });
  }, []);

  const toggleSave = useCallback((videoId) => {
    setSavedVideos((prev) => {
      const next = new Set(prev);
      if (next.has(videoId)) next.delete(videoId); else next.add(videoId);
      return next;
    });
  }, []);

  const toggleFollow = useCallback((userId) => {
    setFollowedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId); else next.add(userId);
      return next;
    });
  }, []);

  const addComment = useCallback((videoId, text) => {
    const newComment = {
      id: `c_${Date.now()}`,
      userId: currentUser.id,
      text,
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => ({ ...prev, [videoId]: [newComment, ...(prev[videoId] || [])] }));
    setVideos((vs) => vs.map((v) => v.id === videoId ? { ...v, comments: v.comments + 1 } : v));
  }, [currentUser.id]);

  const markNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const markMessageRead = useCallback((msgId) => {
    setMessages((prev) => prev.map((m) => m.id === msgId ? { ...m, unread: false } : m));
  }, []);

  const addVideo = useCallback((video) => {
    setVideos((prev) => [video, ...prev]);
  }, []);

  const getUserById = useCallback((id) => {
    if (!id) return null;
    if (id === currentUser.id) return currentUser;
    return users.find((u) => u.id === id) || null;
  }, [currentUser, users]);

  const unreadNotifCount = notifications.filter((n) => !n.read).length;
  const unreadMsgCount   = messages.filter((m) => m.unread).length;
  const unreadCount      = unreadNotifCount + unreadMsgCount;

  return (
    <AppContext.Provider value={{
      currentUser,
      users,
      videos,
      likedVideos,
      savedVideos,
      followedUsers,
      comments,
      messages,
      notifications,
      unreadCount,
      unreadNotifCount,
      unreadMsgCount,
      darkMode,
      settings,
      activeFeedVideoId,
      setActiveFeedVideoId,
      updateCurrentUser,
      updateSettings,
      toggleDarkMode,
      toggleLike,
      toggleSave,
      toggleFollow,
      addComment,
      markNotificationsRead,
      markMessageRead,
      addVideo,
      getUserById,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
