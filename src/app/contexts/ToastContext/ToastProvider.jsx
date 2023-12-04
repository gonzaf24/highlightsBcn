import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { ToastMessages } from 'app/components';
import appConfig from 'app/config/app';

import { ToastContext } from './toastContext';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  containerClassName: PropTypes.string,
  containerPosition: PropTypes.string,
  dataTestId: PropTypes.string,
};

const defaultProps = {
  containerPosition: 'bottom-center',
  dataTestId: '',
  containerClassName: '',
};

const ToastProvider = ({ children, containerPosition, dataTestId, containerClassName }) => {
  const [toasts, setToasts] = useState([]);
  const [toastId, setToastId] = useState(0);

  const removeToast = useCallback(
    id => setToasts(currentToasts => currentToasts.filter(t => t.id !== id)),
    [],
  );

  const addToast = useCallback(
    ({
      type = appConfig.TOASTS.TYPES.DEFAULT,
      leftContent = '',
      middleContent = '',
      rightContent = '',
      useAutoHide = appConfig.TOASTS.DEFAULT_OPTIONS.useAutoHide,
      hideDelay = appConfig.TOASTS.DEFAULT_OPTIONS.hideDelay,
      showCloseIcon = appConfig.TOASTS.DEFAULT_OPTIONS.showCloseIcon,
      closeText = undefined,
      onClose = () => {},
    }) => {
      setToastId(toastId + 1);
      const toast = {
        type,
        id: toastId,
        leftContent,
        middleContent,
        rightContent,
        useAutoHide,
        hideDelay,
        showCloseIcon,
        closeText,
        onClose,
      };
      setToasts([...toasts, toast]);

      return toast;
    },
    [toastId, toasts],
  );

  const updateToast = useCallback(
    ({
      id,
      type = undefined,
      leftContent = undefined,
      middleContent = undefined,
      rightContent = undefined,
      useAutoHide = undefined,
      hideDelay = undefined,
      showCloseIcon = undefined,
      closeText = undefined,
      onClose = undefined,
    }) => {
      if (id === undefined) {
        console.error('Toast id is required to update a toast');
        return undefined;
      }

      const updates = {
        type,
        id,
        leftContent,
        middleContent,
        rightContent,
        useAutoHide,
        hideDelay,
        showCloseIcon,
        closeText,
        onClose,
      };

      const toastIndex = toasts.findIndex(t => t.id === id);
      if (toastIndex === -1) {
        console.error('Toast not found for id: ', id, ' to update');
        return undefined;
      }

      const updatedToasts = [...toasts];
      const updatedToast = {
        ...updatedToasts[toastIndex],
        ...updates,
      };
      updatedToasts[toastIndex] = updatedToast;

      setToasts(updatedToasts);

      return updatedToast;
    },
    [toasts],
  );

  const addSuccessToast = useCallback(
    (content = 'Success', options = {}) => {
      const toastConfig = { ...appConfig.TOASTS.DEFAULT_OPTIONS, ...options };

      return addToast({
        ...toastConfig,
        type: appConfig.TOASTS.TYPES.SUCCESS,
        middleContent: content,
      });
    },
    [addToast],
  );

  const addErrorToast = useCallback(
    (content = 'Error', options = {}) => {
      const toastConfig = { ...appConfig.TOASTS.DEFAULT_OPTIONS, ...options };

      return addToast({
        ...toastConfig,
        type: appConfig.TOASTS.TYPES.ERROR,
        middleContent: content,
      });
    },
    [addToast],
  );

  const addWarningToast = useCallback(
    (content = 'Warning', options = {}) => {
      const toastConfig = { ...appConfig.TOASTS.DEFAULT_OPTIONS, ...options };

      return addToast({
        ...toastConfig,
        type: appConfig.TOASTS.TYPES.WARNING,
        middleContent: content,
      });
    },
    [addToast],
  );

  const addInfoToast = useCallback(
    (content = 'Info', options = {}) => {
      const toastConfig = { ...appConfig.TOASTS.DEFAULT_OPTIONS, ...options };
      return addToast({
        ...toastConfig,
        type: appConfig.TOASTS.TYPES.INFO,
        middleContent: content,
      });
    },
    [addToast],
  );

  const contextValue = useMemo(() => ({
    toasts,
    addToast,
    updateToast,
    removeToast,
    addSuccessToast,
    addErrorToast,
    addWarningToast,
    addInfoToast,
  }), [
    toasts,
    addToast,
    updateToast,
    removeToast,
    addSuccessToast,
    addErrorToast,
    addWarningToast,
    addInfoToast,
  ]);

  return (
    <ToastContext.Provider
      data-testid={ dataTestId }
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={ contextValue }
    >
      { children }
      <ToastMessages
        className={ containerClassName }
        containerPosition={ containerPosition }
        toasts={ toasts }
      />
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = propTypes;
ToastProvider.defaultProps = defaultProps;

export default ToastProvider;
