import { fromHex, fromUtf8, toHex, toUtf8 } from '../utils';
import { decodeBytes, encodeBytes } from './bytes';

describe('encodeBytes', () => {
  it('encodes a byte string to a buffer', () => {
    const bytes = toHex(fromUtf8('Lorem ipsum dolor sit amet, consectetur adipiscing elit'));
    expect(toHex(encodeBytes(new Uint8Array(0), bytes, 'bytes'))).toBe(
      '00000000000000000000000000000000000000000000000000000000000000374c6f72656d20697073756d20646f6c6f722073697420616d65742c20636f6e73656374657475722061646970697363696e6720656c6974000000000000000000'
    );
  });
});

describe('decodeBytes', () => {
  it('decodes a string from a buffer', () => {
    const value = fromHex(
      '000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000374c6f72656d20697073756d20646f6c6f722073697420616d65742c20636f6e73656374657475722061646970697363696e6720656c6974000000000000000000'
    );
    expect(toUtf8(decodeBytes(value, value, 'bytes'))).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
  });
});