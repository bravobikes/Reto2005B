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
  // const [values, setValues] = useState({
  //   firstName: 'Anika',
  //   lastName: 'Visser',
  //   email: 'demo@devias.io',
  //   phone: '',
  //   state: 'los-angeles',
  //   country: 'USA'
  // });
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
          // subheader="The information can be "
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
                  // helperText="Please specify the first name"
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
              {/* <Grid
                xs={12}
                md={6}
              >
                <TextField
                  disabled={true}
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  disabled={true}
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  disabled={true}
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  disabled={true}
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  disabled={true}
                  onChange={handleChange}
                  required
                  value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  disabled={true}
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid> */}
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          {/* <Button variant="contained">
            Save details
          </Button> */}
        </CardActions>
      </Card>
    </form>
  );
};
