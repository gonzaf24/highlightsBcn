import React from 'react';
import BootstrapButton from 'react-bootstrap/Button';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  isOutlineBorder: PropTypes.bool,
  isPrimary: PropTypes.bool,
  isSecondary: PropTypes.bool,
};

const defaultProps = {
  className: '',
  dataTestId: '',
  id: undefined,
  isPrimary: false,
  isSecondary: false,
  isOutlineBorder: false,
  isDisabled: false,
};

const Button = ({
  children, className, dataTestId, id, isPrimary, isSecondary, isOutlineBorder, isDisabled, ...props
}) => {
  const buttonClassNames = classnames(
    styles.Button,
    className,
    { [styles.Primary]: isPrimary },
    { [styles.Secondary]: isSecondary },
    { [styles.OutlineBorder]: isOutlineBorder },
  );

  return (
    <BootstrapButton
      className={ buttonClassNames }
      data-testid={ dataTestId }
      disabled={ isDisabled }
      id={ id }
      type="button"
      // eslint-disable-next-line react/jsx-props-no-spreading
      { ...props }

    >
      { children }
    </BootstrapButton>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
