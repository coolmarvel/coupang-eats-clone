import { API_PATH } from '@/constants/api-config';
import { OrderHistory } from '@/types/order';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useOrderHisotry = () => {
  const { data: session } = useSession();
  const { user } = session ?? {};

  return useQuery<OrderHistory[]>({
    queryKey: ['ORDER_HISTORY', user],
    queryFn: async () => {
      if (!user?.email) return null;

      const response = await fetch(
        `${API_PATH}/order/history?email=${user.email}`
      );

      return response.json();
    },
    refetchOnMount: 'always',
  });
};
