import Autolinker from 'autolinker';
import queryString from 'query-string';

export const autolinker = new Autolinker({
  urls: true,
  email: true,
  hashtag: 'twitter',
  truncate: {
    length: 32,
    location: 'middle',
  },
  replaceFn: match => {
    switch (match.getType()) {
      case 'url': {
        let urlParams = {};
        let url = match.getUrl();
        if (url.indexOf('?') >= 0) {
          urlParams = queryString.parse(url.split('?')[1]);
          [url] = url.split('?');
        }
        urlParams.utm_source = 'uidu';
        urlParams.utm_medium = 'social';
        return `<a href="${url}?${queryString.stringify(
          urlParams,
        )}">${match.getUrl()}</a>`;
      }
      case 'hashtag':
        return `<a href="/search?q=${match.getHashtag()}">#${match.getHashtag()}</a>`;
      default:
        return match;
    }
  },
});
