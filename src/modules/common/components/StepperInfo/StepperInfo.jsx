/* eslint-disable react/no-array-index-key */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { FilledPinkCircle, GreyCircle, PinkCircle } from 'assets/icons';

import styles from './StepperInfo.module.scss';

const propTypes = {
  size: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  dataTestId: '',
  id: undefined,
};

const StepperInfo = ({
  className, dataTestId, id, step, size,
}) => {
  const stepperInfoClassNames = classnames(styles.StepperInfo, className);

  return (
    <div
      className={ stepperInfoClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      {Array.from({ length: size }).map((_, index) => {
        if (index === step && step === size - 1) {
          return <FilledPinkCircle key={ index } />;
        } if (index === step) {
          return <PinkCircle key={ index } />;
        } if (index < step) {
          return <FilledPinkCircle key={ index } />;
        }
        return <GreyCircle key={ index } />;
      })}
    </div>
  );
};

StepperInfo.propTypes = propTypes;
StepperInfo.defaultProps = defaultProps;

export default StepperInfo;
