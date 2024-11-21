import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import ReportsPage from './ReportsPage';

const POS = () => {
  const [fromDate, setFromDate] = useState('2024-04-01');
  const [toDate, setToDate] = useState('2024-11-04');
  const [branchId, setBranchId] = useState('S01');
  const [showReports, setShowReports] = useState(false);
  const [showModal, setShowModal] = useState(true);

  // Function to handle form submission
  const handleGenerateReports = () => {
    if (fromDate && toDate && branchId) {
      setShowReports(true); // Show reports after date and branch are selected
      setShowModal(false); // Hide modal
    } else {
      alert('Please select both dates and a branch ID');
    }
  };

  return (
    <div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Report Date Range and Branch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="fromDate">
              <Form.Label>From Date</Form.Label>
              <Form.Control
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="toDate" className="mt-3">
              <Form.Label>To Date</Form.Label>
              <Form.Control
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="branchId" className="mt-3">
              <Form.Label>Branch ID</Form.Label>
              <Form.Control
                type="text"
                value={branchId}
                onChange={(e) => setBranchId(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleGenerateReports}>
            Generate Reports
          </Button>
        </Modal.Footer>
      </Modal>

      {showReports && (
        <ReportsPage reportGroup="POS" fromDate={fromDate} toDate={toDate} branchId={branchId} />
      )}
    </div>
  );
};

export default POS;
