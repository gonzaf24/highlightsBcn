import { useCallback } from 'react';

import { userApiService } from 'app/services/userApiService';

const useUserService = () => {
  const mapResponseToUser = response => ({
    id: response.id,
    firstName: response.first_name,
    lastName: response.last_name,
    email: response.email,
    isActive: response.is_active,
    isManager: response.is_manager,
  });

  const getUser = useCallback(async userUUID => {
    try {
      const response = await userApiService.getUser({ id: userUUID });
      return mapResponseToUser(response);
    } catch (error) {
      return new Error('Failed to retrieve user. ', error);
    }
  }, []);

  return {
    getUser,
  };
};

export default useUserService;
