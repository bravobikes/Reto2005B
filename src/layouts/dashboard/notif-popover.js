import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import Link from 'next/link'

export const NotifPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      localStorage.setItem('sessionUser', null);
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Notificaciones
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
            <div style={{color:"grey", textDecoration:"none"}}>Evaluaciones</div>
            <Link href='/trainee/rotacionesTrainee' passHref style={{textDecoration:"none"}}>
            Tienes una nueva evaluacion
            </Link>
          

        </Typography>
      </Box>
      <Divider />
     
    </Popover>
  );
};

NotifPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
