import React, { useCallback } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import appConfig from 'app/config/app';
import useToastContext from 'app/contexts/ToastContext';
import { useTranslations } from 'app/hooks';
import { Button } from 'modules/common/components';

import styles from './ToastMessages.module.scss';

const texts = {
  Dismiss: 'ToastMessages.Button.Dismiss',
};

const propTypes = {
  className: PropTypes.string,
  containerPosition: PropTypes.string,
  dataTestId: PropTypes.string,
  id: PropTypes.string,
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      closeText: PropTypes.string,
      hideDelay: PropTypes.number,
      id: PropTypes.number,
      leftContent: PropTypes.node,
      middleContent: PropTypes.node,
      rightContent: PropTypes.node,
      showCloseIcon: PropTypes.bool,
      type: PropTypes.string,
      useAutoHide: PropTypes.bool,
      onClose: PropTypes.func,
    }),
  ),
};

const defaultProps = {
  className: '',
  containerPosition: 'bottom-center',
  dataTestId: '',
  id: undefined,
  toasts: [
    {
      closeText: texts.Dismiss,
      hideDelay: appConfig.TOASTS.DEFAULT_OPTIONS.hideDelay,
      id: 0,
      leftContent: null,
      middleContent: null,
      rightContent: null,
      type: appConfig.TOASTS.TYPES.DEFAULT,
      useAutoHide: appConfig.TOASTS.DEFAULT_OPTIONS.useAutoHide,
      showCloseIcon: appConfig.TOASTS.DEFAULT_OPTIONS.showCloseIcon,
      onClose: () => {},
    },
  ],
};

const ToastMessages = ({
  className,
  containerPosition,
  id,
  toasts,
  dataTestId,
}) => {
  const { t } = useTranslations();
  const { removeToast } = useToastContext();

  const handleCloseToast = useCallback(
    _toast => {
      removeToast(_toast.id);
      _toast?.onClose?.(_toast);
    },
    [removeToast],
  );

  const renderCloseButton = _toast => {
    if (_toast.showCloseIcon) {
      const buttonText = _toast.closeText || texts.Dismiss;
      return (
        <Button
          className={ styles.ButtonClose }
          onClick={ () => handleCloseToast(_toast) }
        >
          <span>{t(buttonText)}</span>
        </Button>
      );
    }
    return null;
  };

  const renderBody = (_toast, customClassName, Icon = undefined) => (
    <Toast.Body
      className={ classnames(styles.ToastBody, customClassName) }
      data-toast-type={ _toast.type }
    >
      <div className={ styles.LeftContent }>{!!Icon && <Icon />}</div>
      <span className={ styles.MiddleContent }>{_toast.middleContent}</span>
      <div className={ styles.RightContent }>{renderCloseButton(_toast)}</div>
    </Toast.Body>
  );

  const getDefaultBody = _toast => (
    <Toast.Body className={ styles.ToastBody }>
      <div className={ styles.LeftContent }>{_toast.leftContent}</div>
      <span className={ styles.MiddleContent }>{_toast.middleContent}</span>
      <div className={ styles.RightContent }>{renderCloseButton(_toast)}</div>
    </Toast.Body>
  );

  const getInfoBody = _toast => renderBody(_toast, styles.ToastBodyInfo);

  const getSuccessBody = _toast => renderBody(_toast, styles.ToastBodySuccess);

  const getWarningBody = _toast => renderBody(_toast, styles.ToastBodyWarning);

  const getErrorBody = _toast => renderBody(_toast, styles.ToastBodyError);

  const getToastBody = _toast => {
    const getErrorFuncSwitch = {
      [appConfig.TOASTS.TYPES.DEFAULT]: getDefaultBody,
      [appConfig.TOASTS.TYPES.INFO]: getInfoBody,
      [appConfig.TOASTS.TYPES.SUCCESS]: getSuccessBody,
      [appConfig.TOASTS.TYPES.WARNING]: getWarningBody,
      [appConfig.TOASTS.TYPES.ERROR]: getErrorBody,
    };
    const getErrorFunc = getErrorFuncSwitch[_toast.type] || getDefaultBody;

    return getErrorFunc(_toast);
  };

  const toastsClassNames = classnames(styles.ToastMessages, className);

  return (
    <ToastContainer
      className={ toastsClassNames }
      data-testid={ dataTestId }
      id={ id }
      position={ containerPosition }
    >
      {toasts.map(toast => (
        <Toast
          key={ toast.id }
          autohide={ toast.useAutoHide }
          className={ styles.Toast }
          delay={ toast.hideDelay }
          show
          onClose={ () => removeToast(toast.id) }
        >
          {getToastBody(toast)}
        </Toast>
      ))}
    </ToastContainer>
  );
};

ToastMessages.propTypes = propTypes;
ToastMessages.defaultProps = defaultProps;

export default ToastMessages;
