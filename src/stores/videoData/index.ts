import { create } from 'zustand';

import type { VideoDataStore } from './index.types';

const useVideoDataStore = create<VideoDataStore>((set) => ({
  originData: undefined,
  resultData: undefined,
  updateOriginData: (value) => {
    set(() => ({ originData: value }));
  },
  updateResultData: (value) => {
    set(() => ({ resultData: value }));
  },
}));

export default useVideoDataStore;
