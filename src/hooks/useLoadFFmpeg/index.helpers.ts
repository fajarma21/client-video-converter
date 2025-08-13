import { BASE_MT_URL, BASE_URL } from './index.constants';

export const getURLs = (enableMT: boolean) => {
  const baseURL = enableMT ? BASE_MT_URL : BASE_URL;
  return {
    coreURL: `${baseURL}/ffmpeg-core.js`,
    wasmURL: `${baseURL}/ffmpeg-core.wasm`,
    workerURL: enableMT ? `${baseURL}/ffmpeg-core.worker.js` : undefined,
  };
};
