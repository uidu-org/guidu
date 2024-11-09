import React, { PureComponent } from 'react';
import { normalizeLanguage, SupportedLanguages } from '../supportedLanguages';
import Code from './Code';

type CodeBlockProps = {
  /** The code to be formatted */
  text: string;
  /** The language in which the code is written */
  language: SupportedLanguages | string;
  /** Indicates whether or not to show line numbers */
  showLineNumbers?: boolean;
};

const LANGUAGE_FALLBACK = 'text';

export default class CodeBlock extends PureComponent<CodeBlockProps, {}> {
  static displayName = 'CodeBlock';

  static defaultProps = {
    showLineNumbers: true,
    language: LANGUAGE_FALLBACK,
    theme: {},
  };

  handleCopy = (event: any) => {
    /**
     * We don't want to copy the markup after highlighting, but rather the preformatted text in the selection
     */
    const data = event.nativeEvent.clipboardData;
    if (data) {
      event.preventDefault();
      const selection = window.getSelection();
      if (selection === null) {
        return;
      }
      const selectedText = selection.toString();
      const document = `<!doctype html><html><head></head><body><pre>${selectedText}</pre></body></html>`;
      data.clearData();
      data.setData('text/html', document);
      data.setData('text/plain', selectedText);
    }
  };

  render() {
    const props = {
      language: normalizeLanguage(this.props.language || LANGUAGE_FALLBACK),
      // codeStyle: codeBlockStyle,
      showLineNumbers: this.props.showLineNumbers,
      codeTagProps: {},
      // lineNumberContainerStyle,
      text: this.props.text.toString(),
    };

    return <Code {...props} />;
  }
}
