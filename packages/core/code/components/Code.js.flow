// @flow
import React, { PureComponent } from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  normalizeLanguage,
  type SupportedLanguages,
} from '../supportedLanguages';
import {
  type Theme,
  type ThemeProps,
  applyTheme,
} from '../themes/themeBuilder';

type CodeProps = {
  /** The style object to apply to code */
  codeStyle?: {},
  /** The element or custom react component to use in place of the default code tag */
  codeTagProps?: {},
  /** The language in which the code is written */
  language: SupportedLanguages | string,
  /** The style object to apply to the container that shows line number */
  lineNumberContainerStyle: {},
  /** The element or custom react component to use in place of the default span tag */
  preTag: Node | string,
  /** Indicates whether or not to show line numbers */
  showLineNumbers: boolean,
  /** The code to be formatted */
  text: string,
  /** A custom theme to be applied, implements the Theme interface */
  theme?: Theme | ThemeProps,
};

export default class Code extends PureComponent<CodeProps, {}> {
  static defaultProps = {
    theme: {},
    showLineNumbers: false,
    lineNumberContainerStyle: {},
    codeTagProps: {},
    preTag: 'span',
  };

  render() {
    const { inlineCodeStyle } = applyTheme(this.props.theme);
    const language = normalizeLanguage(this.props.language);

    const props = {
      language,
      PreTag: this.props.preTag,
      style: this.props.codeStyle || inlineCodeStyle,
      showLineNumbers: this.props.showLineNumbers,
      lineNumberContainerStyle: this.props.lineNumberContainerStyle,
      codeTagProps: this.props.codeTagProps,
    };

    return <SyntaxHighlighter {...props}>{this.props.text}</SyntaxHighlighter>;
  }
}
