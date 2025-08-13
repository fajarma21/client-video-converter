import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { roundNumber } from 'fajarma-package';

import useProgressStore from '@/stores/progress';
import useVideoFileStore from '@/stores/videoFile';
import useOptionStore from '@/stores/option';
import { getData } from '@/utils/getData';

import { generateCommand, getFileName } from './index.helpers';
import useVideoDataStore from '@/stores/videoData';
import type { UseTranscodeParams } from './index.types';

const useTranscode = ({ ffmpegRef, handleLoadFFmpeg }: UseTranscodeParams) => {
  const videoFile = useVideoFileStore((state) => state.videoFile);

  const option = useOptionStore((state) => state.option);
  const { extension } = option;

  const startConverting = useProgressStore((state) => state.startConverting);
  const finishConverting = useProgressStore((state) => state.finishConverting);
  const convertError = useProgressStore((state) => state.convertError);

  const updateResultData = useVideoDataStore((state) => state.updateResultData);

  const transcode = async (file: File) => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return;

    const { name } = file;
    startConverting(name);

    try {
      const startTime = performance.now();

      const resultName = `${getFileName(name)}_output.${extension}`;
      await ffmpeg.writeFile(name, await fetchFile(file));

      const command = generateCommand(option);
      await ffmpeg.exec(['-i', name, '-c:a', 'copy', ...command, resultName]);
      const data = await ffmpeg.readFile(resultName);

      if (typeof data !== 'string') {
        const buffer = data.buffer as BlobPart;
        const outputFile = new File([buffer], resultName, {
          type: `video/${extension}`,
        });

        if (outputFile.size < 100) throw new Error('Unknown Error');

        const result = await getData(outputFile);
        updateResultData(result);

        const endTime = performance.now();
        const timeSecond = (endTime - startTime) / 1000;
        const time = roundNumber(timeSecond, 2);
        finishConverting(time);
      }
    } catch (error) {
      convertError(String(error));
      ffmpegRef.current = new FFmpeg();
      console.log('--- ffmpeg core need to be reloaded ---');
      handleLoadFFmpeg();
    }
  };

  const handleTranscode = () => {
    if (videoFile) transcode(videoFile);
  };

  return { handleTranscode };
};

export default useTranscode;
