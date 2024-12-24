import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useLocation } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap'; // Bootstrap for layout
import BackButton from './BackButton'; // Assuming BackButton is in the same folder

const SaleTrend = () => {
  const location = useLocation();
  const { reportData } = location.state || {};

  // Log the reportData to inspect its structure
  console.log('Report Data:', reportData);

  if (!reportData || reportData.length === 0) {
    return <div>No data available for this report.</div>;
  }

  // Days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Helper function to filter data by CompareCol and ensure unique CompareIndex
  const filterDataByWeek = (data, compareCol) => {
    const filteredData = data
      .filter((item) => item.CompareCol === compareCol)
      .reduce((uniqueData, current) => {
        // Ensure only the latest entry for each CompareIndex is kept
        const index = current.CompareIndex;
        uniqueData[index] = current;
        return uniqueData;
      }, {});

    // Fill missing days with default values (CTAmount: 0)
    return daysOfWeek.map((_, index) => ({
      CompareIndex: index,
      NetAmount: filteredData[index]?.NetAmount || 0,
    }));
  };

  // Prepare data for "This Week" and "Last Week"
  const thisWeekData = filterDataByWeek(reportData, 'This Week');
  const lastWeekData = filterDataByWeek(reportData, 'Last Week');

  // Prepare chart data
  const chartData = daysOfWeek.map((day, index) => ({
    day,
    thisWeek: thisWeekData[index].NetAmount,
    lastWeek: lastWeekData[index].NetAmount,
  }));

  return (
    <div className="container">
      <Col sm="12">
        <Card className="h-100 shadow-sm">
          {/* Card Header */}
          <Card.Header style={{ backgroundColor: '#9ACEEB' }}>
            <Card.Title as="h5" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
              <div
                className="d-flex align-items-center"
                style={{ gap: '8px' }} // Add spacing between arrow and text
              >
                <BackButton />
                <span>Sale Trend</span>
              </div>
            </Card.Title>
          </Card.Header>

          {/* Card Body */}
          <Card.Body>
            <div style={{ height: '400px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  {/* Legend removed */}
                  <Bar dataKey="thisWeek" fill="#599ad3" name="This Week" />
                  <Bar dataKey="lastWeek" fill="#f9a65a" name="Last Week" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default SaleTrend;
