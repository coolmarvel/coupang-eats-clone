import { useInfiniteScroll } from '@/libs/use-infinite-scroll';
import { useStores } from '@/queries/stores';

import { StoreListUI } from './Store-List-UI';

export const StoreList = () => {
  const { isLoading, data, error, hasNextPage, fetchNextPage, isFetching } = useStores();

  const loader = useInfiniteScroll(hasNextPage, isFetching, fetchNextPage);

  if (isLoading || !data || error) return null;

  return <StoreListUI {...{ data, isFetching, loader }} />;
};
