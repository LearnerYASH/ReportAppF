import React from 'react';
import { Card, CardBody, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const SaleROIReport = () => {
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
              <CardBody>
                
                <div className="mt-3" style={{ fontSize: '1.2rem' }}>
                  <strong>Sale:</strong> ₹{(item["(No column name)"] && !isNaN(item["(No column name)"])) ? item["(No column name)"].toFixed(2) : '0.00'}
                </div>
                <div className="mt-2" style={{ fontSize: '1.2rem' }}>
                  <strong>Cost:</strong> ₹{(item["(No column name)1"] && !isNaN(item["(No column name)"])) ? item["(No column name)1"].toFixed(2) : '0.00'}
                </div>
                <div className="mt-2 text-success" style={{ fontSize: '1.2rem' }}>
                  <strong>Profit:</strong> ₹{(item.Profit && !isNaN(item.Profit)) ? item.Profit.toFixed(2) : '0.00'}
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </div>
    </div>
  );
};

export default SaleROIReport;
