import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  // pending: 'warning',
  true: 'success',
  false: 'error'
};

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Cursos actuales" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Clave
                </TableCell>
                <TableCell>
                  Curso
                </TableCell>
                <TableCell sortDirection="desc">
                  Fecha inicio
                </TableCell>
                <TableCell sortDirection="desc">
                  Fecha final
                </TableCell>
                <TableCell>
                  Estatus
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((curso) => {
                const createdAt = '22/09/2020'
                const endedAt = '22/09/2020'
                // const createdAt = format(curso.fecha.split('T')[0], 'dd/MM/yyyy');
                // const endedAt = format(curso.fecha.split('T')[0], 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={curso.userId}
                  >
                    <TableCell>
                      {curso.userId}
                    </TableCell>
                    <TableCell>
                      {curso.nombreCurso}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      {endedAt}
                    </TableCell>
                    <TableCell>
                      {/* <SeverityPill color={statusMap[curso.estatus]}>
                        {curso.status}
                      </SeverityPill> */}
                      <SeverityPill color={curso.estatus ? 'success' : 'error'}>
                        {curso.estatus ? 'completado' : 'pendiente'}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          Ver todos
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
