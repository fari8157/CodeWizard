import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../Pages/AdminPages/Dashbord'
import Students from '../Pages/AdminPages/Students'
import Teachers from '../Pages/AdminPages/Students'
import AdminProctiveRoutes from '../ProtectiveRoutes/AdminProtectiveRoutes'
import TeacherApprove from '../Pages/AdminPages/TeacherRequest'
import TeacherList from '../Pages/AdminPages/TeacherList'
import CategoryList from '../Pages/AdminPages/CategoryList'
import Transaction from '../Pages/AdminPages/Transaction'
import StudentDetail from '../Pages/AdminPages/StudentDetail'
import TeacherDetails from '../Pages/AdminPages/TeacherDetails'

function AdminRoutes() {
    return (
        <Routes>
            <Route path='/dashboard' element={
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
            {/* <Route path='/teachers' element={
                <AdminProctiveRoutes>

                    <Teachers />
                </AdminProctiveRoutes>
            }
            ></Route> */}
             <Route path='/teacherApprovel' element={
                <AdminProctiveRoutes>

                    <TeacherApprove />
                </AdminProctiveRoutes>
            }
            ></Route>
             <Route path='/teachers' element={
                <AdminProctiveRoutes>

                    <TeacherList />
                </AdminProctiveRoutes>
            }
            ></Route>
             <Route path='/categories' element={
                <AdminProctiveRoutes>

                    <CategoryList />
                </AdminProctiveRoutes>
            }
            ></Route>
             <Route path='/transaction' element={
                <AdminProctiveRoutes>

                    <Transaction />
                </AdminProctiveRoutes>
            }
            ></Route>
             <Route path='/studentDetails' element={
                <AdminProctiveRoutes>

                    <StudentDetail />
                </AdminProctiveRoutes>
            }
            ></Route>
             <Route path='/teacherDetails' element={
                <AdminProctiveRoutes>

                    <TeacherDetails />
                </AdminProctiveRoutes>
            }
            ></Route>
        </Routes>
    )
}

export default AdminRoutes
