import React from 'react';
import { Modal as ModalBoostrap } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { CloseIcon } from 'assets/icons';
import { Loader } from 'utils';

import styles from './Modal.module.scss';

const propTypes = {
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),
  backdropClassName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  footer: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  header: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  id: PropTypes.string,
  isFullScreen: PropTypes.bool,
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool,
  size: PropTypes.string,
  onClose: PropTypes.func,
  onHide: PropTypes.func,
};

const defaultProps = {
  children: undefined,
  className: '',
  dataTestId: undefined,
  footer: undefined,
  header: undefined,
  id: undefined,
  isFullScreen: false,
  isLoading: false,
  isOpen: false,
  size: 'md',
  onClose: undefined,
  onHide: undefined,
  backdrop: true,
  backdropClassName: undefined,
};

const Modal = ({
  children,
  className,
  dataTestId,
  id,
  isOpen,
  onHide,
  onClose,
  footer,
  isLoading,
  isFullScreen,
  header,
  size,
  backdrop,
  backdropClassName,
}) => {
  const handleClose = isOnHide => () => {
    if (isOnHide) {
      onHide();
    } else {
      onClose();
    }
  };

  const modalClassNames = classnames(styles.Modal, className);

  const headerClassNames = classnames(styles.Header, {
    [styles.Empty]: !header,
  });
  const backdropClassNames = classnames(styles.Backdrop, backdropClassName);

  return (
    <ModalBoostrap
      aria-labelledby="modal-center"
      backdrop={ backdrop }
      backdropClassName={ backdropClassNames }
      centered
      className={ modalClassNames }
      data-testid={ dataTestId }
      fullscreen={ isFullScreen }
      id={ id }
      show={ isOpen }
      size={ size }
      onHide={ handleClose(true) }
    >
      {header && (
        <ModalBoostrap.Header className={ headerClassNames }>
          {header}
          {onClose && (
            <CloseIcon
              className={ styles.CloseIcon }
              onClick={ handleClose(false) }
              onKeyPress={ handleClose(false) }
            />
          )}
        </ModalBoostrap.Header>
      )}
      {children && (
        <ModalBoostrap.Body className={ styles.Body }>
          {isLoading && <Loader className={ styles.Loader } />}
          {!isLoading && children}
        </ModalBoostrap.Body>
      )}
      {footer && (
        <ModalBoostrap.Footer className={ styles.Footer }>
          {footer}
        </ModalBoostrap.Footer>
      )}
    </ModalBoostrap>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
