import { fromUtf8, toUtf8 } from '../utils';
import { decodeBytes, encodeBytes } from './bytes';
import { DecodeFunction, EncodeFunction } from './parser';

export const encodeString: EncodeFunction = (buffer: Uint8Array, value: string): Uint8Array => {
  const bufferValue = fromUtf8(value);
  return encodeBytes(buffer, bufferValue, 'bytes');
};

export const decodeString: DecodeFunction = (value: Uint8Array, buffer: Uint8Array): string => {
  return toUtf8(decodeBytes(value, buffer, 'string'));
};
