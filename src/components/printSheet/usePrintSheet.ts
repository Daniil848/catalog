import { useAppSelector } from '../../app/hooks';

export const usePrintSheet = () => {
  const state = useAppSelector((state) => state.mainSlice);

  return {
    state,
  };
};
