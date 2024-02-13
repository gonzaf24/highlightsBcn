/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
// eslint-disable-next-line import/no-extraneous-dependencies
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

import { routes } from 'app/config/routing';
import { IAmHereIcon } from 'assets/icons';
import { MenuItems } from 'modules/common/components';
import { useMapLocationsTranslation } from 'modules/mapLocations/hooks';

import MapFilters from '../MapFilters';
import Marker from '../Marker';

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
  const [zoomSize, setZoomSize] = useState(11); // Estado para almacenar el zoom actual

  const [filterStates, setFilterStates] = useState({
    cat0: true,
    cat1: true,
    cat2: true,
    cat3: true,
  });

  // Función para manejar los cambios de filtro
  const handleFilterChange = (index, isChecked) => {
    // Actualizamos el estado de los filtros
    setFilterStates(prevState => ({
      ...prevState,
      [`cat${index}`]: isChecked,
    }));
  };

  const defaultPropss = {
    center: {
      lat: 41.38879,
      lng: 2.15899,
    },
    zoom: 13,
    options: {
      maxZoom: 18,
      minZoom: 13,
    },
  };

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const onBoundsChange = (center, zoom) => {
    // console.log('bounds', center, zoom);
    setZoomSize(zoom);
  };

  const onChildClick = (key, childProps) => {
    console.log('click', key, childProps);
  };

  const onChildMouseEnter = (/* key, childProps */) => {
    // console.log('hover', key, childProps);
  };

  const onChildMouseLeave = (/* key, childProps */) => {
    // console.log('leave');
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = useCallback(pos => {
    const crd = pos.coords;
    setLat(crd.latitude);
    setLng(crd.longitude);
  }, [setLat, setLng]);

  const errors = err => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(result => {
          console.log(result);
          if (result.state === 'granted') {
            // If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === 'prompt') {
            // If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === 'denied') {
            // If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, [options, success]);

  const markersDataOut = useMemo(() => {
    console.log('markersDataOut', markersData);
    const filteredMarkers = markersData.filter(marker => {
      // Filtramos los marcadores según el estado de los filtros
      if (filterStates.cat0 && marker.cat === 0) {
        return true;
      }
      if (filterStates.cat1 && marker.cat === 1) {
        return true;
      }
      if (filterStates.cat2 && marker.cat === 2) {
        return true;
      }
      if (filterStates.cat3 && marker.cat === 3) {
        return true;
      }
      return false;
    });
    console.log('filteredMarkers', filteredMarkers);

    // Mapeamos los marcadores filtrados
    return filteredMarkers.map(marker => (
      <Marker
        key={ marker.id }
        Icon={ marker.Icon }
        id={ marker.id }
        lat={ marker.lat }
        lng={ marker.lng }
        name={ marker.name }
        zoom={ zoomSize }
      />
    ));
  }, [markersData, zoomSize, filterStates]);

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
      <MapFilters onFilterChange={ handleFilterChange } />
      <GoogleMapReact
        bootstrapURLKeys={ { key: process.env.REACT_APP_MAPS_KEY } }
        defaultCenter={ defaultPropss.center }
        defaultZoom={ defaultPropss.zoom }
        options={ defaultPropss.options }
        onBoundsChange={ onBoundsChange }
        onChildClick={ onChildClick }
        onChildMouseEnter={ onChildMouseEnter }
        onChildMouseLeave={ onChildMouseLeave }
      >
        {markersDataOut}
        <Marker Icon={ IAmHereIcon } lat={ lat } lng={ lng } />
      </GoogleMapReact>
    </div>
  );
};

MapLocationsPage.propTypes = propTypes;
MapLocationsPage.defaultProps = defaultProps;

export default MapLocationsPage;
