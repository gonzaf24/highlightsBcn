import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { AvocadoIcon } from 'assets/icons';

import styles from './Marker.module.scss';

const propTypes = {
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  Icon: PropTypes.elementType,
  id: PropTypes.string,
  name: PropTypes.string,
  zoom: PropTypes.number,
};

const defaultProps = {
  className: '',
  dataTestId: '',
  id: undefined,
  Icon: AvocadoIcon,
  name: '',
  zoom: undefined,
};

const maxZoom = 15;

const Marker = ({
  className, dataTestId, id, Icon, name, zoom,
}) => {
  const inconsMarkersClassNames = classnames(styles.MarkerIcon, { [styles.Zoomed]: zoom > maxZoom });
  const markerClassNames = classnames(styles.Marker, className);

  return (
    <div
      key={ id }
      className={ markerClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <Icon className={ inconsMarkersClassNames } />
      { name && <p>{ name }</p>}
    </div>
  );
};

Marker.propTypes = propTypes;
Marker.defaultProps = defaultProps;

export default Marker;
