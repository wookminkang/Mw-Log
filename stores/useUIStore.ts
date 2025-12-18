import { create } from "zustand";

type SEARCH_TPYE = {
  isSearchState: boolean;
  handleSearchState: () => void;
};

export const useUISearchStore = create<SEARCH_TPYE>((set) => {
  return {
    isSearchState: false,
    handleSearchState: () => {
      set((state) => {
        return {
          isSearchState: !state.isSearchState,
        };
      });
    },
  };
});
