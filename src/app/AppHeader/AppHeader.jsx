import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { LanguageSelector, UserMenu } from 'app/components';
import { routes } from 'app/config/routing';
import useAuthContext from 'app/contexts/AuthContext';
import { MapLogoImage2 } from 'assets/images';
import { Image } from 'modules/common/components';

import styles from './AppHeader.module.scss';

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

const AppHeader = ({ className, dataTestId, id }) => {
  const { isAuthenticated } = useAuthContext();

  const appHeaderClassNames = classnames(styles.AppHeader, className);

  return (
    <div className={ appHeaderClassNames } data-testid={ dataTestId } id={ id }>
      <Link className={ styles.LeftContaienr } to={ routes.home.path }>
        <Image className={ styles.MapLogo } src={ MapLogoImage2 } />
        <div className={ styles.Wrapper }>
          <span>Highlights</span>
          <span>Barcelona</span>
        </div>
      </Link>
      <div className={ styles.RightContainer }>
        <LanguageSelector />
        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <Link
            className={ styles.LoginText }
            to={ routes.login.path }
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

AppHeader.propTypes = propTypes;
AppHeader.defaultProps = defaultProps;

export default AppHeader;
