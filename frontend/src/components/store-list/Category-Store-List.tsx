import { StoreCategory } from '@/constants/store-category';
import { useCategoryStores } from '@/queries/category';

import { useInfiniteScroll } from '../../libs/use-infinite-scroll';

import { StoreListUI } from './Store-List-UI';

export const CategoryStoreList = ({ category }: { category?: StoreCategory }) => {
  const { isLoading, data, error, hasNextPage, fetchNextPage, isFetching } = useCategoryStores(category);

  const loader = useInfiniteScroll(hasNextPage, isFetching, fetchNextPage);

  if (isLoading || !data || error) return null;

  return <StoreListUI {...{ data, isFetching, loader }} />;
};
