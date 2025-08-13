import { CONDITIONS_BITRATE, CONDITIONS_SIZE } from '@/constants';
import type { VideoData } from '@/types';

import formatThousandUnit from '@/utils/formatThousandUnit';
import formatTime from '@/utils/formatTime';

export const getFormattedData = (data: VideoData) => {
  const { bitrate, duration, extension, height, size, width } = data;

  return {
    bitrate: formatThousandUnit(bitrate, CONDITIONS_BITRATE),
    dimension: `${width}x${height}`,
    duration: formatTime(Math.round(duration * 1000)),
    extension,
    size: formatThousandUnit(size, CONDITIONS_SIZE),
  };
};
