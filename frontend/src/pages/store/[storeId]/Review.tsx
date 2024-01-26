import { GetServerSideProps } from 'next';

import { CartButton } from '@/components/common/cart-button';
import { StoreReviewList } from '@/components/store-reviews/Store-Review-List';
import { StoreReviewTop } from '@/components/store-reviews/Store-Review-Top';

export default function StoreReviews({ storeId }: { storeId: string }) {
  return (
    <>
      <StoreReviewTop {...{ storeId }} />
      <StoreReviewList {...{ storeId }} />
      <CartButton />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { storeId } = context.query;

  return { props: { storeId } };
};
