import { apiResourceApiClient } from 'base';

// Service to retrieve user data of a customer from the DATA API
class LoginApiService {
  static namespace = 'token';

  static paths = {
    // Post the login credentials
    login: `${LoginApiService.namespace}/`,
    loginRefresh: `${LoginApiService.namespace}/refresh/`,
    loginVerify: `${LoginApiService.namespace}/verify/`,
  };

  constructor(apiClient) {
    if (!apiClient) throw Error('No \'apiClient\' provided to LoginApiService constructor');

    this.apiClient = apiClient;
  }

  doLogin = async ({ email, password }) => {
    const response = await this.apiClient.post(
      LoginApiService.paths.login,
      {
        email,
        password,
      },
    );
    return response?.data;
  };

  refreshToken = async ({ refreshToken }) => {
    const response = await this.apiClient.post(
      LoginApiService.paths.loginRefresh,
      {
        refresh: refreshToken,
      },
    );
    return response?.data;
  };
}

const loginApiService = new LoginApiService(apiResourceApiClient);

export default LoginApiService;

export {
  loginApiService,
};
