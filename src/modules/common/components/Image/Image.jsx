import React, { useCallback, useEffect, useState } from 'react';
import { Figure } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { ProfileImage } from 'assets/images';

import styles from './Image.module.scss';

const propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  id: PropTypes.string,
  src: PropTypes.string,
  tabIndex: PropTypes.number,
  onError: PropTypes.func,
  onImageClick: PropTypes.func,
};

const defaultProps = {
  alt: '',
  className: '',
  dataTestId: '',
  id: undefined,
  src: undefined,
  tabIndex: -1,
  onImageClick: () => {},
  onError: () => {},
};

const Image = ({
  className, dataTestId, id, alt, src, tabIndex, onImageClick, onError,
}) => {
  const [isValidImage, setIsValidImage] = useState(true);

  const handleImageError = useCallback((isValid = false) => {
    setIsValidImage(isValid);
    if (!isValid) onError();
  }, [onError]);

  const handelKeyDown = useCallback(event => {
    if (event.keyCode === 13) {
      onImageClick();
    }
  }, [onImageClick]);

  const isValidPath = path => typeof path === 'string' && path.trim() !== '';

  useEffect(() => {
    if (!isValidPath(src) || src === undefined) {
      handleImageError(false);
    } else {
      handleImageError(true);
    }
  }, [src, handleImageError]);

  const imageClassNames = classnames(styles.Image, className);

  return (
    <Figure
      className={ imageClassNames }
      data-testid={ dataTestId }
      id={ id }
      tabIndex={ tabIndex }
      onClick={ onImageClick }
      onKeyDown={ handelKeyDown }
    >
      <Figure.Image
        alt={ alt }
        className={ styles.FigureImage }
        src={ isValidImage ? src : ProfileImage }
        onError={ handleImageError }
      />
    </Figure>
  );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
