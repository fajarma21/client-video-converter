import type { DimensionData, RateData, VideoData } from '@/types';

const getError = (source: string, error: string | Event) => {
  return JSON.stringify({ source, error });
};

const getRateData = (url: string, size: number): Promise<RateData> => {
  return new Promise((resolve, reject) => {
    const media = new Audio(url);
    media.onloadedmetadata = () => {
      const bitrate = (size * 8) / media.duration;
      resolve({
        duration: media.duration,
        bitrate: Math.round(bitrate),
      });
    };
    media.onerror = (error) => reject(getError('getRateData', error));
  });
};

const getDimension = (url: string): Promise<DimensionData> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.setAttribute('src', url);
    video.onloadedmetadata = () => {
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
      });
    };
    video.onerror = (error) => reject(getError('getDimension', error));
  });
};

const getExtension = (name: string) => {
  const splitted = name.split('.');
  return splitted[splitted.length - 1];
};

export const getData = (file: File): Promise<VideoData> => {
  return new Promise((resolve, reject) => {
    const { name, size } = file;
    const reader = new FileReader();
    reader.onload = async () => {
      const videoUrl = String(reader.result);
      const rate = await getRateData(videoUrl, size);
      const dimension = await getDimension(videoUrl);

      resolve({
        ...rate,
        ...dimension,
        extension: getExtension(name),
        size,
        url: videoUrl,
        frameRate: 0,
      });
    };
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(getError('getData', error));
  });
};
