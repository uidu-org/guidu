import { applyMarks } from '../apply-marks';
import { createTag } from '../create-tag';
import { NodeSerializerOpts } from '../interfaces';
import { fontSize, lineHeight } from '../styles/common';
import { createClassName } from '../styles/util';
import { className as panelClassName } from './panel';

const className = createClassName('p');

export const styles = `
.${className} {
  margin: 0;
  padding: 0px;
  margin-bottom: 7px;
  padding-top: 7px;
  mso-line-height-rule: exactly;
  line-height: ${lineHeight};
  font-size: ${fontSize};
}
table td > .${className}:first-child,
table th > .${className}:first-child {
  padding-top: 0px;
}
table td > .${className}:last-child,
table th > .${className}:last-child {
  margin-bottom: 0;
}
.${panelClassName}-inner > .${className} {
  margin-bottom: 7px;
  padding-top: 7px;
}
`;

export default function paragraph({ text, marks }: NodeSerializerOpts) {
  const p = createTag('p', { class: className }, text || '&nbsp;');
  return applyMarks(marks, p);
}
