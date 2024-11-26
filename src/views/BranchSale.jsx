import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import BackButton from './BackButton';

const BranchSale = () => {
  const location = useLocation();
  const { reportData } = location.state || {};

  // Handle no data scenario
  if (!reportData || reportData.length === 0) {
    return <div>No data available for this report.</div>;
  }

  // Generate consistent colors for both chart and legend
  const pieData = reportData.map((item, index) => ({
    id: index.toString(), // Ensure id starts from 0, 1, 2...
    value: item.ExtNetAmount || 0, // Ensure value is always a number
    label: item.ColLabel,
    color: `hsl(${index * 45}, 70%, 50%)`, // Assign distinct colors to each branch
  }));

  return (
    <div className="container">
      <div className="row g-3">
        <Col sm="12">
          <Card className="h-100 shadow-sm">
            {/* Card Header */}
            <Card.Header>
            <Card.Title as="h5" style={{ color: '#4f4f4f' }}>
              <div
                className="d-flex align-items-center"
                style={{ gap: '0' }} // Add spacing between arrow and text
              >
                <BackButton />
                <span>Branch Wise Sale</span>
              </div>
            </Card.Title>
          </Card.Header>

            {/* Card Body */}
            <Card.Body>
              <PieChart
                series={[
                  {
                    data: pieData.map(({ id, value, color }) => ({
                      id,
                      value,
                      color, // Pass colors explicitly to the chart
                    })),
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: 'gray',
                    },
                    tooltip: {
                      valueFormatter: (value, { label }) =>
                        `${label}: ${value.toLocaleString()}`, // Combine label + value
                    },
                  },
                ]}
                height={300} // Adjust height for better visualization
                slotProps={{
                  legend: null, // Correctly disable the legend
                }}
              />
            </Card.Body>

            {/* Card Footer for Custom Legend */}
            <Card.Footer>
              <div className="custom-legend">
                {pieData.map(({ label, value, color }, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-row">
                      <div
                        className="legend-color"
                        style={{
                          backgroundColor: color, // Use the same color as pie slices
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
      </div>

      {/* CSS for the Custom Legend */}
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
            flex: 1; /* Pushes the value to the right */
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

export default BranchSale;
