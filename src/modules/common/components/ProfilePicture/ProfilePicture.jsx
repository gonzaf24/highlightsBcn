import React, { useCallback } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Image } from 'modules/common/components';

import styles from './ProfilePicture.module.scss';

const propTypes = {
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  id: PropTypes.string,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  src: PropTypes.string,
  useHover: PropTypes.bool,
  onClick: PropTypes.func,
};

const defaultProps = {
  className: '',
  dataTestId: '',
  id: undefined,
  isActive: false,
  isDisabled: false,
  src: undefined,
  useHover: false,
  onClick: undefined,
};

const ProfilePicture = ({
  className, dataTestId, id, useHover, src, onClick, isActive, isDisabled,
}) => {
  const handleClick = useCallback(() => {
    if (!isDisabled && onClick) {
      onClick();
    }
  }, [isDisabled, onClick]);

  // if there is no onClick, then the image should not be focusable
  const tabIndex = onClick ? 0 : -1;

  const profilePictureClassNames = classnames(
    styles.ProfilePicture,
    { [styles.UseHover]: useHover },
    { [styles.Active]: isActive },
    { [styles.Disabled]: isDisabled },

    className,
  );

  return (
    <Image
      alt="User Menu"
      className={ profilePictureClassNames }
      dataTestId={ dataTestId }
      id={ id }
      src={ src }
      tabIndex={ tabIndex }
      onImageClick={ handleClick }
    />
  );
};

ProfilePicture.propTypes = propTypes;
ProfilePicture.defaultProps = defaultProps;

export default ProfilePicture;
