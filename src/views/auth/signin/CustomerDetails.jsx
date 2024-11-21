import React, { useEffect,useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';



import logo from '../../../assets/images/inextlogo.png';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const CustomerDetails = () => {
  const [customer, setCustomer] = useState({});
  
  const navigate = useNavigate();

  useEffect(() => {
    const customerId = localStorage.getItem('customerId');
    if (!customerId) {
      navigate('/login');
      return;
    }
    
    // Fetch customer details using the customerId
    api.get(`/verify/customers/${customerId}`)
      .then((response) => setCustomer(response.data))
      .catch((error) => console.error('Error fetching customer details:', error));
  }, [history]);

  const handleProceed = () => {
    navigate('/app/dashboard/default');
  };

  return (
    <React.Fragment>
      <Breadcrumb />
      <section className="background-radial-gradient overflow-hidden vh-100">
        <style>
          {`
            .background-radial-gradient {
              background-color: hsl(218, 41%, 15%);
              background-image: radial-gradient(650px circle at 0% 0%,
                hsl(218, 41%, 35%) 15%,
                hsl(218, 41%, 30%) 35%,
                hsl(218, 41%, 20%) 75%,
                hsl(218, 41%, 19%) 80%,
                transparent 100%),
                radial-gradient(1250px circle at 100% 100%,
                hsl(218, 41%, 45%) 15%,
                hsl(218, 41%, 30%) 35%,
                hsl(218, 41%, 20%) 75%,
                hsl(218, 41%, 19%) 80%,
                transparent 100%);
            }

            #radius-shape-1 {
              height: 220px;
              width: 220px;
              top: -60px;
              left: -130px;
              background: radial-gradient(#6495ed, #6495ed);
              overflow: hidden;
            }

            #radius-shape-2 {
              border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
              bottom: -60px;
              right: -110px;
              width: 300px;
              height: 300px;
              background: radial-gradient(#6495ed, #6495ed);
              overflow: hidden;
            }

            .bg-glass {
              background-color: hsla(0, 0%, 100%, 0.9) !important;
              backdrop-filter: saturate(200%) blur(25px);
            }
          `}
        </style>

        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
                Welcome to <br />
                <span style={{ color: 'hsl(218, 81%, 75%)' }}>iNextERP solutions</span>
              </h1>
              <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
                "Empowering Businesses through Innovative and Integrated ERP, CRM, and POS Solutions that Drive Efficiency, Enhance Customer Engagement, and Foster Sustainable Growth in a Dynamic Market."
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

              <div className="card bg-glass">
                <Card.Body>
                  <div className="text-center mb-4">
                    <img src={logo} alt="Company Logo" style={{ width: '80px' }} />
                    <h3 className="mt-3" style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif', color: '#6495ed' }}>iNextErp+</h3>
                   
                  </div>
                  <h3 className="card-title mb-4" style={{ color: '#6495ed', fontFamily: 'Arial, sans-serif' }}>
                    {customer.CustomerName || 'Customer Name'}
                  </h3>
                  <p><strong>Business Name:</strong> {customer.BusinessName || 'N/A'}</p>
                  <p><strong>Email:</strong> {customer.ContactEmail1 || 'N/A'}</p>
                  <p><strong>Phone:</strong> {customer.ContactPhone1 || 'N/A'}</p>
                  <p><strong>Address:</strong> {customer.Address || 'N/A'}</p>
                  
                  <button 
                    onClick={handleProceed} 
                    className="btn btn-primary px-5" 
                    style={{ backgroundColor: '#6495ed', borderColor: '#6495ed', fontFamily: 'Fira Code' }}
                  >
                    Proceed to Dashboard
                  </button>
                 
                </Card.Body>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
    

export default CustomerDetails;
