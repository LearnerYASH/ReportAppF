import React, { useState, useEffect } from 'react';
import { ListGroup, Modal, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from './api';
import { Row, Col, Card } from 'react-bootstrap';

const ReportsPage = ({ reportGroup }) => {
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [fromDate, setFromDate] = useState('2024-04-01');
  const [toDate, setToDate] = useState('2024-11-04');
  const [branchId, setBranchId] = useState('S01');
  const navigate = useNavigate();

  // Fetch reports for the group
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get(`/reports/reports?group=${reportGroup}`);
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, [reportGroup]);

  // Handle report selection and modal display
  const handleReportClick = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  // Execute the report and navigate to its page
  const handleExecuteReport = async () => {
    if (!fromDate || !toDate || !branchId) {
      alert('Please fill in all fields.');
      return;
    }

    const dbConfig = {
      serverIp: localStorage.getItem('serverIp'),
      sqlPort: localStorage.getItem('sqlPort'),
      sqlUserId: localStorage.getItem('sqlUserId'),
      sqlPwd: localStorage.getItem('sqlPwd'),
      clientDbName: localStorage.getItem('clientDbName'),
    };

    try {
      const response = await api.post('/reports/execute', {
        procedureName: selectedReport.ProcedureName,
        reportId: selectedReport.ReportId,
        fromDate,
        toDate,
        branchId,
        dbConfig,
      });

      // Navigate to the report-specific component with data
      navigate(`/${selectedReport.ReportName.slice(3).trim().replace(/\s+/g, '')}`, {
        state: { reportData: response.data },
      });
    } catch (error) {
      console.error('Error executing report:', error);
    }

    setShowModal(false); // Close the modal
  };

  return (
    <div>
    <Card className="shadow-sm w-100">
  <Card.Header>
  <Card.Title as="h5" style={{ color: '#4f4f4f' }}>
  Point Of Sale Reports
</Card.Title>
  </Card.Header>
  <Card.Body className="d-flex flex-column h-100 p-0">
  <ListGroup className="h-100">
  {reports.map((report) => (
    <ListGroup.Item
      key={report.ReportId}
      action
      onClick={() => handleReportClick(report)}
      className="py-3" // Adjust padding
      style={{ fontSize: '1.0rem', color: '#4f4f4f' }} // Set font color to #4f4f4f
    >
      {report.ReportName}
    </ListGroup.Item>
  ))}
</ListGroup>

  </Card.Body>
</Card>
    {/* Modal for input parameters */}
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Execute {selectedReport?.ReportName}</Modal.Title>
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
        <Button variant="primary" onClick={handleExecuteReport}>
          Execute Report
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
  );
};

export default ReportsPage;
