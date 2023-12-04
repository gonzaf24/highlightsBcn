import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './BarPage.module.scss';

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

const BarPage = ({ className, dataTestId, id }) => {
  const barPageClassNames = classnames(styles.BarPage, className);

  return (
    <div className={ barPageClassNames } data-testid={ dataTestId } id={ id }>
      BarPage component
    </div>
  );
};

BarPage.propTypes = propTypes;
BarPage.defaultProps = defaultProps;

export default BarPage;
