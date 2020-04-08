import { ShellBody, ShellHeader } from '@uidu/shell';
import React, { Fragment, PureComponent } from 'react';
import { Editor, EditorContext, WithEditorActions } from '..';
import { DevTools } from '../examples-utils/DevTools';

export default class Basic extends PureComponent<any, any> {
  state = {
    portal: undefined,
  };

  handleRef = (portal: HTMLDivElement) => {
    this.setState({ portal });
  };

  handleChange = (actions) => (editorView) => {
    actions.getValue().then((value) => {
      console.log(value);
    });
  };

  render() {
    return (
      <EditorContext>
        <>
          <DevTools />
          <WithEditorActions
            render={(actions) => (
              <Editor
                shouldFocus
                containerElement={this.element}
                onChange={this.handleChange(actions)}
                media={{
                  allowMediaGroup: true,
                  allowMediaSingle: true,
                }}
                mediaProvider={Promise.resolve({
                  uploadParams: { endpoint: '/upload' },
                  viewContext: Promise.resolve('test'),
                  uploadContext: Promise.resolve('test'),
                })}
              >
                {({ renderToolbar, renderEditor }) => (
                  <Fragment>
                    <ShellHeader className="border-bottom px-xl-4 px-3">
                      {renderToolbar({})}
                    </ShellHeader>
                    <ShellBody
                      scrollable
                      ref={(c) => {
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
        </>
      </EditorContext>
    );
  }
}
