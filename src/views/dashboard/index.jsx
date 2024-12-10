import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import api from '../api';
import CompanyTotalSalesd from '../CompanyTotalSalesd';
import SaleTrendd from '../SaleTrendd';
import SaleByPaymentModed from '../SaleByPaymentModed';
import SaleROIReportd from '../SaleROIReportd';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Retrieve branchId from localStorage
    const branchId = localStorage.getItem('BranchId');

    // Get the current date and format it as "YYYY-MM-DD"
    const getCurrentDate = () => new Date().toISOString().split('T')[0];

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

    const fetchDashboardData = async () => {
        setIsLoading(true);
        const fromDate = getCurrentDate(); // Adjust the start date as required
        const toDate = getCurrentDate(); // Use today's date as the end date

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
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (branchId) {
            fetchDashboardData();
        } else {
            console.error('Branch ID is missing in localStorage');
        }
    }, [branchId]);

    const companyTotalSalesData = dashboardData ? dashboardData['iNext-000000001'] : null;
    const saleTrendData = dashboardData ? dashboardData['iNext-000000002'] : null;
    const saleByPaymentModeData = dashboardData ? dashboardData['iNext-000000003'] : null;
    const saleroireportData = dashboardData ? dashboardData['iNext-000000010'] : null;

    return (
        <div>
            {isLoading ? (
                <Spinner animation="border" className="loading-spinner" />
            ) : dashboardData ? (
                <div>
                    <div className="row g-2">
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
                <p>No data available or branch ID is missing.</p>
            )}
        </div>
    );
};

export default Dashboard;
