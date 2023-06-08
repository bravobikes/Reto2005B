import { useCallback, useState } from 'react';
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

  const registerEmployeeUrl = 'http://localhost:5000/registeremployee';

  // const [values, setValues] = useState({
  //   firstName: 'Anika',
  //   lastName: 'Visser',
  //   email: 'demo@devias.io',
  //   phone: '',
  //   state: 'los-angeles',
  //   country: 'USA'
  // });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  // const handleSubmit = useCallback(
  //   (event) => {
  //     event.preventDefault();
  //   },
  //   []
  // );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(`username: ${username}, password:${password}`);
    // console.log(`username: ${username}, password: ${password}, name: ${name}, age: ${age}, city: ${city}`);

    try {
        // Send a POST request to the server with the registration data
      const response = await axios.post(registerEmployeeUrl, { username, password, name, age, city });
      console.log("PostRegister handle submit");
    // Handle the response
    if (response.status === 200) {
      setMessage('Registration successful');
    } else {
      setMessage('Registration failed');
    }
  } catch (error) {
    console.error('Error registering user:', error);
    setMessage('Error registering user');
  }
};

  return (
    <div>
      <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
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
                  helperText="Please specify the Username"
                  label="Username"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  value={username}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  value={password}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="Name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  onChange={(e) => setAge(e.target.value)}
                  required
                  value={age}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  onChange={(e) => setCity(e.target.value)}
                  required
                  value={city}
                />
              </Grid>
              {/* <Grid
                xs={12}
                md={6}
              >
                <TextField
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
          <Button type='submit' variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
    {message && <p>{message}</p>}
    </div>
    
    
  );
};
