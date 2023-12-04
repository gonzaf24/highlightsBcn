import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { ProtectedRoute } from 'app/components/routing';

import styles from './AppContent.module.scss';

const propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    Component: PropTypes.elementType.isRequired,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    isProtected: PropTypes.bool,
  })).isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  redirectPath: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
  redirectPath: undefined,
};

const AppContent = ({
  routes, className, id, redirectPath,
}) => {
  const appContentClassNames = classnames(styles.AppContent, className);

  return (
    <div
      className={ appContentClassNames }
      id={ id }
    >
      <Switch>
        { routes.map(route => (route.isProtected ? (
          <ProtectedRoute
            key={ `route-${route.path}` }
            Component={ route.Component }
            exact
            path={ route.path }
          />
        ) : (
          <Route
            key={ `route-${route.path}` }
            component={ route.Component }
            exact
            path={ route.path }
          />
        )))}
        { redirectPath && <Redirect to={ redirectPath } /> }
      </Switch>
    </div>
  );
};

AppContent.propTypes = propTypes;
AppContent.defaultProps = defaultProps;

export default AppContent;
