import { useCallback, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import axios from 'axios';


const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  },
  {
    value: 'los-angeles',
    label: 'Los Angeles'
  }
];

export const AccountProfileDetails = () => {

  const getEmployeeUrl = 'http://localhost:5000/getEmployee/';
  const deleteUrl = 'http://localhost:5000/deletepeople';
  const getSessionUserUrl = 'http://localhost:5000/getSessionUser';
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const sessionUserRes = await axios.get(getSessionUserUrl);
        const sessionUserGet = sessionUserRes.data.user
        const sessionUser = '1';
        console.log(sessionUserGet);
        const response = await axios.get(getEmployeeUrl + sessionUser, {credentials: 'include'});
        const data = response.data;

        console.log(response);
        setData(data);
        
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          title="Perfil"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  disabled={true}
                  label={data.Name}
                  name="name"
                  // required
                  // value={data.Name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  disabled={true}
                  label={data.Age}
                  name="age"
                  type='number'
                  // required
                  // value={data.Age}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  disabled={true}
                  // label="City"
                  label={data.City}
                  name="city"
                  // required
                  // value={data.City}
                />
              </Grid>
              
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
        </CardActions>
      </Card>
    </form>
  );
};
