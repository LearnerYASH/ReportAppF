import React from 'react';
import { Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const SaleROIReport = () => {
  const location = useLocation(); // Access the location object
  const { reportData } = location.state || {}; // Extract reportData from state

  // Handle no data scenario
  if (!reportData || reportData.length === 0) {
    return <div>No data available for this report.</div>;
  }

  return (
    <div className="container">
      <div className="row g-3">
        {reportData.map((item, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <Card
              className="text-center h-100 shadow-sm"
              style={{
                backgroundColor: '#9ACEEB', // Cornflower Blue background
                color: '#fff', // White text color
                borderRadius: '10px',
              }}
            >
              <Card.Body>
                <h5 style={{ color: '#fff', fontWeight: 'bold' }}>ROI Sale Profit</h5>
                <h2 style={{ fontSize: '2rem', color: '#fff' }}>
                  ₹ {(item.Profit && !isNaN(item.Profit)) ? item.Profit.toFixed(2) : '0.00'}
                </h2>
                <p
                  style={{
                    fontSize: '1.2rem',
                    marginTop: '20px',
                    textAlign: 'right', // Align additional details to the right (if needed)
                  }}
                >
                  {/* Optional additional details */}
                </p>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaleROIReport;
