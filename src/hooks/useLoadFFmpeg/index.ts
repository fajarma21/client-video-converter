import { useCallback, useEffect, useRef, useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

import useProgressStore from '@/stores/progress';

import { getURLs } from './index.helpers';
import type { UseLoadFFmpegParams } from './index.types';

const useLoadFFmpeg = ({ multiThread }: UseLoadFFmpegParams) => {
  const ffmpegRef = useRef<FFmpeg>(null);
  const ffmpegCoreReady = useRef(false);

  const [loadingFFmpeg, setLoadingFFmpeg] = useState(false);

  const updateMessage = useProgressStore((state) => state.updateMessage);
  const updateProgress = useProgressStore((state) => state.updateProgress);

  const handleLoadFFmpeg = useCallback(async () => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg || ffmpegCoreReady.current) return;
    console.log('--- loading ffmpeg core ---');
    setLoadingFFmpeg(true);

    ffmpeg.on('log', ({ message }) => {
      if (message.toLowerCase() !== 'aborted()') updateMessage(message);
    });
    ffmpeg.on('progress', ({ progress: p }) => {
      updateProgress(p);
    });

    const { coreURL, wasmURL, workerURL } = getURLs(multiThread);

    await ffmpeg.load({
      coreURL: await toBlobURL(coreURL, 'text/javascript'),
      wasmURL: await toBlobURL(wasmURL, 'application/wasm'),
      workerURL: workerURL
        ? await toBlobURL(workerURL, 'text/javascript')
        : undefined,
    });

    console.log('--- ffmpeg core loaded ---');
    ffmpegCoreReady.current = true;
    setLoadingFFmpeg(false);
  }, [multiThread, updateMessage, updateProgress]);

  useEffect(() => {
    if (!ffmpegRef.current) {
      ffmpegRef.current = new FFmpeg();
      console.log('--- ffmpeg ready ---');
    }
  }, []);

  return { ffmpegRef, loadingFFmpeg, handleLoadFFmpeg };
};

export default useLoadFFmpeg;
