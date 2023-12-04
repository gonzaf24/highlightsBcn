import { useCallback } from 'react';

import { teamApiService } from 'app/services/teamApiService';

const useTeamService = () => {
  const mapResponseToTeam = response => ({
    uuid: response.uuid,
    admins: response.admins,
    members: response.members,
    profiles: response.profiles,
    name: response.name,
    is_default: response.is_default,
  });

  const getTeam = useCallback(async () => {
    try {
      const response = await teamApiService.getTeam();
      return mapResponseToTeam(response?.results[0]);
    } catch (error) {
      throw new Error('Failed to retrieve team.');
    }
  }, []);

  return {
    getTeam,
  };
};

export default useTeamService;
