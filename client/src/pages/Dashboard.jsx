import React, { useEffect, useState } from 'react'
import { Card, List } from 'antd'
import api from '../lib/api'
export default function Dashboard(){
  const [anns,setAnns]=useState([]); const [events,setEvents]=useState([]); const [issues,setIssues]=useState([])
  useEffect(()=>{
    api.get('/announcements',{params:{page:1,limit:5}}).then(r=>setAnns(r.data.items))
    const now = new Date(); const nextWeek = new Date(now.getTime()+7*24*3600*1000)
    api.get('/calendar-events',{params:{from:now.toISOString(),to:nextWeek.toISOString()}}).then(r=>setEvents(r.data.items))
    api.get('/maintenance-requests',{params:{status:'pending'}}).then(r=>setIssues(r.data.items))
  },[])
  return (<div style={{display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))'}}>
    <Card title="Recent Announcements"><List size="small" dataSource={anns} renderItem={a=><List.Item>{a.title}</List.Item>} /></Card>
    <Card title="Upcoming Events (7 days)"><List size="small" dataSource={events} renderItem={e=><List.Item>{new Date(e.start).toLocaleString()} — {e.title} ({e.type})</List.Item>} /></Card>
    <Card title="My Open Issues"><List size="small" dataSource={issues} renderItem={i=><List.Item>{i.description} — {i.status}</List.Item>} /></Card>
  </div>)}
