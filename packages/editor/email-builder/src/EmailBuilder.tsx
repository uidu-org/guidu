import { Editor, Frame, useEditor, useEditorReturnType } from '@craftjs/core';
import React from 'react';
import { Button, Container, Divider, Text, Video } from './components';
import RenderNode from './RenderNode';
import { EmailBuilderProps } from './types';

function StatelessEmailBuilder({
  value,
  children,
}: {
  value: React.ReactNode;
  children: ({
    renderFrame,
    editor,
  }: {
    renderFrame: () => React.ReactNode;
    editor: useEditorReturnType;
  }) => React.ReactNode;
}) {
  const editor = useEditor();
  const renderFrame = () => <Frame>{value}</Frame>;

  return children({ renderFrame, editor });
}

export default function EmailBuilder({
  value,
  children,
  onChange = () => {},
}: EmailBuilderProps) {
  return (
    <Editor
      resolver={{ Text, Container, Button, Video, Divider }}
      onRender={RenderNode}
      onNodesChange={(query) => {
        const json = query.serialize();
        console.log(json);
        console.log('serializedNodes', query.getSerializedNodes());
        console.log('getNodes', query.getNodes());
        onChange(JSON.parse(json));
      }}
    >
      <StatelessEmailBuilder value={value}>{children}</StatelessEmailBuilder>
    </Editor>
  );
}
