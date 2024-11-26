import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Import an icon for the back button

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(-1)} // Navigate back
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        color: '#4f4f4f', // Match text color
        fontSize: '1rem', // Match font size
        textDecoration: 'none',
        margin: 0,
        padding: 0,
      }}
    >
      <FaArrowLeft style={{ marginRight: '8px' }} />
      <span></span>
    </div>
  );
};

export default BackButton;
