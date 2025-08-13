import roundNumber from 'fajarma-package/dist/number/roundNumber';
import { Contidition } from './index.types';

const formatThousandUnit = (value: number, conditions: Contidition[]) => {
  let result = '';

  const valueLength = String(value).length;
  for (const condition of conditions) {
    if (valueLength > condition.count) {
      result = `${roundNumber(value / Math.pow(10, condition.count), 2)} ${
        condition.unit
      }`;
      break;
    }
  }

  return result;
};

export default formatThousandUnit;
