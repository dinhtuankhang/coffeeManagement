import React, { children, useEffect } from 'react'
import { useAuthContext } from './AuthProvider'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const { currentUser } = useAuthContext()
  useEffect(() => {
    if (!currentUser) {
      navigate('/introduction')
    }
  }, [currentUser])

  return (
    <>{children}</>
  )
}

export default ProtectedRoute