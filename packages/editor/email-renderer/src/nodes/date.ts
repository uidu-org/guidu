import { N40, N500, R50, R500 } from '@uidu/adf-schema';
import { createTag } from '../create-tag';
import { isPastDate, timestampToString } from '../date-helper';
import { NodeSerializerOpts } from '../interfaces';
import { createClassName } from '../styles/util';

const className = createClassName('date');

export const styles = `
.${className} {
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  box-sizing: border-box;
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  max-width: 100%;
  vertical-align: baseline;
  border-width: 3px;
  padding: 2px 4px 3px 4px;
}
.${className}-red {
  background-color: ${R50};
  color: ${R500};
}
.${className}-neutral {
  background-color: ${N40};
  color: ${N500};
}
`;

export default function date({ attrs, parent }: NodeSerializerOpts) {
  const timestamp: string = attrs.timestamp;

  const colorClass = isPastDate(timestamp)
    ? `${className}-red`
    : `${className}-neutral`;
  const text = timestampToString(timestamp);
  return createTag('span', { class: className + ' ' + colorClass }, text);
}
