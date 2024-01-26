import { useEffect } from 'react';

import { useSetAtom } from 'jotai';
import { GetServerSidePropsContext } from 'next';

import { storeIdAtom } from '@/atoms/store-id';
import { CartButton } from '@/components/common/Cart-Button';
import { StoreDescription } from '@/components/store/store-description';
import { StoreHeader } from '@/components/store/store-header';
import { StoreMenus } from '@/components/store/store-menus';

export default function Store({ storeId }: { storeId: string }) {
  const setStoreId = useSetAtom(storeIdAtom);

  useEffect(() => {
    setStoreId(storeId);
  }, [setStoreId, storeId]);

  return (
    <>
      <StoreHeader />
      <StoreDescription />
      <StoreMenus />
      <CartButton />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { storeId } = context.query ?? {};

  return { props: { storeId } };
}
