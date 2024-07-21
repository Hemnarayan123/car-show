import React from 'react'
import { useData } from '../context/userContex'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children, Role}) {
const {token, role} = useData()
    if (!token) {
        return <Navigate to={'/signup'} />
    }
    if (Role && role !== Role) {
        return <Navigate to={'/'} />
    }
  return ( children )
}

export default ProtectedRoute