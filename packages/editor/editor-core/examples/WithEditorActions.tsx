import { localUploadOptions } from '@uidu/media-core';
import { ShellBody, ShellHeader, ShellMain } from '@uidu/shell';
import React, { PureComponent } from 'react';
import { IntlProvider } from 'react-intl';
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
      <IntlProvider locale="en">
        <EditorContext>
          <ShellMain>
            <DevTools />
            <WithEditorActions
              render={(actions) => (
                <Editor
                  shouldFocus
                  containerElement={this.element}
                  onChange={this.handleChange(actions)}
                  analyticsHandler={console.log}
                  media={{
                    provider: Promise.resolve({
                      uploadOptions: localUploadOptions({
                        url: 'https://uidu.local:8443/upload',
                      }),
                      viewMediaClientConfig: Promise.resolve('test'),
                      uploadMediaClientConfig: Promise.resolve('test'),
                    }),
                    allowMediaGroup: true,
                    allowMediaSingle: true,
                    allowAltTextOnImages: true,
                    allowLinking: true,
                    allowResizing: true,
                  }}
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
          </ShellMain>
        </EditorContext>
      </IntlProvider>
    );
  }
}
