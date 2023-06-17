import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GradingIcon from '@mui/icons-material/Grading';
import { SvgIcon } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import SchoolIcon from '@mui/icons-material/School';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';



export const itemsAdmin = [
  {
    title: 'Tablero',
    path: '/admin/tablero',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Administración',
    path: '/admin/administracion',
    icon: (
      <SvgIcon fontSize="small">
        <AdminPanelSettingsIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Cursos',
    path: '/admin/courses',
    icon: (
      <SvgIcon fontSize="small">
        <SchoolIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Evaluaciones',
    path: '/admin/evaluaciones',
    icon: (
      <SvgIcon fontSize="small">
        <GradingIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Videojuego',
    path: '/admin/videojuego',
    icon: (
      <SvgIcon fontSize="small">
        <SportsEsportsIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Ajustes',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  }
];

export const itemsTrainee = [
  {
    title: 'Tablero',
    path: '/trainee/tablero-trainee',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Perfil',
    path: '/trainee/profile-astrainee',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Cursos',
    path: '/trainee/courses',
    icon: (
      <SvgIcon fontSize="small">
        <SchoolIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Historico',
    path: '/trainee/rotacionesTrainee',
    icon: (
      <SvgIcon fontSize="small">
        <HistoryIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Videojuego',
    path: '/trainee/videojuego',
    icon: (
      <SvgIcon fontSize="small">
        <SportsEsportsIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Ajustes',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  }
];
