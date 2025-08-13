import React, { useState } from 'react';
import type { ChangeEvent } from 'react';

import useOptionStore from '@/stores/option';

import styles from './index.module.scss';
import type { OptionProps } from './index.types';
import SectionTitle from '@/components/SectionTitle';

const Option = ({ data }: OptionProps) => {
  const { origin, duration, frameRate, height, width } = data;

  const [isCustom, setIsCustom] = useState(false);
  const updateOption = useOptionStore((state) => state.updateOption);

  const handleChangeText = (
    e: ChangeEvent<HTMLInputElement>,
    key: string,
    max?: number
  ) => {
    let value = String(Number(e.target.value));
    const onlyDigit = new RegExp(/\d/, 'g');
    if (!value.match(onlyDigit)) return;

    if (max) value = Number(value) > max ? String(max) : value;

    if (key === 'height' || key === 'width') {
      const siblingKey = key === 'height' ? 'width' : 'height';
      const siblingValue =
        (Number(value) * Number(origin[siblingKey])) / Number(origin[key]);
      updateOption({
        [key]: value,
        [siblingKey]: String(Math.round(siblingValue)),
      });
    } else {
      updateOption({ [key]: value });
    }
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value !== 'custom') {
      updateOption({ frameRate: e.target.value });
    }
    setIsCustom(value === 'custom');
  };

  return (
    <div>
      <SectionTitle>Options</SectionTitle>
      <div className={styles.container}>
        <section>
          <label htmlFor="width">Width</label>
          <div className={styles.multipleInput}>
            <input
              type="number"
              id="width"
              min={1}
              value={width}
              onChange={(e) => handleChangeText(e, 'width')}
            />
            <input
              type="range"
              min={1}
              max={Number(origin.width) * 2}
              value={width}
              onChange={(e) => handleChangeText(e, 'width')}
            />
          </div>
        </section>
        <section>
          <label htmlFor="height">Height</label>
          <input
            type="number"
            id="height"
            min={1}
            value={height}
            onChange={(e) => handleChangeText(e, 'height')}
          />
        </section>
        <section>
          <label htmlFor="duration">Duration</label>
          <div className={styles.multipleInput}>
            <input
              type="number"
              id="duration"
              min={1}
              max={Number(origin.duration)}
              value={duration}
              onChange={(e) =>
                handleChangeText(e, 'duration', Number(origin.duration))
              }
            />
            <input
              type="range"
              min={1}
              max={Number(origin.duration)}
              step={0.1}
              value={duration}
              onChange={(e) => handleChangeText(e, 'duration')}
            />
          </div>
        </section>
        <section>
          <label htmlFor="frameRate">Frame Rate</label>
          <div className={styles.multipleInput}>
            <select id="frameRate" onChange={handleChangeSelect}>
              <option value="">Origin</option>
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="30">30</option>
              <option value="custom">Custom</option>
            </select>
            {isCustom && (
              <input
                type="number"
                value={frameRate}
                onChange={(e) => handleChangeText(e, 'frameRate')}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Option;
