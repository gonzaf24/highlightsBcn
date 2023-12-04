import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import config from 'app/config';
import { useTranslations } from 'app/hooks';

import styles from './AppSidebar.module.scss';

const propTypes = {
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  dataTestId: '',
  id: undefined,
};

const SIDEBAR_ROUTES = Object.values(config.routing.sidebarRoutes);

const AppSidebar = ({ className, dataTestId, id }) => {
  const { t } = useTranslations();

  const appSidebarClassNames = classnames(styles.AppSidebar, className);

  return (
    <div className={ appSidebarClassNames } data-testid={ dataTestId } id={ id }>
      {SIDEBAR_ROUTES?.map(
        route => !route.isDisabled && (
        <NavLink
          key={ route.path }
          activeClassName={ styles.ActiveLink }
          className={ styles.LinkWrapper }
          to={ route.path }
        >
          <div className={ styles.IconWrapper }>
            <route.Icon className={ styles.Icon } />
          </div>
          <span className={ styles.Title }>{t(route.title)}</span>
        </NavLink>
        ),
      )}
    </div>
  );
};

AppSidebar.propTypes = propTypes;
AppSidebar.defaultProps = defaultProps;

export default AppSidebar;
