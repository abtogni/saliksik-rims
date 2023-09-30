import React from 'react'
import { Routes, Route } from "react-router-dom";
import AdminDashboard from '../../pages/users/admin/adminDashboard';

function AdminRoutes() {
  return (
    <Routes>
        <Route path='/' element={<AdminDashboard />}/>
    </Routes>
  )
}

export default AdminRoutes