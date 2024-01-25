import { API_PATH } from '@/constants/api-config';
import { ReviewMenu } from '@/types/review';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useSubmitReview = () => {
  const { data: session } = useSession();
  const { user } = session ?? {};

  return useMutation({
    mutationFn: async ({
      order,
      store,
      review,
      rating,
      image,
      menus,
    }: {
      order: string;
      store: string;
      review?: string;
      rating: number;
      image?: string;
      menus: ReviewMenu[];
    }) => {
      if (
        !order ||
        !store ||
        typeof rating !== 'number' ||
        !menus.length ||
        !user
      )
        throw new Error('Invalid input');

      return fetch(`${API_PATH}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application.json' },
        body: JSON.stringify({
          user,
          menus,
          store,
          image,
          review,
          order,
          rating,
        }),
      });
    },
  });
};
