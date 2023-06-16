import Head from 'next/head';
import { Box, Container, Button, Stack, IconButton, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/detalles_empleado_info';
import { AccountProfileDetails } from 'src/sections/account/detalles_empleado_forma';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from 'next/link';


const Page = () => (
  <>
    <Head>
      <title>
        Profile | Portal Ternium
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              {/* poner back button maybe atras? */}
              <Grid container flexDirection="row" alignItems="center" spacing={2}>
                <Grid item>
                  <Link href="administracion" passHref>
                    <IconButton sx={{marginBottom:"0.2em", color:"rgb(255,51,0)"}} variant="contained" size="small">
                      <ArrowBackIosNewIcon/>
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item>
                  Perfil
                </Grid>
              </Grid>
              {/* Perfil */}
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
              justifyContent={"center"}
              
            >
              <Grid
                xs={12}
                md={6}
                lg={6}
              >
                {/* cambiar este a algo mas personalizado */}
                <AccountProfile />
              </Grid>
              <Grid
                xs={12}
                md={12}
                lg={12}
              >
                {/* cambiar esto a lo mismo pero con un boton de back */}
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
