import { ShellBody, ShellHeader } from '@uidu/shell';
import React, { Fragment, PureComponent } from 'react';
import Editor from '..';

export default class Basic extends PureComponent<any, any> {
  state = {
    portal: undefined,
  };

  handleRef = (portal: HTMLDivElement) => {
    this.setState({ portal });
  };

  render() {
    return (
      <Editor shouldFocus>
        {({ renderToolbar, renderEditor }) => (
          <Fragment>
            <ShellHeader className="border-bottom px-xl-4 px-3">
              {renderToolbar({})}
            </ShellHeader>
            <ShellBody>{renderEditor({})}</ShellBody>
          </Fragment>
        )}
      </Editor>
    );
  }
}
