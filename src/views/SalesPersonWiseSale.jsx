
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

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesPersonWiseSale = () => {
  
  const location = useLocation(); // Access the location object
  const { reportData } = location.state || {}; // Extract reportData from state

  if (!reportData || reportData.length === 0) {
    return <div>No data available for this report.</div>; // Handle no data scenario
  }

  const data = reportData;

  // Extract labels and values for the chart
  const labels = data.map((item) => item.ColLabel); // Salesperson names
  const dataValues = data.map((item) => item.ExtNetAmount); // Amounts

  // Chart data configuration
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Sales Amount (₹)',
        data: dataValues,
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Bar color
        borderColor: 'rgba(54, 162, 235, 1)', // Border color
        borderWidth: 1,
      },
    ],
  };

  // Chart options configuration
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
          text: 'Salesperson',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Sales Amount (₹)',
        },
        beginAtZero: true,
      },
    },
    barThickness: 80, // Fixed bar width
    maxBarThickness: 90, // Maximum bar width
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default SalesPersonWiseSale;

