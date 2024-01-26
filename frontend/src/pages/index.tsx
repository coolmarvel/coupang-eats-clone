import { useSession } from 'next-auth/react';

import { CategoryFilters } from '@/components/category-filter';
import { BottomNav } from '@/components/common/bottom-nav';
import { CartButton } from '@/components/common/cart-button';
import { MainSearchBar } from '@/components/search-bar/Main';
import { StoreList } from '@/components/store-list';

export default function Home() {
  const { data } = useSession();

  return (
    <>
      <div className="pb-16">
        <MainSearchBar userName={data?.user?.name} />
        <CategoryFilters cols={4} />
        <h3 className="pl-8 text-xl font-bold">골라먹는 맛집</h3>
        <StoreList />
      </div>
      <BottomNav />
      <CartButton />
    </>
  );
}
