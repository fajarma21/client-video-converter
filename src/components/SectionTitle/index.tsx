import React from 'react';

import styles from './index.module.scss';
import type { SectionTitleProps } from './index.types';

const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <div className={styles.container}>
      <h3>{children}</h3>
    </div>
  );
};

export default SectionTitle;
