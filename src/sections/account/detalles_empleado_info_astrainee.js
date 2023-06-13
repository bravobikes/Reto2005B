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
            {/* {formValue.} */}
            *Encuadre Actual*
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {/* {formValue.} */}
            *Fecha de graduacion*
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {/* {formValue.} */}
            *Perfil*
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {/* {formValue.} */}
            *Direccion/Area de rotacion actual*
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {/* {formValue.} */}
            *Jefe actual*
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
