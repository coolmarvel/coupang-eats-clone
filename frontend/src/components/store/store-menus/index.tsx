import { useAtomValue } from 'jotai';

import { storeIdAtom } from '@/atoms/store-id';
import { useStoreMenus } from '@/queries/menus';

import { MenuCategories } from './Menu-Categories';
import { MenuList } from './Menu-List';

export const StoreMenus = () => {
  const storeId = useAtomValue(storeIdAtom);
  const { data } = useStoreMenus(storeId);

  if (!data) return null;

  return (
    <>
      <MenuCategories />
      <MenuList />
    </>
  );
};
