import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../services/firebase'

const ProtectedRoutes = ({children}) => {
    const navigate = useNavigate()

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if(!user) {
                navigate('/auth')
            }
        })
        return () => unsubscribe()
    }, [navigate])
  return children
}

export default ProtectedRoutes