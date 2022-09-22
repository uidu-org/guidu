import { Table } from '@tanstack/react-table';
import { ControlsSkeleton, Finder } from '@uidu/data-controls';
import { byName } from '@uidu/data-views';
import React from 'react';

const defaultAvailableControls = {
  calendarToolbar: {
    visible: true,
    props: {},
  },
  finder: {
    visible: true,
    props: {},
  },
  viewer: {
    visible: true,
    props: {},
  },
  grouper: {
    visible: true,
    props: {},
  },
  filterer: {
    visible: true,
    props: {},
  },
  sorter: {
    visible: true,
    props: {},
  },
  more: {
    visible: true,
    props: {},
  },
};

export default function DataManagerControls<T>({
  controls,
  tableInstance,
  currentView,
  updateView,
}: {
  controls: any;
  tableInstance: Table<T>;
  currentView;
  updateView;
}) {
  const availableControls = {
    ...defaultAvailableControls,
    ...controls,
  };

  if (!currentView) {
    return <ControlsSkeleton />;
  }

  const { controls: Controls = () => null } = byName[currentView.kind];

  return (
    <>
      <Controls
        isConfiguratorOpen={availableControls.viewer.isConfiguratorOpen}
        availableControls={availableControls}
        tableInstance={tableInstance}
        currentView={currentView}
      />
      {availableControls.finder.visible && (
        <Finder
          tableInstance={tableInstance}
          {...availableControls.finder.props}
        />
      )}
    </>
  );
}
