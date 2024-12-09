import React, { useState } from 'react';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import api from '../api';
import CompanyTotalSalesd from '../CompanyTotalSalesd';
import SaleTrendd from '../SaleTrendd';
import SaleByPaymentModed from '../SaleByPaymentModed';
import SaleROIReportd from '../SaleROIReportd';


const Dashboard = () => {
    const [fromDate, setFromDate] = useState('2024-04-01');
    const [toDate, setToDate] = useState('2024-11-04');
    const [branchId, setBranchId] = useState('S01');
    const [showModal, setShowModal] = useState(true);
    const [isExecuting, setIsExecuting] = useState(false);
    const [dashboardData, setDashboardData] = useState(null);

    const dbConfig = {
        serverIp: localStorage.getItem('serverIp'),
        sqlPort: localStorage.getItem('sqlPort'),
        sqlUserId: localStorage.getItem('sqlUserId'),
        sqlPwd: localStorage.getItem('sqlPwd'),
        clientDbName: localStorage.getItem('clientDbName'),
    };

    const reportsConfig = [
        { reportId: 'iNext-000000001', procedureName: 'MprocTotalSale' },
        { reportId: 'iNext-000000002', procedureName: 'MprocSaleTrendWeekly' },
        { reportId: 'iNext-000000003', procedureName: 'MprocSalePaymentMode' },
        { reportId: 'iNext-000000010', procedureName: 'MprocSaleROI' },
    ];

    const handleExecuteReport = async () => {
        setIsExecuting(true);
        try {
            const response = await api.post('/reports/executebatch', {
                reports: reportsConfig.map((report) => ({
                    ...report,
                    fromDate,
                    toDate,
                    branchId,
                })),
                dbConfig,
            });
            console.log('Received data from backend:', response.data);
            setDashboardData(response.data);
            setShowModal(false); // Close modal after execution
        } catch (error) {
            console.error('Error executing batch reports:', error);
        } finally {
            setIsExecuting(false);
        }
    };

    const companyTotalSalesData = dashboardData ? dashboardData['iNext-000000001'] : null;
    const saleTrendData = dashboardData ? dashboardData['iNext-000000002'] : null;
    const saleByPaymentModeData = dashboardData ? dashboardData['iNext-000000003'] : null;
    const saleroireportData = dashboardData ? dashboardData['iNext-000000010'] : null;

    return (
        <div>
            {/* Modal for input parameters */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                backdrop="static"
                keyboard={false}
                className="animate-modal"
            >
                <Modal.Header closeButton style={{ backgroundColor: '#6495ed', color: '#003366' }}>
                    <Modal.Title>Filter For Dashboard</Modal.Title>
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
                    <Button
                        variant="primary"
                        onClick={handleExecuteReport}
                        disabled={isExecuting}
                        className={isExecuting ? 'loading' : ''}
                    >
                        {isExecuting ? <Spinner animation="border" className="small-spinner" /> : 'Execute Report'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Render dashboard content */}
            {dashboardData ? (
    <div >
    <div className="row  g-2">
        {/* Total Sales */}
        <div className="col-md-6 mb-4">
            {companyTotalSalesData && companyTotalSalesData.length > 0 ? (
                <CompanyTotalSalesd reportData={companyTotalSalesData} />
            ) : (
                <p>No data available for Total Sales.</p>
            )}
        </div>

        {/* ROI Report */}
        <div className="col-md-6 mb-4">
            {saleroireportData && saleroireportData.length > 0 ? (
                <SaleROIReportd reportData={saleroireportData} />
            ) : (
                <p>No data available for ROI Report.</p>
            )}
        </div>
    </div>

    <div className="row">
        {/* Sale Trend */}
        <div className="col-md-6 mb-4">
            {saleTrendData && saleTrendData.length > 0 ? (
                <SaleTrendd reportData={saleTrendData} />
            ) : (
                <p>No data available for Sale Trend.</p>
            )}
        </div>

        {/* Sale by Payment Mode */}
        <div className="col-md-6 mb-4">
            {saleByPaymentModeData && saleByPaymentModeData.length > 0 ? (
                <SaleByPaymentModed reportData={saleByPaymentModeData} />
            ) : (
                <p>No data available for Sale by Payment Mode.</p>
            )}
        </div>
    </div>
</div>
) : (
    <p>Loading dashboard data...</p>
)}
        </div>
    );
};

export default Dashboard;
