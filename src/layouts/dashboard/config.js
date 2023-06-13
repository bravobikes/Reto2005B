import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';



export const itemsAdmin = [
  {
    title: 'Tablero',
    path: '/tablero-admin',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    // creo que es lo mismo que courses pero no quiero asumir asi que hice otro tab
    // title: 'Administración',
    title: 'Administración',
    path: '/administracionAdmin',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    // title: 'Courses',
    title: 'Cursos',
    path: '/courses',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    // title: 'Profile-administrator',
    title: 'Evaluaciones',
    path: '/evaluaciones',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    // title: 'Videogame',
    title: 'Videojuego',
    path: '/videojuego',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    // title: 'Settings',
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
    // title: 'Dashboard',
    title: 'Tablero',
    path: '/tablero-trainee',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    // title: 'Profile-employee',
    title: 'Perfil',
    path: '/profile-astrainee',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    // title: 'Courses',
    title: 'Cursos',
    path: '/trainee/courses',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    // creo que es lo mismo que courses pero no quiero asumir asi que hice otro tab
    // title: 'Administración',
    title: 'Historico',
    path: '/rotacionesTrainee',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    // title: 'Videogame',
    title: 'Videojuego',
    path: '/videojuego',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    // title: 'Profile-administrator',
    title: 'Remuneracion',
    path: '/profile-asadministrator',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    // title: 'Settings',
    title: 'Ajustes',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  }
];
