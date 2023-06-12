import PropTypes from 'prop-types';
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
import {Button} from '@mui/material';
import {createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
      primary: {
          main: 'rgb(1,104,138)',
          contrastText: 'rgb(7,84,110)'
      }
  }
})

export const CoursesTable = (props) => {
  const {
    count = 0,
    courses = [],
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

  const selectedSome = (selected.length > 0) && (selected.length < courses.length);
  const selectedAll = (courses.length > 0) && (selected.length === courses.length);
  // console.log(courses);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Curso
                </TableCell>
                <TableCell>
                  Encuadre
                </TableCell>
                <TableCell>
                  Modalidad
                </TableCell>
                <TableCell>
                  Fecha
                </TableCell>
                <TableCell>
                  Más info
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => {
                const isSelected = selected.includes(course.cursoId);
                // const createdAt = format(course.fecha, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={course.cursoId}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(course.cursoId);
                          } else {
                            onDeselectOne?.(course.cursoId);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        {/* <Avatar src={course.avatar}>
                          {getInitials(course.name)}
                        </Avatar> */}
                        <Typography variant="subtitle2">
                          {course.nombreCurso}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {course.encuadre}
                    </TableCell>
                    <TableCell>
                      {/* {course.address.city}, {course.address.state}, {course.address.country} */}
                      {course.modalidad}
                    </TableCell>
                    <TableCell>
                      {course.fecha.split('T')[0]}
                    </TableCell>
                    <TableCell>
                      {/* aqui poner los botones de editar y eso */}
                      <Button theme={theme} color="primary" style={{marginRight: "1em", color: 'white', fontWeight:'600', borderRadius:'0.6em', padding:"0.5em", textTransform:"none"}} variant="contained">Más info</Button>
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

CoursesTable.propTypes = {
  count: PropTypes.number,
  courses: PropTypes.array,
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
