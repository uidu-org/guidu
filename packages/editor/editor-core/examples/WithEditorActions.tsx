import { traverse } from '@uidu/adf-utils';
import { ShellBody, ShellHeader, ShellMain, ShellSidebar } from '@uidu/shell';
import React, { useRef, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { localUploadOptions } from '../../../media/media-core/src';
import { story as document } from '../../renderer/examples/helper/story-data';
import { DevTools } from '../examples-utils/DevTools';
import { Editor, EditorContext, WithEditorActions } from '../src';

export default function Basic({}) {
  const element = useRef(null);
  const [value, setValue] = useState(document);

  const handleChange = (actions) => (editorView) => {
    actions.getValue().then((value) => {
      setValue(value);
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

  return (
    <IntlProvider locale="en">
      <ShellMain>
        <EditorContext>
          <>
            <DevTools />
            <WithEditorActions
              render={(actions) => (
                <Editor
                  shouldFocus
                  containerElement={element.current}
                  onChange={handleChange(actions)}
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
                  defaultValue={value}
                >
                  {({ renderToolbar, renderEditor }) => (
                    <>
                      <ShellHeader className="border-bottom">
                        {renderToolbar({})}
                      </ShellHeader>
                      <ShellBody>
                        <ShellMain>
                          <ShellBody ref={element}>
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
                            defaultValue={
                              value ? JSON.stringify(value, null, 2) : ''
                            }
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
      </ShellMain>
    </IntlProvider>
  );
}
