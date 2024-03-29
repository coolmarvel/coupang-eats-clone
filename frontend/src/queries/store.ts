import { API_PATH } from '@/constants/api-config';
import { Store } from '@/types/store';
import { useQuery } from '@tanstack/react-query';

export const useStore = (storeId?: string) => {
  return useQuery<Store>({
    queryKey: ['STORE', storeId],
    queryFn: async () => {
      if (!storeId) return null;

      const response = await fetch(`${API_PATH}/store/${storeId}`);

      return response.json();
    },
  });
};
