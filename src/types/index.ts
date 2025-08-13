export interface DimensionData {
  height: number;
  width: number;
}

export interface RateData {
  duration: number;
  bitrate: number;
}

export interface VideoData extends DimensionData, RateData {
  extension: string;
  frameRate: number;
  size: number;
  url: string;
}

interface Option {
  duration: string;
  extension: string;
  frameRate: string;
  height: string;
  width: string;
}

export interface OptionData extends Option {
  origin: Option;
  id: number;
}
