import React, { useState } from 'react';
import { NavLink } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { routes } from 'app/config/routing';
import { GoBackIcon, HomeIcon } from 'assets/icons';

import styles from './MenuItems.module.scss';

const propTypes = {
  backPath: PropTypes.string,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  id: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })),
  title: PropTypes.string,
  useGoHome: PropTypes.bool,
};

const defaultProps = {
  backPath: undefined,
  className: '',
  dataTestId: '',
  id: undefined,
  title: undefined,
  items: [],
  useGoHome: false,
};

const MenuItems = ({
  className, dataTestId, id, items, backPath, title, useGoHome,
}) => {
  const history = useHistory();

  const [selectedItem, setSelectedItem] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const onGoBackClick = () => {
    history.replace(backPath);
  };

  const onGoHomeClick = () => {
    history.replace(routes.home.path);
  };

  const handleClick = item => {
    if (!disabled) {
      setSelectedItem(item.id);
      setDisabled(true);
    }

    setTimeout(() => {
      history.replace(item.path);
    }, 1000);
  };

  const menuItemsClassNames = classnames(styles.MenuItems, className);

  return (
    <div
      className={ menuItemsClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <div className={ styles.Header }>
        <div className={ styles.Wrapper }>
          { backPath && <GoBackIcon className={ styles.GoBackIcon } onClick={ onGoBackClick } /> }
          { useGoHome && <HomeIcon className={ styles.GoBackIcon } onClick={ onGoHomeClick } />}
        </div>
        <div className={ styles.Wrapper }>
          { title && <span className={ styles.Title }>{ title }</span> }
        </div>
        <div className={ styles.Wrapper } />
      </div>
      <div className={ styles.ItemsContainer }>
        { items.map(item => (
          <NavLink
            key={ item.id }
            className={ classnames(styles.RollInEffect, {
              [styles.WithSelectEffect]: selectedItem === item.id,
              [styles.WithOutEffect]: disabled && selectedItem !== item.id,
            }) }
            onClick={ () => handleClick(item) }
          >
            <span className={ styles.Title }>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

MenuItems.propTypes = propTypes;
MenuItems.defaultProps = defaultProps;

export default MenuItems;
