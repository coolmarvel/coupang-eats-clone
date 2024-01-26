import { Fragment } from 'react';

import { useAtomValue } from 'jotai';

import { storeIdAtom } from '@/atoms/store-id';
import { getUniqueCategories } from '@/libs/get-unique-categories';
import { useStoreMenus } from '@/queries/menus';

import { MenuInCategory } from './Menu-In-Category';

export const MenuList = () => {
  const storeId = useAtomValue(storeIdAtom);
  const { data } = useStoreMenus(storeId);

  if (!data) return null;

  const categories = getUniqueCategories(data);

  return (
    <div className="grid gap-4 px-4">
      {categories.map((category) => (
        <Fragment key={category}>
          <MenuInCategory {...{ category, data }} />
        </Fragment>
      ))}
    </div>
  );
};
