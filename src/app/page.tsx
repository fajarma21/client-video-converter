'use client';

import { useEffect, useRef, useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { canUseDOM } from 'fajarma-package';

import Main from './components/Main';
import styles from './page.module.scss';

export default function Home() {
  const ffmpegRef = useRef<FFmpeg>(null);

  const [multiThread, setMultiThread] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (canUseDOM) {
      setMultiThread(window.crossOriginIsolated);
      console.log(
        `--- Cross Origin Isolated: ${!!window.crossOriginIsolated} ---`
      );
    }
    ffmpegRef.current = new FFmpeg();
    setInit(true);
  }, []);

  return (
    <div className={styles.page}>
      {init && <Main multiThread={multiThread} />}
    </div>
  );
}
