import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import useAuthContext from 'app/contexts/AuthContext';
import { useOpenToggle, useTranslations } from 'app/hooks';
import useClickOutside from 'app/hooks/useClickOutside';
import { LogoutIcon } from 'assets/icons';
import { ProfilePicture } from 'modules/common/components';

import styles from './UserMenu.module.scss';

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

const texts = {
  Logout: 'UserMenu.logout',
};

const UserMenu = ({ className, dataTestId, id }) => {
  const menuRef = useRef(null);
  const { t } = useTranslations();
  const { logout } = useAuthContext();

  const {
    isOpen: isOpenMenu,
    open: openMenu,
    close: closeMenu,
  } = useOpenToggle(false);

  const onProfilePictureClick = () => {
    if (isOpenMenu) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const onClickLogout = () => {
    closeMenu();
    logout();
  };

  useClickOutside(menuRef, closeMenu);

  const menuClassNames = classnames(styles.Menu, {
    [styles.IsOpen]: isOpenMenu,
  });
  const userMenuClassNames = classnames(styles.UserMenu, className);

  return (
    <div
      ref={ menuRef }
      className={ userMenuClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <ProfilePicture
        className={ styles.ProfilePicture }
        onClick={ onProfilePictureClick }
      />
      <div className={ menuClassNames }>
        <Button className={ styles.Button } onClick={ onClickLogout }>
          <LogoutIcon />
          <span className={ styles.Title }>{t(texts.Logout)}</span>
        </Button>
      </div>
    </div>
  );
};

UserMenu.propTypes = propTypes;
UserMenu.defaultProps = defaultProps;

export default UserMenu;
