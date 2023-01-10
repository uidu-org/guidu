import { useEditor } from '@craftjs/core';
import React from 'react';

export default function SettingsPanel() {
  const { actions, selected, isEnabled } = useEditor((state, query) => {
    const currentNodeId = query.getEvent('selected').last();
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
      isEnabled: state.options.enabled,
    };
  });

  return isEnabled && selected ? (
    <div>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>{selected.name}</div>
              </div>
            </div>
          </div>
        </div>
        <div data-cy="settings-panel">
          {selected.settings && React.createElement(selected.settings)}
        </div>
        {selected.isDeletable ? (
          <button
            onClick={() => {
              actions.delete(selected.id);
            }}
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  ) : null;
}
