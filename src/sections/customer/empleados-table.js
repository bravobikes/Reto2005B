import PropTypes from 'prop-types';
import {useState} from 'react';
import {Button} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import { format } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import {
  Avatar,
  Box,
  Card,
  Dialog,
  DialogTitle,
  DialogActions,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
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
  const [open, setOpen] = useState(false);
  function handleDelAlert() {
    setOpen(true);
  }
  function handleRemove() {
    // aqui poner la logica para borrar el trainee de la base de datos
    setOpen(false);
  }

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
                    <TableCell sx={{minWidth:150}}>
                      {/* aqui poner los botones de editar y eso */}
                      {/* pioner 3 icon buttons para ver, editar y borrar */}
                      {/* onClick={() => props.toggleEdit(index)}  */}
                      <IconButton aria-label="delete" size="small" style={{fontSize:"0.8em"}}>
                        <VisibilityIcon/>
                      </IconButton>
                      
                      <Link href={`detalles_empleado?id=${employee.ID_CET}`} passHref>
                        <IconButton size="small" aria-label="Edit" theme={theme} color="primary" style={{fontSize:"0.8em",color: 'black', fontWeight:'600', borderRadius:'0.6em', textTransform:"none"}} variant="contained"><EditIcon/></IconButton>
                      </Link>
                      <IconButton size="small" aria-label="delete" style={{fontSize:"0.8em"}} onClick={handleDelAlert}>
                        <DeleteIcon/>
                      </IconButton>
                      
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
      <Dialog open={open} onClose = {handleRemove} aria-labelledby="borrar" aria-describedby="boton para borrar">
                        <DialogTitle>
                          Estas seguro que quieres eliminar al trainee?
                        </DialogTitle>
                        <DialogActions>
                          <Button onClick={handleRemove}>Eliminar</Button>
                        </DialogActions>
                      </Dialog>
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
