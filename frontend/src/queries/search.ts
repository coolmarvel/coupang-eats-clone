import { searchQueryAtom } from '@/atoms/search';
import { storeFilterAtom } from '@/atoms/store-filter';
import { API_PATH } from '@/constants/api-config';
import { removeEmpty } from '@/libs/object-utils';
import { Store } from '@/types/store';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

export const useSearch = () => {
  const query = useAtomValue(searchQueryAtom);
  const storeFilter = useAtomValue(storeFilterAtom);

  return useQuery<Store[]>({
    queryKey: ['SEARCH', { query, storeFilter }],
    queryFn: async () => {
      const response = await fetch(
        `${API_PATH}/store/search/${query}?${new URLSearchParams(
          removeEmpty({
            sort: storeFilter.sort,
            maxDeliveryPrice: String(storeFilter.maxDeliveryPrice),
            minOrderPrice: String(storeFilter.minOrderPrice),
          })
        )}`
      );

      return response.json();
    },
  });
};
