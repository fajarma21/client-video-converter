import React, { useRef, type ChangeEvent } from 'react';

import useOptionStore from '@/stores/option';
import useVideoDataStore from '@/stores/videoData';
import useProgressStore from '@/stores/progress';
import { getData } from '@/utils/getData';
import useVideoFileStore from '@/stores/videoFile';
import useLoadFFmpeg from '@/hooks/useLoadFFmpeg';

import FFmpegLoader from './components/FFmpegLoader';
import VideoContainer from './components/VideoContainer';
import Convert from './components/Convert';
import Uploader from './components/Uploader';
import Option from './components/Option';
import styles from './index.module.scss';
import { ACCEPTED_VIDEO } from './index.constants';
import type { MainProps } from './index.types';
import useTranscode from '@/hooks/useTranscode';

const Main = ({ multiThread }: MainProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const converting = useProgressStore((state) => state.converting);
  const isError = useProgressStore((state) => state.isError);
  const progress = useProgressStore((state) => state.progress);
  const updateProgress = useProgressStore((state) => state.updateProgress);
  const resetProgress = useProgressStore((state) => state.resetProgress);

  const option = useOptionStore((state) => state.option);
  const updateOption = useOptionStore((state) => state.updateOption);
  const resetOption = useOptionStore((state) => state.resetOption);

  const originData = useVideoDataStore((state) => state.originData);
  const resultData = useVideoDataStore((state) => state.resultData);
  const updateOriginData = useVideoDataStore((state) => state.updateOriginData);
  const updateResultData = useVideoDataStore((state) => state.updateResultData);

  const updateVideoFile = useVideoFileStore((state) => state.updateVideoFile);

  const { ffmpegRef, loadingFFmpeg, handleLoadFFmpeg } = useLoadFFmpeg({
    multiThread,
  });
  const { handleTranscode } = useTranscode({ ffmpegRef, handleLoadFFmpeg });

  const handleRemoveResult = () => {
    updateProgress(0);
    updateResultData();
  };

  const handleUpload = async (file: File) => {
    resetOption();
    resetProgress();

    if (!file.type.startsWith('video/')) return;

    updateVideoFile(file);
    handleRemoveResult();

    try {
      const result = await getData(file);
      const newOption = {
        height: `${result.height}`,
        width: `${result.width}`,
        duration: `${result.duration}`,
        extension: 'mp4',
        frameRate: '',
      };
      updateOption({
        origin: newOption,
        ...newOption,
      });
      updateOriginData(result);
      handleLoadFFmpeg();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) handleUpload(files[0]);
  };

  const handleClickUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const isFinished = progress >= 100 && Boolean(resultData);

  return (
    <div className={styles.container}>
      {originData ? (
        <VideoContainer data={originData} onChange={handleClickUpload} />
      ) : (
        <Uploader onClick={handleClickUpload} onUpload={handleUpload} />
      )}

      {loadingFFmpeg ? (
        <FFmpegLoader />
      ) : converting || isFinished ? (
        <Convert />
      ) : (
        <>
          {isError && <Convert />}
          {Boolean(option.id) && (
            <>
              <Option data={option} />
              <button className={styles.convertBtn} onClick={handleTranscode}>
                Convert
              </button>
            </>
          )}
        </>
      )}

      {resultData && !converting && !isError && (
        <VideoContainer
          title="Result"
          data={resultData}
          onRemove={handleRemoveResult}
        />
      )}

      <input
        ref={inputRef}
        hidden
        type="file"
        accept={ACCEPTED_VIDEO}
        onChange={handleChangeUpload}
      />
    </div>
  );
};

export default Main;
