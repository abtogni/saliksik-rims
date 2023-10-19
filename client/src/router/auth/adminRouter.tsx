import React from 'react'
import { Routes, Route,} from "react-router-dom";
import AdminDashboard from '../../pages/users/admin/adminDashboard';
import Home from '../../pages/users/admin/Home';


function AdminRoutes() {
  return (
    <Routes>
        <Route path='/' element={<AdminDashboard />}/>
         <Route path='Home' element={<Home/>}/>
         </Routes>
  )
}

export default AdminRoutes