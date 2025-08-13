import { create } from 'zustand';

import type { OptionsStore } from './index.types';
import { DEFAULT_OPTION } from './index.constants';

const useOptionStore = create<OptionsStore>((set) => ({
  option: DEFAULT_OPTION,
  updateOption: (value) => {
    set((state) => ({
      option: { ...state.option, id: state.option.id + 1, ...value },
    }));
  },
  resetOption: () => set({ option: DEFAULT_OPTION }),
}));

export default useOptionStore;
