import { apiResourceApiClient } from 'base';

class TeamApiService {
  static namespace = 'teams';

  static paths = {
    team: `${TeamApiService.namespace}/`,
  };

  constructor(apiClient) {
    if (!apiClient) throw Error('No \'apiClient\' provided to TeamApiService constructor');

    this.apiClient = apiClient;
  }

  getTeam = async () => {
    const response = await this.apiClient.get(
      TeamApiService.paths.team,
    );
    return response?.data;
  };
}

const teamApiService = new TeamApiService(apiResourceApiClient);

export default TeamApiService;

export {
  teamApiService,
};
