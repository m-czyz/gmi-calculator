import Big from 'big.js';
import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';

export const stringToBigTransformer: ValueTransformer = {
  to(value: any): any {
    return value?.toString();
  },
  from(value: Big): any {
    return Big(value);
  },
};
