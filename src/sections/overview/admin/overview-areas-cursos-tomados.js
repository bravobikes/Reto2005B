import PropTypes from 'prop-types';
import ComputerDesktopIcon from '@heroicons/react/24/solid/ComputerDesktopIcon';
import DeviceTabletIcon from '@heroicons/react/24/solid/DeviceTabletIcon';
import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  Grid,
  Typography,
  useTheme
} from '@mui/material';
import { Chart } from 'src/components/chart';

const useChartOptions = (labels) => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent'
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main
    ],
    dataLabels: {
      enabled: false
    },
    labels,
    legend: {
      show: false
    },
    plotOptions: {
      pie: {
        expandOnClick: false
      }
    },
    states: {
      active: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      fillSeriesColor: false
    }
  };
};

const iconMap = {
  RH: (
    <SvgIcon>
      <ComputerDesktopIcon />
    </SvgIcon>
  ),
  Portal: (
    <SvgIcon>
      <DeviceTabletIcon />
    </SvgIcon>
  ),
  Integridad: (
    <SvgIcon>
      <PhoneIcon />
    </SvgIcon>
  )
};

export const OverviewTraffic = (props) => {
  const { chartSeries, labels, sx } = props;
  const chartOptions = useChartOptions(labels);

  return (
    <Card sx={sx}>
      <CardHeader title="Remuneración"/>
      <CardContent>
        <Grid container flexDirection="column" spacing={2} style={{}}>
          <Grid item sx={{width:"70%", marginLeft:"20%"}}>
                <img src="/favicon-16x16.png" style={{width:"100%"}}/>
          </Grid>
          <Grid item>
            {/* Nombre */}
            <span style={{fontWeight:"600", fontSize:"1.5em"}}>Encuadre:</span>
          </Grid>
          <Grid item>
            <span style={{color:"grey"}}>GT1</span>
          </Grid>
          <Grid item>
            <span style={{fontWeight:"600"}}>Sueldo actual:</span>
          </Grid>
          <Grid item>
            <span style={{fontWeight:"600", color:"green"}}>$24,000</span>
          </Grid>
          <Grid item>
            <span style={{fontWeight:"600"}}>Proximo adelanto PTU: </span>
          </Grid>
          <Grid item>
            <span style={{fontWeight:"600", color:"green"}}>08/23/2032</span>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

OverviewTraffic.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object
};
