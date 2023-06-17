import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import axios from 'axios';



const Page = () => {
  const loginUrl = 'http://localhost:5000/login';
  const getSessionUser = 'http://localhost:5000/getSessionUser';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  axios.defaults.withCredentials = true;

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(loginUrl, { username, password });
      if (response.status === 200) {
        const sessionUserRes = await axios.get(getSessionUser);
        const sessionUser = sessionUserRes.data.user
        localStorage.setItem('sessionUser', sessionUser);
        setMessage('Bienvenidx!!');
        router.push('/');
        // navigateTo(`/perfil/${sessionUser}`);
      } else {
        // setMessage('Login failed');
        setMessage('Usuario/contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // setMessage('Error logging in');
      setMessage('Usuario/contraseña incorrectos');
    }
  };

  return (
    <>
      <Head>
        <title>
          Inicio de sesión | Ternium
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: '00FFFFFF',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography
                color="text.secondary"
                variant="body2"
              >
              </Typography>
            </Stack>
            <Tabs
              sx={{ mb: 3, mt: 10 }}
            >
              <Tab
                label="Inicio de sesión"
              />
            </Tabs>
              <form
                noValidate
                onSubmit={handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Usuario"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    value={username}
                  />
                  <TextField
                    fullWidth
                    label="Contraseña"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    value={password}
                  />
                </Stack>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Ingresar
                </Button>
              </form>
              {message && <p>{message}</p>}
              <p>
                <b>Prueba:</b> Usuario (admin): <u>gameUser1</u> contraseña: <u>123</u>
              </p>
              <p>
                <b>Prueba:</b> Usuario(trainee): <u>gameUser2</u> contraseña: <u>123</u>
              </p>
            {/*  )} */}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
