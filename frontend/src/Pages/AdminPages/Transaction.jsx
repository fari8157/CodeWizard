import React from 'react'
import Navbar from"../../component/AdminComponent/NavBar/Nav2"
import TransactionTable from '../../component/AdminComponent/Transaction/TransactionTable'
function Transaction() {
  return (
    <div>
        <Navbar/>
        <TransactionTable/>
    </div>
  )
}

export default Transaction