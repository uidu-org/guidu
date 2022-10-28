import { N800 } from '@uidu/adf-schema';
import { applyMarks } from '../apply-marks';
import { createTag } from '../create-tag';
import { NodeSerializerOpts } from '../interfaces';
import { createClassName } from '../styles/util';

const commonStyle = `
font-style: inherit;
color: ${N800};
font-weight: 600;
margin-bottom: 0;
`;

export const styles = `
.${createClassName('h1')} {
  ${commonStyle}
  font-size: 23px;
  line-height: 1.1034;
  margin-top: 40px;
  letter-spacing: -0.01em;
}
.${createClassName('h2')} {
  ${commonStyle}
  font-size: 20px;
  line-height: 1.1666;
  margin-top: 36px;
  font-weight: 500;
  letter-spacing: -0.01em;
}
.${createClassName('h3')} {
  ${commonStyle}
  font-size: 16px;
  line-height: 1.2;
  margin-top: 32px;
  font-weight: 500;
  letter-spacing: -0.008em;
}
.${createClassName('h4')} {
  ${commonStyle}
  font-size: 14px;
  line-height: 1.25;
  margin-top: 20px;
  letter-spacing: -0.006em;
}
.${createClassName('h5')} {
  ${commonStyle}
  font-size: 11px;
  line-height: 1.4286;
  margin-top: 20px;
  letter-spacing: -0.003em;
}
.${createClassName('h6')} {
  ${commonStyle}
  font-size: 11px;
  line-height: 1.3333;
  text-transform: uppercase;
  margin-top: 16px;
}
`;

export default function heading({ attrs, marks, text }: NodeSerializerOpts) {
  const tagName = `h${attrs.level}`;

  const headingTag = createTag(
    tagName,
    { class: createClassName(tagName) },
    text,
  );
  return applyMarks(marks, headingTag);
}
