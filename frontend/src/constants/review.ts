export const ReviewSort = {
  RECENT: 'RECENT',
  RATING_DESC: 'RATING_DESC',
  RATING_ASC: 'RATING_ASC',
} as const;

export type ReviewSort = (typeof ReviewSort)[keyof typeof ReviewSort];

export const ReviewSortIndex = {
  [ReviewSort.RECENT]: '최신순',
  [ReviewSort.RATING_ASC]: '별점 낮은순',
  [ReviewSort.RATING_DESC]: '별점 높은순',
};

export type ReviewSortIndex =
  (typeof ReviewSortIndex)[keyof typeof ReviewSortIndex];
