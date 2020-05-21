import { ShellBody, ShellHeader } from '@uidu/shell';
import { AtlaskitThemeProvider } from '@uidu/theme';
import React, { Fragment, PureComponent } from 'react';
import { Editor, EditorContext, WithEditorActions } from '..';
import { localUploadOptions } from '../../../media/media-core/src';
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
