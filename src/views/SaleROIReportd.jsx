import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const SaleROIReportd = ({ reportData }) => {

  // Handle no data scenario
  if (!reportData || reportData.length === 0) {
    return <div>No data available for this report.</div>;
  }

  return (   
    <div>
      {reportData.map((item, index) => (
        <div key={index}>
          <Card
            className="text-center h-100 shadow"
            style={{
              background: 'linear-gradient(135deg, #6495ed, #4169e1)', // Gradient effect
              color: '#fff',
              borderRadius: '15px', // Rounded corners
              overflow: 'hidden',
              position: 'relative',
              width: '100%', // Explicit width adjustment
            }}
          >
            <Card.Body>
              {/* Title */}
              <h5
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                ROI Sale Profit
              </h5>

              {/* Profit Amount */}
              <h2
                style={{
                  color: '#fff',
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  margin: '20px 0',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
                }}
              >
                ₹ {(item.Profit && !isNaN(item.Profit)) ? item.Profit.toFixed(0) : '0.00'}
              </h2>

              {/* Sale and Cost displayed side by side */}
              <Row>
                <Col md={6} style={{ textAlign: 'left', fontWeight: 'bold' }}>
                  <p
                    style={{
                      color: '#fff',
                      fontSize: '1.2rem',
                      margin: '10px 0',
                    }}
                  >
                    Sale: ₹{item.SaleValue}
                  </p>
                </Col>

                <Col md={6} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                  <p
                    style={{
                      color: '#fff',
                      fontSize: '1.2rem',
                      margin: '10px 0',
                    }}
                  >
                    Cost: ₹{item.CostValue}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SaleROIReportd;
