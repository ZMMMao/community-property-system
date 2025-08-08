import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Home from "./pages/user/Home";
import MyCalendar from "./pages/user/MyCalendar";
import Chat from "./pages/user/Chat";
import Announcement from "./pages/user/Announcement";
import Payment from "./pages/user/Payment";
import AdminAnnouncement from "./pages/admin/AdminAnnouncement";
import AnnouncementCenter from "./pages/admin/AnnouncementCenter";
import AdminHome from "./pages/admin/AdminHome";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Calendar" element={<MyCalendar />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Announcement" element={<Announcement />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/AdminAnnouncement" element={<AdminAnnouncement />} />
          <Route
            path="/admin/AnnouncementCenter"
            element={<AnnouncementCenter />}
          />
          <Route path="/AdminHome" element={<AdminHome />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
