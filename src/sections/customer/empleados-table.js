import PropTypes from 'prop-types';
import {useState} from 'react';
import {Button} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(1,104,138)',
            contrastText: 'rgb(7,84,110)'
        }
    }
})

export const EmpleadosTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;


  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                
                <TableCell>
                  Nombre y Apellido
                </TableCell>
                <TableCell>
                  Fecha de nacimiento
                </TableCell>
                <TableCell>
                  pais y estado
                </TableCell>
                <TableCell>
                  user
                </TableCell>
                <TableCell>
                  cursos tomados
                </TableCell>
                <TableCell>
                  Managerial
                </TableCell>
                <TableCell>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {/* items es el arreglo de objetos customer */}
              {items.map((customer, index) => {
                const isSelected = selected.includes(customer.Id);
                // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={customer.Id}
                    selected={isSelected}
                  >
                    {/* cambiar esto para el tipo de objeto que yo quiero */}
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={customer.avatar}>
                          {/* {getInitials(customer.nomAp)} */}
                          {getInitials(customer.Name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {/* {customer.nomAp} */}
                          {customer.Name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.Id}
                    </TableCell>
                    <TableCell>
                      {/* {customer.City}, {customer.pais} */}
                      {customer.City}
                    </TableCell>
                    <TableCell>
                      {customer.Name}
                    </TableCell>
                    <TableCell>
                      {/* {customer.cursosTomados} */}
                      {customer.City}
                    </TableCell>
                    <TableCell>
                      {/* {customer.Managerial.toString()} */}
                      {customer.City}
                    </TableCell>
                    <TableCell>
                      {/* aqui poner los botones de editar y eso */}
                      <Button theme={theme} onClick={() => props.toggleEdit(index)} color="primary" style={{marginRight: "1em", color: 'white', fontWeight:'600', borderRadius:'0.6em', padding:"0.5em", textTransform:"none"}} variant="contained">Detalles</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

EmpleadosTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
