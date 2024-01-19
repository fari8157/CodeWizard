import React from 'react'
import DashboardTextContent from './DashBoardContex'
import DashboardCardSection from './DashBoardCardSection'
import RecentTransactions from './RecentTransaction'



function DashHome() {
 

  return (
    <div>
       <div className='w-screen h-screen+50 md:h-screen overflow-x-hidden'>
      
      <div className='w-full h-full bg-gray-200  p-5 md:p-8  flex flex-col gap-0 md:gap-8'>
          <DashboardTextContent text="Admin" />
          <DashboardCardSection />
          <RecentTransactions/>
          
      </div>
    </div>

    </div>
  )
}

export default DashHome
