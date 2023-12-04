/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { EyeIcon } from 'assets/icons';

import styles from './InputPassword.module.scss';

const propTypes = {
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  className: '',
  dataTestId: '',
  id: undefined,
  label: '',
  value: '',
  onChange: () => {},
  error: '',
};

const InputPassword = ({
  className, dataTestId, id, label, value, onChange, error, ...props
}) => {
  const [isEyeActive, setIsEyeActive] = useState(true); // Inicializa el estado

  const onEyeClick = () => {
    setIsEyeActive(!isEyeActive);
  };

  const inputType = isEyeActive ? 'password' : 'text';

  const labelClassNames = classnames(styles.Label, { [styles.LabelError]: error });
  const inputClassNames = classnames(styles.Input, { [styles.InputError]: error });
  const eyeClassNames = classnames(styles.EyeIcon, { [styles.EyeActive]: !isEyeActive });
  const inputPasswordClassNames = classnames(styles.InputPassword, className);

  return (
    <Form.Group
      className={ inputPasswordClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      { label && <Form.Label className={ labelClassNames } htmlFor={ id }>{label}</Form.Label> }
      <div className={ styles.InputWrapper }>
        <Form.Control
          className={ inputClassNames }
          id={ id }
          type={ inputType }
          value={ value }
          onChange={ onChange }
          { ...props }
        />
        <EyeIcon className={ eyeClassNames } onClick={ onEyeClick } />
      </div>
      { error && <div className={ styles.ErrorText }>{error}</div> }
    </Form.Group>
  );
};

InputPassword.propTypes = propTypes;
InputPassword.defaultProps = defaultProps;

export default InputPassword;
