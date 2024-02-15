import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { CloseIcon } from 'assets/icons';
import { Button } from 'modules/common/components';

import styles from './MapMarkerDescription.module.scss';

const propTypes = {
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  marker: PropTypes.shape({
    googleMapsLink: PropTypes.string,
    name: PropTypes.string,
  }),
  onClose: PropTypes.func,
};

const defaultProps = {
  className: '',
  dataTestId: '',
  id: undefined,
  onClose: () => {},
  marker: {},
  isOpen: false,
};

const MapMarkerDescription = ({
  className, dataTestId, id, isOpen, onClose, marker,
}) => {
  const googleMapMarkerLink = marker?.googleMapsLink;
  const mapMarkerDescriptionClassNames = classnames(styles.MapMarkerDescription, className, { [styles.IsOpen]: isOpen });

  return (
    <div
      className={ mapMarkerDescriptionClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <Button className={ styles.Close } isPrimary onClick={ () => onClose() }>
        <CloseIcon />
      </Button>
      <p>
        <b>
          { marker?.name }
        </b>
      </p>
      <p>
        open on
      </p>
      <Link
        target="_blank"
        to={ {
          pathname: googleMapMarkerLink,
          state: { external: true },
        } }
      >
        Google Maps App
      </Link>
    </div>
  );
};

MapMarkerDescription.propTypes = propTypes;
MapMarkerDescription.defaultProps = defaultProps;

export default MapMarkerDescription;
