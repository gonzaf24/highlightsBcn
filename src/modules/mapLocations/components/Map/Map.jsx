import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

import { useOpenToggle } from 'app/hooks';
import { IAmHereIcon } from 'assets/icons';
import { Button } from 'modules/common/components';

import MapFilters from '../MapFilters';
import Marker from '../MapMarker';
import MapMarkerDescription from '../MapMarkerDescription';

import styles from './Map.module.scss';

const propTypes = {
  className: PropTypes.string,
  dataPlaces: PropTypes.arrayOf(PropTypes.shape({
    cat: PropTypes.number,
    id: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
    name: PropTypes.string,
  })),
  dataTestId: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  dataTestId: '',
  id: undefined,
  dataPlaces: [],
};

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const defaultMapProps = {
  zoom: 13,
  options: {
    maxZoom: 18,
    minZoom: 13,
    disableDefaultUI: true,
    clickableIcons: false,
    styles: [
      {
        featureType: 'transit.station',
        elementType: 'labels.icon',
        stylers: [
          { visibility: 'off' },
        ],
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry.fill',
        stylers: [
          { visibility: 'off' },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'labels.icon',
        stylers: [
          { visibility: 'off' },
        ],
      },
    ],
  },
};

const barcelonaBounds = {
  north: 41.465, // Latitud máxima
  south: 41.307, // Latitud mínima
  east: 2.229, // Longitud máxima
  west: 2.034, // Longitud mínima
};

const Map = ({
  className, dataTestId, id, dataPlaces,
}) => {
  const [center, setCenter] = useState({ lat: 41.38879, lng: 2.15899 }); // Coordenadas iniciales
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [zoomSize, setZoomSize] = useState(11); // Estado para almacenar el zoom actual
  const [selectedMarker, setSelectedMarker] = useState(null); // Estado para almacenar el marcador seleccionado

  const {
    isOpen: isOpenMarker,
    open: openMarker,
    close: closeMarker,
  } = useOpenToggle(false);

  const [filterStates, setFilterStates] = useState({
    cat0: true,
    cat1: true,
    cat2: true,
    cat3: true,
    cat4: true,
  });

  const handleFilterChange = (index, isChecked) => {
    // Actualizamos el estado de los filtros
    setFilterStates(prevState => ({
      ...prevState,
      [`cat${index}`]: isChecked,
    }));
  };

  const onChildClick = markerData => {
    setSelectedMarker(markerData);
    openMarker();
  };

  const success = useCallback(pos => {
    const crd = pos.coords;
    setLat(crd.latitude);
    setLng(crd.longitude);
  }, []);

  const errors = err => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(result => {
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
  }, [success]);

  const markersDataOut = useMemo(() => {
    const filteredMarkers = dataPlaces.filter(marker => {
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
      if (filterStates.cat4 && marker.cat === 4) {
        return true;
      }
      return false;
    });

    // Mapeamos los marcadores filtrados
    const markers = filteredMarkers.map(marker => (
      <Marker
        googleMapsLink={ marker.googleMapsLink }
        Icon={ marker.Icon }
        id={ marker.id }
        lat={ marker.lat }
        lng={ marker.lng }
        name={ marker.name }
        zoom={ zoomSize }
        onChildClick={ onChildClick }
      />
    ));

    markers.push(<Marker Icon={ IAmHereIcon } lat={ lat } lng={ lng } />);

    return markers;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStates.cat0, filterStates.cat1, filterStates.cat2, filterStates.cat3, filterStates.cat4, zoomSize, lat, lng]);

  const isLocationInBarcelona = (latA, lngA, bounds) => {
    const withinLatBounds = latA >= bounds.south && latA <= bounds.north;
    const withinLngBounds = lngA >= bounds.west && lngA <= bounds.east;
    return withinLatBounds && withinLngBounds;
  };

  const isInBarcelona = useMemo(() => isLocationInBarcelona(lat, lng, barcelonaBounds), [lat, lng]);

  const onCenterMapClick = () => {
    if (isInBarcelona) {
      setCenter({ lat, lng });
    }
  };

  const onPosChange = prop => {
    setZoomSize(prop.zoom);
    setCenter(prop.center);
  };

  const mapClassNames = classnames(styles.Map, className);

  return (
    <div
      className={ mapClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <MapFilters closeDescription={ closeMarker } onFilterChange={ handleFilterChange } />
      <div className={ styles.Container }>
        <Button className={ styles.MyLocation } isDisabled={ !isInBarcelona } isPrimary onClick={ onCenterMapClick }>
          CENTER
        </Button>
        <GoogleMapReact
          bootstrapURLKeys={ { key: process.env.REACT_APP_MAPS_KEY } }
          center={ center }
          defaultCenter={ center }
          defaultZoom={ defaultMapProps.zoom }
          options={ defaultMapProps.options }
          onChange={ onPosChange }
        >
          {markersDataOut}
        </GoogleMapReact>
        <MapMarkerDescription isOpen={ isOpenMarker } marker={ selectedMarker } onClose={ closeMarker } />
      </div>
    </div>
  );
};

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;
