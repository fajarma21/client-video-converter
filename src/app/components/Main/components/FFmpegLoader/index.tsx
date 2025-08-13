import React from 'react';
import styles from './index.module.scss';

const FFmpegLoader = () => {
  return (
    <div className={styles.container}>
      <p>Loading FFMpeg core</p>
      <div className={styles.loader} />
    </div>
  );
};

export default FFmpegLoader;
