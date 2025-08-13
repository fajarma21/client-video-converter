import type { OptionData } from '@/types';

export const getFileName = (name: string) => {
  return name.replace(/\.(\w|\d)*$/, '');
};

export const generateCommand = ({
  duration,
  frameRate,
  height,
  width,
}: OptionData) => {
  const getValidDimension = (value: number) => {
    const valid = value % 2 ? value + 1 : value;
    return String(valid);
  };

  const command = [];

  if (Number(duration)) command.push(...['-t', duration]);
  if (Number(frameRate)) command.push(...['-r', frameRate]);
  if (Number(height) && Number(width)) {
    const validW = getValidDimension(Number(width));
    const validH = getValidDimension(Number(height));
    command.push(...['-s', `${validW}x${validH}`]);
  }

  return command;
};
