import React, { useEffect, useState } from 'react'
import { Button, Card, List } from 'antd'
import { Link } from 'react-router-dom'
import api from '../lib/api'
export default function Announcements(){
  const [items,setItems]=useState([])
  useEffect(()=>{ api.get('/announcements',{params:{page:1,limit:20}}).then(r=>setItems(r.data.items)) },[])
  return (<Card title="Announcements" extra={<Link to="/announcement/new"><Button type="primary">New (Trustee)</Button></Link>}>
    <List dataSource={items} renderItem={a=>(<List.Item><List.Item.Meta title={a.title} description={a.body}/></List.Item>)} />
  </Card>)}
