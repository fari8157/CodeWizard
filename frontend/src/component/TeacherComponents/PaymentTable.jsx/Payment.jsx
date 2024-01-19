import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hook/useAxiosPrivate';
import { useSelector } from 'react-redux';

const PaymentTable = () => {
  const { teacherAxiosInstance } = useAxiosPrivate();
  const [payments, setPayments] = useState([]);
  const { userId } = useSelector((state) => state.Client);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await teacherAxiosInstance.get(`/payments/${userId}`);
        setPayments(response.data.payments);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchData();
  }, [userId, teacherAxiosInstance]);

  return (
    <div className="bg-dashboard-bg min-h-screen flex justify-center">
      <div className="w-full lg:w-3/4 overflow-x-auto">
        <h1 className="text-3xl font-bold text-white mt-3 text-center lg:text-left">
          Payments
        </h1>
        <div className="mt-4">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-black text-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-800">Sl No.</th>
                  <th className="py-2 px-4 border-b border-gray-800">Payment ID</th>
                  <th className="py-2 px-4 border-b border-gray-800">Student</th>
                  <th className="py-2 px-4 border-b border-gray-800">Course</th>
                  <th className="py-2 px-4 border-b border-gray-800">Amount</th>
                  <th className="py-2 px-4 border-b border-gray-800">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments &&
                  payments.map((payment, index) => {
                    const last10Digits = payment._id.slice(-10);

                    return (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b border-gray-800 text-center">
                          {index + 1}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-800 text-center">
                          {last10Digits}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-800 text-center">
                          {payment.user_id.fullName}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-800 text-center">
                          {payment.course_id.courseName}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-800 text-center">
                          {payment.amount}
                        </td>
                        <td className={`py-2 px-4 border-b border-gray-800 text-center ${payment.isTeacherPay ? 'text-green-600' : 'text-red-600'}`}>
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
  );
};

export default PaymentTable;
