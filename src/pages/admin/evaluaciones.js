import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import Frame from 'src/pages/frame.js';
import Leaderboard from 'src/sections/overview/trainee/overview-leaderboard.js';
import Tienda from 'src/sections/overview/overview-tienda';
import TablaEvaluacion from 'src/sections/customer/TablaEvaluaciones';
import {useEffect, useRef, useState} from 'react';
import {
  Box,
  Button,
  Container,
  Pagination,
  Rating,
  Stack,
  Dialog,
  MenuItem,
  DialogTitle,
  FormControl,
  InputLabel,
  TextField,
  DialogContent,
  SvgIcon,
  Select,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';




const Page = () => {
  const getEmpleadosIdNombreUrl = 'http://localhost:5000/getempleadosidNombre';

  const [crea, setCrea] = useState(false);
  const [empleadosIdNombre, setEmpleadosIdNombre] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);


  useEffect(() => {
      fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const empleadosIdNombreResp = await axios.get(getEmpleadosIdNombreUrl);
      setEmpleadosIdNombre(empleadosIdNombreResp.data);
      console.log(empleadosIdNombreResp.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  }; 



  function handleCreaEv() {
   setCrea(true);
  }
  function handleSubmitEv() {
    // aqui poner logica para agregar la evaluacion a bd
    setCrea(false);

  }

  const handleSelectChange = (event) => {
    console.log(selectedValue);
    setSelectedValue((prevFormValue) => ({
      ...prevFormValue,
      selectedValue: event.target.value
    }));
  };

  return (
    <>
      <Head>
        <title>
          Evaluaciones | Portal Ternium
        </title>
      </Head>
      {/* {show && <Ver user={selectedUser} close={renderView} />} */}
      {/* {showEdit && <Edit user={selectedUser} close={renderView} />} */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                Evaluaciones
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Botón
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Botón
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleCreaEv}
                >
                  Crear Evaluación
                </Button>
              </div>
            </Stack>
              <Select labelId="labelSeleccionar" sx={{ width: "100%" }}>
                {empleadosIdNombre.map((empleado) => (
                  <MenuItem key={empleado.ID_CET} value={selectedValue} onChange={handleSelectChange}>
                    {`${empleado.nombre} ${empleado.apellidoPat} ${empleado.apellidoMat}`}
                  </MenuItem>
                ))}
              </Select>
              <TablaEvaluacion/>

          </Stack>
        </Container>
      </Box>
      <Dialog open={crea} onClose={handleSubmitEv} fullWidth={true} maxWidth="sm">
        <DialogTitle>Crea una Evalucación</DialogTitle>
        <DialogContent>
            <form>
                {/* Tuve que quitar spacing asi que agregar margin donde quiero separar */}
                <Grid container flexDirection="column">
                    <Grid item>
                        <h3>Trainee Evaluado:</h3>                    
                    </Grid>
                    <Grid item>
                        <Grid container alignItems="center" flexDirection="row" spacing={1} sx={{width:"100%"}}>
                            <Grid item xs={7}>
                                <TextField label="Nombre Completo" sx={{width:"100%"}}/>
                            </Grid>
                            <Grid item xs={5}>
                                <TextField label="Rotacion"/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sx={{marginTop:"5%"}}>
                        <Grid container alignItems="center" flexDirection="row" spacing={1} sx={{width:"100%"}}>
                            <Grid item xs={6}>
                                <h3>Estado de Rotacion: </h3>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{width:"100%"}}>
                                <InputLabel id="labelSeleccionar">Seleccionar</InputLabel>
                                <Select labelId="labelSeleccionar" sx={{width:"100%"}}>
                                    <MenuItem value={0}>Inactivo</MenuItem>
                                    <MenuItem value={1}>Activo</MenuItem>
                                </Select>
                                </FormControl>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sx={{marginTop:"2.5%"}}>
                        <Grid container alignItems="center" flexDirection="row" spacing={1} sx={{width:"100%"}}>
                            <Grid item xs={6}>
                                <h3>Potencial: </h3>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{width:"100%"}}>
                                <InputLabel id="labelSeleccionar">Seleccionar</InputLabel>
                                <Select labelId="labelSeleccionar" sx={{width:"100%"}}>
                                    {/* No se bien cuales son las opciones pero aqui deberian de ir */}
                                    <MenuItem value={"AM+"}>AM+</MenuItem>
                                    <MenuItem value={"AF+"}>AF+</MenuItem>
                                </Select>
                                </FormControl>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container alignItems="center" flexDirection="row" justifyContent="space-between" sx={{width:"100%", marginTop:"2.5%", marginBottom:"5%"}}>
                            <Grid item xs={9}>
                                <h3>Calificación:</h3>
                            </Grid>
                            <Grid item xs={3} sx={{marginTop:"0.5em"}}>
                                <Rating name="Calificacion"/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sx={{marginBottom:"5%"}}>
                        {/* aqui poner el form para comentario */}
                        <textarea placeholder="Comentarios" style={{width:"100%", height:"20vh", resize:"none", borderRadius:"1em", border:"1px solid black", padding:"1%"}}/>
                    </Grid>
                    <Grid item>
                        <Button variant="contained">Submit</Button>
                    </Grid>
                </Grid>
                

                
            </form>
        </DialogContent>
      </Dialog>

    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
