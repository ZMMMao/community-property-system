import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../lib/api'
export default function ProtectedRoute({ children, requireRole }){
  const [state, setState] = useState({ loading:true, user:null })
  useEffect(()=>{
    let live = true
    api.get('/auth/me').then(r => live && setState({ loading:false, user:r.data.user }))
      .catch(() => live && setState({ loading:false, user:null }))
    return () => { live = false }
  }, [])
  if (state.loading) return null
  if (!state.user) return <Navigate to="/login" replace />
  if (requireRole && state.user.role !== requireRole) return <Navigate to="/dashboard" replace />
  return children
}
