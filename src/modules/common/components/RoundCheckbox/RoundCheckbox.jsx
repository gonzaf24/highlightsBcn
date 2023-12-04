/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './RoundCheckbox.module.scss';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  isChecked: PropTypes.bool,
  label: PropTypes.string,
};

const defaultProps = {
  className: '',
  dataTestId: '',
  error: undefined,
  id: undefined,
  isChecked: false,
  label: undefined,
};

const RoundCheckbox = ({
  className, dataTestId, id, label, onChange, isChecked, error,
}) => {
  const roundCheckboxClassNames = classnames(styles.RoundCheckbox, className);

  return (
    <div
      className={ roundCheckboxClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <div className={ styles.Wrapper }>
        <input checked={ isChecked } id={ id } type="checkbox" onChange={ onChange } />
        <label htmlFor={ id } />
        { label && (
        <span className={ styles.LabelText }>{ label }</span>
        )}
      </div>
      {error && <div className={ styles.ErrorText }>{error}</div>}
    </div>
  );
};

RoundCheckbox.propTypes = propTypes;
RoundCheckbox.defaultProps = defaultProps;

export default RoundCheckbox;
