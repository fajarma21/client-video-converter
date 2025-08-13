import type { VideoData } from '@/types';

export interface VideoDataStore {
  originData?: VideoData;
  resultData?: VideoData;
  updateOriginData: (value?: VideoData) => void;
  updateResultData: (value?: VideoData) => void;
}
