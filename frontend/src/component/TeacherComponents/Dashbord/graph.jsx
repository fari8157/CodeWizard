// import React, { useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';

// const CoursePurchaseGraph = ({ coursePurchaseCounts }) => {
//   useEffect(() => {
//     if (!coursePurchaseCounts || Object.keys(coursePurchaseCounts).length === 0) {
//       return; // Add a check to prevent errors if coursePurchaseCounts is empty or undefined
//     }

//     const ctx = document.getElementById('coursePurchaseChart').getContext('2d');

//     const chartData = {
//       labels: Object.keys(coursePurchaseCounts),
//       datasets: [
//         {
//           label: 'Purchasing Students',
//           data: Object.values(coursePurchaseCounts),
//           backgroundColor: 'rgba(75, 192, 192, 0.2)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1,
//         },
//       ],
//     };

//     new Chart(ctx, {
//       type: 'bar',
//       data: chartData,
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//             stepSize: 1,
//           },
//         },
//       },
//     });
//   }, [coursePurchaseCounts]);

//   return <Bar data={{}} options={{}} />;
// };

// export default CoursePurchaseGraph;
