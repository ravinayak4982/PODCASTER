import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminProtect = ({children}) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if (!isLoggedIn) {
        return <Navigate to="/admin-login" />
    }
    return children;
}

export default AdminProtect