import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { routes } from 'app/config/routing';
import { MenuItems } from 'modules/common/components';
import { Map } from 'modules/mapLocations/components';
import { useMapLocationsTranslation } from 'modules/mapLocations/hooks';

import markersData from './fake-data';

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
  const { t } = useMapLocationsTranslation();

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
      <MenuItems backPath={ routes.home.path } title={ t(routes.mapLocations.title) } />
      <Map dataPlaces={ markersData } />
    </div>
  );
};

MapLocationsPage.propTypes = propTypes;
MapLocationsPage.defaultProps = defaultProps;

export default MapLocationsPage;
