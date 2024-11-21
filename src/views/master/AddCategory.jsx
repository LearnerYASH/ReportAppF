import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [extDescription, setExtDescription] = useState('');
  const [shortName, setShortName] = useState('');
  const [status, setStatus] = useState(true); // For Active status
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch departments for the dropdown
    async function fetchDepartments() {
      try {
        const response = await api.get('/department/department/list');
        setDepartments(response.data.departments);
      } catch (err) {
        console.error('Error fetching departments:', err);
        setError('Failed to load departments');
      }
    }
    fetchDepartments();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const { userId } = JSON.parse(atob(token.split('.')[1])); // Decode JWT

    try {
      const response = await api.post('/category/category/add', {
        departmentId,
        categoryName,
        description,
        extDescription,
        shortName,
        status,
        userId
      });

      if (response.data.success) {
        setSuccess('Category added successfully');
        
      } else {
        setError('Failed to add category');
      }
    } catch (error) {
      setError('Server error: ' + error.message);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Category</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAddCategory}>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form.Group controlId="department">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    as="select"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.InvDepartmentId} value={dept.InvDepartmentId}>
                        {dept.InvDepartmentName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="categoryName">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="extDescription">
                  <Form.Label>Extended Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={extDescription}
                    onChange={(e) => setExtDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="shortName">
                  <Form.Label>Short Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={shortName}
                    onChange={(e) => setShortName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="status">
                  <Form.Check
                    type="checkbox"
                    label="Active"
                    checked={status}
                    onChange={(e) => setStatus(e.target.checked)}
                  />
                </Form.Group>

                <Button type="submit">Save Category</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AddCategory;
