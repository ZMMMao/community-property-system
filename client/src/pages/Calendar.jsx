import React, { useEffect, useState } from 'react'
import { Card, Form, Input, DatePicker, Select, Button, List, message } from 'antd'
import api from '../lib/api'
export default function CalendarPage(){
  const [items,setItems]=useState([])
  const load=async()=>{
    const now=new Date(); const nextMonth=new Date(now.getTime()+30*24*3600*1000)
    const { data } = await api.get('/calendar-events',{params:{from:now.toISOString(),to:nextMonth.toISOString()}})
    setItems(data.items)
  }
  useEffect(()=>{ load() },[])
  const onFinish=async(values)=>{
    try{
      await api.post('/calendar-events',{ title:values.title, description:values.description||'', start: values.range[0].toISOString(), end: values.range[1].toISOString(), type: values.type })
      message.success('Event created'); load()
    }catch(e){ message.error(e?.response?.data?.error || 'Failed') }
  }
  return (<div style={{display:'grid', gap:16}}>
    <Card title="Create Event / Reservation">
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Title" name="title" rules={[{required:true}]}><Input/></Form.Item>
        <Form.Item label="Type" name="type" rules={[{required:true}]}>
          <Select options={[
            {value:'reservation', label:'Reservation (Resident)'},
            {value:'activity', label:'Community Activity (Trustee only)'},
            {value:'maintenance', label:'Maintenance (Trustee only)'}]} />
        </Form.Item>
        <Form.Item label="Start/End" name="range" rules={[{required:true}]}><DatePicker.RangePicker showTime/></Form.Item>
        <Form.Item label="Description" name="description"><Input.TextArea rows={3}/></Form.Item>
        <Button type="primary" htmlType="submit">Create</Button>
      </Form>
    </Card>
    <Card title="Upcoming (next 30 days)">
      <List dataSource={items} renderItem={e=>(<List.Item>{new Date(e.start).toLocaleString()} – {new Date(e.end).toLocaleString()} • <b>{e.type}</b> • {e.title}</List.Item>)}/>
    </Card></div>)}
