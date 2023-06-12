import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/cursos-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { EmpleadosTable } from 'src/sections/customer/empleados-table';
import Ver from 'src/sections/customer/Ver';
import Edit from 'src/sections/customer/Edit';
import {v4 as uuid} from 'uuid';
import axios from 'axios';


const useEmployees = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};

const useEmployeeIds = (employees) => {
  return useMemo(() => {
    return employees.map((employee) => employee.ID_CET);
  }, [employees]);
};


const Page = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const employees = useEmployees(data, page, rowsPerPage);
  const employeesIds = useEmployeeIds(employees);
  const employeesSelection = useSelection(employeesIds);

  const [isLoading, setIsLoading] = useState(true);

  const getPeopleUrl = 'http://localhost:5000/getpeople';
  const getEmpleadosUrl = 'http://localhost:5000/getempleados';


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
        const response = await axios.get(getEmpleadosUrl);
        // console.log('API response:', response);
        // console.log('API data:', response.data);
  
        setData(response.data);
        // console.log('After setData:', data);
  
        setIsLoading(false); // Update loading state
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

  return (
    <>
      <Head>
        <title>
          Administración | Portal Ternium
        </title>
      </Head>
      {show && <Ver user={selectedUser} close={renderView} />}
      {showEdit && <Edit user={selectedUser} close={renderView} />}
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
                Administración
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
                  Botón
                </Button>
              </div>
            </Stack>
            <CustomersSearch />
            {isLoading ? (
              <div>Loading...</div> // Replace this with your desired loading indicator
            ) : (
              <EmpleadosTable 
                toggle={renderView}
                toggleEdit={renderEdit}
                count={data.length}
                items={employees}
                onDeselectAll={employeesSelection.handleDeselectAll}
                onDeselectOne={employeesSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={employeesSelection.handleSelectAll}
                onSelectOne={employeesSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={employeesSelection.selected}
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
