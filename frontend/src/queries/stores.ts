import { storeFilterAtom } from '@/atoms/store-filter';
import { API_PATH } from '@/constants/api-config';
import { removeEmpty } from '@/libs/object-utils';
import { Store } from '@/types/store';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

const STORE_PER_PAGE = 3;

export const useStores = () => {
  const params = useAtomValue(storeFilterAtom);

  return useInfiniteQuery<Store[]>({
    queryKey: ['STORES', params],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `${API_PATH}/store?${new URLSearchParams(
          removeEmpty({
            sort: params.sort,
            maxDeliveryPrice: String(params.maxDeliveryPrice),
            minOrderPrice: String(params.minOrderPrice),
            page: String(pageParam),
            limit: String(STORE_PER_PAGE),
          })
        )}`
      );

      return response.json();
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === STORE_PER_PAGE) return allPages.length + 1;
    },
  });
};
