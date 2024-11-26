import React from 'react';
import { Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const CompanyTotalSales = () => {
  const location = useLocation();
  const { reportData } = location.state || {};

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
                <h5 style={{ color: '#fff', fontWeight: 'bold' }}>Total Sales</h5>
                <h2 style={{ fontSize: '2rem', color: '#fff' }}>
                  ₹ {item.ExtNetAmount.toFixed(2)}
                </h2>
                <p
                  style={{
                    fontSize: '1.2rem',
                    marginTop: '20px',
                    textAlign: 'right', // Align QTY to the right
                  }}
                >
                  QTY: {item.Quantity}
                </p>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyTotalSales;
