import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import Frame from '../frame.js';
import Leaderboard from 'src/sections/overview/trainee/overview-leaderboard.js';
import {useEffect, useRef} from 'react';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';




const Page = () => {
  const frameRef = useRef(null);

  useEffect(() => {
    const calculateHeight = () => {
      const frame = frameRef.current;
      if (frame) {
        const containerWidth = frame.parentNode.offsetWidth;
        const aspectRatio = 2.2 / 1; // Adjust this value to match your iframe's aspect ratio
        const height = containerWidth / aspectRatio;
        frame.style.height = `${height}px`;
      }
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  return(<>
    <Head>
      <title>
        Videojuego | Portal Ternium
      </title>
    </Head>
    <Box
      component="main"
      sx={{flexGrow:1, py: 8}}>
        <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4">
                Videojuego
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                
              </Stack>
            </Stack>
            
          </Stack>
          
        </Stack>
        
        <Box ref={frameRef} sx={{marginTop:"2.5%"}}>
          <Frame />
        </Box>
        <Box sx={{marginTop:"2.5%"}}>
            <Leaderboard/>
        </Box>
        </Container>

    </Box>
  </>);
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
