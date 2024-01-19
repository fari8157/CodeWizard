import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hook/useAxiosPrivate';
import { useSelector } from 'react-redux';

const RecentTransactions = () => {
  const { teacherAxiosInstance } = useAxiosPrivate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useSelector((state) => state.Client);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await teacherAxiosInstance.get(`/dashPayments/${userId}`);
        setPayments(response.data.payments || []); // Set payments to an empty array if null
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, teacherAxiosInstance]);

  return (
    <div className='h-2/5 md:h-2/4 w-full flex flex-col justify-center'>
      <div className='h-1/6 text-2xl text-white'>Recent Transactions</div>

      <div className="relative overflow-x-auto">
        {loading ? (
          <p className="text-center py-4 text-gray-500">Loading...</p>
        ) : payments.length === 0 ? (
          <p className="text-center py-4 text-gray-500">No transactions available</p>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-100 uppercase bg-gray-700 ">
              <tr>
                <th className="px-6 py-3">Sl No.</th>
                <th className="px-6 py-3">Payment ID</th>
                <th className="px-6 py-3">Student</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => {
                const last10Digits = payment._id.slice(-10);
                return (
                  <tr key={index} className="border-b bg-gray-800 dark:border-gray-700 text-white">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{last10Digits}</td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{payment.user_id.fullName}</td>
                    <td className="px-6 py-4">{payment.course_id.courseName}</td>
                    <td className="px-6 py-4">{payment.amount}</td>
                    <td className={`px-6 py-4 ${payment.isTeacherPay ? 'text-green-600' : 'text-red-600'}`}>
                      {payment.isTeacherPay ? 'paid' : 'pending'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
