import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hook/useAxiosPrivate';

const PaymentTable = () => {
  const { adminAxiosInstance } = useAxiosPrivate(0);
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Adjust as needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminAxiosInstance.get('/transactions');
        if (response.data.payments) {
          setPayments(response.data.payments);
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchData();
  }, [setPayments]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < Math.ceil(payments.length / itemsPerPage) ? prevPage + 1 : prevPage
    );
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(payments.length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    if (totalPages <= 5) {
      // Render all page numbers if there are less than or equal to 5 pages
      return pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          style={{
            backgroundColor: currentPage === number ? '#007BFF' : '#555',
            color: 'white',
            border: 'none',
            padding: currentPage === number ? '12px' : '8px',
            margin: '0 4px',
          }}
        >
          {number}
        </button>
      ));
    } else {
      // Render dots for more than 5 pages
      let renderedPages = [];
      if (currentPage <= 3) {
        renderedPages = pageNumbers.slice(0, 5);
      } else if (currentPage >= totalPages - 2) {
        renderedPages = pageNumbers.slice(totalPages - 5);
      } else {
        renderedPages = pageNumbers.slice(currentPage - 2, currentPage + 3);
      }

      return (
        <>
          {renderedPages.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              style={{
                backgroundColor: currentPage === number ? '#007BFF' : '#555',
                color: 'white',
                border: 'none',
                padding: currentPage === number ? '12px' : '8px',
                margin: '0 4px',
              }}
            >
              {number}
            </button>
          ))}
          <span>...</span>
        </>
      );
    }
  };
  return (
    
    <div className="bg-black text-white  overflow-x-auto h-screen">
      <table className="w-full">
        <thead>
          <tr>
            <th className="border-t border-white py-2 px-4">No</th>
            <th className="border-t border-white py-2 px-4">Date</th>
            <th className="border-t border-white py-2 px-4">TransactionID</th>
            <th className="border-t border-white py-2 px-4">Student</th>
            <th className="border-t border-white py-2 px-4">Course</th>
            <th className="border-t border-white py-2 px-4">TeacherName</th>
            <th className="border-t border-white py-2 px-4">Teacher_Bank_Acc</th>
            <th className="border-t border-white py-2 px-4">IFC</th>
            <th className="border-t border-white py-2 px-4">Teacher_PHNO</th>
            <th className="border-t border-white py-2 px-4">CoursePrice</th>
            <th className="border-t border-white py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((payment, index) => {
            const createdDate = new Date(payment.created);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = createdDate.toLocaleDateString(undefined, options);

            return (
                <tr key={index}>
                  <td className="border-t border-white py-2 px-4 text-sm text-center">{index + 1}</td>
                  <td className="border-t border-white py-2 px-4 text-sm text-center">{formattedDate}</td>
                  <td className="border-t border-white py-2 px-4 text-sm text-center">{payment._id}</td>
                  <td className="border-t border-white py-2 px-4 text-sm text-center">{payment.user_id?.fullName}</td>
                  <td className="border-t border-white py-2 px-4 text-sm text-center">{payment.course_id?.courseName}</td>
                  <td className="border-t border-white py-2 px-4 text-sm text-center">{payment.teacher_id?.fullName}</td>
                  <td className="border-t border-white py-2 px-4 text-sm text-center">{payment.teacher_id?.bankAccountNo}</td>
                  <td className="border-t border-white py-2 px-4 text-sm text-center">{payment.teacher_id?.ifcCode}</td>
                  <td className="border-t border-white py-2 px-4 text-sm text-center">{payment.teacher_id?.phoneNumber}</td>
                  <td className="border-t border-white py-2 px-4 text-sm text-center">{'\u20B9'}{payment.amount}</td>
                  <td className="border-t border-white py-2 px-4 text-sm text-center">
                    {payment.isTeacherPay === false ? (
                      <button
                        className="bg-red-500 text-white rounded-full py-1 px-3"
                        onClick={() => handlePayClick(payment._id)}
                      >
                        Pay
                      </button>
                    ) : (
                      <button className="bg-green-500 text-white rounded-full py-1 px-3">Paid</button>
                    )}
                  </td>
                </tr>
              );
          })}
        </tbody>
      </table>
      <div className="pagination flex justify-center fixed bottom-0 left-0 right-0 p-2">
        <button
          onClick={handlePrevPage}
          className="transition duration-300 ease-in-out transform hover:scale-110"
          style={{ backgroundColor: '#555', color: 'white', border: 'none', padding: '8px' }}
        >
          &lt;
        </button>
        {renderPagination()}
        <button
          onClick={handleNextPage}
          className="transition duration-300 ease-in-out transform hover:scale-110"
          style={{ backgroundColor: '#555', color: 'white', border: 'none', padding: '8px' }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PaymentTable;
