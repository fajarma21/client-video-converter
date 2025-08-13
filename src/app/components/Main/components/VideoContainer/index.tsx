import React from 'react';
import { FaFileVideo, FaTrash } from 'react-icons/fa6';

import Data from './components/Data';
import styles from './index.module.scss';
import type { VideoContainerProps } from './index.types';
import SectionTitle from '@/components/SectionTitle';

const VideoContainer = ({
  data,
  title,
  onChange,
  onRemove,
}: VideoContainerProps) => {
  return (
    <>
      {title && <SectionTitle>{title}</SectionTitle>}
      <div className={styles.container}>
        <video src={data.url} controls />
        <Data data={data} />
        {onRemove && (
          <button
            type="button"
            className={styles.smallBtn}
            data-type="remove"
            onClick={onRemove}
          >
            <FaTrash size={12} />
          </button>
        )}
        {onChange && (
          <button
            type="button"
            className={styles.smallBtn}
            data-type="change"
            onClick={onChange}
          >
            <FaFileVideo size={12} />
          </button>
        )}
      </div>
    </>
  );
};

export default VideoContainer;
