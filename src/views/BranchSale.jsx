import React from 'react';
import { Card, CardBody, Col } from 'react-bootstrap';

const BranchSale = ({ reportData }) => {
  const data = reportData;

  return (
    <div className="container">
      <div className="row g-3">
        {data.map((item, index) => (
          <Col key={index} sm="12" md="6" lg="4">
            <Card className="h-100 shadow-sm">
              <CardBody>
                <h5
                  className="card-title text-primary"
                  style={{ fontSize: '1.5rem' }} // Increased font size
                >
                  {item.ColLabel}
                </h5>
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
              </CardBody>
            </Card>
          </Col>
        ))}
      </div>
    </div>
  );
};

export default BranchSale;
