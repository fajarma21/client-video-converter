import React, { type DragEvent } from 'react';
import { FaFileVideo } from 'react-icons/fa6';

import styles from './index.module.scss';
import type { UploaderProps } from './index.types';

const Uploader = ({ onClick, onUpload }: UploaderProps) => {
  const handleDrop = (e: DragEvent<HTMLButtonElement>, isDrop = false) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDrop) {
      const data = e.dataTransfer;
      const file = data.files[0];

      if (file) onUpload(file);
    }
  };

  return (
    <button
      type="button"
      className={styles.uploader}
      onDragEnter={handleDrop}
      onDragOver={handleDrop}
      onDragLeave={handleDrop}
      onDrop={(e) => handleDrop(e, true)}
      onClick={onClick}
    >
      <FaFileVideo size={40} className={styles.icon} />
      <p>
        Drop your video here
        <br />
        or click to upload
      </p>
    </button>
  );
};

export default Uploader;
