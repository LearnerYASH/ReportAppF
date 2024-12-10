import React, { useState, useEffect } from 'react';
import { ListGroup, Modal, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from './api';
import './ReportsPage.css';

const reportIcons = {
  'iNext-000000001': 'https://img.icons8.com/plasticine/100/total-sales.png', // Company Total Sale
  'iNext-000000002': 'https://img.icons8.com/plasticine/100/combo-chart.png', // Sale Trend of Company
  'iNext-000000003': 'https://img.icons8.com/plasticine/100/atm.png', // Sale by Payment Mode
  'iNext-000000004': 'https://img.icons8.com/plasticine/100/line-chart.png', // Branch Sale
  'iNext-000000005': 'https://img.icons8.com/plasticine/100/commercial-development-management.png', // Total Customer Served
  'iNext-000000006': 'https://img.icons8.com/plasticine/100/chart.png', // Category Wise Sale
  'iNext-000000007': 'https://img.icons8.com/plasticine/100/bar-chart.png', // Sale Person Wise Sale
  'iNext-000000008': 'https://img.icons8.com/plasticine/100/pie-chart.png', // Supplier Wise Sale
  'iNext-000000009': 'https://img.icons8.com/plasticine/100/shopping.png', // Average Basket Sale
  'iNext-000000010': 'https://img.icons8.com/plasticine/100/analytics.png', // Sale-ROI Report
};

const ReportsPage = ({ reportGroup }) => {
  const [reports, setReports] = useState([]);
  const [branches, setBranches] = useState([]); // Store branches fetched from the backend
  const [selectedBranchId, setSelectedBranchId] = useState(''); // Store selected branch ID
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [fromDate, setFromDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const navigate = useNavigate();

  // Fetch reports for the specified group
  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/reports/reports?group=${reportGroup}`);
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
  }, [reportGroup]);

  // Fetch branches from the backend
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const dbConfig = {
          serverIp: localStorage.getItem('serverIp'),
          sqlPort: localStorage.getItem('sqlPort'),
          sqlUserId: localStorage.getItem('sqlUserId'),
          sqlPwd: localStorage.getItem('sqlPwd'),
          clientDbName: localStorage.getItem('clientDbName'),
        };

        const response = await api.post('/reports/getBranches', { dbConfig });
        setBranches(response.data);
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();
  }, []);

  // Handle report selection and modal display
  const handleReportClick = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  // Execute the selected report
  const handleExecuteReport = async () => {
    if (!fromDate || !toDate || !selectedBranchId) {
      alert('Please select a branch and fill in all fields.');
      return;
    }

    const dbConfig = {
      serverIp: localStorage.getItem('serverIp'),
      sqlPort: localStorage.getItem('sqlPort'),
      sqlUserId: localStorage.getItem('sqlUserId'),
      sqlPwd: localStorage.getItem('sqlPwd'),
      clientDbName: localStorage.getItem('clientDbName'),
    };

    setIsExecuting(true);

    try {
      const response = await api.post('/reports/execute', {
        procedureName: selectedReport.ProcedureName,
        reportId: selectedReport.ReportId,
        fromDate,
        toDate,
        branchId: selectedBranchId, // Use selected branch ID
        dbConfig,
      });

      navigate(`/${selectedReport.ReportName.slice(3).trim().replace(/\s+/g, '')}`, {
        state: { reportData: response.data },
      });
    } catch (error) {
      console.error('Error executing report:', error);
    } finally {
      setIsExecuting(false);
      setShowModal(false);
    }
  };

  return (
    <div>
      <ListGroup className="h-100 fade-in">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          reports.map((report) => (
            <ListGroup.Item
              key={report.ReportId}
              action
              onClick={() => handleReportClick(report)}
              className="d-flex align-items-center py-3"
              style={{
                fontSize: '1rem',
                color: '#003366', // Font color white
                backgroundColor: '#9ACEEB', // Background color
                borderRadius: '10px', // Border radius for curved corners
                marginBottom: '10px', // Optional: to add space between items
              }}
            >
              <span style={{ fontSize: '1.5rem', marginRight: '15px' }}>
                <img src={reportIcons[report.ReportId] || 'https://img.icons8.com/plasticine/100/default.png'} alt="icon" width="35" height="35" />
              </span>
              <span>{report.ReportName}</span>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>

      {/* Modal for input parameters */}
      <Modal show={showModal} onHide={() => setShowModal(false)} className="animate-modal">
        <Modal.Header closeButton>
          <Modal.Title>Filter For {selectedReport?.ReportName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="branchSelect">
              <Form.Label>Select Branch</Form.Label>
              <Form.Control
                as="select"
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
              >
                <option value="">Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch.branchId} value={branch.branchId}>
                   {branch.branchId} -- {branch.branchName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="fromDate" className="mt-3">
              <Form.Label>From Date</Form.Label>
              <Form.Control type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="toDate" className="mt-3">
              <Form.Label>To Date</Form.Label>
              <Form.Control type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleExecuteReport} disabled={isExecuting}>
            {isExecuting ? <Spinner animation="border" size="sm" /> : 'Execute Report'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReportsPage;
