import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import Frame from 'src/pages/frame.js';
import Leaderboard from 'src/sections/overview/trainee/overview-leaderboard.js';
import Tienda from 'src/sections/overview/overview-tienda';
import RotacionReciente from 'src/components/RotacionReciente';
import HistRotaciones from 'src/components/HistRotaciones';
import { ProfileRotaciones } from 'src/components/ProfileRotaciones';
import {useEffect, useRef} from 'react';
import {
  Box,
  Button,
  Container,
  Pagination,
  Card,
  Stack,
  CardHeader,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';




const Page = () => {

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
                Rotaciones
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
        
        <Box sx={{marginTop:"2.5%"}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <ProfileRotaciones/>
              </Grid>
              <Grid item xs={12} sm={8}>
                  <RotacionReciente/>
              </Grid>
            </Grid>
            <HistRotaciones/>
            
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
