import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Logo } from 'src/components/logo';

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
    }, 3000);

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
        flex: '1 1 auto'
      }}
    >
      <Grid
        container
        sx={{ flex: '1 1 auto' }}
      >
        <Grid
          xs={12}
          lg={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: 'fixed',
              top: 0,
              width: '100%'
            }}
          >
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: 'inline-flex',
                height: 32,
                width: 32
              }}
            >
              <Logo />
            </Box>
          </Box>
          {children}
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            position: 'relative',
            alignItems: 'center',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
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
        </Grid>
      </Grid>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};