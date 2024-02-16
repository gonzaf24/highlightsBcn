import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { AvocadoIcon } from 'assets/icons';

import styles from './MapMarker.module.scss';

const propTypes = {
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  googleMapsLink: PropTypes.string,
  Icon: PropTypes.elementType,
  id: PropTypes.string,
  name: PropTypes.string,
  zoom: PropTypes.number,
  onChildClick: PropTypes.func,
};

const defaultProps = {
  className: '',
  dataTestId: '',
  id: undefined,
  Icon: AvocadoIcon,
  name: '',
  zoom: undefined,
  onChildClick: () => {},
  googleMapsLink: '',
};

const maxZoom = 15;

const MapMarker = ({
  className, dataTestId, id, Icon, name, zoom, onChildClick, googleMapsLink,
}) => {
  const onIconMarkerClick = () => {
    onChildClick({ id, name, googleMapsLink });
  };
  const inconsMarkersClassNames = classnames(styles.MarkerIcon, { [styles.Zoomed]: zoom > maxZoom });
  const mapMarkerClassNames = classnames(styles.MapMarker, className);

  return (
    <div
      className={ mapMarkerClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <Icon className={ inconsMarkersClassNames } onClick={ onIconMarkerClick } />
      { name && <p>{ name }</p>}
    </div>
  );
};

MapMarker.propTypes = propTypes;
MapMarker.defaultProps = defaultProps;

export default MapMarker;
