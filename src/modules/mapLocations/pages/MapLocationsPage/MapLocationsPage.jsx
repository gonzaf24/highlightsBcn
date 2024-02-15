import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import classnames from 'classnames';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

import { routes } from 'app/config/routing';
import { useOpenToggle } from 'app/hooks';
import { CloseIcon, IAmHereIcon } from 'assets/icons';
import { Button, MenuItems } from 'modules/common/components';
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

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const barcelonaBounds = {
  north: 41.465, // Latitud máxima
  south: 41.307, // Latitud mínima
  east: 2.229, // Longitud máxima
  west: 2.034, // Longitud mínima
};

const defaultMapProps = {
  center: {
    lat: 41.38879,
    lng: 2.15899,
  },
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

const MapLocationsPage = ({ className, dataTestId, id }) => {
  const { t } = useMapLocationsTranslation();
  const [zoomSize, setZoomSize] = useState(11); // Estado para almacenar el zoom actual
  const [selectedMarker, setSelectedMarker] = useState(null); // Estado para almacenar el marcador seleccionado
  const [centerA, setCenterA] = useState({ lat: 41.38879, lng: 2.15899 }); // Coordenadas iniciales

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
  });

  // Función para manejar los cambios de filtro
  const handleFilterChange = (index, isChecked) => {
    // Actualizamos el estado de los filtros
    setFilterStates(prevState => ({
      ...prevState,
      [`cat${index}`]: isChecked,
    }));
  };

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const onPosChange = ({ center, zoom }) => {
    setZoomSize(zoom);
    setCenterA(center);
  };

  const onChildClick = markerData => {
    console.log('markerData : ', markerData);
    setSelectedMarker(markerData);
    openMarker();
  };

  const onChildMouseEnter = (/* key, childProps */) => {
    // console.log('hover', key, childProps);
  };

  const onChildMouseLeave = (/* key, childProps */) => {
    // console.log('leave');
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
        onChildClick={ onChildClick }
      />
    ));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStates.cat0, filterStates.cat1, filterStates.cat2, filterStates.cat3, zoomSize]);

  const isLocationInBarcelona = (latA, lngA, bounds) => {
    const withinLatBounds = latA >= bounds.south && latA <= bounds.north;
    const withinLngBounds = lngA >= bounds.west && lngA <= bounds.east;
    return withinLatBounds && withinLngBounds;
  };

  const isInBarcelona = useMemo(() => isLocationInBarcelona(lat, lng, barcelonaBounds), [lat, lng]);

  const handleCenterMapOnMyLocation = () => {
    if (isInBarcelona) {
      setCenterA({ lat, lng });
      console.log('isLocationInBarcelona - truee ');
    }
  };

  const overlayClassNames = classnames(styles.Overlay, { [styles.IsOpen]: isOpenMarker });

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
      <Button className={ styles.MyLocation } isDisabled={ !isInBarcelona } isPrimary onClick={ handleCenterMapOnMyLocation }>
        centrar en mi ubicación
      </Button>
      <GoogleMapReact
        bootstrapURLKeys={ { key: process.env.REACT_APP_MAPS_KEY } }
        center={ centerA }
        defaultCenter={ centerA }
        defaultZoom={ defaultMapProps.zoom }
        options={ defaultMapProps.options }
        onChange={ onPosChange }
        onChildMouseEnter={ onChildMouseEnter }
        onChildMouseLeave={ onChildMouseLeave }
      >
        {markersDataOut}
        <Marker Icon={ IAmHereIcon } lat={ lat } lng={ lng } />
      </GoogleMapReact>
      <div className={ overlayClassNames }>
        <Button className={ styles.Close } isPrimary onClick={ () => closeMarker() }>
          <CloseIcon />
        </Button>
        <p>
          Id:
          { selectedMarker?.id }
        </p>
        <p>
          Name:
          { selectedMarker?.name }
        </p>
        <Link
          target="_blank"
          to={ {
            pathname: 'https://maps.google.com',
            state: { external: true },
          } }
        >
          abrir en Google Maps App
        </Link>
      </div>
    </div>
  );
};

MapLocationsPage.propTypes = propTypes;
MapLocationsPage.defaultProps = defaultProps;

export default MapLocationsPage;
