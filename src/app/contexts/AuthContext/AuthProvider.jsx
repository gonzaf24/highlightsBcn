import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEventListener } from 'usehooks-ts';

import appConfig from 'app/config/app';
import { routes } from 'app/config/routing';
import { useTranslations } from 'app/hooks';
import useAuthService from 'app/hooks/useAuthService';

// import useUserService from 'app/hooks/useUserService';
import useToastContext from '../ToastContext';

import { AuthContext } from './AuthContext';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const defaultProps = {};

const texts = {
  RegisterSuccessMessage: 'AuthProvider.Register.Success',
  RegisterErrorMessage: 'AuthProvider.Register.Error',
  RegisterErrorEmailAreadyRegistered:
    'AuthProvider.Register.Error.EmailAlreadyRegistered',
  RecoverySuccessMessage: 'AuthProvider.Recovery.Success',
  RecoveryErrorMessage: 'AuthProvider.Recovery.Error',
};

const AuthProvider = ({ children }) => {
  const { t } = useTranslations();
  const history = useHistory();
  const [user, setUser] = useState();

  // const { getUser } = useUserService();
  const {
    login,
    logout,
    handleRememberMe,
    hasLoginError,
    isLoginLoading,
    accessToken,
    rememberMe,
    rememberMeEmail,
    isAuthenticated,
  } = useAuthService();

  useEffect(() => {
    const storedUser = localStorage.getItem(
      appConfig.LOCAL_STORAGE.HIGHLIGHTS_BCN_USER,
    );
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        appConfig.LOCAL_STORAGE.HIGHLIGHTS_BCN_USER,
        JSON.stringify(user),
      );
    } else {
      localStorage.removeItem(appConfig.LOCAL_STORAGE.HIGHLIGHTS_BCN_USER);
    }
  }, [user]);

  const { addSuccessToast, addErrorToast } = useToastContext();

  const addSuccessToastMessage = useCallback(
    msg => addSuccessToast(t(msg), { showCloseIcon: true, useAutoHide: false }),
    [addSuccessToast, t],
  );

  const addErrorToastMessage = useCallback(
    msg => addErrorToast(t(msg), { showCloseIcon: true, useAutoHide: false }),
    [addErrorToast, t],
  );

  const onLogin = useCallback(
    async (email, password) => {
      console.log('onLogin', email, password);
      const userId = 5556666; //
      await login(email, password);
      if (userId) {
        // all fake data
        const usr = {
          id: userId,
          firstName: 'Gonzalo',
          lastName: 'Fraschini',
          email: 'gonzaf21@hotmail.com',
          isActive: true,
          isManager: true,
        };
        setUser(usr);

        /* const _user = await getUser(userId);
      setUser(_user);
      const _team = await getTeam(userId);
      setTeam(_team); */
        history.replace(routes.home.path);
      }
    },
    [history, login],
  );

  const onLogout = useCallback(() => {
    logout();
    setUser(null);
    // history.replace(routes.login.path);
  }, [logout]);

  const onRegister = useCallback(
    (email, psw) => {
      console.log('onRegister', email, psw);
      // TODO: here make the call to the hook to register the user

      // TODO: these are the three possible toasts to show in case of success or error
      addErrorToastMessage(texts.RegisterErrorEmailAreadyRegistered);

      setTimeout(() => {
        addErrorToastMessage(texts.RegisterErrorMessage);
      }, 4000);

      setTimeout(() => {
        addSuccessToastMessage(texts.RegisterSuccessMessage);
      }, 8000);

      // TOOD: after the register we should redirect to the login page ?
      // history.replace(routes.login.path);

      return true;
    },
    [addErrorToastMessage, addSuccessToastMessage],
  );

  const onRecovery = useCallback(
    email => {
      console.log('onRecovery', email);
      // TODO: here make the call to the api to register the user

      // TODO: these are the two possible toasts to show in case of success or error
      addErrorToastMessage(texts.RecoveryErrorMessage);

      setTimeout(() => {
        addSuccessToastMessage(texts.RecoverySuccessMessage);
      }, 4000);

      // TOOD: after the register we should redirect to the login page ?
      // history.replace(routes.login.path);
      return true;
    },
    [addErrorToastMessage, addSuccessToastMessage],
  );

  // Auto logout when the access token is removed from local storage
  // Event is triggered in createDiditApiClient when the API returns a 401
  useEventListener(appConfig.HIGHLIGHTSBCN_UNAUHORIZED_EVENT, onLogout);

  const contextValue = useMemo(
    () => ({
      accessToken,
      login: onLogin,
      logout: onLogout,
      register: onRegister,
      recover: onRecovery,
      isAuthenticated,
      rememberMe,
      handleRememberMe,
      rememberMeEmail,
      hasLoginError,
      isLoginLoading,
      user,
    }),
    [
      accessToken,
      onLogin,
      onLogout,
      onRegister,
      onRecovery,
      isAuthenticated,
      rememberMe,
      handleRememberMe,
      rememberMeEmail,
      hasLoginError,
      isLoginLoading,
      user,
    ],
  );

  return (
    <AuthContext.Provider value={ contextValue }>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = propTypes;
AuthProvider.defaultProps = defaultProps;

export default AuthProvider;
