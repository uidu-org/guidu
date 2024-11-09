import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import 'highlight.js/styles/atom-one-dark.css'; // Example theme
import { all, createLowlight } from 'lowlight';
import React, { PureComponent } from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { SupportedLanguages } from '../supportedLanguages';

type CodeProps = {
  /** The style object to apply to code */
  codeStyle?: {};
  /** The element or custom react component to use in place of the default code tag */
  codeTagProps?: {};
  /** The language in which the code is written */
  language: SupportedLanguages | string;
  /** The style object to apply to the container that shows line number */
  lineNumberContainerStyle: {};
  /** The element or custom react component to use in place of the default span tag */
  preTag: Node | string;
  /** Indicates whether or not to show line numbers */
  showLineNumbers: boolean;
  /** The code to be formatted */
  text: string;
};

const lowlight = createLowlight(all);

export default class Code extends PureComponent<CodeProps, {}> {
  static defaultProps = {
    showLineNumbers: false,
    lineNumberContainerStyle: {},
    codeTagProps: {},
    preTag: 'span',
  };

  render() {
    const language = 'html'; // normalizeLanguage(this.props.language);

    const props = {
      language,
      PreTag: this.props.preTag,
      showLineNumbers: this.props.showLineNumbers,
      lineNumberContainerStyle: this.props.lineNumberContainerStyle,
      codeTagProps: this.props.codeTagProps,
    };

    const languages = lowlight.listLanguages();

    const tree =
      language &&
      (languages.includes(language) || lowlight.registered?.(language))
        ? lowlight.highlight(language, this.props.text)
        : lowlight.highlightAuto(this.props.text);

    return (
      <div className="code-content">
        <code>{toJsxRuntime(tree, { Fragment, jsx, jsxs })}</code>
      </div>
    );

    return <SyntaxHighlighter {...props}>{this.props.text}</SyntaxHighlighter>;
  }
}
