import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./AnnouncementCenter.css";
function AnnouncementCenter() {
  const [announcement, setAnnouncement] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState(null);
  const location = useLocation();
  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSendAnnouncement = useCallback(() => {
    if (isSending) return;

    setIsSending(true);
    setError(null);

    if (!announcement.title || !announcement.content) {
      setError("Title and Content cannot be empty!");
      setIsSending(false);
      return;
    }
    axios
      .post("http://localhost:8088/api/notifications/send", announcement)
      .then(() => {
        alert("Upload complete！");
        setAnnouncement({
          title: "",
          content: "",
        });
      })
      .catch(() => {
        setError("Upload failed, please try again later.");
      })
      .finally(() => {
        setIsSending(false);
      });
  }, [announcement, isSending]);

  return (
    <div>
      <div className="content">
        <div className="send-notification-form">
          <h3>Announcement Uploader</h3>
          {error && <div className="error-message">{error}</div>}
          <input
            type="text"
            name="title"
            value={announcement.title}
            onChange={handleInputChange}
            placeholder="Please enter title"
          />
          <textarea
            name="content"
            value={announcement.content}
            onChange={handleInputChange}
            placeholder="Please enter content"
          />
          <button onClick={handleSendAnnouncement} disabled={isSending}>
            {isSending ? "uploading..." : "upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default AnnouncementCenter;
