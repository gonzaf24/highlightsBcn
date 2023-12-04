import { useCallback, useEffect, useState } from 'react';

import appConfig from 'app/config/app';
/* import decodeJwtPayload from 'app/config/jwtDecoder';
import { loginApiService } from 'app/services'; */

const useAuthService = () => {
  const initialToken = localStorage.getItem(appConfig.LOCAL_STORAGE.ACCESS_TOKEN) || null;
  const initialRefreshToken = localStorage.getItem(appConfig.LOCAL_STORAGE.REFRESH_TOKEN) || null;
  const initialRememberMe = localStorage.getItem(appConfig.LOCAL_STORAGE.REMEMBER_ME);
  const initialRememberMeValue = initialRememberMe ? JSON.parse(initialRememberMe) : false;
  const initialRememberMeEmail = localStorage.getItem(appConfig.LOCAL_STORAGE.REMEMBER_ME_EMAIL) || undefined;

  const [accessToken, setAccessToken] = useState(initialToken);
  const [refreshToken, setRefreshToken] = useState(initialRefreshToken);
  const [rememberMe, setRememberMe] = useState(initialRememberMeValue);
  const [rememberMeEmail, setRememberMeEmail] = useState(initialRememberMeEmail);
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);

  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [hasLoginError, setHasLoginError] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem(appConfig.LOCAL_STORAGE.REMEMBER_ME_EMAIL);
    if (storedEmail && rememberMe) {
      setRememberMeEmail(storedEmail);
    }
  }, [rememberMe]);

  useEffect(() => {
    localStorage.setItem(appConfig.LOCAL_STORAGE.REMEMBER_ME, JSON.stringify(rememberMe));
  }, [rememberMe]);

  const setToken = (_accessToken, _refreshToken) => {
    localStorage.setItem(appConfig.LOCAL_STORAGE.ACCESS_TOKEN, _accessToken);
    localStorage.setItem(appConfig.LOCAL_STORAGE.REFRESH_TOKEN, _refreshToken);
    setAccessToken(_accessToken);
    setRefreshToken(_refreshToken);
  };

  const removeToken = () => {
    localStorage.removeItem(appConfig.LOCAL_STORAGE.ACCESS_TOKEN);
    localStorage.removeItem(appConfig.LOCAL_STORAGE.REFRESH_TOKEN);
    setAccessToken(null);
    setRefreshToken(null);
  };

  const handleRememberMe = useCallback((selected, userEmail) => {
    setRememberMe(selected);
    if (selected && userEmail) {
      // save the email in localStorage if "rememberMe" is selected
      localStorage.setItem(appConfig.LOCAL_STORAGE.REMEMBER_ME_EMAIL, userEmail);
      setRememberMeEmail(userEmail);
    } else {
      // remove email from localStorage if "rememberMe" is not selected
      localStorage.removeItem(appConfig.LOCAL_STORAGE.REMEMBER_ME_EMAIL);
      setRememberMeEmail(undefined);
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    removeToken();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setIsLoginLoading(true);
      setHasLoginError(false);

      console.log(email, password);

      // const response = await loginApiService.doLogin({ email, password });
      /* if (response && response.access ) { */
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const refreshTokenA = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQs2222';
      // setToken(response.access, response.refresh);

      setToken(token, refreshTokenA);
      setIsAuthenticated(true);
      // const { user_id: userId } = decodeJwtPayload(response.access);
      // return userId;
      return 555847412511;
      /*  } */
      // return null;
    } catch (error) {
      setIsAuthenticated(false);
      setHasLoginError(true);
      return null;
    } finally {
      setIsLoginLoading(false);
    }
  }, []);

  return {
    login,
    logout,
    setToken,
    removeToken,
    handleRememberMe,
    accessToken,
    refreshToken,
    isLoginLoading,
    hasLoginError,
    rememberMeEmail,
    rememberMe,
    isAuthenticated,
  };
};

export default useAuthService;
