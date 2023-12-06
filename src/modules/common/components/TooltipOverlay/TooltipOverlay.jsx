import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './TooltipOverlay.module.scss';

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

const TooltipOverlay = ({ className, dataTestId, id }) => {
  const tooltipOverlayClassNames = classnames(styles.TooltipOverlay, className);

  return (
    <div
      className={ tooltipOverlayClassNames }
      data-testid={ dataTestId }
      id={ id }
    />
  );
};

TooltipOverlay.propTypes = propTypes;
TooltipOverlay.defaultProps = defaultProps;

export default TooltipOverlay;
