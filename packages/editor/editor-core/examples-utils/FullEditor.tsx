import data from '@emoji-mart/data';
import { filter, traverse } from '@uidu/adf-utils';
import Button from '@uidu/button';
import { MentionResource } from '@uidu/mentions/src';
import { ShellBody, ShellHeader, ShellMain, ShellSidebar } from '@uidu/shell';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/url/dist/style.css';
import '@uppy/webcam/dist/style.css';
import { Emoji, init, SearchIndex } from 'emoji-mart';
import React, { useMemo, useRef, useState } from 'react';
import { localUploadOptions } from '../../../media/media-core/src';
import { document3 as document } from '../../renderer/examples/helper/story-data';
import { getItems } from '../examples-utils/tokens';
import {
  Editor,
  EditorContext,
  isEmptyDocument,
  WithEditorActions,
} from '../src';
import {
  alignmentPlugin,
  blockTypePlugin,
  codeBlockPlugin,
  datePlugin,
  emojiPlugin,
  insertBlockPlugin,
  layoutPlugin,
  listsPlugin,
  mediaPlugin,
  mentionsPlugin,
  quickInsertPlugin,
  starterKitPlugin,
  tablesPlugin,
  textColorPlugin,
  tokenPlugin,
  videoPlugin,
} from '../src/plugins';

init({ data });

async function search(value: string) {
  const emojis: Emoji[] = await SearchIndex.search(value);
  const results = (emojis || []).map((e) => ({
    title: e.name,
    ...e.skins[0],
  }));

  console.log(results);
  return results;
}

export default function FullEditor() {
  const element = useRef(null);
  const [value, setValue] = useState(document);

  const handleChange = (actions) => (editorView) => {
    console.log('actions', actions);
    console.log('editorView', editorView);
    actions.getValue().then((newValue) => {
      console.log('newValue', newValue);
      setValue(newValue);
      const links = filter(newValue, (node) =>
        (node.marks || []).some((mark) => mark.type === 'link'),
      );
      traverse(newValue, {
        link: (node, parent) => {
          // do something with the node
          console.log(node);
        },
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

  const plugins = useMemo(
    () => [
      blockTypePlugin(),
      layoutPlugin(),
      // saveOnEnterPlugin(console.log),
      textColorPlugin(),
      listsPlugin(),
      starterKitPlugin({
        placeholder: ({ doc, node }) => {
          if (isEmptyDocument(doc)) {
            return 'Insert something...';
          }
          return `Press '/' to insert something...`;
        },
      }),
      insertBlockPlugin({
        insertMenuItems: [],
      }),
      datePlugin(),
      alignmentPlugin(),
      codeBlockPlugin(),
      emojiPlugin(),
      quickInsertPlugin(),
      videoPlugin(),
      mentionsPlugin(),
      tablesPlugin({
        tableOptions: {
          allowColumnSorting: true,
          allowControls: true,
          allowMergeCells: true,
          allowNumberColumn: true,
          allowColumnResizing: true,
          allowBackgroundColor: true,
          allowHeaderRow: true,
          allowHeaderColumn: true,
        },
        allowContextualMenu: true,
      }),
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
    <EditorContext>
      <WithEditorActions
        render={(actions) => (
          <Editor
            tw="py-5 px-5"
            shouldFocus
            // saveOnEnter
            containerElement={element.current}
            onChange={handleChange(actions)}
            plugins={plugins}
            mentionProvider={Promise.resolve(
              new MentionResource({
                // Required attrib. Requests will happen natively.
                url: 'https://me.uidu.local:8443/api/mentions',
                // shouldHighlightMention: (mention) =>
                //   accountId === mention.id,
              }),
            )}
            tokenProvider={Promise.resolve({
              getItems: (query, selectedItems) => getItems(20),
            })}
            emojiProvider={Promise.resolve({
              search,
            })}
            activityProvider={Promise.resolve({
              getRecentItems: () => [
                {
                  url: 'https://uidu.local:8443',
                  name: 'Unsubscribe',
                  iconUrl:
                    'https://jpanalytics.it/assets/logo-inverse-4349d037765a05d4bf16351069a44b4fa3389c12d1e3f98ad605328ca4a27318.png',
                  container: 'uidu',
                },
              ],
            })}
            mediaProvider={Promise.resolve({
              uploadOptions: localUploadOptions({
                endpoint: 'https://uidu.local:8443/upload',
              }),
              viewMediaClientConfig: async ({ id, ...rest }) => {
                console.log(rest);
                return {
                  id,
                  type: 'image',
                  url: `https://me.uidu.local:8443/uploads/cache/${id}`,
                  metadata: {
                    name: 'test',
                    width: 640,
                    height: 640,
                  },
                };
              },
              uploadMediaClientConfig: Promise.resolve('test'),
            })}
            defaultValue={value}
            placeholder="Start typing..."
          >
            {({ renderToolbar, renderEditor }) => (
              <>
                <ShellHeader className="border-bottom">
                  {renderToolbar({})}
                </ShellHeader>
                <ShellBody>
                  <ShellMain>
                    <ShellBody ref={element}>
                      <div tw="w-full prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto">
                        {renderEditor({})}
                      </div>
                    </ShellBody>
                  </ShellMain>
                  <ShellSidebar tw="w-80 border-l bg-gray-50">
                    <Button
                      onClick={async () => {
                        const emojis = await SearchIndex.search('☠');
                        const emoji = emojis[0].skins[0];
                        console.log('emoji', emoji);

                        const state = actions.editorView.state;
                        const dispatch = actions.editorView.dispatch;
                        const node = state.schema.nodes.emoji.createChecked({
                          id: emoji.native,
                          text: emoji.native,
                          shortName: emoji.shortcodes,
                        });
                        const textNode = state.schema.text(' ');
                        console.log(node, textNode);
                        console.log(state);
                        const tr = state.tr.insert(
                          state.selection.$from.pos,
                          node,
                        );
                        dispatch(tr);
                      }}
                    >
                      Add emoji
                    </Button>
                    <Button
                      onClick={() =>
                        actions.replaceDocument({
                          type: 'doc',
                          content: [
                            {
                              type: 'mediaSingle',
                              attrs: { layout: 'center' },
                              content: [
                                {
                                  type: 'media',
                                  attrs: {
                                    id: 'Z2lkOi8vdWlkdS9CbG9iLzExNTQ2',
                                    file: {
                                      id: 'Z2lkOi8vdWlkdS9CbG9iLzExNTQ2',
                                      url: 'https://images.unsplash.com/photo-1682687221363-72518513620e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                      type: 'image',
                                      width: 1125,
                                      height: 2436,
                                      metadata: {
                                        key: 'cache/08514fa20201bfa417f9f3101019ece8.PNG',
                                        name: 'IMG_5001.PNG',
                                        size: 192418,
                                        type: 'image/png',
                                        width: 1125,
                                        height: 2436,
                                        policy:
                                          'eyJleHBpcmF0aW9uIjoiMjAyNC0wMS0xMVQxMjo0NjozOVoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJ1aWR1LXByb2R1Y3Rpb24ifSx7ImtleSI6ImNhY2hlLzA4NTE0ZmEyMDIwMWJmYTQxN2Y5ZjMxMDEwMTllY2U4LlBORyJ9LHsiQ29udGVudC1EaXNwb3NpdGlvbiI6ImlubGluZTsgZmlsZW5hbWU9XCJJTUdfNTAwMS5QTkdcIjsgZmlsZW5hbWUqPVVURi04JydJTUdfNTAwMS5QTkcifSx7IkNvbnRlbnQtVHlwZSI6ImltYWdlL3BuZyJ9LFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsNTI0Mjg4MDAwXSx7IngtYW16LWNyZWRlbnRpYWwiOiJBS0lBSURQQkE3Tk01M0RFTURTQS8yMDI0MDExMS9ldS13ZXN0LTMvczMvYXdzNF9yZXF1ZXN0In0seyJ4LWFtei1hbGdvcml0aG0iOiJBV1M0LUhNQUMtU0hBMjU2In0seyJ4LWFtei1kYXRlIjoiMjAyNDAxMTFUMTE0NjM5WiJ9XX0=',
                                        filename: 'IMG_5001.PNG',
                                        extension: '.png',
                                        mime_type: 'image/png',
                                        'Content-Type': 'image/png',
                                      },
                                    },
                                    type: 'file',
                                  },
                                },
                              ],
                            },
                            {
                              type: 'paragraph',
                              content: [{ type: 'text', text: 'Hello' }],
                            },
                          ],
                          version: 1,
                        })
                      }
                    >
                      Replace document
                    </Button>
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
    </EditorContext>
  );
}
