import React from 'react';
/* import { useHistory, useLocation } from 'react-router-dom'; */
import classnames from 'classnames';
import PropTypes from 'prop-types';

/* import routingConfig from 'app/config/routing';
import useAuthContext from 'app/contexts/AuthContext'; */
import AppContent from '../AppContent';
import AppHeader from '../AppHeader';
import { useTranslations } from '../hooks';

import styles from './AppLayout.module.scss';

const propTypes = {
  className: PropTypes.string,
  defaultRoute: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }),
  id: PropTypes.string,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  onChangeLanguage: PropTypes.func,
};

const defaultProps = {
  className: '',
  id: undefined,
  routes: [],
  onChangeLanguage: () => {},
  defaultRoute: {},
};

// const PUBLIC_ROUTES = Object.values(routingConfig.publicRoutes);

const AppLayout = ({
  className,
  id,
  routes: routesProp,
  onChangeLanguage,
  defaultRoute,
}) => {
/*   const location = useLocation();
  const history = useHistory();
  const { isAuthenticated } = useAuthContext(); */
  const { language, switchLanguage } = useTranslations();
  const changeLanguage = onChangeLanguage || switchLanguage;
  const showContent = routesProp.length > 0;
  // const isPublicRoute = PUBLIC_ROUTES.includes(location?.pathname);

  /*   useEffect(() => {
    // Redirect to the default route if the user is authenticated and is on a protected route
    if (isPublicRoute && isAuthenticated) {
      history.push(defaultRoute.path);
    }
  }, [history, isPublicRoute, isAuthenticated, defaultRoute]); */

  const appLayoutClassNames = classnames(styles.AppLayout, className);

  return (
    <div className={ appLayoutClassNames } id={ id }>
      <AppHeader language={ language } onChangeLanguage={ changeLanguage } />
      <div className={ styles.Container }>
        {showContent && (
          <AppContent
            className={ styles.AppContent }
            redirectPath={ defaultRoute?.path }
            routes={ routesProp }
          />
        )}
      </div>
    </div>
  );
};

AppLayout.propTypes = propTypes;
AppLayout.defaultProps = defaultProps;

export default AppLayout;
