import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './MapLocationsPage.module.scss';

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

const MapLocationsPage = ({ className, dataTestId, id }) => {
  const mapLocationsPageClassNames = classnames(
    styles.MapLocationsPage,
    className,
  );

  return (
    <div
      className={ mapLocationsPageClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      MapLocationsPage component
    </div>
  );
};

MapLocationsPage.propTypes = propTypes;
MapLocationsPage.defaultProps = defaultProps;

export default MapLocationsPage;
