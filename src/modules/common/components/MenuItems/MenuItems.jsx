import React, { useState } from 'react';
import { NavLink } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { GoBackIcon } from 'assets/icons';

import styles from './MenuItems.module.scss';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  dataTestId: '',
  id: undefined,
};

const MenuItems = ({ className, dataTestId, id, items }) => {
  const history = useHistory();

  const [selectedItem, setSelectedItem] = useState(null);
  const [disabled, setDisabled] = useState(false);

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
      <GoBackIcon className={ styles.GoBackIcon } />
      {items.map(item => (
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
  );
};

MenuItems.propTypes = propTypes;
MenuItems.defaultProps = defaultProps;

export default MenuItems;
