import { css } from 'styled-components';
import axios from 'axios';
import getUrls from 'get-urls';

const REGEX_HTTPS = /^https/;
const REGEX_LOCALHOST = /http:\/\/localhost/;

export const isFunction = fn => typeof fn === 'function';

export const isObject = obj => typeof obj === 'object';

export const isNil = value => value == null;

export const getUrlPath = data => (data && isObject(data) ? data.url : data);

export const someProp = (data, props) =>
  data[props.find(prop => data[prop] !== null && data[prop] !== undefined)];

export const media = {
  mobile: (...args) => css`
    @media (max-width: 48em) {
      ${css(...args)};
    }
  `,
  desktop: (...args) => css`
    @media (min-width: 48em) {
      ${css(...args)};
    }
  `,
};

const apiValue = (key, value) =>
  value === true ? `${key}` : `${key}=${value}`;

export const defaultApiParameters = {
  video: false,
  contrast: false,
  screenshot: false,
  prerender: 'auto',
};

export const createApiUrl = props => {
  const { apiKey, url: targetUrl, prerender, contrast, media } = props;
  const takeScreenshot = media.includes('screenshot');
  const hasVideo = media.includes('video');

  let url = `https://p2jxzlrab4.execute-api.eu-west-1.amazonaws.com/dev?url=${encodeURIComponent(
    targetUrl,
  )}`;

  if (hasVideo) {
    url = `${url}&${apiValue('video', hasVideo)}`;
  }

  if (!isNil(contrast) && contrast !== defaultApiParameters.contrast) {
    url = `${url}&${apiValue('palette', contrast)}`;
  }

  if (!isNil(prerender) && prerender !== defaultApiParameters.prerender) {
    url = `${url}&${apiValue('prerender', prerender)}`;
  }

  if (takeScreenshot) {
    url = `${url}&${apiValue('screenshot', takeScreenshot)}`;
  }

  return url;
};

export const fetchFromApiUrl = ({ apiKey, apiUrl }, source) => {
  const headers = apiKey ? { 'x-api-key': apiKey } : {};
  console.log(source);
  return axios.get(apiUrl, { headers, cancelToken: source.token }).then(res => {
    console.log(res);
    return res.data;
  });
};

export const fetchFromApi = (props, source) => {
  const apiUrl = createApiUrl(props);
  return fetchFromApiUrl({ apiUrl, ...props }, source);
};

export const isLarge = cardSize => cardSize === 'large';

export const imageProxy = url => {
  if (!url || REGEX_LOCALHOST.test(url) || REGEX_HTTPS.test(url)) return url;
  return `https://images.weserv.nl/?url=${encodeURIComponent(url).replace(
    'http://',
    '',
  )}`;
};

export const extractFirstUrl = text => {
  const urlsSet = getUrls(text);
  if (urlsSet.size == 0) {
    return null;
  }
  return Array.from(urlsSet)[0];
};
