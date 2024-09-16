import { ScrollableContainer, ShellBody, ShellMain } from '@uidu/shell';
import React, { useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { story2 as document } from '../../renderer/examples/helper/story-data';
import { Editor } from '../src';
import {
  blockTypePlugin,
  emojiPlugin,
  insertBlockPlugin,
  layoutPlugin,
  mediaPlugin,
  mentionsPlugin,
  quickInsertPlugin,
  saveOnEnterPlugin,
  starterKitPlugin,
  tablesPlugin,
  tokenPlugin,
  videoPlugin,
} from '../src/plugins';

export default function InModal() {
  const [isOpen, setIsOpen] = useState(false);

  const plugins = useMemo(
    () => [
      blockTypePlugin(),
      layoutPlugin(),
      saveOnEnterPlugin(console.log),
      starterKitPlugin({
        placeholder: 'Insert something...',
      }),
      insertBlockPlugin({
        insertMenuItems: [],
      }),
      emojiPlugin(),
      quickInsertPlugin(),
      videoPlugin(),
      mentionsPlugin(),
      tablesPlugin({ tableOptions: {} }),
      // datePlugin(),
      tokenPlugin(),
      mediaPlugin({
        allowMediaGroup: true,
        allowMediaSingle: true,
        allowAltTextOnImages: true,
        allowLinking: true,
        allowResizing: true,
        mediaPickerProps: (mediaState) => ({
          onFileAdded: console.log,
          onFileRemoved: console.log,
          onComplete: (result) => {
            const files = result.successful.map(
              localUploadOptions({
                endpoint: 'https://uidu.local:8443/upload',
              }).responseHandler,
            );
            mediaState.insertFiles(files);
          },
        }),
      }),
    ],
    [],
  );

  return (
    <IntlProvider locale="en">
      <ShellMain>
        <ShellBody>
          <ShellBody>
            <ScrollableContainer>
              <ul tw="list-disc list-outside pl-20">
                <li>
                  <p>Ciaoone</p>
                </li>
                <li>
                  <Editor defaultValue={document} plugins={plugins}>
                    {({ renderToolbar, renderEditor, view }) => (
                      <div tw="w-full">{renderEditor({})}</div>
                    )}
                  </Editor>
                </li>
              </ul>
            </ScrollableContainer>
          </ShellBody>
          <ShellBody>
            <ScrollableContainer>
              <div>
                <Editor defaultValue={document} plugins={plugins}>
                  {({ renderToolbar, renderEditor, view }) => (
                    <div tw="w-full">{renderEditor({})}</div>
                  )}
                </Editor>
              </div>
            </ScrollableContainer>
          </ShellBody>
        </ShellBody>
      </ShellMain>
    </IntlProvider>
  );
}
