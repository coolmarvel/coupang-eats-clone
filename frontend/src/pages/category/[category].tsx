import { GetStaticPropsContext, NextPageContext } from 'next';

import { CategoryTabs } from '@/components/category-filter/Category';
import { CartButton } from '@/components/common/Cart-Button';
import { CategoryHeader } from '@/components/header/Category';
import { CategoryStoreList } from '@/components/store-list/Category-Store-List';
import { StoreCategory } from '@/constants/store-category';

export default function Category({ category }: { category: string }) {
  const currentCategory = category in StoreCategory ? StoreCategory[category as StoreCategory] : undefined;

  return (
    <>
      <CategoryHeader>{currentCategory}</CategoryHeader>
      <CategoryTabs category={currentCategory} />
      <CategoryStoreList category={currentCategory} />
      <CartButton />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const category = context.params?.category;
  return {
    props: { category },
  };
}

export async function getStaticPaths() {
  return {
    paths: Object.values(StoreCategory).map((category) => ({
      params: {
        category,
      },
    })),
    fallback: false,
  };
}
