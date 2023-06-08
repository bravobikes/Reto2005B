import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { EmpleadosTable } from 'src/sections/customer/empleados-table';
import Ver from 'src/sections/customer/Ver';
import {v4 as uuid} from 'uuid';
import axios from 'axios';

const now = new Date();


const ejemploObjeto = {
    // aqui item es data, data es el arreglo
    id: uuid(),
    // esto no sabria como aplicarlo con la base de datos la vdd por ahora solo lo pondre y ya
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    nomAp: "Sebastian Ramirez Cordero",
    // esto tal vez guardar como tipo de dato date para filtrar y asi
    fechNac: "08/09/2002",
    pais: "Mexico",
    Estado: "Nuevo Leon",
    lvl: 34,
    topScore: 250,
    user: "sebramirez",
    cursosTomados: 23,
    Managerial: false,
    cursos: [
        {nombreCurso: "Curso1", descripcion: "Es un curso que me invente como ejemplo y asi etc."},
        {nombreCurso: "Curso2", descripcion: "Es otro curso que me invente como ejemplo y asi etc."}
    ],
    unidad: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia sequi magnam voluptas blanditiis. Rerum hic vitae distinctio dolore quisquam optio id, ea, velit at modi aliquid possimus porro laboriosam iusto.",
    div: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia sequi magnam voluptas blanditiis. Rerum hic vitae distinctio dolore quisquam optio id, ea, velit at modi aliquid possimus porro laboriosam iusto.",
    perfil: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia sequi magnam voluptas blanditiis. Rerum hic vitae distinctio dolore quisquam optio id, ea, velit at modi aliquid possimus porro laboriosam iusto.",
    origenCand: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia sequi magnam voluptas blanditiis. Rerum hic vitae distinctio dolore quisquam optio id, ea, velit at modi aliquid possimus porro laboriosam iusto.",
    posIngreso: "Gerente idk",
    posActiva: "Regional Manager Dunder Mifflin",
    Clerical: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia sequi magnam voluptas blanditiis. Rerum hic vitae distinctio dolore quisquam optio id, ea, velit at modi aliquid possimus porro laboriosam iusto.",
    escuela: "Tec de Monterrey",
    descTitulo: "ITC ingeniero bla bla bla",
    grad: false,
    esp: "No se que es Type",
    Estruc3: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia sequi magnam voluptas blanditiis. Rerum hic vitae distinctio dolore quisquam optio id, ea, velit at modi aliquid possimus porro laboriosam iusto.",
    Estruc4: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia sequi magnam voluptas blanditiis. Rerum hic vitae distinctio dolore quisquam optio id, ea, velit at modi aliquid possimus porro laboriosam iusto.",
    Estruc5: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia sequi magnam voluptas blanditiis. Rerum hic vitae distinctio dolore quisquam optio id, ea, velit at modi aliquid possimus porro laboriosam iusto.",
    rot: false,
    cantRot: 34
}
// const data = [];
// data.push({...ejemploObjeto, id: uuid()});
// data.push({...ejemploObjeto, id: uuid()});
// data.push({...ejemploObjeto, id: uuid()});
// data.push({...ejemploObjeto, id: uuid()});
// data.push({...ejemploObjeto, id: uuid()});
// data.push({...ejemploObjeto, id: uuid()});
// data.push({...ejemploObjeto, id: uuid()});
// data.push({...ejemploObjeto, id: uuid()});
// data.push({...ejemploObjeto, id: uuid()});
// data.push({...ejemploObjeto, id: uuid()});
// data.push({...ejemploObjeto, id: uuid()});
// data.push({...ejemploObjeto, id: uuid()});
// data.push({...ejemploObjeto, id: uuid()});
// data.push({...ejemploObjeto, id: uuid()});
// data.push({...ejemploObjeto, id: uuid()});
// data.push({...ejemploObjeto, id: uuid()});


const useCustomers = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const customers = useCustomers(data, page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const getPeopleUrl = 'http://localhost:5000/getpeople';
  const deleteUrl = 'http://localhost:5000/deletepeople';


  function renderView(index = null) {
    setSelectedUser(data[index])
    setShow(!show);
  }

  useEffect(() => {
    
    
    axios.get(getPeopleUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, []);


  const handlePageChange = useCallback(
    (event, value) => {
      console.log()
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



  const deletePerson = (id) => {
    axios.delete(`${deleteUrl}/${id}`)
      .then(() => {
        setData(data.filter(item => item.Id !== id));
      })
      .catch((error) => {
        console.error('Error deleting person:', error);
      });
    };

  return (
    <>
      <Head>
        <title>
          Admin | Portal Ternium
        </title>
      </Head>
      {show && <Ver user={selectedUser} close={renderView} />}
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
                  Administracion
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
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
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
                  Add
                </Button>
              </div>
            </Stack>
            <CustomersSearch />
            <EmpleadosTable 
                toggle={renderView}
                count={data.length}
                items={customers}
                onDeselectAll={customersSelection.handleDeselectAll}
                onDeselectOne={customersSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={customersSelection.handleSelectAll}
                onSelectOne={customersSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={customersSelection.selected}
            />

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
