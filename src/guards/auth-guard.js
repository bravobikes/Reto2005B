import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuthContext } from 'src/contexts/auth-context';
import axios from 'axios';

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const isUserAuthUrl = 'http://localhost:5000/isUserAuthenticated';

  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);
  const checkAuthentication = async () => {
    try {
      const response = await axios.get(isUserAuthUrl);
      return response.data;
    } catch (error) {
      console.error('Error authenticating:', error);
      return false;
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const authenticated = await checkAuthentication();
      if (isMounted) {
        setIsAuthenticated(authenticated);
        setIsAuthChecked(true);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    console.log(isAuthenticated);
    if (!isAuthenticated && isAuthChecked) {
      console.log('Not authenticated, redirecting');
        router
          .replace({
            pathname: '/auth/login',
            query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
          })
          .catch(console.error)
    }
  }, [router.isReady, isAuthenticated, isAuthChecked, router]);

  if (!checked) {
    return null;
  }

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
