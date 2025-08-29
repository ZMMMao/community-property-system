import React, { useEffect, useState } from 'react'
import { Card, Form, Input, Button, List, Tag, message } from 'antd'
import api from '../lib/api'
export default function Issues(){
  const [items,setItems]=useState([])
  const load=async()=>{ const { data } = await api.get('/maintenance-requests'); setItems(data.items) }
  useEffect(()=>{ load() },[])
  const onFinish=async(values)=>{
    try{ await api.post('/maintenance-requests',{ description: values.description, photoUrls: values.photo? [values.photo]:[] });
      message.success('Issue submitted'); load() } catch(e){ message.error(e?.response?.data?.error || 'Failed') }
  }
  const markCompleted=async(id)=>{ try{ await api.patch(`/maintenance-requests/${id}`,{ status:'completed' }); load() } catch{ message.error('Update failed') } }
  return (<div style={{display:'grid', gap:16, gridTemplateColumns:'1fr 1fr'}}>
    <Card title="Report an Issue">
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Description" name="description" rules={[{required:true}]}><Input.TextArea rows={4}/></Form.Item>
        <Form.Item label="Photo URL (optional)" name="photo"><Input/></Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form>
    </Card>
    <Card title="My/All Issues">
      <List dataSource={items} renderItem={i=>(
        <List.Item actions={[i.status!=='completed'? <Button onClick={()=>markCompleted(i._id)} key="c">Mark completed (Trustee)</Button> : null]}>
          <List.Item.Meta title={i.description} description={(i.photoUrls||[])[0] || ''} />
          <Tag color={i.status==='completed'?'green': i.status==='in_progress'?'blue':'orange'}>{i.status}</Tag>
        </List.Item>)}/>
    </Card></div>)}
