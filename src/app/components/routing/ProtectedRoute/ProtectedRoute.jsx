import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { routes } from 'app/config/routing';
import useAuthContext from 'app/contexts/AuthContext';

const propTypes = {
  Component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

const defaultProps = {
  exact: false,
};

const ProtectedRoute = ({ Component, path, exact }) => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();
  const isNotAuthenticated = !isAuthenticated;

  if (isNotAuthenticated) {
    return (
      <Redirect
        state={ {
          from: location,
        } }
        to={ routes.home.path }
      />
    );
  }

  if (isAuthenticated) {
    return (
      <Route
        component={ Component }
        exact={ exact }
        path={ path }
      />
    );
  }

  // Authenticated state is undefined
  return null;
};

ProtectedRoute.propTypes = propTypes;
ProtectedRoute.defaultProps = defaultProps;

export default ProtectedRoute;
