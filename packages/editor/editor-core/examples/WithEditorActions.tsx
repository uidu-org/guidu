import { ShellBody, ShellHeader } from '@uidu/shell';
import React, { PureComponent } from 'react';
import { DevTools } from '../examples-utils/DevTools';
import { Editor, EditorContext, WithEditorActions } from '../src';

export default class Basic extends PureComponent<any, any> {
  state = {
    portal: undefined,
  };

  handleChange = (actions) => (editorView) => {
    actions.getValue().then((value) => {
      console.log(value);
    });
  };

  handleRef = (portal: HTMLDivElement) => {
    this.setState({ portal });
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
                analyticsHandler={console.log}
              >
                {({ renderToolbar, renderEditor }) => (
                  <>
                    <ShellHeader className="border-bottom px-xl-4 px-3">
                      {renderToolbar({})}
                    </ShellHeader>
                    <ShellBody
                      ref={(c) => {
                        this.element = c;
                      }}
                    >
                      {renderEditor({})}
                    </ShellBody>
                  </>
                )}
              </Editor>
            )}
          />
        </>
      </EditorContext>
    );
  }
}
