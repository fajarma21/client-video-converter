import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

import styles from './index.module.scss';
import { getFormattedData } from './index.helpers';
import type { DataProps } from './index.types';

const Data = ({ data }: DataProps) => {
  const { bitrate, dimension, duration, extension, size } =
    getFormattedData(data);

  const [displayData, setDisplayData] = useState(false);

  const toggleDisplayData = () => {
    setDisplayData((prev) => !prev);
  };

  return (
    <>
      {displayData && (
        <div className={styles.dataContainer}>
          <table>
            <tbody>
              <tr>
                <td>Extension</td>
                <td>{extension}</td>
              </tr>
              <tr>
                <td>Dimension</td>
                <td>{dimension}</td>
              </tr>
              <tr>
                <td>Size</td>
                <td>{size}</td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>{duration}</td>
              </tr>
              <tr>
                <td>Bitrate</td>
                <td>{bitrate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <button
        type="button"
        className={styles.dataBtn}
        onClick={toggleDisplayData}
      >
        Data{' '}
        {displayData ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
      </button>
    </>
  );
};

export default Data;
