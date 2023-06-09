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
  // const auth = useAuth();
  // const [method, setMethod] = useState('email');
  // const formik = useFormik({
  //   initialValues: {
  //     email: 'demo@ternium.mx',
  //     password: 'Password123!',
  //     submit: null
  //   },
  //   validationSchema: Yup.object({
  //     email: Yup
  //       .string()
  //       .email('Must be a valid email')
  //       .max(255)
  //       .required('Email is required'),
  //     password: Yup
  //       .string()
  //       .max(255)
  //       .required('Password is required')
  //   }),
  //   onSubmit: async (values, helpers) => {
  //     try {
  //       await auth.signIn(values.email, values.password);
  //       router.push('/');
  //     } catch (err) {
  //       helpers.setStatus({ success: false });
  //       helpers.setErrors({ submit: err.message });
  //       helpers.setSubmitting(false);
  //     }
  //   }
  // });

  // const handleMethodChange = useCallback(
  //   (event, value) => {
  //     setMethod(value);
  //   },
  //   []
  // );

  // const handleSkip = useCallback(
  //   () => {
  //     auth.skip();
  //     router.push('/');
  //   },
  //   [auth, router]
  // );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the server with the login data
      const response = await axios.post(loginUrl, { username, password });
      // Handle the response
      if (response.status === 200) {
        const sessionUserRes = await axios.get(getSessionUser);
        const sessionUser = sessionUserRes.data.user
        // setMessage('Login successful');
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
          backgroundColor: 'background.paper',
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
              <Typography variant="h4">
                Welcome!
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
              </Typography>
            </Stack>
            <Tabs
              // onChange={handleMethodChange}
              sx={{ mb: 3, mt: 10 }}
              // value={method}
            >
              <Tab
                label="Inicio de sesión"
                // value="email"
              />
            </Tabs>
            {/* {method === 'email' && ( */}
              <form
                noValidate
                // onSubmit={formik.handleSubmit}
                onSubmit={handleSubmit}
              >
                {/* <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack> */}
                <Stack spacing={3}>
                  <TextField
                    // error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    // helperText={formik.touched.email && formik.errors.email}
                    label="Usuario"
                    name="username"
                    // onBlur={formik.handleBlur}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    value={username}
                  />
                  <TextField
                    // error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    // helperText={formik.touched.password && formik.errors.password}
                    label="Contraseña"
                    name="password"
                    // onBlur={formik.handleBlur}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    value={password}
                  />
                </Stack>
                {/* {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )} */}
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
                <b>Prueba:</b> Usuario: test contraseña: 123
              </p>
            {/*  )} */}
          </div>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            padding: '8px',
            backgroundColor: 'white',
            borderRadius: '4px',
            zIndex: 1,
          }}
        >
          <img src="/assets/terniumLogo.png" alt="Logo" style={{ maxWidth: '100%' }} />
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
