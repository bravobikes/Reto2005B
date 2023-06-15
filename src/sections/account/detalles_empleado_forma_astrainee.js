import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  InputLabel,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Select,
  MenuItem,
  Typography,
  SvgIcon,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import axios from 'axios';

export const AccountProfileDetails = () => {
  const id = localStorage.getItem('sessionUser');

  const availableAreas = [
    'Mantenimiento',
    'Operaciones',
    'Supply Chain',
    'Ingeniería', 
    'Proyectos',
    'Medio Ambiente',
    'Seguridad',
    'Comercial',
    'Administración y Finanzas',
    'Auditoría y Legal',
    'Comunicaciones',
    'Recursos Humanos'

  ];
  const areasDeInteres = [
    'Mantenimiento',
    'Operaciones',
    'Supply Chain',
    'Ingeniería', 
    'Proyectos',
    'Medio Ambiente',
  ];

  const [formValue, setFormValue] = useState({
    ID_CET: '',
    apellidoMat: '',
    apellidoPat: '',
    clerical: '',
    descTitulo: '',
    escuela: '',
    esp: '',
    estado: '',
    fechNacDia: new Date(),
    grad: '',
    isManagerStr: '',
    nombre: '',
    origenCand: '',
    pais: '',
    posAct: '',
    posIngreso: '',
    remuneracion: '',
  });
  const [message, setMessage] = useState('');


  const getEmployeeUrl = `http://localhost:5000/getempleado/${id}`;
  const editUrl = `http://localhost:5000/updatepeople/${id}`;

  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(getEmployeeUrl);
      console.log('response:');
      console.log(response);
      const { 
        ID_CET,
        apellidoMat,
        apellidoPat,
        clerical,
        descTitulo,
        escuela,
        esp,
        estado,
        fechNac,
        grad,
        isManager,
        nombre,
        origenCand,
        pais,
        posAct,
        posIngreso,
        remuneracion,
      } = response.data;
      const datePart = fechNac.split('T')[0];
      const isManagerStr = true ? 'Administrador' : 'Trainee';
      const fechNacDia = new Date(datePart);
      console.log('fechNacDia:');
      console.log(fechNacDia);
      setFormValue({ 
        ID_CET,
        apellidoMat,
        apellidoPat,
        clerical,
        descTitulo,
        escuela,
        esp,
        estado,
        fechNacDia,
        grad,
        isManagerStr,
        nombre,
        origenCand,
        pais,
        posAct,
        posIngreso,
        remuneracion, 
      });
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  }; 

  const renderTableColumns = (startIndex, endIndex) => {
    return areasDeInteres.slice(startIndex, endIndex).map((area, index) => (
      <TableRow key={index}>
        <TableCell>{area}</TableCell>
      </TableRow>
    ));
  };

  if (!id) {
    return <p>Loading...</p>; // Add a loading state while the id is undefined
  }

  return (
    <div>
      <form autoComplete="off" noValidate>
        <Card>
          <CardHeader subheader="La información se puede editar." title="Información personal" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Nombre"
                  name="nombre"
                  value={formValue.nombre}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  aria-readonly="true"
                  fullWidth
                  type='text'
                  label="Apellido paterno"
                  name="apellidoPat"
                  value={formValue.apellidoPat}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Apellido materno"
                  name="apellidoMat"
                  value={formValue.apellidoMat}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Fecha de nacimiento"
                  name="fechNac"
                  value={formValue.fechNacDia}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Pais"
                  name="pais"
                  value={formValue.pais}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Estado"
                  name="estado"
                  type='text'
                  value={formValue.estado}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Clerical"
                  name="clerical"
                  type='text'
                  value={formValue.clerical}
                />
              </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardHeader subheader="La información se puede editar" title="Educación" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  // helperText="Ingrese nombre de usuario"
                  label="Descripción del título"
                  name="descTitulo"
                  value={formValue.descTitulo}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Especialidad"
                  name="esp"
                  value={formValue.esp}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Escuela"
                  name="escuela"
                  value={formValue.escuela}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Estado graduación"
                  name="pais"
                  value={formValue.grad}
                />
              </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardHeader subheader="La información se puede editar" title="Información Trainee" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  // helperText="Ingrese nombre de usuario"
                  label="Posición actual"
                  name="posAct"
                  value={formValue.posAct}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Posición de ingreso"
                  name="posIngreso"
                  value={formValue.posIngreso}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Origen de candidato"
                  name="origenCand"
                  value={formValue.origenCand}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Puesto"
                  name="isManagerStr"
                  value={formValue.isManagerStr}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Remuneración"
                  name="remuneracion"
                  value={'$' + formValue.remuneracion}
                />
              </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <Grid container>
            <Grid item xs={12} md={6}>
              <CardHeader subheader="La información se puede editar" title="Intereses de areas" />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Select and button */}
        <Select>
          {availableAreas.map((area, index) => (
            <MenuItem key={index} value={area}>
              {area}
            </MenuItem>
          ))}
        </Select>
        {/* <Button onClick={handleAddArea} variant="contained" color="primary"> */}
        <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  sx={{ marginLeft: '10px' }}
                >
                  Agregar Área
                </Button>
        {/* </Button> */}
            </Grid>

          </Grid>
          <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {/* First column of the table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Áreas de Interés Actuales</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderTableColumns(0, areasDeInteres.length/2)}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} md={6}>
        {/* Second column of the table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>------------------</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderTableColumns(areasDeInteres.length/2, areasDeInteres.length)}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* <Grid item xs={12} spacing={2}>
        <Select>
          {availableAreas.map((area, index) => (
            <MenuItem key={index} value={area}>
              {area}  
            </MenuItem>
          ))}
        </Select>
        <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  sx={{ marginLeft: '10px' }}
                >
                  Agregar Área
                </Button>
      </Grid> */}
    </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained">
              Save details
            </Button>
          </CardActions>
        </Card>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
