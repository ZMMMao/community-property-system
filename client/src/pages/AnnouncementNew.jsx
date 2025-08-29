import React, { useState } from 'react'
import { Card, Form, Input, Switch, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'
export default function AnnouncementNew(){
  const nav=useNavigate(); const [loading,setLoading]=useState(false)
  const onFinish=async (values)=>{
    setLoading(true)
    try{ await api.post('/announcements',{ title:values.title, body:values.body, pinned: values.pinned||false }); 
      message.success('Announcement created'); nav('/announcement') }
    catch(e){ message.error(e?.response?.data?.error || 'Failed') } finally{ setLoading(false) }
  }
  return (<Card title="Create Announcement">
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Title" name="title" rules={[{required:true}]}><Input/></Form.Item>
      <Form.Item label="Body" name="body" rules={[{required:true}]}><Input.TextArea rows={6}/></Form.Item>
      <Form.Item label="Pinned" name="pinned" valuePropName="checked"><Switch/></Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>Create</Button>
    </Form></Card>)}
