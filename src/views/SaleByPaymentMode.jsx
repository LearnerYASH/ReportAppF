import React from 'react';
import { PieChart } from '@mui/x-charts';
import { useLocation } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import BackButton from './BackButton';

const SaleByPaymentMode = () => {
  const location = useLocation();
  const { reportData } = location.state || {};

  // Handle no data scenario
  if (!reportData || reportData.length === 0) {
    return <div>No data available for this report.</div>;
  }

  const paymentModes = [
    { id: 'CashAmount', label: 'Cash Amount', value: 0 },
    { id: 'ChqAmount', label: 'Cheque Amount', value: 0 },
    { id: 'CreditAmount', label: 'Credit Amount', value: 0 },
    { id: 'CreditCardAmount', label: 'Credit Card Amount', value: 0 },
    { id: 'CreditNoteAdjAmount', label: 'Credit Note Adjustment', value: 0 },
    { id: 'CreditNoteIsuAmount', label: 'Credit Note Issued', value: 0 },
    { id: 'CreditRefundAmount', label: 'Credit Refund', value: 0 },
    { id: 'DiscountCouponAmount', label: 'Discount Coupon', value: 0 },
    { id: 'GiftVoucherAmount', label: 'Gift Voucher', value: 0 },
  ];

  // Map data to match the structure of reportData
  const transformedData = paymentModes.map((mode) => {
    const matchingData = reportData.reduce(
      (acc, item) => acc + (item[mode.id] || 0),
      0
    );
    return { ...mode, value: matchingData };
  });

  // No filtering here, show all payment modes, including those with 0 value
  const colors = transformedData.map((_, index) => `hsl(${index * 45}, 70%, 50%)`);

  return (
    <div className="container">
      <Col sm="12">
        <Card className="h-100 shadow-sm">
          {/* Card Header */}
          <Card.Header style={{ backgroundColor: '#9ACEEB' }}>
            <Card.Title as="h5" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
              <div className="d-flex align-items-center" style={{ gap: '8px' }}>
                <BackButton />
                <span>Sale By Payment Mode</span>
              </div>
            </Card.Title>
          </Card.Header>

          {/* Card Body */}
          <Card.Body>
            <div style={{ height: '400px' }}>
              <PieChart
                series={[
                  {
                    data: transformedData.map(({ id, value }, index) => ({
                      id,
                      value,
                      color: colors[index], // Assign color to each slice
                    })),
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: 'gray',
                    },
                    tooltip: {
                      valueFormatter: (value, { label }) =>
                        `${label}: ₹${value.toLocaleString()}`, // Format tooltip value with ₹
                    },
                  },
                ]}
                height={300}
              />
            </div>
          </Card.Body>

          {/* Card Footer for Custom Legend */}
          <Card.Footer>
            <div className="custom-legend">
              {transformedData.map(({ label, value }, index) => (
                <div key={index} className="legend-item">
                  <div className="legend-row">
                    <div
                      className="legend-color"
                      style={{
                        backgroundColor: colors[index],
                      }}
                    ></div>
                    <div className="legend-label">{label}</div>
                    <div className="legend-value">
                      ₹{value.toLocaleString()} {/* Show 0 value */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card.Footer>
        </Card>
      </Col>

      {/* CSS for the Custom Legend */}
      <style>
        {`
          .custom-legend {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .legend-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            font-size: 0.9rem;
            color: #4f4f4f;
          }

          .legend-row {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;
          }

          .legend-color {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            margin-right: 8px;
            flex-shrink: 0;
          }

          .legend-label {
            flex: 1;
            text-align: left;
          }

          .legend-value {
            flex-shrink: 0;
            text-align: right;
          }
        `}
      </style>
    </div>
  );
};

export default SaleByPaymentMode;
