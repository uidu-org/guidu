import loadable from '@loadable/component';
import { Configurator, Filterer, Sorter } from '@uidu/data-controls';
import React from 'react';
import { Calendar } from 'react-feather';

const ConfiguratorForm = loadable(() => import('./configurator'));

export default function Controls({
  availableControls,
  tableInstance,
  currentView,
  setCurrentView,
}) {
  return (
    <>
      <Configurator
        configurator={ConfiguratorForm}
        name="Using field created at"
        icon={Calendar}
        currentView={currentView}
        setCurrentView={setCurrentView}
        tableInstance={tableInstance}
      />
      <Filterer
        tableInstance={tableInstance}
        {...availableControls.filterer.props}
      />
      <Sorter
        tableInstance={tableInstance}
        {...availableControls.sorter.props}
      />
    </>
  );
}
