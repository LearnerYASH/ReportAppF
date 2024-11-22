import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const SaleByPaymentMode = () => {
  const location = useLocation(); // Access the location object
  const { reportData } = location.state || {}; // Extract reportData from state

  if (!reportData || reportData.length === 0) {
    return <div>No data available for this report.</div>; // Handle no data scenario
  }
  const data = reportData;
  return (
    <div className="container">
      <div className="row g-3">
        {data.map((item, index) => (
          <Col key={index} sm="12" md="6" lg="4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                
                <div className="mt-2 text-success" style={{ fontSize: '1.2rem' }}>
                  <strong>Cash Amount:</strong> ₹{item.CashAmount.toFixed(2)}
                </div>
                <div className="mt-2 text-danger" style={{ fontSize: '1.2rem' }}>
                  <strong>Cheque Amount:</strong> ₹{item.ChqAmount.toFixed(2)}
                </div>
                <div className="mt-2" style={{ fontSize: '1.2rem' }}>
                  <strong>Credit Amount:</strong> ₹{item.CreditAmount.toFixed(2)}
                </div>
                <div className="mt-2" style={{ fontSize: '1.2rem' }}>
                  <strong>Credit Card Amount:</strong> ₹{item.CreditCardAmount.toFixed(2)}
                </div>
                <div className="mt-2" style={{ fontSize: '1.2rem' }}>
                  <strong>Credit Note Adjustment:</strong> ₹{item.CreditNoteAdjAmount.toFixed(2)}
                </div>
                <div className="mt-2" style={{ fontSize: '1.2rem' }}>
                  <strong>Credit Note Issued:</strong> ₹{item.CreditNoteIsuAmount.toFixed(2)}
                </div>
                <div className="mt-2" style={{ fontSize: '1.2rem' }}>
                  <strong>Credit Refund:</strong> ₹{item.CreditRefundAmount.toFixed(2)}
                </div>
                <div className="mt-2" style={{ fontSize: '1.2rem' }}>
                  <strong>Discount Coupon:</strong> ₹{item.DiscountCouponAmount.toFixed(2)}
                </div>
                <div className="mt-2" style={{ fontSize: '1.2rem' }}>
                  <strong>Gift Voucher:</strong> ₹{item.GiftVoucherAmount.toFixed(2)}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>
    </div>
  );
};

export default SaleByPaymentMode;
