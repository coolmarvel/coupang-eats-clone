import { useAtomValue } from 'jotai';
import Link from 'next/link';

import { currentCategoryAtom } from '@/atoms/current-category';
import { storeIdAtom } from '@/atoms/store-id';
import { ScrollTabs } from '@/components/common/scroll-tabs';
import { getUniqueCategories } from '@/libs/get-unique-categories';
import { useStoreMenus } from '@/queries/menus';

export const MenuCategories = () => {
  const storeId = useAtomValue(storeIdAtom);
  const currentCategory = useAtomValue(currentCategoryAtom);
  const { data } = useStoreMenus(storeId);

  if (!data) return null;

  const categories = getUniqueCategories(data);

  return (
    <ScrollTabs>
      {categories.map((category) => (
        <Link
          key={category}
          className={`${category === currentCategory ? 'border-b border-b-blue-500 font-bold text-blue-500 ' : ''}py-2 whitespace-nowrap px-4`}
          href={`#${category}`}
        >
          {category}
        </Link>
      ))}
    </ScrollTabs>
  );
};
