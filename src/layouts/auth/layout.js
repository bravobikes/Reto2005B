import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';

const imageUrls = [
  '/assets/Centro-Industrial-Ternium-1.jpg',
  '/assets/ternium_madeofsteel_empaque-01-1.png',
  '/assets/Ternium-640x360.jpg',
  // Add more image URLs as needed
];

export const Layout = (props) => {
  const { children } = props;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        setFadeIn(true);
      }, 500);
    }, 5500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const currentImageUrl = imageUrls[currentImageIndex];

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#000000',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="image-container"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${currentImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'opacity 0.5s ease-in-out',
          opacity: fadeIn ? 1 : 0,
        }}
      />
<Box
  sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '35%',
    height: '75%',
    borderRadius: '20px',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
  }}
>
  <div
    className="login-content"
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 2,
      padding: '20px',
      background: 'rgb(255, 255, 255, .75)',
      borderRadius: '20px',
    }}
  >
    <img
      src="/assets/terniumLogo.png"
      alt="Logo"
      style={{ maxWidth: '75%', marginBottom: '-150px', marginTop: '58px' }}
    />
    {children}
  </div>
</Box>

    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
