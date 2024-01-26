import { useState } from 'react';

import { ReviewSort } from '@/constants/review';
import { useInfiniteScroll } from '@/libs/use-infinite-scroll';
import { useStoreReviews } from '@/queries/store-review';

import { StoreReviewCard } from './Store-Reivew-Card';
import { StoreReviewFilter } from './Store-Review-Filter';

export function StoreReviewList({ storeId }: { storeId: string }) {
  const [sort, setSort] = useState<ReviewSort>(ReviewSort.RECENT);
  const [photo, setPhoto] = useState<boolean>(false);
  const { isLoading, data, error, fetchNextPage, hasNextPage, isFetching } = useStoreReviews({
    storeId,
    photo,
    sort,
  });
  const loader = useInfiniteScroll(hasNextPage, isFetching, fetchNextPage);

  if (!data || isLoading || error) return null;

  return (
    <>
      <StoreReviewFilter {...{ setPhoto, setSort, sort }} />
      {data.pages?.map((page) =>
        page.map((review) => (
          <div className="p-4" key={review._id}>
            <StoreReviewCard {...{ review }} />
          </div>
        ))
      )}
      {!isLoading && !isFetching && <div ref={loader}></div>}
    </>
  );
}
