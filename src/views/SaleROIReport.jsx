import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import BackButton from './BackButton';

const SaleROIReport = () => {
  const location = useLocation(); // Access the location object
  const { reportData } = location.state || {}; // Extract reportData from state

  // Handle no data scenario
  if (!reportData || reportData.length === 0) {
    return <div>No data available for this report.</div>;
  }

  return (
    <div className="container">
      <Col sm="12">
        <Card className="shadow-sm">
          {/* Card Header */}
          <Card.Header style={{ backgroundColor: '#9ACEEB' }}>
  <Card.Title as="h5" style={{ display: 'flex', alignItems: 'center', color: '#FFFFFF', fontWeight: 'bold' }}>
    <BackButton />
    <span style={{ marginLeft: '8px' }}>Sale ROI Report</span>
  </Card.Title>
</Card.Header>


          {/* Card Body */}
          <Card.Body>
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
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default SaleROIReport;
