import React from 'react'
import DashboardTextContent from './DashboardTextContent'
import DashboardCardSection from './DashboardCardSection'
import RecentTransactions from './RecentTransactions'



function DashHome() {
 

  return (
    <div>
       <div className='w-screen h-screen+50 md:h-screen overflow-x-hidden'>
      
      <div className='w-full h-full bg-dashboard-bg p-5 md:p-8  flex flex-col gap-0 md:gap-8'>
          <DashboardTextContent text="teacher" />
          <DashboardCardSection />
        
          <RecentTransactions />
      </div>
    </div>

    </div>
  )
}

export default DashHome
