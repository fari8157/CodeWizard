import React from 'react';

const TransactionTable = ({ transaction }) => {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold">Transactions</h1>
      </div>
      <div className="flex justify-center items-center">
        <table className="divide-y divide-gray-200 border-2 border-gray-400 bg-black text-white">
          <thead className="bg-gray-900">
            <tr>
              <th scope="col" className="px-8 py-4 text-left text-xs font-medium uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-8 py-4 text-left text-xs font-medium uppercase tracking-wider">
               Payment ID
              </th>
              <th scope="col" className="px-8 py-4 text-left text-xs font-medium uppercase tracking-wider">
                Course Name
              </th>
              <th scope="col" className="px-8 py-4 text-left text-xs font-medium uppercase tracking-wider">
                Teacher Name
              </th>
              <th scope="col" className="px-8 py-4 text-left text-xs font-medium uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-black divide-y divide-gray-200">
            {transaction.map((trans, index) => {
              const createdDate = new Date(trans.created);
              const options = { year: 'numeric', month: 'long', day: 'numeric' };
              const formattedDate = createdDate.toLocaleDateString(undefined, options);
              const last10Digits = trans._id.slice(-10);
              return (
                <tr key={index}>
                  <td className="px-8 py-6 whitespace-nowrap text-center">{formattedDate}</td>
                  <td className="w-8 py-6 text-center">{last10Digits}</td>
                  <td className="px-8 py-6 whitespace-nowrap text-center">{trans.course_id?.courseName}</td>
                  <td className="px-8 py-6 whitespace-nowrap text-center">{trans.teacher_id?.fullName}</td>
                  <td className="px-8 py-6 whitespace-nowrap text-center">{trans.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
