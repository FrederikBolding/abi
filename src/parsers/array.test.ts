import { fromHex, toHex } from '../utils';
import { decodeArray, encodeArray, getType, isArray } from './array';

describe('isArray', () => {
  it('checks if a type is an array type', () => {
    expect(isArray('string[]')).toBe(true);
    expect(isArray('uint256[]')).toBe(true);
    expect(isArray('string[][]')).toBe(true);

    // TODO
    // expect(isArray('string[5]')).toBe(true);

    expect(isArray('string')).toBe(false);
    expect(isArray('uint256')).toBe(false);
    expect(isArray('uint256[')).toBe(false);
  });
});

describe('getType', () => {
  it('returns the type of an array', () => {
    expect(getType('string[]')).toBe('string');
    expect(getType('uint256[]')).toBe('uint256');
    expect(getType('string[][]')).toBe('string[]');
  });
});

describe('encodeArray', () => {
  it('encodes an array with single type', () => {
    expect(toHex(encodeArray(new Uint8Array(0), ['foo', 'bar', 'baz'], 'string[]'))).toBe(
      '0000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000003666f6f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000036261720000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000362617a0000000000000000000000000000000000000000000000000000000000'
    );
    expect(toHex(encodeArray(new Uint8Array(0), [1n, 2n, 3n], 'uint256[]'))).toBe(
      '0000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003'
    );
  });

  it('throws if a type is not an array type', () => {
    expect(() => encodeArray(new Uint8Array(0), ['foo', 'bar', 'baz'], 'string')).toThrow();
  });
});

describe('decodeArray', () => {
  it('throws if a type is not an array type', () => {
    const buffer = fromHex(
      '0000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000003666f6f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000036261720000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000362617a0000000000000000000000000000000000000000000000000000000000'
    );
    expect(() => decodeArray(new Uint8Array(0), buffer, 'string')).toThrow();
  });
});