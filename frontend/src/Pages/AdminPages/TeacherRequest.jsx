import React from 'react'
import Navbar from "../../component/AdminComponent/NavBar/Nav2";
import Table from "../../component/AdminComponent/Table/Tab"
import TeacherRequest from '../../component/AdminComponent/requestTable/Table';

function TeacherApprove() {
  return (
    <div>
      <Navbar/>
        <TeacherRequest/>
    </div>
  )
}

export default TeacherApprove
