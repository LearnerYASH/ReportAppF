import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const AddSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [extDescription, setExtDescription] = useState('');
  const [shortName, setShortName] = useState('');
  const [status, setStatus] = useState(true); // For Active status
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories for the dropdown
    async function fetchCategories() {
      try {
        const response = await api.get('/category/category/list');
        setCategories(response.data.categories);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      }
    }
    fetchCategories();
  }, []);

  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const { userId } = JSON.parse(atob(token.split('.')[1])); // Decode JWT

    try {
      const response = await api.post('/subcategory/subcategory/add', {
        categoryId,
        subCategoryName,
        description,
        extDescription,
        shortName,
        status,
        userId
      });

      if (response.data.success) {
        setSuccess('SubCategory added successfully');
        setCategoryId('');
        setSubCategoryName('');
        setDescription('');
        setExtDescription('');
        setShortName('');
      } else {
        setError('Failed to add subcategory');
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
              <Card.Title as="h5">Add SubCategory</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAddSubCategory}>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.InvCategoryId} value={category.InvCategoryId}>
                        {category.InvCategoryName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="subCategoryName">
                  <Form.Label>SubCategory</Form.Label>
                  <Form.Control
                    type="text"
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
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

                <Button type="submit">Save SubCategory</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AddSubCategory;
