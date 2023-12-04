import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './TopsPage.module.scss';

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

const TopsPage = ({ className, dataTestId, id }) => {
  const topsPageClassNames = classnames(styles.TopsPage, className);

  return (
    <div className={ topsPageClassNames } data-testid={ dataTestId } id={ id }>
      TopsPage component
    </div>
  );
};

TopsPage.propTypes = propTypes;
TopsPage.defaultProps = defaultProps;

export default TopsPage;
