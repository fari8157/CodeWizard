import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../Pages/AdminPages/Dashbord'
import Students from '../Pages/AdminPages/Students'
import Teachers from '../Pages/AdminPages/Students'
import AdminProctiveRoutes from '../ProtectiveRoutes/AdminProtectiveRoutes'
function AdminRoutes() {
    return (
        <Routes>
            <Route path='/dashbord' element={
                <AdminProctiveRoutes>

                    <Dashboard />
                </AdminProctiveRoutes>
            }></Route>
            <Route path='/students' element={
                <AdminProctiveRoutes>

                    <Students />
                </AdminProctiveRoutes>
            }
            ></Route>
            <Route path='/teachers' element={
                <AdminProctiveRoutes>

                    <Teachers />
                </AdminProctiveRoutes>
            }
            ></Route>
        </Routes>
    )
}

export default AdminRoutes
