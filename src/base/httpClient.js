import { create } from 'axios';

export const XSRF_HEADER_NAME = 'X-CSRFToken';
export const XSRF_COOKIE_NAME = 'csrftoken';
export const REQUEST_TYPE = 'XMLHttpRequest';
export const AUTHENTICATION_TIMEOUT_ERROR_CODE = 419;

export const CONTENT_TYPE = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  FORM_URL_ENCODED: 'application/x-www-form-urlencoded',
};

export const createHttpClient = (baseURL = undefined, config = {}) => {
  const httpClient = create({
    baseURL,
    headers: {
      // Accept: CONTENT_TYPE.JSON,
      // 'Access-Control-Allow-Credentials': true,
      'Content-Type': CONTENT_TYPE.JSON,
      'X-Requested-With': REQUEST_TYPE,
    },
    xsrfHeaderName: XSRF_HEADER_NAME,
    xsrfCookieName: XSRF_COOKIE_NAME,
    withCredentials: true, // sessionid and csrftoken secure cookies cannot be written/read
    ...config,
  });

  httpClient.interceptors.response.use(null, error => {
    if (error.response && error.response.status === AUTHENTICATION_TIMEOUT_ERROR_CODE) {
    // session timed out | not authenticated
      window.location.href = '/';
    }
    return Promise.reject(error);
  });

  return httpClient;
};

const httpClient = createHttpClient();

export default httpClient;
