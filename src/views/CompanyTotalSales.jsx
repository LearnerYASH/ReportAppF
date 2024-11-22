import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const CompanyTotalSales = () => {
  const location = useLocation(); // Access the location object
  const { reportData } = location.state || {}; // Extract reportData from state

  if (!reportData || reportData.length === 0) {
    return <div>No data available for this report.</div>; // Handle no data scenario
  }

  return (
    <div className="container">
      <div className="row g-3">
        {reportData.map((item, index) => (
          <Col key={index} sm="12" md="6" lg="4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div
                  className="mt-3"
                  style={{ fontSize: '1.2rem' }} // Increased font size
                >
                  <strong>Quantity:</strong> {item.Quantity}
                </div>
                <div
                  className="mt-2 text-success"
                  style={{ fontSize: '1.2rem' }} // Increased font size
                >
                  <strong>Amount:</strong> ₹{item.ExtNetAmount.toFixed(2)}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>
    </div>
  );
};

export default CompanyTotalSales;
