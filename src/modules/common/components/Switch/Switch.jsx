import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Switch.module.scss';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  id: PropTypes.string,
  isChecked: PropTypes.bool,
};

const defaultProps = {
  className: '',
  dataTestId: '',
  id: undefined,
  isChecked: true,
};

const Switch = ({
  className, dataTestId, id, isChecked, onChange,
}) => {
  const switchClassNames = classnames(styles.Switch, className);

  return (
    <div
      className={ switchClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <input
        checked={ isChecked }
        className={ styles.CheckBox }
        id={ id }
        type="checkbox"
        onChange={ onChange }
      />
      <div className={ styles.Circle } />
    </div>
  );
};

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;
