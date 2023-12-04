// eslint-disable-next-line import/no-extraneous-dependencies
import qs from 'qs';

import { createHttpClient } from './httpClient';

export const createResourceApiClient = (
  baseUrl = undefined,
  config = {
    queryParamsArrayFormat: 'repeat',
  },
) => {
  const { queryParamsArrayFormat, ...axiosConfig } = config;

  return createHttpClient(
    baseUrl,
    {
      paramsSerializer: params => qs.stringify(params, { arrayFormat: queryParamsArrayFormat }),
      ...axiosConfig,
    },
  );
};

const resourceApiClient = createResourceApiClient();

export default resourceApiClient;
