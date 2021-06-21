import { traverse } from '@uidu/adf-utils';
import { ShellBody, ShellHeader, ShellMain } from '@uidu/shell';
import { GuiduThemeProvider } from '@uidu/theme';
import React, { PureComponent } from 'react';
import { IntlProvider } from 'react-intl';
import { localUploadOptions } from '../../../media/media-core/src';
import { document } from '../../renderer/examples/helper/story-data';
import { DevTools } from '../examples-utils/DevTools';
import { Editor, EditorContext, WithEditorActions } from '../src';
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
      traverse(value, {
        // emoji visitor, matches all nodes with type === 'emoji'
        emoji: (node, parent) => {
          // do something with the node
          console.log(node);
        },

        mention: (node, parent) => {
          // do something with mention
          console.log(node);
        },
        media: (node, parent) => {
          // do something with mention
          console.log(node);
        },

        taskList: (node, parent) => {
          // do something with taskList
        },
      });
    });
  };

  render() {
    return (
      <IntlProvider locale="en">
        <ShellMain>
          <GuiduThemeProvider>
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
                      defaultValue={document}
                    >
                      {({ renderToolbar, renderEditor }) => (
                        <>
                          <ShellHeader className="border-bottom">
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
                        </>
                      )}
                    </Editor>
                  )}
                />
              </>
            </EditorContext>
          </GuiduThemeProvider>
        </ShellMain>
      </IntlProvider>
    );
  }
}
