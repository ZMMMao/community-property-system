import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Announcements from './pages/Announcements.jsx'
import AnnouncementNew from './pages/AnnouncementNew.jsx'
import CalendarPage from './pages/Calendar.jsx'
import Issues from './pages/Issues.jsx'
import DiscussionBoard from './pages/DiscussionBoard.jsx'
const { Header, Content, Footer } = Layout
export default function App(){
  return (<Layout style={{minHeight:'100vh'}}>
    <Header style={{display:'flex', gap:16}}>
      <Menu mode="horizontal" theme="dark" selectable={false} items={[
        { key:'home', label:<Link to="/dashboard">Dashboard</Link> },
        { key:'ann', label:<Link to="/announcement">Announcements</Link> },
        { key:'cal', label:<Link to="/calendar">Calendar</Link> },
        { key:'iss', label:<Link to="/issues">Issues</Link> },
        { key:'disc', label:<Link to="/discussion">Discussion</Link> },
        { key:'login', label:<Link to="/login">Login</Link>, style:{marginLeft:'auto'} },
      ]} />
    </Header>
    <Content style={{padding:24}}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/announcement" element={<ProtectedRoute><Announcements/></ProtectedRoute>} />
        <Route path="/announcement/new" element={<ProtectedRoute requireRole="trustee"><AnnouncementNew/></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><CalendarPage/></ProtectedRoute>} />
        <Route path="/issues" element={<ProtectedRoute><Issues/></ProtectedRoute>} />
        <Route path="/discussion" element={<ProtectedRoute><DiscussionBoard/></ProtectedRoute>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Content>
    <Footer style={{textAlign:'center'}}>Community MVP</Footer>
  </Layout>)}
