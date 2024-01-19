import React from 'react'

function TeacherHistory({payments}) {
  return (
    <div>
        <div className=" flex justify-center">
      <div className="">
        <div className='flex justify-center items-center'>
        <h1 className="text-3xl font-bold text-black mt-11">Transactions</h1>
        </div>
        <div className="overflow-x-auto mt-4">
          <div className="w-full ">
            <table className="border-collapse w-full border border-gray-800 bg-black text-white">
              <thead className="hidden lg:table-header-group">
                <tr>
                  <th className="border border-gray-800 py-4 px-6 lg:px-8">Sl No.</th>
                  <th className="border border-gray-800 py-4 px-6 lg:px-8">Payment ID</th>
                  <th className="border border-gray-800 py-4 px-6 lg:px-8">Student</th>
                  <th className="border border-gray-800 py-4 px-6 lg:px-8">Course</th>
                  <th className="border border-gray-800 py-4 px-6 lg:px-8">Amount</th>
                  <th className="border border-gray-800 py-4 px-6 lg:px-8">Status</th>
                </tr>
              </thead>
              <tbody className="block lg:table-row-group">
                {payments&&payments.map((payment, index) => {
                  const last10Digits = payment._id.slice(-10); // Extracting the last 10 characters of the ID

                  return (
                    <tr key={index} className="block lg:table-row">
                      <td className="border border-gray-800 py-4 px-6 lg:px-8 text-center">{index + 1}</td>
                      <td className="border border-gray-800 py-4 px-6 lg:px-8 text-center">{last10Digits}</td>
                      <td className="border border-gray-800 py-4 px-6 lg:px-8 text-center">{payment.user_id.fullName}</td>
                      <td className="border border-gray-800 py-4 px-6 lg:px-8 text-center">{payment.course_id.courseName}</td>
                      <td className="border border-gray-800 py-4 px-6 lg:px-8 text-center">{payment.amount}</td>
                      <td className={`border border-gray-800 py-4 px-6 lg:px-8 text-center ${payment.isTeacherPay ? 'text-green-600' : 'text-red-600'}`}>
  {payment.isTeacherPay ? 'paid' : 'pending'}
</td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  
    </div>
  )
}

export default TeacherHistory
