import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './[FTName].module.scss';

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

const [FTName] = ({ className, dataTestId, id  }) => {
  const <FTName | camelcase>ClassNames = classnames(styles.[FTName], className);

  return (
    <div
      className={ <FTName | camelcase>ClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      [FTName] component
    </div>
  );
};

[FTName].propTypes = propTypes;
[FTName].defaultProps = defaultProps;

export default [FTName];
