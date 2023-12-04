import { useCallback, useState } from 'react';

import { loginApiService } from 'app/services';

const useRefreshToken = () => {
  // State to handle any potential errors from the refreshToken API call
  const [refreshError, setRefreshError] = useState(null);
  // State to handle loading state of the refreshToken API call
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async currentRefreshToken => {
    setIsLoading(true);
    setRefreshError(null);
    try {
      const data = await loginApiService.refreshToken({ refreshToken: currentRefreshToken });
      return {
        accessToken: data.access,
        refreshToken: data.refresh,
      };
    } catch (error) {
      setRefreshError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    refresh,
    refreshError,
    isLoading,
  };
};

export default useRefreshToken;
