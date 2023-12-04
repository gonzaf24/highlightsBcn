import { apiResourceApiClient } from 'base';

class UserApiService {
  static namespace = 'users';

  static paths = {
    user: id => `${UserApiService.namespace}/${id}/`,
  };

  constructor(apiClient) {
    if (!apiClient) throw Error('No \'apiClient\' provided to UserApiService constructor');

    this.apiClient = apiClient;
  }

  getUser = async ({ id }) => {
    const response = await this.apiClient.get(
      UserApiService.paths.user(id),
    );
    return response?.data;
  };
}

const userApiService = new UserApiService(apiResourceApiClient);

export default UserApiService;

export {
  userApiService,
};
