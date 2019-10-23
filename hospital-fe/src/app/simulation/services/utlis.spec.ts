import { mapToArray } from './utils';

describe('Utilities', () => {

  it('should convert empty string to empty array', () => {
    expect(mapToArray('')).toEqual([]);
  });
  it('should convert "a,b,c" string to array ["a","b","c"]', () => {
    expect(mapToArray('a,b,c')).toEqual(['a', 'b', 'c']);
  });
});
