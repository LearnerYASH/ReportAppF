import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import BackButton from './BackButton';

const AverageBasketSale = () => {
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
            <Card.Title
              as="h5"
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}
            >
              <BackButton />
              <span style={{ marginLeft: '8px' }}>Average Basket Sale</span>
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
                      <h5 style={{ color: '#fff', fontWeight: 'bold' }}>
                        {item.ColLabel || 'Average Basket Sale'}
                      </h5>
                      <h2 style={{ fontSize: '2rem', color: '#fff' }}>
                        ₹ {item.BasketSize?.toFixed(2) || '0.00'} {/* Safely display BasketSize */}
                      </h2>
                      <p style={{ fontSize: '1rem', marginTop: '10px' }}>
                        <strong>Total Sale: </strong>₹{' '}
                        {item.TotalSale?.toFixed(2) || '0.00'}
                      </p>
                      <p style={{ fontSize: '1rem' }}>
                        <strong>Total Cashmemo: </strong>₹{' '}
                        {item.TotalCashmemo || '0.00'}
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

export default AverageBasketSale;
