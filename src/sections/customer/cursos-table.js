import React, { useState, useEffect } from 'react';
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
import { Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(1,104,138)',
      contrastText: 'rgb(7,84,110)'
    }
  }
});

const Popup = ({ content, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Prevent scrolling on the background content
    return () => {
      document.body.style.overflow = 'auto'; // Restore scrolling when the pop-up is closed
    };
  }, []);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
          opacity: 1,
          transition: 'opacity 0.3s ease'
        }}
        onClick={onClose}
      ></div>
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '2em',
          borderRadius: '0.6em',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
          opacity: 1,
          transform: 'translate(-50%, -50%) scale(1)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <button
          style={{
            alignSelf: 'flex-end',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer'
          }}
          onClick={onClose}
        >
          <img
            src='/assets/icone-x-grise.png'
            alt="Close"
            style={{ width: '20px', height: '20px' }}
          />
        </button>
        <h3>{content.text}</h3>
        <img src={content.image} alt="Pop-up Image" />
      </div>
    </>
  );
};

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

  const selectedSome = selected.length > 0 && selected.length < courses.length;
  const selectedAll = courses.length > 0 && selected.length === courses.length;

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({});

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
                <TableCell>Curso</TableCell>
                <TableCell>Encuadre</TableCell>
                <TableCell>Modalidad</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Más info</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => {
                const isSelected = selected.includes(course.cursoId);

                return (
                  <TableRow hover key={course.cursoId} selected={isSelected}>
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
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">
                          {course.nombreCurso}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{course.encuadre}</TableCell>
                    <TableCell>{course.modalidad}</TableCell>
                    <TableCell>{course.fecha.split('T')[0]}</TableCell>
                    <TableCell>
                      <Button
                      class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-11dum7h-MuiButtonBase-root-MuiButton-root"
                        variant="contained"
                        onClick={() => {
                          setPopupContent({
                            text: 'Este espacio es para poner la descripción del curso.',
                            image: '/assets/Ternium-produjo-su-primer-rollo-del-nuevo-Laminador-en-Caliente-el-pasado-15-de-mayo-1.jpg'
                          });
                          setPopupOpen(true);
                        }}
                      >
                        Más info
                        <span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
                      </Button>
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
      {isPopupOpen && (
        <Popup content={popupContent} onClose={() => setPopupOpen(false)} />
      )}
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
