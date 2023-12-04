import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Loader.module.scss';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const Loader = ({ className, id }) => {
  const loaderClassNames = classnames(styles.Loader, className);

  return (
    <div
      className={ loaderClassNames }
      id={ id }
    />
  );
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;
