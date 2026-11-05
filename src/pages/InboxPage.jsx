import React, { useState } from "react";
import { Bell, Heart, UserPlus, MessageCircle, CheckCheck, Video, Send } from "lucide-react";
import { useApp } from "../context/AppContext";
import { mockUsers } from "../data/mockData";

const InboxPage = () => {
  const { notifications, markNotificationsRead, messages, markMessageRead } = useApp();
  const [activeTab, setActiveTab] = useState("all"); // 'all' or 'messages'
  const [marked, setMarked] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState({});

  const handleMarkAll = () => {
    markNotificationsRead();
    setMarked(true);
  };

  const getIcon = (type) => {
    switch (type) {
      case "like":
        return <Heart size={16} className="notif-icon like" fill="#fe2c55" />;
      case "follow":
        return <UserPlus size={16} className="notif-icon follow" />;
      case "comment":
        return <MessageCircle size={16} className="notif-icon comment" />;
      case "duet":
        return <Video size={16} className="notif-icon duet" />;
      default:
        return <Bell size={16} className="notif-icon" />;
    }
  };

  const openChat = (msg) => {
    setSelectedChat(msg);
    markMessageRead(msg.id);
  };

  const sendDirectMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedChat) return;
    const authorId = selectedChat.from;
    const updated = [
      ...(chatHistory[authorId] || []),
      { sender: "me", text: chatInput.trim(), time: "Just now" },
    ];
    setChatHistory({ ...chatHistory, [authorId]: updated });
    setChatInput("");
  };

  return (
    <div className="page-container inbox-page">
      <div className="inbox-header">
        <h1 className="page-title">
          <Bell size={24} className="page-title-icon" />
          <span>Inbox & Activity</span>
        </h1>
        {!marked && notifications.some((n) => !n.read) && (
          <button className="mark-all-btn" onClick={handleMarkAll}>
            <CheckCheck size={16} /> Mark all as read
          </button>
        )}
      </div>

      <div className="inbox-tabs">
        <button
          className={`inbox-tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          Notifications
        </button>
        <button
          className={`inbox-tab ${activeTab === "messages" ? "active" : ""}`}
          onClick={() => setActiveTab("messages")}
        >
          Direct Messages
        </button>
      </div>

      {activeTab === "all" ? (
        <div className="notifications-list">
          {notifications.map((n) => (
            <div key={n.id} className={`notification-item ${n.read ? "read" : "unread"}`}>
              <div className="notif-avatar-wrapper">
                <img src={n.avatar} alt="User avatar" className="notif-avatar" />
                <span className="notif-badge-icon">{getIcon(n.type)}</span>
              </div>
              <div className="notif-content">
                <p className="notif-text">{n.message}</p>
                <span className="notif-time">{n.time}</span>
              </div>
              {!n.read && <div className="unread-dot" />}
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="empty-state">No recent activity ✨</div>
          )}
        </div>
      ) : (
        <div className="messages-section">
          {!selectedChat ? (
            <div className="messages-list">
              {messages.map((m) => {
                const sender = mockUsers.find((u) => u.id === m.from);
                return (
                  <div
                    key={m.id}
                    className={`message-item ${m.unread ? "unread" : ""}`}
                    onClick={() => openChat(m)}
                  >
                    <img src={sender?.avatar} alt={sender?.username} className="message-avatar" />
                    <div className="message-info">
                      <div className="message-sender">{sender?.displayName}</div>
                      <div className="message-snippet">{m.preview}</div>
                    </div>
                    <div className="message-meta">
                      <span className="message-time">{m.time}</span>
                      {m.unread && <span className="unread-dot" />}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="chat-thread">
              <div className="chat-header">
                <button className="chat-back-btn" onClick={() => setSelectedChat(null)}>
                  ← Back
                </button>
                {(() => {
                  const sender = mockUsers.find((u) => u.id === selectedChat.from);
                  return (
                    <div className="chat-user-header">
                      <img src={sender?.avatar} alt={sender?.username} className="chat-avatar" />
                      <span>{sender?.displayName} (@{sender?.username})</span>
                    </div>
                  );
                })()}
              </div>

              <div className="chat-messages-area">
                <div className="chat-bubble received">
                  <p>{selectedChat.preview}</p>
                  <span className="bubble-time">{selectedChat.time}</span>
                </div>
                {(chatHistory[selectedChat.from] || []).map((msg, idx) => (
                  <div key={idx} className={`chat-bubble ${msg.sender === "me" ? "sent" : "received"}`}>
                    <p>{msg.text}</p>
                    <span className="bubble-time">{msg.time}</span>
                  </div>
                ))}
              </div>

              <form className="chat-input-bar" onSubmit={sendDirectMessage}>
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Send a direct message..."
                  className="chat-input"
                />
                <button type="submit" className="chat-send-btn" disabled={!chatInput.trim()}>
                  <Send size={18} />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InboxPage;
