import React from 'react';
import styles from './index.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>
        Powered by{' '}
        <a href="https://ffmpegwasm.netlify.app/" target="_blank">
          ffmpeg.wasm
        </a>
      </p>
    </div>
  );
};

export default Footer;
