import type { VideoData } from '@/types';

export interface VideoContainerProps {
  data: VideoData;
  title?: string;
  onChange?: () => void;
  onRemove?: () => void;
}
