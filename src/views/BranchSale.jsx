import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';

const BranchSale = () => {
  const location = useLocation();
  const { reportData } = location.state || {};

  // Handle no data scenario
  if (!reportData || reportData.length === 0) {
    return <div>No data available for this report.</div>;
  }

  // Format data for the PieChart to compare amounts
  const pieData = reportData.map((item, index) => ({
    id: item.ColLabel,
    value: item.ExtNetAmount || 0, // Ensure value is always a number
    label: item.ColLabel,
    color: `hsl(${index * 45}, 70%, 50%)`, // Assign distinct colors to each branch
  }));

  return (
    <div className="container">
      <div className="row g-3">
        <Col sm="12">
          <Card className="h-100 shadow-sm">
            {/* Card Header */}
            <Card.Header >
            <Card.Title as="h5" style={{ color: '#4f4f4f' }}>
             Branch Wise Sale
            </Card.Title>
            </Card.Header>

            {/* Card Body */}
            <Card.Body>
              <PieChart
                series={[
                  {
                    data: pieData.map(({ id, value }) => ({ id, value })), // Only pass id and value to the PieChart
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: 'gray',
                    },
                  },
                ]}
                height={300} // Adjust height for better visualization
              />
            </Card.Body>

            {/* Card Footer */}
            <Card.Footer>
              <ul className="list-group list-group-flush">
                {pieData.map((item, index) => (
                  <li
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                    style={{
                      fontSize: '1rem',
                      padding: '5px 0',
                      borderBottom: '1px solid #ddd',
                    }}
                  >
                    {/* Color Indicator */}
                    <span
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: item.color,
                        display: 'inline-block',
                        marginRight: '10px',
                      }}
                    ></span>
                    {/* Branch Name */}
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {/* Amount */}
                    <span>₹{item.value.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </Card.Footer>
          </Card>
        </Col>
      </div>
    </div>
  );
};

export default BranchSale;
