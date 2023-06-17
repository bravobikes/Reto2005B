import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import { NotifPopover } from './notif-popover';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();
  const notifPopover = usePopover();
  const getEmpleadoUrl = 'http://localhost:5000/getEmpleado/';
  const getSessionUserUrl = 'http://localhost:5000/getSessionUser';
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const fetchProfile = async () => {
      try {
       
        const sessionUser = localStorage.getItem('sessionUser');
        const response = await axios.get(getEmpleadoUrl + sessionUser, {credentials: 'include'});
        const data = response.data;

        setData(data);
        setIsLoading(false);
        
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: 'neutral.50',
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
            
            <div></div>
            {isLoading ? (
              <div>Loading...</div> 
            ) : (
            <h3>{data.nombre + " " + data.apellidoPat}</h3>
            )}
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Tooltip title="Notifications">

              <IconButton
                onClick={notifPopover.handleOpen}
                ref={notifPopover.anchorRef}
                sx={{
                  cursos:"pointer",
                  height:40,
                  width:40
                }}
              >
                <Badge
                  badgeContent={4}
                  color="success"
                  variant="dot"
                >
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src="/assets/avatars/avatar-anika-visser.png"
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
      <NotifPopover
        anchorEl={notifPopover.anchorRef.current}
        open={notifPopover.open}
        onClose={notifPopover.handleClose}
      />

    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};
