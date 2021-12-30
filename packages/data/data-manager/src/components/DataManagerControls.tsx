import { ControlsSkeleton, Finder } from '@uidu/data-controls';
import { byName } from '@uidu/data-views';
import React from 'react';
import { useDataManagerContext } from './DataManagerContext';

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

export default function DataManagerControls({ controls }) {
  const {
    currentView,
    tableInstance: { setGlobalFilter },
  } = useDataManagerContext();
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
      />
      {availableControls.finder.visible && (
        <Finder {...availableControls.finder.props} />
      )}
    </>
  );
}
