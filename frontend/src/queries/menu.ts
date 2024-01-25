import { API_PATH } from '@/constants/api-config';
import { Menu } from '@/types/menu';
import { useQuery } from '@tanstack/react-query';

export const useMenu = (menuId: string) => {
  return useQuery<Menu>({
    queryKey: ['MENU', menuId],
    queryFn: async () => {
      const response = await fetch(`${API_PATH}/menu/${menuId}`);

      return response.json();
    },
  });
};
