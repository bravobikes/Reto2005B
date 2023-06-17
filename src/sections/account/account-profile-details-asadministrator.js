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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(registerEmployeeUrl, { username, password, name, age, city });
      console.log("PostRegister handle submit");
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
          subheader="Ingrese la información del Trainee"
          title="Agregar nuevo Trainee"
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
                  helperText="Ingrese nombre de usuario"
                  label="Nombre de usuario"
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
                  type='password'
                  label="Contraseña"
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
                  label="Nombre"
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
                  label="Edad"
                  name="age"
                  type='number'
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
                  label="Ciudad"
                  name="city"
                  onChange={(e) => setCity(e.target.value)}
                  required
                  value={city}
                />
              </Grid>
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
