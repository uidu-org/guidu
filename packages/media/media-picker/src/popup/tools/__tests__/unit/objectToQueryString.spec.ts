import { objectToQueryString } from '../../objectToQueryString';

describe('#objectToQueryString', () => {
  it('should convert simple object', () => {
    let result = objectToQueryString({ key1: 1, key2: 'string', key3: false });
    expect(result).toBe('key1=1&key2=string&key3=false');
  });

  it('should convert complex object', () => {
    let result = objectToQueryString({ '%$^=': 1, key2: '&=%$' });
    expect(result).toBe('%25%24%5E%3D=1&key2=%26%3D%25%24');
  });
});
