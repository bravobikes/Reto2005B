import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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
    Rating,
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
export default function TablaEvaluacion(props) {
  const id = localStorage.getItem('sessionUser');


  const [rotaciones, setRotaciones] = useState([]);

  useEffect(() => {
    console.log(rotaciones);
    if (id) {
      fetchRotaciones();
    }
  }, [id]);

  const getRotaciones = `http://localhost:5000/getRotaciones`;


  const fetchRotaciones = async () => {
    try {
      const rotacionesResponse = await axios.get(getRotaciones);
      setRotaciones(rotacionesResponse.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  }; 


    const {
        count = 5,
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
                  Rotación
                </TableCell>
                <TableCell>
                  Fecha
                </TableCell>
                <TableCell>
                  Calificación
                </TableCell>
                <TableCell>
                  Potencial
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rotaciones.map((rotacion, index) => (
                <TableRow key={index}>
                  <TableCell>{rotacion.nombre} {rotacion.apellidoPat}</TableCell>
                  <TableCell>{rotacion.ID_CET}</TableCell>
                  <TableCell>{rotacion.fechaRot.split('T')[0]}</TableCell>
                  <TableCell>{rotacion.calificacion}</TableCell> 
                  <TableCell>{rotacion.potencialCalif}</TableCell> 
                  <TableCell>
                    {/* Delete icon */}
                    <IconButton onClick={() => handleDelete(rotacion.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
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