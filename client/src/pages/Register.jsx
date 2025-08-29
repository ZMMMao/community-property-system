import React, { useState } from 'react'
import { Form, Input, Button, Card, message } from 'antd'
import { useNavigate, Link } from 'react-router-dom'
import api from '../lib/api'
export default function Register(){
  const nav = useNavigate(); const [loading, setLoading] = useState(false)
  const onFinish = async (values)=>{
    setLoading(true)
    try{ await api.post('/auth/register', values); message.success('Registered'); nav('/dashboard') }
    catch(e){ message.error(e?.response?.data?.error || 'Register failed') }
    finally{ setLoading(false) }
  }
  return (<Card title="Register" style={{maxWidth:400, margin:'40px auto'}}>
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Name" name="name" rules={[{required:true}]}><Input/></Form.Item>
      <Form.Item label="Email" name="email" rules={[{required:true,type:'email'}]}><Input/></Form.Item>
      <Form.Item label="Password" name="password" rules={[{required:true,min:6}]}><Input.Password/></Form.Item>
      <Button type="primary" htmlType="submit" loading={loading} block>Register</Button>
      <div style={{marginTop:12}}>Already have an account? <Link to="/login">login</Link></div>
    </Form></Card>)}
