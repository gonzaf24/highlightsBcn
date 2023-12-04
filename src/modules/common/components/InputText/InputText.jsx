/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Form } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './InputText.module.scss';

const propTypes = {
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  className: '',
  dataTestId: '',
  id: undefined,
  label: '',
  type: 'text',
  value: '',
  onChange: () => {},
  error: '',
};

const InputText = ({
  className, dataTestId, id, label, value, onChange, error, type, ...props
}) => {
  const labelClassNames = classnames(styles.Label, { [styles.LabelError]: error });
  const inputClassNames = classnames(styles.Input, { [styles.InputError]: error });
  const inputTextClassNames = classnames(styles.InputText, className);

  return (
    <Form.Group
      className={ inputTextClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      { label && <Form.Label className={ labelClassNames } htmlFor={ id }>{label}</Form.Label> }
      <Form.Control
        className={ inputClassNames }
        id={ id }
        type={ type }
        value={ value }
        onChange={ onChange }
        { ...props }
      />
      { error && <div className={ styles.ErrorText }>{error}</div> }
    </Form.Group>
  );
};

InputText.propTypes = propTypes;
InputText.defaultProps = defaultProps;

export default InputText;
