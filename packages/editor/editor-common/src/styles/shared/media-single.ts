// @ts-ignore: unused variable
import { css } from 'styled-components';

const mediaSingleSharedStyle = css`
  li .media-single {
    margin: 0;
  }

  /* Hack for chrome to fix media single position
     inside a list when media is the first child */
  &.ua-chrome li > .mediaSingleView-content-wrap::before {
    content: '';
    display: block;
    height: 0;
  }

  table .media-single {
    margin: 0;
  }

  .media-single.image-wrap-left + .media-single.image-wrap-right,
  .media-single.image-wrap-right + .media-single.image-wrap-left,
  .media-single.image-wrap-left + .media-single.image-wrap-left,
  .media-single.image-wrap-right + .media-single.image-wrap-right {
    margin-right: 0;
    margin-left: 0;
  }
`;

export { mediaSingleSharedStyle };
