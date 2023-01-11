import { useNode } from '@craftjs/core';
import { Editor, EditorContext, WithEditorActions } from '@uidu/editor-core';
import { blockTypePlugin } from '@uidu/editor-core/plugins';
import React, { useEffect, useMemo, useState } from 'react';

export function Text({ text, fontSize, textAlign, ...props }) {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const [editable, setEditable] = useState(false);

  const plugins = useMemo(() => [blockTypePlugin()], []);

  useEffect(() => {
    if (selected) {
      return;
    }

    setEditable(false);
  }, [selected]);

  const handleChange = (actions) => (editorView) => {
    // https://github.com/prevwong/craft.js/issues/459
    actions.getValue().then(({ type, version, ...newValue }) => {
      setProp((props) => (props.content = newValue));
    });
  };

  return (
    <div
      {...props}
      ref={(ref) => connect(drag(ref))}
      onClick={() => selected && setEditable(true)}
    >
      <EditorContext>
        <WithEditorActions
          render={(actions) => (
            <Editor
              tw="p-6"
              disabled={!editable}
              appearance="comment"
              // https://github.com/prevwong/craft.js/issues/459
              defaultValue={{
                version: 1,
                type: 'doc',
                content: props.content,
              }}
              onChange={handleChange(actions)}
              plugins={plugins}
              shouldFocus
            >
              {({ renderEditor }) => renderEditor()}
            </Editor>
          )}
        />
      </EditorContext>
    </div>
  );
}

function TextSettings() {
  const {
    actions: { setProp },
    fontSize,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
  }));

  return <></>;
}

export const TextDefaultProps = {
  content: [],
  fontSize: 20,
};

Text.craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
};

export default Text;
