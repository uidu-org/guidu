import { truncateUrlForErrorView } from '../../utils';

describe('truncateUrlForErrorView', () => {
  it('should chop off the protocol', () => {
    const actual = truncateUrlForErrorView('http://example.com/abc?q=2');
    expect(actual).toEqual('example.com/abc?q=2');
  });

  it('should chop off the secure protocol', () => {
    const actual = truncateUrlForErrorView('https://example.com/abc?q=2');
    expect(actual).toEqual('example.com/abc?q=2');
  });

  it('should chop off the secure protocol, but leave www', () => {
    const actual = truncateUrlForErrorView('https://www.example.com/abc?q=2');
    expect(actual).toEqual('www.example.com/abc?q=2');
  });

  it('should crop the url to the default length of 40 symbols + 3 dots', () => {
    const actual = truncateUrlForErrorView(
      'https://example.com/lorem/ipsum/dolor/sit/amet/consectetur/adipiscing/volutpat/',
    );
    expect(actual).toEqual('example.com/lorem/ipsum/dolor/sit/amet/c...');
  });

  it('should crop the url to a specified width', () => {
    const actual = truncateUrlForErrorView(
      'https://example.com/lorem/ipsum/dolor/sit/amet/consectetur/adipiscing/volutpat/',
      20,
    );
    expect(actual).toEqual('example.com/lorem/ip...');
  });
});
