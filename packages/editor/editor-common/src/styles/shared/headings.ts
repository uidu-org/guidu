// @ts-ignore: unused variable
// prettier-ignore
import { css } from 'styled-components';

// @see typography spreadsheet: https://docs.google.com/spreadsheets/d/1iYusRGCT4PoPfvxbJ8NrgjtfFgXLm5lpDWXzjua1W2E/edit#gid=93913128
// text sizing prototype: http://proto/fabricrender/
export const headingsSharedStyles = css`
  & h1 {
    line-height: 1.167;
    font-size: 1.714em;
    margin-top: 1.667em;
    margin-bottom: 0;
  }

  & h2 {
    line-height: 1.2;
    font-size: 1.429em;
    margin-top: 1.8em;
    margin-bottom: 0;
  }

  & h3 {
    line-height: 1.25;
    font-size: 1.143em;
    margin-top: 2em;
    margin-bottom: 0;
  }

  & h4 {
    line-height: 1.429;
    font-size: 1em;
    margin-top: 1.357em;
  }

  & h5 {
    line-height: 1.333;
    font-size: 0.857em;
    margin-top: 1.667em;
  }

  & h6 {
    line-height: 1.455;
    font-size: 0.786em;
    margin-top: 1.455em;
  }
`;
