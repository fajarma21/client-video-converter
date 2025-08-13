import type { FFmpeg } from '@ffmpeg/ffmpeg';
import type { RefObject } from 'react';

export interface UseTranscodeParams {
  ffmpegRef: RefObject<FFmpeg | null>;
  handleLoadFFmpeg: () => void;
}
