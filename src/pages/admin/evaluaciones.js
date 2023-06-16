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
  const getPotencialesUrl = 'http://localhost:5000/getPotenciales';

  const [crea, setCrea] = useState(false);
  const [empleadosIdNombre, setEmpleadosIdNombre] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedEvaluadoValue, setSelectedEvaluadoValue] = useState([]);
  const [potenciales, setPotenciales] = useState([]);
  const [selectedPotencialValue, setSelectedPotencialValue] = useState([]);
  const [calificacion, setCalificacion] = useState(0);
  const [comentarios, setComentarios] = useState('');

  const [evaluacionForm, setEvaluacionForm] = useState({
    calificacion: '',
    comentario: '',
    potencial:'',
    rotId: ''
  });


  useEffect(() => {
      fetchEmpleados();
      fetchPotenciales();
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
  
  const fetchPotenciales = async () => {
    try {
      const potencialesResp = await axios.get(getPotencialesUrl);
      setPotenciales(potencialesResp.data);
    } catch (error) {
      console.error('Error fetching potenciales:', error);
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
    console.log('selectedValue:');
    console.log(selectedValue);
    setSelectedValue(event.target.value);
  };
  
  const handleComentariosChange = (event) => {
    const value = event.target.value;
    setComentarios(value);
    setEvaluacionForm((prevForm) => ({
      ...prevForm,
      comentarios: value,
    }));
  };

  const handleSelectEvaluadoChange = (event) => {
    const value = event.target.value;
    setEvaluacionForm((prevForm) => ({
      ...prevForm,
      evaluado: value,
    }));
  };

  const handleSelectPotencialChange = (event) => {
    const value = event.target.value;
    setEvaluacionForm((prevForm) => ({
      ...prevForm,
      potencial: value,
    }));
  };

  const handleCalificacionChange = (event, value) => {
    setCalificacion(value);
    setEvaluacionForm((prevForm) => ({
      ...prevForm,
      calificacion: value,
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
            <Select value={selectedValue} onChange={handleSelectChange}>
              {empleadosIdNombre.map((empleado, index) => (
                <MenuItem key={index} value={empleado.ID_CET} >
                  {empleado.nombre  }
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
                <Grid container alignItems="center" flexDirection="row" spacing={1} sx={{width:"100%"}}>
                            <Grid item xs={6}>
                                <h3>Trainee evaluado: </h3>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{width:"100%"}}>
                                <Select value={selectedEvaluadoValue} onChange={handleSelectEvaluadoChange}>
                                  {empleadosIdNombre.map((empleado, index) => (
                                    <MenuItem key={index} value={empleado.ID_CET} >
                                      {empleado.nombre}
                                    </MenuItem>
                                  ))}
                                </Select>
                                </FormControl>
                                
                            </Grid>
                        </Grid>
                    <Grid item sx={{marginTop:"5%"}}>
                    <Grid item>
                        <Grid container alignItems="center" flexDirection="row" justifyContent="space-between" sx={{width:"100%", marginTop:"2.5%", marginBottom:"5%"}}>
                            <Grid item xs={9}>
                                <h3>Calificación:</h3>
                            </Grid>
                            <Grid item xs={3} sx={{marginTop:"0.5em"}}>
                            <Rating name="Calificacion" value={evaluacionForm.calificacion} onChange={handleCalificacionChange} />
                            </Grid>
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
                                <Select value={selectedPotencialValue} onChange={handleSelectPotencialChange}>
                                  {potenciales.map((potencial, index) => (
                                    <MenuItem key={index} value={potencial.potCatId} >
                                      {potencial.potencialCalif}
                                    </MenuItem>
                                  ))}
                                </Select>
                                </FormControl>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                                <h3>Comentarios:</h3>
                            </Grid>
                    <Grid item sx={{marginBottom:"5%"}}>
                        {/* aqui poner el form para comentario */}
                        <textarea
                          placeholder="Comentarios"
                          style={{ width: "100%", height: "20vh", resize: "none", borderRadius: "1em", border: "1px solid black", padding: "1%" }}
                          value={comentarios}
                          onChange={handleComentariosChange}
                        />
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
