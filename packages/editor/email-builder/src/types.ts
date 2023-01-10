import { useEditorReturnType } from '@craftjs/core';

export type EmailBuilderProps = {
  value: React.ReactNode;
  onChange: (json: JSON) => void;
  children: ({
    renderFrame,
    editor,
  }: {
    renderFrame: () => React.ReactNode;
    editor: useEditorReturnType;
  }) => React.ReactNode;
};
