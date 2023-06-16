import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

const user = {
  avatar: '/assets/avatars/avatar-anika-visser.png',
  // avatar1: '/assets/avatars/avatar-carson-darrin.png',
  // avatar2: '/assets/avatars/avatar-jie-yan-song.png',
};



export const AccountProfile = () => {
  const id = localStorage.getItem('sessionUser');

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
  const [infoValue, setInfoValue] = useState({
    Direccion_Area_de_rotacion_actual: '', 
    Encargado_actual: '', 
    Fecha_de_Graduacion: '', 
    Fotografia_del_Global_Trainee: '', 
    Matricula_Jefe: '', 
    Perfil: '', 
    encuadre: '', 
    nombreInfo: ''
  });
  const [message, setMessage] = useState('');

  const getEmployeeUrl = `http://localhost:5000/getempleado/${id}`;
  const getEmployeeProfileUrl = `http://localhost:5000/getPerfilEmpleado/${id}`;
  const editUrl = `http://localhost:5000/updatepeople/${id}`;

  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(getEmployeeUrl);
      const responsePerfil = await axios.get(getEmployeeProfileUrl);
      // console.log('responsePerfil:');
      // console.log(responsePerfil);
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

        const Direccion_Area_de_rotacion_actual = responsePerfil.data['Direccion/ Area de rotacion actual']; 
        const Encargado_actual = responsePerfil.data['Encargado actual']; 
        const Fecha_de_Graduacion = responsePerfil.data['Fecha de Graduacion'];  
        const Fotografia_del_Global_Trainee = responsePerfil.data['Fotografia del Global Trainee'];  
        const Matricula_Jefe = responsePerfil.data['Matricula Jefe'];  
        const Perfil = responsePerfil.data['Perfil'];  
        const encuadre = responsePerfil.data['encuadre'];  
        const nombreInfo = responsePerfil.data['nombre']; 

      const datePart = fechNac.split('T')[0];
      const isManagerStr = true ? 'Administrador' : 'Trainee';
      const fechNacDia = new Date(datePart);
      // console.log('fechNacDia:');
      // console.log(fechNacDia);
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
      setInfoValue({ 
        Direccion_Area_de_rotacion_actual, 
        Encargado_actual, 
        Fecha_de_Graduacion, 
        Fotografia_del_Global_Trainee, 
        Matricula_Jefe, 
        Perfil, 
        encuadre, 
        nombreInfo
      });
      // console.log(Encargado_actual);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

return(
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {formValue.nombre}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {formValue.estado}, {formValue.pais}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {infoValue.encuadre}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {infoValue.Fecha_de_Graduacion.split('T')[0]}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {infoValue.Perfil}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {infoValue.Direccion_Area_de_rotacion_actual}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {infoValue.Encargado_actual}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}
