import { API_PATH } from '@/constants/api-config';
import { useQuery } from '@tanstack/react-query';

export const useUserById = (userId: string) => {
  return useQuery<User>({
    queryKey: ['USER_BY_ID', userId],
    queryFn: async () => {
      const response = await fetch(`${API_PATH}/user/${userId}`);

      return response.json();
    },
  });
};
