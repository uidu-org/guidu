import { ShellBody, ShellHeader } from '@uidu/shell';
import React, { Fragment, PureComponent } from 'react';
import { Editor, EditorContext, WithEditorActions } from '..';

export default class Basic extends PureComponent<any, any> {
  state = {
    portal: undefined,
  };

  handleChange = actions => editorView => {
    console.log(actions);
    actions.getValue().then(value => {
      console.log(value);
    });
  };

  handleRef = (portal: HTMLDivElement) => {
    this.setState({ portal });
  };

  render() {
    return (
      <EditorContext>
        <WithEditorActions
          render={actions => (
            <Editor
              shouldFocus
              containerElement={this.element}
              onChange={this.handleChange(actions)}
            >
              {({ renderToolbar, renderEditor }) => (
                <Fragment>
                  <ShellHeader className="border-bottom px-xl-4 px-3">
                    {renderToolbar({})}
                  </ShellHeader>
                  <ShellBody
                    ref={c => {
                      this.element = c;
                    }}
                  >
                    {renderEditor({})}
                  </ShellBody>
                </Fragment>
              )}
            </Editor>
          )}
        />
      </EditorContext>
    );
  }
}
