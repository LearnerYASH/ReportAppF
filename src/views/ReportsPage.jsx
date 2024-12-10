import React, { useState, useEffect } from 'react';
import { ListGroup, Modal, Form, Button, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from './api';
import './ReportsPage.css'; // Add this for custom CSS animations

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
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [fromDate, setFromDate] = useState(() => new Date().toISOString().split('T')[0]); // Default to today's date
  const [toDate, setToDate] = useState(() => new Date().toISOString().split('T')[0]); // Default to today's date
  const [isLoading, setIsLoading] = useState(false); // For the loading state
  const [isExecuting, setIsExecuting] = useState(false); // For executing report state
  const navigate = useNavigate();

  const branchId = localStorage.getItem('BranchId'); // Fetch branchId directly from localStorage

  // Fetch reports for the group
  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true); // Set loading state to true when fetching reports
      try {
        const response = await api.get(`/reports/reports?group=${reportGroup}`);
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching
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
    if (!fromDate || !toDate) {
      alert('Please fill in all fields.');
      return;
    }

    const dbConfig = {
      serverIp: localStorage.getItem('serverIp'),
      sqlPort: localStorage.getItem('sqlPort'),
      sqlUserId: localStorage.getItem('sqlUserId'),
      sqlPwd: localStorage.getItem('sqlPwd'),
      clientDbName: localStorage.getItem('clientDbName'),
      BranchId: branchId, // No need to ask the user for branchId
    };

    setIsExecuting(true); // Start the execution process

    try {
      const response = await api.post('/reports/execute', {
        procedureName: selectedReport.ProcedureName,
        reportId: selectedReport.ReportId,
        fromDate,
        toDate,
        branchId, // Send branchId from localStorage
        dbConfig,
      });

      // Navigate to the report-specific component with data
      navigate(`/${selectedReport.ReportName.slice(3).trim().replace(/\s+/g, '')}`, {
        state: { reportData: response.data },
      });
    } catch (error) {
      console.error('Error executing report:', error);
    }

    setIsExecuting(false); // Stop the execution process
    setShowModal(false); // Close the modal
  };

  return (
    <div>
      <ListGroup className="h-100 fade-in">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          reports.map((report) => {
            const IconComponent = reportIcons[report.ReportId] || 'fa fa-file'; // Default icon if not matched

            return (
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
                {/* Icon */}
                <span
                  style={{
                    fontSize: '1.5rem',
                    marginRight: '15px',
                    color: '#ff5722', // Vibrant color for the icon
                  }}
                >
                  {typeof IconComponent === 'string' ? (
                    <img src={IconComponent} alt="report-icon" width="35" height="35" />
                  ) : (
                    <i className={IconComponent}></i>
                  )}
                </span>
                {/* Report Name */}
                <span>{report.ReportName}</span>
              </ListGroup.Item>
            );
          })
        )}
      </ListGroup>

      {/* Modal for input parameters */}
      <Modal show={showModal} onHide={() => setShowModal(false)} className="animate-modal">
        <Modal.Header closeButton style={{ backgroundColor: '#6495ed', color: '#003366' }}>
          <Modal.Title>Filter For {selectedReport?.ReportName}</Modal.Title>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleExecuteReport}
            disabled={isExecuting}
            className={isExecuting ? 'loading' : ''}
          >
            {isExecuting ? (
              <Spinner animation="border" className="small-spinner" /> // Show spinner during execution
            ) : (
              'Execute Report'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReportsPage;
