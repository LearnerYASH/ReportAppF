import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SupplierWiseSale = () => {
  const location = useLocation(); // Access the location object
  const { reportData } = location.state || {}; // Extract reportData from state

  if (!reportData || reportData.length === 0) {
    return <div>No data available for this report.</div>; // Handle no data scenario
  }

  // Prepare data for the chart
  const labels = reportData.map((item) => item.SupplierName); // Supplier names
  const dataValues = reportData.map((item) => item.TotalSale); // Total sales amounts

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Total Sales Amount',
        data: dataValues,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Suppliers',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Sales Amount (₹)',
        },
        beginAtZero: true,
      },
    },
    barThickness: 80, // Fixed bar width
    maxBarThickness: 90, // Maximum bar width
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default SupplierWiseSale;
