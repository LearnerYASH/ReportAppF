import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import api from './api';
import CompanyTotalSales from './CompanyTotalSales';
import SaleTrend from './SaleTrend';
import SaleByPaymentMode from './SaleByPaymentMode';
import BranchSale from './BranchSale';
import TotalCustomerServed from './TotalCustomerServed';
import CategoryWiseSale from './CategoryWiseSale';
import SalesPersonWiseSale from './SalesPersonWiseSale';
import SupplierWiseSale from './SupplierWiseSale';
import AverageBasketSale from './AverageBasketSale';
import SaleROIReport from './SaleROIReport';

const ReportsPage = ({ reportGroup, fromDate, toDate, branchId }) => {
  const [reports, setReports] = useState([]);
  const [reportDataMap, setReportDataMap] = useState({});
  const [selectedReport, setSelectedReport] = useState(null); // Track which report is expanded

  // Fetch available reports for the group
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get(`/reports/reports?group=${reportGroup}`);
        setReports(response.data);
      } catch (error) {
        console.error(`Error fetching ${reportGroup} reports:`, error);
      }
    };
    fetchReports();
  }, [reportGroup]);

  // Automatically execute each report’s stored procedure and store the results
  useEffect(() => {
    const executeReports = async () => {
      const dbConfig = {
        serverIp: localStorage.getItem('serverIp'),
        sqlPort: localStorage.getItem('sqlPort'),
        sqlUserId: localStorage.getItem('sqlUserId'),
        sqlPwd: localStorage.getItem('sqlPwd'),
        clientDbName: localStorage.getItem('clientDbName'),
      };

      for (const report of reports) {
        try {
          const response = await api.post('/reports/execute', {
            procedureName: report.ProcedureName,
            reportId: report.ReportId,
            fromDate,
            toDate,
            branchId,
            dbConfig,
          });

          // Update the report data map with the response data
          setReportDataMap((prevData) => ({
            ...prevData,
            [report.ReportName]: response.data,
          }));
        } catch (error) {
          console.error(`Error executing report ${report.ReportName}:`, error);
        }
      }
    };

    if (reports.length > 0) {
      executeReports();
    }
  }, [reports, fromDate, toDate, branchId]);

  // Function to toggle report visibility
  const toggleReport = (reportName) => {
    setSelectedReport(selectedReport === reportName ? null : reportName);
  };

  return (
    <React.Fragment>
      {reports.map((report) => (
        <Row key={report.ReportId} className="my-4">
          <Col md={1} lg={12}>
            <Card>
              <Card.Header onClick={() => toggleReport(report.ReportName)} style={{ cursor: 'pointer' }}>
                <Card.Title as="h5">{report.ReportName}</Card.Title>
              </Card.Header>
              {selectedReport === report.ReportName && (
                <Card.Body>
                  {report.ReportName === '01. Company Total Sale' && reportDataMap[report.ReportName] && (
                    <CompanyTotalSales reportData={reportDataMap[report.ReportName]} />
                  )}
                  {report.ReportName === '02. Sale Trend of Company' && reportDataMap[report.ReportName] && (
                    <SaleTrend reportData={reportDataMap[report.ReportName]} />
                  )}
                  {report.ReportName === '03. Sale by Payment Mode' && reportDataMap[report.ReportName] && (
                    <SaleByPaymentMode reportData={reportDataMap[report.ReportName]} />
                  )}
                  {report.ReportName === '04. Branch Sale' && reportDataMap[report.ReportName] && (
                    <BranchSale reportData={reportDataMap[report.ReportName]} />
                  )}
                  {report.ReportName === '05. Total Customer Served' && reportDataMap[report.ReportName] && (
                    <TotalCustomerServed reportData={reportDataMap[report.ReportName]} />
                  )}
                  {report.ReportName === '06. Category Wise Sale' && reportDataMap[report.ReportName] && (
                    <CategoryWiseSale reportData={reportDataMap[report.ReportName]} />
                  )}
                  {report.ReportName === '07. Sale Person Wise Sale' && reportDataMap[report.ReportName] && (
                    <SalesPersonWiseSale reportData={reportDataMap[report.ReportName]} />
                  )}
                  {report.ReportName === '08. Supplier Wise Sale' && reportDataMap[report.ReportName] && (
                    <SupplierWiseSale reportData={reportDataMap[report.ReportName]} />
                  )}
                  {report.ReportName === '09. Average Basket Sale' && reportDataMap[report.ReportName] && (
                    <AverageBasketSale reportData={reportDataMap[report.ReportName]} />
                  )}
                  {report.ReportName === '10. Sale-ROI Report' && reportDataMap[report.ReportName] && (
                    <SaleROIReport reportData={reportDataMap[report.ReportName]} />
                  )}
                </Card.Body>
              )}
            </Card>
          </Col>
        </Row>
      ))}
    </React.Fragment>
  );
};

export default ReportsPage;
