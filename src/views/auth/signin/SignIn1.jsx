import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import api from '../../api'; // Ensure you have your axios or api setup

import logo from '../../../assets/images/inextlogo.png';

const Signin1 = () => {
  const [emailid, setEmailid] = useState('');
  const [userpwd, setUserpwd] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  
  const handleLogin = async (emailid, userpwd) => {
      try {
          console.log(emailid, userpwd);
          const response = await api.post('/auth/login', { emailid, userpwd });
          if (response.data.success) {
              // Save the token, customerId, and additional details in localStorage
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('tokenExpiration', response.data.tokenExpiration);
              localStorage.setItem('customerId', response.data.customerId);
              localStorage.setItem('UserName', response.data.UserName);
              localStorage.setItem('serverIp', response.data.serverIp);
              localStorage.setItem('sqlPort', response.data.sqlPort);
              localStorage.setItem('sqlUserId', response.data.sqlUserId);
              localStorage.setItem('sqlPwd', response.data.sqlPwd);
              localStorage.setItem('clientDbName', response.data.clientDbName);
              console.log('Token:', response.data.token);
              console.log('tokenExpiration:', response.data.tokenExpiration);
              console.log('CustomerId:', response.data.customerId);
              console.log('UserName:', response.data.UserName);
              console.log('Server IP:', response.data.serverIp);
              console.log('SQL Port:', response.data.sqlPort);
              console.log('SQL User ID:', response.data.sqlUserId);
              console.log('SQL Password:', response.data.sqlPwd);
              console.log('Client Database Name:', response.data.clientDbName);
              
              navigate('/verify');
          } else {
              setLoginError('Login failed. Please check your credentials.');
          }
      } catch (error) {
          console.error('Login error:', error);
          setLoginError('An error occurred during login. Please try again.');
      }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(emailid, userpwd);
  };

  return (
    <React.Fragment>
      <Breadcrumb />
      <section className="background-radial-gradient">
  <style>
    {`
      /* General page and container styles */
      html, body {
        height: 100%;
        margin: 0;
        overflow-y: auto; /* Ensure scrolling works */
      }

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
        min-height: 100vh; /* Allow section to grow beyond viewport */
        overflow: auto; /* Ensure scrolling works */
      }

      #radius-shape-1 {
        height: 220px;
        width: 220px;
        top: -60px;
        left: -130px;
        background: radial-gradient(#6495ed, #6495ed);
        position: absolute;
        overflow: hidden;
      }

      #radius-shape-2 {
        border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
        bottom: -60px;
        right: -110px;
        width: 300px;
        height: 300px;
        background: radial-gradient(#6495ed, #6495ed);
        position: absolute;
        overflow: hidden;
      }

      .bg-glass {
        background-color: hsla(0, 0%, 100%, 0.9) !important;
        backdrop-filter: saturate(200%) blur(25px);
      }
    `}
  </style>

  <div className="container px-4 py-5 px-md-5 text-center text-lg-start">
    <div className="row gx-lg-5 align-items-center mb-5">
      {/* Left Column */}
      <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
        <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
          Welcome to <br />
          <span style={{ color: 'hsl(218, 81%, 75%)' }}>iNextERP Solutions</span>
        </h1>
        <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
          "Empowering Businesses through Innovative and Integrated ERP, CRM, and POS Solutions that Drive Efficiency, Enhance Customer Engagement, and Foster Sustainable Growth in a Dynamic Market."
        </p>
      </div>

      {/* Right Column */}
      <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
        <div id="radius-shape-1" className="rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="shadow-5-strong"></div>

        <div className="card bg-glass">
          <Card.Body>
            <div className="text-center mb-4">
              <img src={logo} alt="Company Logo" style={{ width: '80px' }} />
              <h3 className="mt-3" style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif', color: '#6495ed' }}>iNext</h3>
              <h3 className="mt-8" style={{ fontFamily: 'Menlo' }}>iNextErp+ Software</h3>
            </div>
            <h3 className="text-left mb-4" style={{ fontFamily: 'Fira Code' }}>Login</h3>

            {/* Form */}
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="formemail" className="mb-4">
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  size="lg"
                  value={emailid}
                  onChange={(e) => setEmailid(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-4">
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  size="lg"
                  value={userpwd}
                  onChange={(e) => setUserpwd(e.target.value)}
                  required
                />
              </Form.Group>

              {loginError && <div className="text-danger mb-3">{loginError}</div>}

              <div className="d-flex justify-content-between align-items-center">
                <Form.Group className="mb-0">
                  <Form.Check type="checkbox" label="Remember me" id="formRemember" />
                </Form.Group>
                <NavLink to="#" className="text-body">
                  Forgot password?
                </NavLink>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="px-5"
                  style={{ fontWeight: 'bold', fontFamily: 'Fira Code', backgroundColor: '#6495ed', borderColor: '#6495ed' }}
                >
                  Login
                </Button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don’t have an account?{' '}
                  <NavLink to="/auth/signup-1" className="link-danger">
                    Register
                  </NavLink>
                </p>
              </div>
            </Form>
          </Card.Body>
        </div>
      </div>
    </div>
  </div>
</section>
    </React.Fragment>
  );
};

export default Signin1;
