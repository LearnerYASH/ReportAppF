import React from 'react';
import { PieChart } from '@mui/x-charts'; // Assuming @mui/x-charts is installed
import { useLocation } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap'; // Using React-Bootstrap for layout
import BackButton from './BackButton';

const SupplierWiseSale = () => {
  const location = useLocation(); // Access the location object
  const { reportData } = location.state || {}; // Extract reportData from state

  if (!reportData || reportData.length === 0) {
    return <div>No data available for this report.</div>; // Handle no data scenario
  }

  // Transform data for PieChart
  const transformedData = reportData.map((item) => ({
    id: item.SupplierName, // Supplier names as IDs
    label: item.SupplierName, // Labels for the legend and tooltip
    value: item.TotalSale, // Total sales amount
  }));

  // Filter valid data (non-zero sales)
  const validData = transformedData.filter((entry) => entry.value > 0);

  // Define consistent colors for chart segments
  const colors = validData.map(
    (_, index) => `hsl(${(index * 45) % 360}, 70%, 50%)` // Generate unique colors
  );

  return (
    <div className="container">
      <Col sm="12">
        <Card className="h-100 shadow-sm">
        <Card.Header>
            <Card.Title as="h5" style={{ color: '#4f4f4f' }}>
              <div
                className="d-flex align-items-center"
                style={{ gap: '0' }} // Add spacing between arrow and text
              >
                <BackButton />
                <span>Supplier Wise Sale</span>
              </div>
            </Card.Title>
          </Card.Header>

          {/* Card Body */}
          <Card.Body>
            <div style={{ height: '400px' }}>
              <PieChart
                series={[
                  {
                    data: validData.map(({ id, value }, index) => ({
                      id,
                      value,
                      color: colors[index], // Apply synchronized colors
                    })),
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: 'gray',
                    },
                    tooltip: {
                      valueFormatter: (value, { id }) =>
                        `${id}: ₹${value.toLocaleString()}`, // Tooltip with formatted value
                    },
                  },
                ]}
                height={300} // Adjust height for visualization
              />
            </div>
          </Card.Body>

          {/* Card Footer for Legend */}
          <Card.Footer>
            <div className="custom-legend">
              {validData.map(({ label, value }, index) => (
                <div key={index} className="legend-item">
                  <div className="legend-row">
                    <div
                      className="legend-color"
                      style={{
                        backgroundColor: colors[index], // Match pie chart colors
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        marginRight: '8px',
                      }}
                    ></div>
                    <div className="legend-label">{label}</div>
                    <div className="legend-value">₹{value.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card.Footer>
        </Card>
      </Col>

      {/* CSS for Custom Legend */}
      <style>
        {`
          .custom-legend {
            display: flex;
            flex-direction: column;
            gap: 8px; /* Spacing between items */
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
            flex: 1; /* Push value to the right */
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

export default SupplierWiseSale;
