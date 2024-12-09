import React from 'react';
import { PieChart } from '@mui/x-charts'; // Assuming @mui/x-charts is installed
import { useLocation } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap'; // Using React-Bootstrap for card layout
import BackButton from './BackButton';

const TotalCustomerServed = () => {
  const location = useLocation(); // Access the location object
  const { reportData } = location.state || {}; // Extract reportData from state

  if (!reportData || reportData.length === 0) {
    return <div>No data available for this report.</div>; // Handle no data scenario
  }

  // Prepare the data for the PieChart
  const transformedData = reportData.map((item) => ({
    id: item.ColLabel, // Use ColLabel as the label
    label: item.ColLabel, // Use ColLabel for the legend and tooltip
    value: item.CustomerServerd, // Use CustomerServerd as the value
  }));

  // Filter out any entries with a value of 0
  const validData = transformedData.filter((entry) => entry.value > 0);

  // Define a consistent color scheme
  const colors = validData.map(
    (_, index) => `hsl(${(index * 45) % 360}, 70%, 50%)` // Generate consistent colors
  );

  return (
    <div className="container">
      <Col sm="12">
        <Card className="h-100 shadow-sm">
          {/* Card Header */}
          <Card.Header style={{ backgroundColor: '#9ACEEB' }}>
            <Card.Title as="h5" style={{ color: '#4f4f4f' }}>
              <div
                className="d-flex align-items-center"
                style={{ gap: '0' }} // Add spacing between arrow and text
              >
                <BackButton />
                <span>Total Customer Served</span>
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
                      color: colors[index], // Use the predefined colors
                    })),
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: 'gray',
                    },
                    tooltip: {
                      valueFormatter: (value, { id }) =>
                        `${id}: ${value.toLocaleString()} customers`, // Format tooltip value
                    },
                  },
                ]}
                height={300} // Adjust height for better visualization
              />
            </div>
          </Card.Body>

          {/* Card Footer for Custom Legend */}
          <Card.Footer>
            <div className="custom-legend">
              {validData.map(({ label, value }, index) => (
                <div key={index} className="legend-item">
                  <div className="legend-row">
                    <div
                      className="legend-color"
                      style={{
                        backgroundColor: colors[index], // Match color with the PieChart
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        marginRight: '8px',
                      }}
                    ></div>
                    <div className="legend-label">{label}</div>
                    <div className="legend-value">{value.toLocaleString()} customers</div>
                  </div>
                </div>
              ))}
            </div>
          </Card.Footer>
        </Card>
      </Col>

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

export default TotalCustomerServed;
