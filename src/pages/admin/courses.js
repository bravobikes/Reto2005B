import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Select, MenuItem, Container, Stack, SvgIcon, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CoursesTable } from 'src/sections/customer/cursos-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import axios from 'axios';
import Link from 'next/link';



const useCourses = (data, page, rowsPerPage) => {
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return useMemo(() => data.slice(startIndex, endIndex), [data, page, rowsPerPage]);
};


const useCoursesIds = (courses) => {
  return useMemo(
    () => {
      return courses.map((course) => course.id);
    },
    [courses]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([]);
  const courses = useCourses(data, page, rowsPerPage);
  const coursesIds = useCoursesIds(courses);
  const coursesSelection = useSelection(coursesIds);

  const [isLoading, setIsLoading] = useState(true);

  const getCursosUrl = 'http://localhost:5000/getcursos';


  function renderView(index = null) {
    setSelectedUser(data[index])
    setShow(!show);
  }
  function renderEdit(index = null) {
    setSelectedUser(data[index])
    setShowEdit(!showEdit);
  }

  useEffect(() => {
    // console.log('Before fetch:', data);
  
    const fetchData = async () => {
      try {
        const response = await axios.get(getCursosUrl);
        setData(response.data); // Update state using the previous state
        console.log('After setData:', response.data);
        setIsLoading(false); // Update loading state
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Update loading state even if an error occurs
      }
    };
  
    fetchData();
  }, []);


  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  if (courses.length < 1) {
    return <p>Loading...</p>; // Add a loading state while the data is being fetched
  }


  return (
    <>
      <Head>
        <title>
          Courses | Portal Ternium
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Cursos
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Botón
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Botón
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Agregar curso
                </Button>
              </div>
            </Stack>
            <Grid item xs={6} sm={6} lg={6}>
              <p>Ingrese curso:</p>
              <Select
                // value="Ingrese Trainee"
                sx={{
                  width: '50%',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}
              >
                {data.map((curso, index) => (
                    <Link href={`detalles_curso?id=${curso.cursoId}`} passHref style={{ color: 'black', textDecoration: 'none' }}>
                      <MenuItem key={index} value={curso.cursoId}>
                          {`${curso.nombreCurso} -  ${curso.fecha.split('T')[0]}`}
                      </MenuItem>
                    </Link>
                ))}
              </Select>
            </Grid>            {isLoading ? (
              <div>Loading...</div> // Replace this with your desired loading indicator
            ) : (
              <CoursesTable
                count={data.length}
                courses={courses}
                onDeselectAll={coursesSelection.handleDeselectAll}
                onDeselectOne={coursesSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={coursesSelection.handleSelectAll}
                onSelectOne={coursesSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={coursesSelection.selected}
              />
            )} 
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
