import axios from 'axios';
import { css } from 'styled-components';
import { LinkPayloadProps } from '../types';

const REGEX_HTTPS = /^https/;
const REGEX_LOCALHOST = /http:\/\/localhost/;

export function isFunction(fn) {
  return typeof fn === 'function';
}

export function isObject(obj) {
  return typeof obj === 'object';
}

export function isNil(value) {
  return value == null;
}

export function getUrlPath(data: LinkPayloadProps | string) {
  return data && isObject(data) ? data.url : data;
}

export function someProp(data: LinkPayloadProps, props) {
  return data[
    props.find((prop) => data[prop] !== null && data[prop] !== undefined)
  ];
}

export const media = {
  mobile: (...args) => css`
    @media (max-width: 48em) {
      ${css(() => args)};
    }
  `,
  desktop: (...args) => css`
    @media (min-width: 48em) {
      ${css(() => args)};
    }
  `,
};

function apiValue(key: string, value: string) {
  return value === true ? `${key}` : `${key}=${value}`;
}

export const defaultApiParameters = {
  video: false,
  contrast: false,
  screenshot: false,
  prerender: 'auto',
};

export function createApiUrl(props: {
  apiKey: string;
  url: string;
  prerender: string;
  contrast: string;
  media: string[];
}) {
  const { apiKey, url: targetUrl, prerender, contrast, media } = props;
  const takeScreenshot = media.includes('screenshot');
  const hasVideo = media.includes('video');

  let url = `https://metascraper-lime.vercel.app/api/scrape?url=${encodeURIComponent(
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
}

export function fetchFromApiUrl(
  {
    apiKey,
    apiUrl,
  }: {
    apiKey: string;
    apiUrl: string;
  },
  source: any,
): Promise<LinkPayloadProps> {
  const headers = apiKey ? { 'x-api-key': apiKey } : {};
  return axios
    .get<{
      title: string;
      description: string;
      image: string;
      url: string;
      video: string;
    }>(apiUrl, { headers, cancelToken: source.token })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function fetchFromApi(props, source) {
  const apiUrl = createApiUrl(props);
  return fetchFromApiUrl({ apiUrl, ...props }, source);
}

export function isLarge(cardSize: string) {
  return cardSize === 'large';
}

export function imageProxy(url: string) {
  if (!url || REGEX_LOCALHOST.test(url) || REGEX_HTTPS.test(url)) return url;
  return `https://images.weserv.nl/?url=${encodeURIComponent(url).replace(
    'http://',
    '',
  )}`;
}

export function extractFirstUrl(text: string) {
  const urlsSet = text.match(
    /\b((https?|ftp|file):\/\/|(www|ftp)\.)[-A-Z0-9+&@#/%?=~_|$!:,.;]*[A-Z0-9+&@#/%=~_|$]/gi,
  );
  if (urlsSet && urlsSet.length === 0) {
    return null;
  }
  return urlsSet[0];
}
