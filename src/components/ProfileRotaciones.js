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
    
    const getEmployeeUrl = 'http://localhost:5000/getEmployee/';
    const deleteUrl = 'http://localhost:5000/deletepeople';
    const getSessionUserUrl = 'http://localhost:5000/getSessionUser';
    const [data, setData] = useState([]);
    // Obtener el id el usuario de la sesion
    //id = ...
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          // Make a request to the server to fetch the user profile
          const sessionUserRes = await axios.get(getSessionUserUrl);
          // const sessionUser = sessionUserRes.data.user
          const sessionUser = '1';
          // console.log(sessionUser);
          const response = await axios.get(getEmployeeUrl + sessionUser, {credentials: 'include'});
          const data = response.data;
  
          console.log(response);
          // Set the user state with the retrieved profile data
          setData(data);
          
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
  
      fetchProfile();
      console.log(data);
    }, []);
    
    return(
      <Card sx={{width: "90%"}}>
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
              Nombre Usuario
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
              Posicion/área del trainee
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{marginTop: "3%"}}>
          {/* aqui poner el precio y comprar maybe, ene sta fila al menos */}
            <Grid container alignItems="center" justifyContent="space-between" flexDirection="row" style={{color:"green"}}>
                <Grid item xs={1} style={{ fontSize: "2em", paddingBottom:"0.3rem"}}>
                    &#8226;
                </Grid>
                <Grid item xs={11}>
                    En Rotación
                </Grid>
            </Grid>
          
        </CardActions>
      </Card>
    );
  }
  