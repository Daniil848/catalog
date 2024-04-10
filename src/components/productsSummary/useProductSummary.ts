import { useAppSelector } from '../../app/hooks';

export const useProductSummary = () => {
  const state = useAppSelector((state) => state.mainSlice);

  return {
    state,
  };
};
