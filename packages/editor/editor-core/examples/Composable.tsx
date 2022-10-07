import { traverse } from '@uidu/adf-utils';
import { ShellBody, ShellHeader, ShellMain, ShellSidebar } from '@uidu/shell';
import { GuiduThemeProvider } from '@uidu/theme';
import React, { useRef, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { localUploadOptions } from '../../../media/media-core/src';
import { story as document } from '../../renderer/examples/helper/story-data';
import { Editor, EditorContext, WithEditorActions } from '../src';
import {
  insertBlockPlugin,
  layoutPlugin,
  mediaPlugin,
  mentionsPlugin,
  quickInsertPlugin,
  starterKitPlugin,
  tablesPlugin,
  videoPlugin,
} from '../src/plugins';

export default function Composable({}) {
  const element = useRef(null);
  const [value, setValue] = useState(document);

  const handleChange = (actions) => (editorView) => {
    actions.getValue().then((newValue) => {
      setValue(newValue);
      traverse(newValue, {
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

  return (
    <IntlProvider locale="en">
      <ShellMain>
        <GuiduThemeProvider>
          <EditorContext>
            <>
              {/* <DevTools /> */}
              <WithEditorActions
                render={(actions) => (
                  <Editor
                    shouldFocus
                    containerElement={element.current}
                    onChange={handleChange(actions)}
                    plugins={[
                      layoutPlugin(),
                      starterKitPlugin({}),
                      // blockTypePlugin(),
                      insertBlockPlugin({
                        insertMenuItems: [],
                      }),
                      quickInsertPlugin(),
                      videoPlugin(),
                      mentionsPlugin(),
                      tablesPlugin({ tableOptions: {} }),
                      // datePlugin(),
                      mediaPlugin({
                        provider: Promise.resolve({
                          uploadOptions: localUploadOptions({
                            endpoint: 'https://uidu.local:8443/upload',
                          }),
                          viewMediaClientConfig: Promise.resolve('test'),
                          uploadMediaClientConfig: Promise.resolve('test'),
                        }),
                        allowMediaGroup: true,
                        allowMediaSingle: true,
                        allowAltTextOnImages: true,
                        allowLinking: true,
                        allowResizing: true,
                      }),
                    ]}
                    media={{
                      provider: Promise.resolve({
                        uploadOptions: localUploadOptions({
                          endpoint: 'https://uidu.local:8443/upload',
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
                    defaultValue={value}
                  >
                    {({ renderToolbar, renderEditor }) => (
                      <>
                        <ShellHeader className="border-bottom">
                          {renderToolbar({})}
                        </ShellHeader>
                        <ShellBody>
                          <ShellMain>
                            <ShellBody
                              ref={element}
                              tw="prose prose-primary max-w-none"
                            >
                              {renderEditor({})}
                            </ShellBody>
                          </ShellMain>
                          <ShellSidebar tw="w-80 border-l bg-gray-50">
                            <textarea
                              style={{ resize: 'none' }}
                              tw="w-full h-full"
                              onChange={(e) => {
                                console.log(e.target.value);
                                actions.replaceDocument(e.target.value);
                              }}
                              value={JSON.stringify(value, null, 2)}
                            />
                          </ShellSidebar>
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
