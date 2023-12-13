import React from 'react'

const RecentTransactions = () => {
  return (
    <div className='h-2/5 md:h-2/4 w-full flex flex-col justify-center'>
      <div className='h-1/6 text-2xl text-white'>Recent Transactions</div>

          <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-100 uppercase bg-gray-700 ">
                      <tr>
                          <th scope="col" class="px-6 py-3">
                              Students
                          </th>
                          <th scope="col" class="px-6 py-3">
                              Courses
                          </th>
                          <th scope="col" class="px-6 py-3">
                              Amount
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr class=" border-b bg-gray-800 dark:border-gray-700 text-white">
                          <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                              Ashmil
                          </th>
                          <td class="px-6 py-4">
                              javascript
                          </td>
                          <td class="px-6 py-4">
                             1000
                          </td>
                      </tr>
                      <tr class="border-b bg-gray-800 dark:border-gray-700 text-white">
                          <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                            Rinshid
                          </th>
                          <td class="px-6 py-4">
                              Python
                          </td>
                          <td class="px-6 py-4">
                              1000
                          </td>
                      </tr>
                      <tr class=" bg-gray-800 text-white">
                          <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                              Muhsin
                          </th>
                          <td class="px-6 py-4">
                              Node js
                          </td>
                          <td class="px-6 py-4">
                             1000
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>

    </div>
  )
}

export default RecentTransactions