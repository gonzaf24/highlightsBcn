import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './EntretainmentPage.module.scss';

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

const EntretainmentPage = ({ className, dataTestId, id }) => {
  const entretainmentPageClassNames = classnames(
    styles.EntretainmentPage,
    className,
  );

  return (
    <div
      className={ entretainmentPageClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      EntretainmentPage component
    </div>
  );
};

EntretainmentPage.propTypes = propTypes;
EntretainmentPage.defaultProps = defaultProps;

export default EntretainmentPage;
