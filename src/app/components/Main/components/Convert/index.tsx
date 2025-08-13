import React, { useEffect, useState, type CSSProperties } from 'react';

import useProgressStore from '@/stores/progress';

import Messages from './components/Messages';
import styles from './index.module.scss';
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';

const Convert = () => {
  const [displayLogs, setDisplayLogs] = useState(false);

  const converting = useProgressStore((state) => state.converting);
  const isError = useProgressStore((state) => state.isError);
  const progress = useProgressStore((state) => state.progress);
  const time = useProgressStore((state) => state.time);

  useEffect(() => {
    setDisplayLogs(converting);
  }, [converting]);

  const toggleDisplay = () => {
    setDisplayLogs((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.animated}
        data-spin={converting || undefined}
        style={
          {
            '--color': isError ? 'orangered' : 'var(--accent)',
            '--width': `${25 + Math.min(progress, 75)}%`,
          } as CSSProperties
        }
      />
      <div className={styles.inner}>
        <div className={styles.head}>
          {converting ? (
            <>
              <p>Converting... </p>
              <p>{Math.round(progress)}%</p>
            </>
          ) : (
            <>
              <p>{isError ? 'Error' : `Finished in ${time} seconds`}</p>
              <button
                type="button"
                className={styles.logsBtn}
                onClick={toggleDisplay}
              >
                {displayLogs ? (
                  <FaChevronCircleUp size={12} />
                ) : (
                  <FaChevronCircleDown size={12} />
                )}
              </button>
            </>
          )}
        </div>
        <Messages display={displayLogs} />
      </div>
    </div>
  );
};

export default Convert;
