import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Select, MenuItem, FormControl, InputLabel, Container,TextField, Stack, DialogTitle, DialogContent, SvgIcon, Typography, Dialog, Unstable_Grid2 as Grid } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/cursos-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { EmpleadosTable } from 'src/sections/customer/empleados-table';
import Ver from 'src/sections/customer/Ver';
import Edit from 'src/sections/customer/Edit';
import {v4 as uuid} from 'uuid';
import axios from 'axios';
import Link from 'next/link';



const useEmployees = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};

const useEmployeeIds = (employees) => {
  return useMemo(() => {
    return employees.map((employee) => employee.ID_CET);
  }, [employees]);
};


const Page = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [crearEmpleadoForm, setCrearEmpleadoForm] = useState({
    apellidoMat: '',
    apellidoPat: '',
    clerical: '',
    descTitulo: '',
    escuela: '',
    esp: '',
    estado: '',
    fechNac: '',
    grad: '',
    isManager: '',
    nombre: '',
    origenCand: '',
    pais: '',
    posAct: '',
    posIngreso: '',
    remuneracion: '',
});

  const employees = useEmployees(data, page, rowsPerPage);
  const employeesIds = useEmployeeIds(employees);
  const employeesSelection = useSelection(employeesIds);

  const [isLoading, setIsLoading] = useState(true);
  const [crea, setCrea] = useState(false);

  const getPeopleUrl = 'http://localhost:5000/getpeople';
  const getEmpleadosUrl = 'http://localhost:5000/getempleados';
  const postEmpleadoUrl = 'http://localhost:5000/postEmpleado';
  
  function handleCreaTr() {
    setCrea(true);
  }
  function handleCerrar() {
    setCrea(false);
  }

  async function handleSubmitCrear() {
    try {
      // Send a POST request to the server with the registration data
      console.log(crearEmpleadoForm);
      const crearEmpleadoResponse = await axios.post(postEmpleadoUrl, crearEmpleadoForm);
      console.log("PostEmpleado handle submit");
  
      // Handle the response
      if (crearEmpleadoResponse.status === 200) {
        setMessage('Registration successful');
      } else {
        setMessage('Registration failed');
      }
    } catch (error) {
      console.error('Error registering empleado:', error);
      setMessage('Error registering empleado');
    }
    
    setCrea(false);
  }

  function renderView(index = null) {
    setSelectedUser(data[index])
    setShow(!show);
  }

  function renderEdit(index = null) {
    setSelectedUser(data[index])
    setShowEdit(!showEdit);
  }

  useEffect(() => {
    // console.log('Before fetch:', data);
  
    const fetchData = async () => {
      try {
        const response = await axios.get(getEmpleadosUrl);
        // console.log('API response:', response);
        // console.log('API data:', response.data);
  
        setData(response.data);
        // console.log('After setData:', data);
  
        setIsLoading(false); // Update loading state
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Update loading state even if an error occurs
      }
    };
  
    fetchData();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCrearEmpleadoForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (event) => {
    setCrearEmpleadoForm((prevFormValue) => ({
      ...prevFormValue,
      isManager: event.target.value
    }));
  };

  


  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);

    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Administración | Portal Ternium
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
                Administración
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
                  onClick={handleCreaTr}
                >
                  Crear trainee
                </Button>
              </div>
            </Stack>
            <Grid item xs={6} sm={6} lg={6}>
              <p>Ingrese Trainee:</p>
              <Select
                // value="Ingrese Trainee"
                sx={{
                  width: '50%',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}
              >
            {data.map((empleado, index) => (
              <Link href={`detalles_empleado?id=${empleado.ID_CET}`} passHref key={index} style={{ color: 'black', textDecoration: 'none' }}>
                <MenuItem value={empleado.ID_CET}>
                  {`${empleado.nombre} ${empleado.apellidoPat} ${empleado.apellidoMat}`}
                </MenuItem>
              </Link>
            ))}
              </Select>
            </Grid>
              {isLoading ? (
              <div>Loading...</div> // Replace this with your desired loading indicator
            ) : (
              <EmpleadosTable 
                toggle={renderView}
                // cambiar este
                toggleEdit={renderEdit}
                count={data.length}
                items={employees}
                onDeselectAll={employeesSelection.handleDeselectAll}
                onDeselectOne={employeesSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={employeesSelection.handleSelectAll}
                onSelectOne={employeesSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={employeesSelection.selected}
              />
            )} 

          </Stack>
        </Container>
      </Box>
      <Dialog open={crea} onClose={handleCerrar} fullWidth={true} maxWidth="sm">
        <DialogTitle>Agrega un Trainee</DialogTitle>
        <DialogContent>
          <form>
              <Grid container sx={{width:"100%"}} flexDirection="column">
                <Grid item>
                  <h3>Información personal:</h3>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" flexDirection="row" spacing={1} sx={{width:"100%", marginBottom:1}}>
                    <Grid item xs={6}>
                        <TextField label="Nombre" name='nombre' value={crearEmpleadoForm.nombre} onChange={handleInput} sx={{width:"100%"}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Apellido paterno" name='apellidoPat' value={crearEmpleadoForm.apellidoPat} onChange={handleInput} sx={{width:"100%"}}/>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" flexDirection="row" spacing={1} sx={{width:"100%", marginBottom:1}}>
                    <Grid item xs={6}>
                        <TextField label="Apellido materno" name='apellidoMat' value={crearEmpleadoForm.apellidoMat} onChange={handleInput} sx={{width:"100%"}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="País" name='pais' value={crearEmpleadoForm.pais} onChange={handleInput} sx={{width:"100%"}}/>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center"  flexDirection="row" spacing={1} sx={{width:"100%"}}>
                    <Grid item xs={6}>
                        <TextField label="Estado" name='estado' value={crearEmpleadoForm.estado} onChange={handleInput} sx={{width:"100%"}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Clerical" name='clerical' value={crearEmpleadoForm.clerical} onChange={handleInput} sx={{width:"100%"}}/>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container justifyContent="space-between" alignItems="center" flexDirection="row" spacing={1} sx={{width:"100%", marginTop:"2.5%"}}>
                    <Grid item xs={6}>
                      <h3>Fecha de nacimiento</h3>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField type='date' name='fechNac' value={crearEmpleadoForm.fechNac} onChange={handleInput} sx={{width:"100%"}}/>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <h3>Educación</h3>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" flexDirection="row" spacing={1} sx={{width:"100%", marginBottom:1}}>
                    <Grid item xs={6}>
                        <TextField label="Descripción del título" name='descTitulo' value={crearEmpleadoForm.descTitulo} onChange={handleInput} sx={{width:"100%"}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Especialidad" name='esp' value={crearEmpleadoForm.esp} onChange={handleInput} sx={{width:"100%"}}/>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" flexDirection="row" spacing={1} sx={{width:"100%"}}>
                    <Grid item xs={6}>
                        <TextField label="Escuela" name='escuela' value={crearEmpleadoForm.escuela} onChange={handleInput} sx={{width:"100%"}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Estado graduación" name='grad' value={crearEmpleadoForm.grad} onChange={handleInput} sx={{width:"100%"}}/>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <h3>Informacion Trainee</h3>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" flexDirection="row" spacing={1} sx={{width:"100%", marginBottom:1}}>
                    <Grid item xs={6}>
                        <TextField label="Posición actual" name='posAct' value={crearEmpleadoForm.posAct} onChange={handleInput} sx={{width:"100%"}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Posición de ingreso" name='posIngreso' value={crearEmpleadoForm.posIngreso} onChange={handleInput} sx={{width:"100%"}}/>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" flexDirection="row" spacing={1} sx={{width:"100%", marginBottom:1}}>
                    <Grid item xs={6}>
                        <TextField label="Origen candidato" name='origenCand' value={crearEmpleadoForm.origenCand} onChange={handleInput} sx={{width:"100%"}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField type='number' label="Remuneración" name='remuneracion' value={crearEmpleadoForm.remuneracion} onChange={handleInput} sx={{width:"100%"}}/>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{marginTop:"2.5%"}}>
                  <Grid container flexDirection="row" alignItems="center" spacing={1} sx={{width:"100%"}}>
                    <Grid item xs={6}>
                      <h3>Puesto: </h3>
                    </Grid>
                    <Grid item xs={6}>
                          <Select labelId="labelSeleccionar" name='isManager' value={crearEmpleadoForm.isManager}  onChange={handleSelectChange} sx={{width:"100%"}}>
                              <MenuItem value={0}>Trainee</MenuItem>
                              <MenuItem value={1}>Administrador</MenuItem>
                          </Select>
                      {message && <p>{message}</p>}
                    </Grid>
                  </Grid>
                  
                </Grid>
                <Grid item sx={{marginTop:"5%"}}>
                  <Button variant="contained" onClick={handleSubmitCrear}>Agregar Trainee</Button>
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
