import { authApi } from 'app/config/api';
import appConfig from 'app/config/app';
import { paths } from 'app/config/routing';
import { createResourceApiClient } from 'base/resourceApiClient';

/**
 * Generate a unique key for the request based on method and URL.
 */
function getRetryKey(config) {
  return `${config.method}-${config.url}`;
}

/**
 * Retrieve the Bearer token from local storage.
 */
const _getBearerToken = () => {
  const accessToken = localStorage.getItem(appConfig.LOCAL_STORAGE.ACCESS_TOKEN);
  return accessToken ? `Bearer ${accessToken}` : null;
};

/**
 * Remove the Bearer token from local storage.
 */
const _removeBearerToken = () => {
  localStorage.removeItem(appConfig.LOCAL_STORAGE.ACCESS_TOKEN);
  localStorage.removeItem(appConfig.LOCAL_STORAGE.REFRESH_TOKEN);
};

/**
 * Create the main HighlightsBcn API client with interceptors.
 */
const createHighlightsBcnApiClient = (baseUrl = undefined, config = { queryParamsArrayFormat: 'repeat' }) => {
  const apiClient = createResourceApiClient(baseUrl, config);
  const refreshURL = `${authApi.BASE_URL}token/refresh/`;
  const retryCounts = new Map();

  // Interceptor to handle token refresh and retries
  apiClient.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      const key = getRetryKey(originalRequest);
      const currentRetryCount = retryCounts.get(key) || 0;

      // If it's a 401 error and we haven't exceeded the retry limit
      if (error.response.status === 401 && currentRetryCount < 3) {
        retryCounts.set(key, currentRetryCount + 1);

        // Attempt to refresh the token
        const refreshToken = localStorage.getItem(appConfig.LOCAL_STORAGE.REFRESH_TOKEN);
        try {
          const { data } = await apiClient.post(refreshURL, { refresh: refreshToken });
          localStorage.setItem(appConfig.LOCAL_STORAGE.ACCESS_TOKEN, data.access);
          localStorage.setItem(appConfig.LOCAL_STORAGE.REFRESH_TOKEN, data.refresh);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // If there's an error trying to refresh the token, simply reject the promise
          _removeBearerToken();
          retryCounts.delete(key);
          return Promise.reject(refreshError);
        }
      }

      // If we've reached the retry limit or it's a 400 error
      if ((error.response.status === 401 || error.response.status === 400) && currentRetryCount >= 3) {
        _removeBearerToken();
        retryCounts.delete(key);
        window.location.href = paths.login;
      }

      // If it's a 404 error, and we haven't reached the retry limit
      if (error.response.status === 404 && currentRetryCount < 3) {
        // You can decide how to handle a 404 error, maybe retry the request or simply resolve it.
        // For now, we'll just resolve the promise with error.response.
        return Promise.resolve(error.response);
      }

      // For any other error, simply reject the promise.
      return Promise.reject(error);
    },
  );

  // Interceptor to add the access token from local storage to requests
  apiClient.interceptors.request.use(async request => {
    request.headers.Authorization = _getBearerToken();
    return request;
  });

  return apiClient;
};

export {
  createHighlightsBcnApiClient,
};
