import React, { useEffect, useState } from 'react'
import { Card, List, Form, Input, Button, message } from 'antd'
import api from '../lib/api'
export default function DiscussionBoard(){
  const [items,setItems]=useState([])
  const load=async()=>{ const { data } = await api.get('/posts'); setItems(data.items) }
  useEffect(()=>{ load() },[])
  const onFinish=async(values)=>{
    try{ await api.post('/posts', values); message.success('Posted'); load() } catch(e){ message.error(e?.response?.data?.error || 'Failed') }
  }
  return (<div style={{display:'grid', gap:16}}>
    <Card title="New Post">
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Title" name="title" rules={[{required:true}]}><Input/></Form.Item>
        <Form.Item label="Body" name="body" rules={[{required:true}]}><Input.TextArea rows={4}/></Form.Item>
        <Button type="primary" htmlType="submit">Publish</Button>
      </Form>
    </Card>
    <Card title="Recent Posts">
      <List dataSource={items} renderItem={p=>(<List.Item><List.Item.Meta title={p.title} description={p.body}/></List.Item>)} />
    </Card></div>)}
