import roundNumber from 'fajarma-package/dist/number/roundNumber';

const twoDigit = (value: number) => {
  return `${value >= 10 ? '' : '0'}${value}`;
};

const formatTime = (milisecond: number) => {
  let value = milisecond;
  let h = 0;
  let m = 0;
  let s = 0;

  while (value) {
    if (value / 3600000 >= 1) {
      h = Math.floor(value / 3600000);
      value = value % 3600000;
    } else if (value / 60000 >= 1) {
      m = Math.floor(value / 60000);
      value = value % 60000;
    } else {
      s = roundNumber(value / 1000, 2);
      value = 0;
    }
  }

  return twoDigit(h) + ':' + twoDigit(m) + ':' + twoDigit(s);
};

export default formatTime;
