import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Grid,
    Typography
  } from '@mui/material';
  import { useCallback, useState, useEffect } from 'react';
  import axios from 'axios';
  
  
  const user = {
    avatar: '/assets/avatars/avatar-anika-visser.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Anika Visser',
    timezone: 'GTM-7'
  };
  
  
  export const ProfileRotaciones = () => {
    const id = localStorage.getItem('sessionUser');
    

    const getPerfilEmpleado = `http://localhost:5000/getPerfilEmpleado/${id}`;
    const getHistoricoUrl = `http://localhost:5000/getHistoricoTrainee/${id}`;


    const [perfilEmpleado, setPerfilEmpleado] = useState([]);
    const [rotaciones, setRotaciones] = useState([]);
    const [ultimaRotacion, setUltimaRotacion] = useState([]);

  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          // Make a request to the server to fetch the user profile
          const perfilEmpleadoResp = await axios.get(getPerfilEmpleado);
          const historicoEmpleadoResp = await axios.get(getHistoricoUrl);
          setPerfilEmpleado(perfilEmpleadoResp.data)
          setRotaciones(historicoEmpleadoResp.data);
          setUltimaRotacion(historicoEmpleadoResp.data[historicoEmpleadoResp.data.length - 1])
          console.log(ultimaRotacion);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
  
      fetchProfile();

    }, []);
    
    return(
      <Card sx={{width: "100%"}}>
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
                // alomejor cambiar height conforme cambia tamaño de pantalla
                height: 170,
                mb: 2,
                width: "100%",
                borderRadius:"1em",
                marginTop:0
              }}
            />
            <Typography
              gutterBottom
              variant="h5"
            >
              {/* {user.name} */}
              {/* {data.Name} */}
              {perfilEmpleado.nombre}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {/* {user.city} {user.country} */}
              {/* {data.City} */}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {/* {user.timezone} */}
              {perfilEmpleado['Direccion/ Area de rotacion actual']}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{marginTop: "3%"}}>
          {/* aqui poner el precio y comprar maybe, ene sta fila al menos */}
            <Grid container alignItems="center" justifyContent="space-between" flexDirection="row" color={ ultimaRotacion.enRotacion ? 'green' : 'red'}>
            {/* <Grid container alignItems="center" justifyContent="space-between" flexDirection="row"> */}
                <Grid item xs={1} style={{ fontSize: "2em", paddingBottom:"0.3rem"}}>
                    &#8226;
                </Grid>
                <Grid item xs={11}>
                { ultimaRotacion.enRotacion ? 'En Rotación' : 'Sin Rotación'}
                </Grid>
            </Grid>
          
        </CardActions>
      </Card>
    );
  }
  