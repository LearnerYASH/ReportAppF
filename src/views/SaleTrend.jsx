import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLocation } from 'react-router-dom';

const SaleTrend = () => {
    const location = useLocation();
  const reportData = location.state?.reportData || [];
  // Process data to separate "This Week" and "Last Week"
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Filter the data for each week
  const thisWeekData = reportData.filter(item => item.CompareCol === 'This Week');
  const lastWeekData = reportData.filter(item => item.CompareCol === 'Last Week').slice(-7);
  
  // Combine the data for the chart
  const chartData = daysOfWeek.map((day, index) => ({
    day,
    thisWeek: thisWeekData.find(d => d.CompareIndex === index)?.CTAmount || 0,
    lastWeek: lastWeekData.find(d => d.CompareIndex === index)?.CTAmount || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="thisWeek" fill="#8884d8" name="This Week" />
        <Bar dataKey="lastWeek" fill="#82ca9d" name="Last Week" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SaleTrend;
