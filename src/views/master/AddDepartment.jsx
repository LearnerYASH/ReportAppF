import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import api from '../api'; // Adjust based on your file structure
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');
  const [extDescription, setExtDescription] = useState('');
  const [shortName, setShortName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleAddDepartment = async (e) => {
    e.preventDefault();

    // Fetch the token and decode it
    const token = localStorage.getItem('token');
    let userId = null;
    if (token) {
      try {
        const { userId: decodedUserId } = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        userId = decodedUserId;
      } catch (err) {
        setError('Invalid token.');
        return;
      }
    }

    if (!departmentName) {
      setError('Department name is required');
      return;
    }

    try {
      const response = await api.post('/department/department/add', {
        departmentName,
        description,
        extDescription,
        shortName,
        userId
      });

      if (response.data.success) {
        setSuccess('Department added successfully');
        setError('');
        
      } else {
        setError('Failed to add department');
        setSuccess('');
      }
    } catch (error) {
      setError('Server error: ' + error.message);
      setSuccess('');
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Department</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAddDepartment}>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="departmentName">
                      <Form.Label>Department</Form.Label>
                      <Form.Control
                        type="text"
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="extDescription">
                      <Form.Label>Extended Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={extDescription}
                        onChange={(e) => setExtDescription(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="shortName">
                      <Form.Label>Short Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={shortName}
                        onChange={(e) => setShortName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit">Save Department</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AddDepartment;
