import { N50 } from '@uidu/adf-schema';
import { createTag } from '../create-tag';
import { NodeSerializerOpts } from '../interfaces';
import { serializeStyle } from '../serialize-style';
import { createClassName } from '../styles/util';

export const styles = `
.${createClassName('tableCell')} {
  background-clip: padding-box;
  height: auto;
  min-width: 3em;
  vertical-align: top;
  border: 1px solid ${N50};
  border-right-width: 0;
  border-bottom-width: 0;
  padding: 8px;
}
`;
export default function tableCell({ attrs, text }: NodeSerializerOpts) {
  const { colspan, rowspan, background } = attrs;
  const style = serializeStyle({
    'background-color': background || 'white',
  });

  return createTag(
    'td',
    {
      colspan,
      rowspan,
      style,
      class: createClassName('tableCell'),
    },
    text,
  );
}
