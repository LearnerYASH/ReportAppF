import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';



const viewarticles = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate(); 

  // Fetch articles from backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/master/articles'); 
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <React.Fragment>
      
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Card.Title as="h5">Articles List</Card.Title>
              <Button variant="primary"  onClick={() => navigate('/master/newarticle')}>Add New Article</Button>

            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Article No</th>
                    <th>Short Name</th>
                    <th>Description</th>
                    <th>Ext Description</th>
                    <th>Department Name</th>
                    <th>Category Name</th>
                    <th>SubCategory Name</th>
                    <th>Raw Material</th>
                    <th>MRP</th>
                    <th>WSP</th>
                    <th>Preferred Supplier Name</th>
                    <th>ReOrder Level</th>
                    <th>Article Stock Type</th>
                    <th>Last Update</th>
                    <th>Active Status</th>
                    <th>UOM Name</th>
                    <th>HSN Code</th>
                    <th>User Name</th>
                    <th>Created On</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article, index) => (
                    <tr key={article.ArticleId}>
                      <th scope="row">{index + 1}</th>
                      <td>{article.ArticleNo}</td>
                      <td>{article.ShortName}</td>
                      <td>{article.Description}</td>
                      <td>{article.ExtDescription}</td>
                      <td>{article.InvDepartmentName}</td>
                      <td>{article.InvCategoryName}</td>
                      <td>{article.InvSubCategoryName}</td>
                      <td>{article.IsRawMaterial ? 'Yes' : 'No'}</td>
                      <td>{article.ArticleMRP}</td>
                      <td>{article.ArticleWSP}</td>
                      <td>{article.PreferredSupplierName}</td>
                      <td>{article.ReOrderLevel}</td>
                      <td>{article.ArticleStockType}</td>
                      <td>{new Date(article.LastUpdate).toLocaleDateString()}</td>
                      <td>{article.ActiveStatus ? 'Active' : 'Inactive'}</td>
                      <td>{article.UomName}</td>
                      <td>{article.HSNCode}</td>
                      <td>{article.UserName}</td>
                      <td>{new Date(article.CreatedOn).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default viewarticles;
