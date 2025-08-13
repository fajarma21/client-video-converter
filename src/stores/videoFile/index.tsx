import { create } from 'zustand';

import type { VideoFileStore } from './index.types';

const useVideoFileStore = create<VideoFileStore>((set) => ({
  videoFile: undefined,
  updateVideoFile: (value) => {
    set(() => ({ videoFile: value }));
  },
}));

export default useVideoFileStore;
