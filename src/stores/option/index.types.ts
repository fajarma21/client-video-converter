import type { OptionData } from '@/types';

export interface OptionsStore {
  option: OptionData;
  updateOption: (value: Partial<OptionData>) => void;
  resetOption: () => void;
}
