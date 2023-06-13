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
import Link from 'next/link';
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
                  Posición actual
                </TableCell>
                <TableCell>
                  Título
                </TableCell>
                <TableCell>
                  Puesto
                </TableCell>
                <TableCell>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {/* items es el arreglo de objetos employee */}
              {items.map((employee, index) => {
                const isSelected = selected.includes(employee.ID_CET);
                // const createdAt = format(employee.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                  hover
                  key={employee.ID_CET}
                  selected={isSelected}
                  >
                    {/* cambiar esto para el tipo de objeto que yo quiero */}
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={employee.avatar}>
                          {/* {getInitials(employee.nomAp)} */}
                          {getInitials(employee.nombre + ' ' + employee.apellidoPat)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {/* {employee.nomAp} */}
                          {employee.nombre + ' ' + employee.apellidoPat}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {employee.fechNac.split('T')[0]}
                    </TableCell>
                    <TableCell>
                      {employee.estado}, {employee.pais}
                    </TableCell>
                    <TableCell>
                      {employee.posAct}
                    </TableCell>
                    <TableCell>
                      {/* {employee.cursosTomados} */}
                      {employee.descTitulo}
                    </TableCell>
                    <TableCell>
                      {/* {employee.Managerial.toString()} */}
                      {employee.isManager ? 'Administrador' : 'Trainee'}
                    </TableCell>
                    <TableCell>
                      {/* aqui poner los botones de editar y eso */}
                      <Link href={`detalles_empleado?id=${employee.ID_CET}`} passHref>
                        <Button theme={theme} onClick={() => props.toggleEdit(index)} color="primary" style={{marginRight: "1em", color: 'white', fontWeight:'600', borderRadius:'0.6em', padding:"0.5em", textTransform:"none"}} variant="contained">Detalles</Button>
                      </Link>
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
