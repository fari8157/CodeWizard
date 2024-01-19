import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hook/useAxiosPrivate";
import { useSelector } from "react-redux";

const RecentTransactions = () => {
  const { userId } = useSelector((state) => state.Client);
  const { adminAxiosInstance } = useAxiosPrivate(0);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminAxiosInstance.get("/transactions");
        if (response.data.payments) {
          const sortedPayments = response.data.payments.sort(
            (a, b) => new Date(b.created) - new Date(a.created)
          );

          const lastFivePayments = sortedPayments.slice(0, 5);
          setPayments(lastFivePayments);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchData();
  }, [adminAxiosInstance]);

 
  const handlePayClick = async (paymentId) => {
    const response = await adminAxiosInstance.put(`/vendorPay/${paymentId}`);
    setPayments((payments) =>
      payments.map((payment) =>
        payment._id === response.data.result._id
          ? { ...payment, isTeacherPay: response.data.isTeacherPay }
          : payment
      )
    );
  };

  return (
    <div className="h-2/5 md:h-2/4 w-full flex flex-col justify-center">
      <div className="h-1/6 text-2xl text-black">Recent Transactions</div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-100 uppercase bg-gray-700">
            <tr>
              <th className="px-6 py-3">SlNo.</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">TransactionID</th>
              <th className="px-6 py-3">Student</th>
              <th className="px-6 py-3">Course</th>
              <th className="px-6 py-3">TeacherName</th>
              <th className="px-6 py-3">Teacher_Bank_Acc</th>
              <th className="px-6 py-3">IFC</th>
              <th className="px-6 py-3">Teacher_PHNO</th>
              <th className="px-6 py-3">CoursePrice</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => {
              const createdDate = new Date(payment.created);
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              const formattedDate = createdDate.toLocaleDateString(
                undefined,
                options
              );
              return (
                <tr
                  key={payment._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                  } text-white`}
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    {formattedDate}
                  </td>
                  <td className="px-6 py-4  whitespace-nowrap">
                    {payment._id}
                  </td>
                  <td className="px-6 py-4">{payment.user_id?.fullName}</td>
                  <td className="px-6 py-4">{payment.course_id?.courseName}</td>
                  <td className="px-6 py-4">{payment.teacher_id?.fullName}</td>
                  <td className="px-6 py-4">
                    {payment.teacher_id?.bankAccountNo}
                  </td>
                  <td className="px-6 py-4">{payment.teacher_id?.ifcCode}</td>
                  <td className="px-6 py-4">
                    {payment.teacher_id?.phoneNumber}
                  </td>
                  <td className="px-6 py-4">
                    {"\u20B9"}
                    {payment.amount}
                  </td>
                  <td className="border-t border-white py-2 px-4 text-sm text-center">
                    {payment.isTeacherPay === false ? (
                      <button
                        className="bg-red-500 text-white rounded-full py-1 px-3"
                        onClick={() => handlePayClick(payment._id)}
                      >
                        Pay
                      </button>
                    ) : (
                      <button className="bg-green-500 text-white rounded-full py-1 px-3">
                        Paid
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;
