import apiConfig from '../app/config/api';

import { createHttpClient } from './httpClient';

const dataApiClient = createHttpClient(apiConfig.DATA_API_BASE_URL);

export default dataApiClient;
