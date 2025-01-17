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
  
  
  export const TarjetaCompra = () => {
    
    const getEmployeeUrl = 'http://localhost:5000/getEmployee/';
    const deleteUrl = 'http://localhost:5000/deletepeople';
    const getSessionUserUrl = 'http://localhost:5000/getSessionUser';
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const sessionUserRes = await axios.get(getSessionUserUrl);
          const sessionUser = '1';
          const response = await axios.get(getEmployeeUrl + sessionUser, {credentials: 'include'});
          const data = response.data;
  
          console.log(response);
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
                height: 120,
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

              Nuevo Avatar
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >

            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              Desbloquea este avatar para tu perfil
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{marginTop: "3%"}}>
          <Grid container justifyContent="space-between" flexDirection="row" alignItems="center">
            <Grid item>
            <Grid container spacing={1} justifyContent="center" flexDirection="row">
                                <Grid item>
                                    <Grid container flexDirection="row" justifyContent="center" alignItems="center">
                                      <Grid item>
                                      <svg style={{marginTop:"0.1em"}} xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="gold" className="bi bi-coin" viewBox="0 0 16 16">
                                      <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
                                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                                      </svg>
                                      </Grid>
                                    </Grid>
                                    
                                </Grid>
                                <Grid item style={{fontSize:"1.25em"}}>
                                    
                                    <Grid container flexDirection="row" justifyContent="flex-start" alignItems="flex-start">
                                      <Grid item>
                                        13
                                      </Grid>
                                    </Grid>

                                </Grid>
                                
                            </Grid>
            </Grid>
            
            <Grid item spacing={1}>
              <Button variant="contained" size="small">Comprar</Button>
            </Grid>
          </Grid>
          
        </CardActions>
      </Card>
    );
  }
  