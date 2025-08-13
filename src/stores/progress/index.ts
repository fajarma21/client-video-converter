import { create } from 'zustand';

import type { ProgressStore } from './index.types';

const useProgressStore = create<ProgressStore>((set) => ({
  converting: false,
  isError: false,
  progress: 0,
  messages: [],
  time: 0,
  updateProgress: (value) => {
    set(() => ({ progress: value > 100 ? 0 : value * 100 }));
  },
  updateMessage: (value) => {
    set((state) => ({ messages: [...state.messages, value] }));
  },
  startConverting: (name) => {
    set((state) => ({
      converting: true,
      messages: [...state.messages, `----- start converting ${name} -----`],
    }));
  },
  finishConverting: (time) => {
    set((state) => ({
      converting: false,
      messages: [...state.messages, '----- finished -----'],
      time,
    }));
  },
  convertError: (error) => {
    set((state) => ({
      converting: false,
      isError: true,
      messages: [
        ...state.messages,
        `something went wrong: ${error}`,
        '----- terminated -----',
      ],
      progress: 0,
    }));
  },
  resetProgress: () => {
    set(() => ({
      isError: false,
    }));
  },
}));

export default useProgressStore;
