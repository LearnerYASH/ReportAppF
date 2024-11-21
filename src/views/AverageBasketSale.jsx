import React from 'react';
import { Card, CardBody, Col } from 'react-bootstrap';

const AverageBasketSale = ({ reportData }) => {
  return (
    <div className="container">
      <div className="row g-3">
        {reportData.map((item, index) => (
          <Col key={index} sm="12" md="6" lg="4">
            <Card className="h-100 shadow-sm">
              <CardBody>
                
                <div className="mt-3" style={{ fontSize: '1.5rem' }}>
                  <strong>Average Basket Sale:</strong> ₹
                  {(item["(No column name)"] && item.BasketSize) ? (item["(No column name)"] / item.BasketSize).toFixed(2) : '0.00'}
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </div>
    </div>
  );
};

export default AverageBasketSale;
