import { authApi } from 'app/config/api';

import { createHighlightsBcnApiClient } from './highlightsbcnApiClient';

const apiResourceApiClient = createHighlightsBcnApiClient(
  authApi.BASE_URL,
);

export default apiResourceApiClient;
