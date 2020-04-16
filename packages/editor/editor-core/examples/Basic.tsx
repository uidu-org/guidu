import { ShellBody, ShellHeader } from '@uidu/shell';
import { AtlaskitThemeProvider } from '@uidu/theme';
import React, { Fragment, PureComponent } from 'react';
import { Editor, EditorContext, WithEditorActions } from '..';
import { document as storyDataDocument } from '../../renderer/examples/helper/story-data';
import { DevTools } from '../examples-utils/DevTools';

export default class Basic extends PureComponent<any, any> {
  state = {
    portal: undefined,
  };

  handleRef = (portal: HTMLDivElement) => {
    this.setState({ portal });
  };

  handleChange = (actions) => (editorView) => {
    console.log(actions);
    actions.getValue().then((value) => {
      console.log(value);
    });
  };

  render() {
    return (
      <AtlaskitThemeProvider>
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
                    provider: Promise.resolve({
                      uploadParams: { endpoint: '/upload' },
                      viewMediaClientConfig: Promise.resolve('test'),
                      uploadMediaClientConfig: Promise.resolve('test'),
                    }),
                    allowMediaGroup: true,
                    allowMediaSingle: true,
                    allowAltTextOnImages: true,
                    allowLinking: true,
                    allowResizing: true,
                  }}
                  defaultValue={storyDataDocument}
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
      </AtlaskitThemeProvider>
    );
  }
}
