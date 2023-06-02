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
                const isSelected = selected.includes(customer.id);
                // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={customer.id}
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
                          {getInitials(customer.nomAp)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {customer.nomAp}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.fechNac}
                    </TableCell>
                    <TableCell>
                      {customer.Estado}, {customer.pais}
                    </TableCell>
                    <TableCell>
                      {customer.user}
                    </TableCell>
                    <TableCell>
                      {customer.cursosTomados}
                    </TableCell>
                    <TableCell>
                      {customer.Managerial.toString()}
                    </TableCell>
                    <TableCell>
                      {/* aqui poner los botones de editar y eso */}
                      <Button color="success" onClick={() => props.toggle(index)} style={{marginRight:"1em"}} variant="contained">View</Button><Button theme={theme} color="primary" style={{marginRight: "1em", color: 'white', fontWeight:'600', borderRadius:'0.6em', padding:"0.5em", textTransform:"none"}} variant="contained">Edit</Button><Button color="error" variant="contained">Delete</Button>
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
