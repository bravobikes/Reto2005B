import PropTypes from 'prop-types';
import {useState} from 'react';
import {Button} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import { format } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import {
  Avatar,
  Box,
  Card,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
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
import axios from 'axios';



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

  const deleteEmployeeUrl = "http://localhost:5000/deleteEmpleado/";

  const [open, setOpen] = useState(false);
  const [selectedEmployeeId, setselectedEmployeeId] = useState(null);
  const [message, setMessage] = useState('');
  const [refresh, setRefresh] = useState(false);

  const handleDelAlert = (employeeId) => {
    setselectedEmployeeId(employeeId);
    setOpen(true);
  };

  const handleDelete = async () => {
    if (selectedEmployeeId) {
      try {
        const response = await axios.delete(deleteEmployeeUrl + selectedEmployeeId);
        if (response.status === 200) {
          console.log('Employee deleted successfully:', selectedEmployeeId);
          setMessage("Empleado borrado exitosamente");
          setRefresh(!refresh);
        } else {
          console.error('Failed to delete employee:', selectedEmployeeId);
          setMessage("Error borrando empleado");
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
        setMessage("Error borrando empleado");
      } finally {
        setselectedEmployeeId(null);
      }
    }
  };

   function handleClose() {
    setMessage('')
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
              {items.map((employee, index) => {
                const isSelected = selected.includes(employee.ID_CET);

                return (
                  <TableRow
                  hover
                  key={employee.ID_CET}
                  selected={isSelected}
                  >
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
                    <TableCell sx={{minWidth:170}}>

                      
                      <Link href={`detalles_empleado?id=${employee.ID_CET}`} passHref>
                        <Button 
                          class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-11dum7h-MuiButtonBase-root-MuiButton-root"
                          variant="contained" 
                          size="small" 
                          style={{color:"white"}} 
                          sx={{borderRadius:"1em", padding:"5%", paddingRight:"10%", paddingLeft:"10%"}} 
                          theme={theme} color="primary">Detalles</Button>
                        {/* <IconButton size="small" aria-label="Edit" theme={theme} color="primary" style={{fontSize:"0.8em",color: 'black', fontWeight:'600', borderRadius:'0.6em', textTransform:"none"}} variant="contained"><EditIcon/></IconButton> */}
                      </Link>
                      <IconButton size="small" aria-label="delete" style={{fontSize:"0.8em"}} onClick={() => handleDelAlert(employee.ID_CET)}>
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
      <Dialog open={open} aria-labelledby="borrar" aria-describedby="boton para borrar">
        <DialogTitle>
          <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
            Estas seguro que quieres eliminar al trainee?
            <IconButton style={{ marginLeft: 'auto' }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Typography>
        </DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          {message && <p>{message}</p>}
          <Button onClick={handleDelete}>Eliminar</Button>
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
