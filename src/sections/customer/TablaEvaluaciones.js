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
export default function TablaEvaluacion(props) {
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
    return (<Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                
                <TableCell>
                  Nombre y Apellido
                </TableCell>
                <TableCell>
                  Ultima Calificacion
                </TableCell>
                <TableCell>
                  Ultimo Potencial
                </TableCell>
                <TableCell>
                  En Rotacion
                </TableCell>
                <TableCell>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                
                  <TableRow
                //   hover
                //   key={employee.ID_CET}
                //   selected={isSelected}
                  >
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        {/* tambien agregar el avatar */}
                        {/* <Avatar src={employee.avatar}> */}
                          {/* {getInitials(employee.nomAp)} */}
                          {/* {getInitials(employee.nombre + ' ' + employee.apellidoPat)}
                        </Avatar> */}
                        <Typography variant="subtitle2">
                          {/* {employee.nomAp} */}
                          {/* {employee.nombre + ' ' + employee.apellidoPat} */}
                          Sebastian Ramirez
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {/* {employee.fechNac.split('T')[0]} */}
                    </TableCell>
                    <TableCell>
                      {/* {employee.estado}, {employee.pais} */}
                    </TableCell>
                    <TableCell>
                      {/* {employee.posAct} */}
                    </TableCell>
                    {/* <TableCell> */}
                      {/* {employee.cursosTomados} */}
                      {/* {employee.descTitulo} */}
                    {/* </TableCell> */}
                    {/* <TableCell> */}
                      {/* {employee.Managerial.toString()} */}
                      {/* {employee.isManager ? 'Administrador' : 'Trainee'} */}
                    {/* </TableCell> */}
                    <TableCell sx={{minWidth:150}}>
                      {/* aqui poner los botones de editar y eso */}
                      {/* pioner 3 icon buttons para ver, editar y borrar */}
                      {/* onClick={() => props.toggleEdit(index)}  */}
                      <IconButton aria-label="delete" size="small" style={{fontSize:"0.8em"}}>
                        <VisibilityIcon/>
                      </IconButton>
                      {/* <Link href={`detalles_empleado?id=${employee.ID_CET}`} passHref> */}
                        <IconButton size="small" aria-label="Edit" theme={theme} color="primary" style={{fontSize:"0.8em",color: 'black', fontWeight:'600', borderRadius:'0.6em', textTransform:"none"}} variant="contained"><EditIcon/></IconButton>
                      {/* </Link> */}
                      <IconButton size="small" aria-label="delete" style={{fontSize:"0.8em"}}>
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {/* closing tag del map */}
              {/* })} */}
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
    </Card>);
}