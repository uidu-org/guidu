import * as React from 'react';
import * as reactAddonsTextContent from 'react-addons-text-content';
import { Helmet } from 'react-helmet';
import * as snakeCase from 'snake-case';

export type Props = {
  children?: React.ReactChild;
  level: number;
};

export type State = {
  shouldShowAnchor: boolean;
};

function dashcase(children) {
  return snakeCase(reactAddonsTextContent(children)).replace(/_/g, '-');
}

export default class Heading extends React.Component<Props, State> {
  state = {
    shouldShowAnchor: false,
  };
  handleShowAnchor = () => {
    this.setState({ shouldShowAnchor: true });
  };
  handleHideAnchor = () => {
    this.setState({ shouldShowAnchor: false });
  };
  render() {
    const { handleHideAnchor, handleShowAnchor } = this;
    const { children, level } = this.props;
    const { shouldShowAnchor } = this.state;
    const Tag = `h${level}`;
    const id = dashcase(children);

    // H1 on the documentation specifies the main page title
    // We should implement this using gray-matter to have meta data *title* in markdown
    // Currently gray-matter breaks in IE11, please see https://github.com/jonschlinkert/gray-matter/pull/76 for reference
    return (
      <Tag
        id={id}
        onMouseEnter={handleShowAnchor}
        onMouseLeave={handleHideAnchor}
      >
        {level === 1 ? (
          <Helmet>
            <title>
              {`${reactAddonsTextContent(children)} - ${BASE_TITLE}`}
            </title>
          </Helmet>
        ) : (
          ''
        )}

        {children}
        {shouldShowAnchor ? ' ' : ''}
        {shouldShowAnchor ? <a href={`#${id}`}>#</a> : ''}
      </Tag>
    );
  }
}
