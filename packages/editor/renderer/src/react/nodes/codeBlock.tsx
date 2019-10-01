import { AkCodeBlock } from '@uidu/code';
import { overflowShadow, OverflowShadowProps } from '@uidu/editor-common';
import * as React from 'react';
import { PureComponent } from 'react';

function identity<T = any>(text: T): T {
  return text;
}

export interface Props {
  language: string;
}

class CodeBlock extends PureComponent<Props & OverflowShadowProps, {}> {
  render() {
    const { children, language, handleRef, shadowClassNames } = this.props;

    const codeProps = {
      language,
      text: React.Children.map(children, identity).join(''),
    };

    return (
      <div className={`code-block ${shadowClassNames}`} ref={handleRef}>
        <AkCodeBlock {...codeProps} />
      </div>
    );
  }
}

export default overflowShadow(CodeBlock, {
  overflowSelector: 'span',
  scrollableSelector: 'code',
});
