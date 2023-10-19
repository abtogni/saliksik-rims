import React from 'react'
import { Routes, Route } from "react-router-dom";
import PersonnelDashboard from '../../pages/users/personnel/personnelDashboard';


function PersonnelRoutes() {
  return (
    <Routes>
        <Route path='/' element={<PersonnelDashboard />}/>
    </Routes>
  )
}

export default PersonnelRoutes