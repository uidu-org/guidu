import getVideoId from 'get-video-id';
import { createTag } from '../create-tag';
import { NodeSerializerOpts } from '../interfaces';
import { createClassName } from '../styles/util';

const className = createClassName('video');

export const styles = `
.${className} {
  width: 100%;
}
`;

export default function video({ attrs }: NodeSerializerOpts) {
  const { url } = attrs;
  const { id, service } = getVideoId(url);

  if (service === 'youtube') {
    const poster = createTag('img', {
      src: `http://img.youtube.com/vi/${id}/0.jpg`,
      width: '100%',
    });
    const link = createTag('a', { href: url, target: '_blank' }, poster);
    return createTag('div', { class: className }, link);
  }

  if (service === 'vimeo') {
    // https://stackoverflow.com/questions/1361149/get-img-thumbnails-from-vimeo
    return createTag('div', { class: className }, url);
  }

  return createTag('div', { class: className }, url);
}
