import React, { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewArticle = () => {
  const [formData, setFormData] = useState({
    ArticleNo: '',
    Description: '',
    ExtDescription: '',
    ShortName: '',
    InvDepartmentId: '',
    InvCategoryId: '',
    InvSubCategoryId: '',
    PurchasePrice: 0,
    ArticleMRP: 0,
    ArticleMarkupMRP: 0,
    ArticleWSP: 0,
    ArticleMarkupWSP: 0,
    ArticleRSP: 0,
    ArticleMarkupRSP: 0,
    ArticleExp: 0,
    ArticleMarkupEXP: 0,
    MinSalePrice: 0,
    UomId: '',
    HSNCode: '',
    TaxCategory: '',
    PreferredSupplierId: '',
    SuppliersItemCode: '',
    PerishableItem: false,
    Weight: 0,
    ReorderQty: 0,
    MinOrderQty: 0,
    ActiveStatus: true,
    FeaturedOnEcomm: false,
    PublishedOnEcomm: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/articles', formData);
      navigate('/master/viewarticle');
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">New Article</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="InvDepartmentId">
                      <Form.Label>Department</Form.Label>
                      <Form.Control
                        type="text"
                        name="InvDepartmentId"
                        value={formData.InvDepartmentId}
                        onChange={handleChange}
                        placeholder="Enter Department"
                      />
                    </Form.Group>

                    <Form.Group controlId="InvCategoryId">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        name="InvCategoryId"
                        value={formData.InvCategoryId}
                        onChange={handleChange}
                        placeholder="Enter Category"
                      />
                    </Form.Group>

                    <Form.Group controlId="InvSubCategoryId">
                      <Form.Label>Sub Category</Form.Label>
                      <Form.Control
                        type="text"
                        name="InvSubCategoryId"
                        value={formData.InvSubCategoryId}
                        onChange={handleChange}
                        placeholder="Enter Sub Category"
                      />
                    </Form.Group>

                    <Form.Group controlId="ArticleNo">
                      <Form.Label>Article No</Form.Label>
                      <Form.Control
                        type="text"
                        name="ArticleNo"
                        value={formData.ArticleNo}
                        onChange={handleChange}
                        placeholder="Enter Article No"
                      />
                    </Form.Group>

                    <Form.Group controlId="Description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="Description"
                        value={formData.Description}
                        onChange={handleChange}
                        placeholder="Enter Description"
                      />
                    </Form.Group>

                    <Form.Group controlId="ExtDescription">
                      <Form.Label>Extended Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="ExtDescription"
                        value={formData.ExtDescription}
                        onChange={handleChange}
                        placeholder="Enter Extended Description"
                      />
                    </Form.Group>

                    <Form.Group controlId="ShortName">
                      <Form.Label>Short Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="ShortName"
                        value={formData.ShortName}
                        onChange={handleChange}
                        placeholder="Enter Short Name"
                      />
                    </Form.Group>

                    <Form.Group controlId="ActiveStatus">
                      <Form.Check
                        type="checkbox"
                        name="ActiveStatus"
                        checked={formData.ActiveStatus}
                        onChange={handleChange}
                        label="Active"
                      />
                    </Form.Group>

                    <Form.Group controlId="FeaturedOnEcomm">
                      <Form.Check
                        type="checkbox"
                        name="FeaturedOnEcomm"
                        checked={formData.FeaturedOnEcomm}
                        onChange={handleChange}
                        label="Featured on Ecomm"
                      />
                    </Form.Group>

                    <Form.Group controlId="PublishedOnEcomm">
                      <Form.Check
                        type="checkbox"
                        name="PublishedOnEcomm"
                        checked={formData.PublishedOnEcomm}
                        onChange={handleChange}
                        label="Published on Ecomm"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="UomId">
                      <Form.Label>Unit of Measure</Form.Label>
                      <Form.Control
                        type="text"
                        name="UomId"
                        value={formData.UomId}
                        onChange={handleChange}
                        placeholder="Enter Unit of Measure"
                      />
                    </Form.Group>

                    <Form.Group controlId="HSNCode">
                      <Form.Label>HSN/SAC Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="HSNCode"
                        value={formData.HSNCode}
                        onChange={handleChange}
                        placeholder="Enter HSN/SAC Code"
                      />
                    </Form.Group>

                    <Form.Group controlId="TaxCategory">
                      <Form.Label>Tax Category</Form.Label>
                      <Form.Control
                        type="text"
                        name="TaxCategory"
                        value={formData.TaxCategory}
                        onChange={handleChange}
                        placeholder="Enter Tax Category"
                      />
                    </Form.Group>

                    <Form.Group controlId="PurchasePrice">
                      <Form.Label>Purchase Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="PurchasePrice"
                        value={formData.PurchasePrice}
                        onChange={handleChange}
                        placeholder="Enter Purchase Price"
                      />
                    </Form.Group>

                    <Form.Group controlId="ArticleMRP">
                      <Form.Label>MRP</Form.Label>
                      <Form.Control
                        type="number"
                        name="ArticleMRP"
                        value={formData.ArticleMRP}
                        onChange={handleChange}
                        placeholder="Enter MRP"
                      />
                    </Form.Group>

                    <Form.Group controlId="ArticleMarkupMRP">
                      <Form.Label>MRP Markup Percentage</Form.Label>
                      <Form.Control
                        type="number"
                        name="ArticleMarkupMRP"
                        value={formData.ArticleMarkupMRP}
                        onChange={handleChange}
                        placeholder="Enter MRP Markup Percentage"
                      />
                    </Form.Group>

                    <Form.Group controlId="ArticleWSP">
                      <Form.Label>Wholesale Price (WSP)</Form.Label>
                      <Form.Control
                        type="number"
                        name="ArticleWSP"
                        value={formData.ArticleWSP}
                        onChange={handleChange}
                        placeholder="Enter WSP"
                      />
                    </Form.Group>

                    <Form.Group controlId="ArticleMarkupWSP">
                      <Form.Label>WSP Markup Percentage</Form.Label>
                      <Form.Control
                        type="number"
                        name="ArticleMarkupWSP"
                        value={formData.ArticleMarkupWSP}
                        onChange={handleChange}
                        placeholder="Enter WSP Markup Percentage"
                      />
                    </Form.Group>

                    <Form.Group controlId="ArticleRSP">
                      <Form.Label>Retail Sale Price (RSP)</Form.Label>
                      <Form.Control
                        type="number"
                        name="ArticleRSP"
                        value={formData.ArticleRSP}
                        onChange={handleChange}
                        placeholder="Enter RSP"
                      />
                    </Form.Group>

                    <Form.Group controlId="ArticleMarkupRSP">
                      <Form.Label>RSP Markup Percentage</Form.Label>
                      <Form.Control
                        type="number"
                        name="ArticleMarkupRSP"
                        value={formData.ArticleMarkupRSP}
                        onChange={handleChange}
                        placeholder="Enter RSP Markup Percentage"
                      />
                    </Form.Group>

                    <Form.Group controlId="ArticleExp">
                      <Form.Label>Export Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="ArticleExp"
                        value={formData.ArticleExp}
                        onChange={handleChange}
                        placeholder="Enter Export Price"
                      />
                    </Form.Group>

                    <Form.Group controlId="ArticleMarkupEXP">
                      <Form.Label>EXP Markup Percentage</Form.Label>
                      <Form.Control
                        type="number"
                        name="ArticleMarkupEXP"
                        value={formData.ArticleMarkupEXP}
                        onChange={handleChange}
                        placeholder="Enter EXP Markup Percentage"
                      />
                    </Form.Group>

                    <Form.Group controlId="MinSalePrice">
                      <Form.Label>Min Sale Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="MinSalePrice"
                        value={formData.MinSalePrice}
                        onChange={handleChange}
                        placeholder="Enter Min Sale Price"
                      />
                    </Form.Group>

                    <Form.Group controlId="ReorderQty">
                      <Form.Label>Reorder Qty</Form.Label>
                      <Form.Control
                        type="number"
                        name="ReorderQty"
                        value={formData.ReorderQty}
                        onChange={handleChange}
                        placeholder="Enter Reorder Qty"
                      />
                    </Form.Group>

                    <Form.Group controlId="MinOrderQty">
                      <Form.Label>Min Order Qty</Form.Label>
                      <Form.Control
                        type="number"
                        name="MinOrderQty"
                        value={formData.MinOrderQty}
                        onChange={handleChange}
                        placeholder="Enter Min Order Qty"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default NewArticle;
