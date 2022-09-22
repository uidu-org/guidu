import loadable from '@loadable/component';
import { Configurator, Filterer, Sorter } from '@uidu/data-controls';
import React from 'react';
import { Settings } from 'react-feather';

const ConfiguratorForm = loadable(() => import('./configurator'));

export default function Controls({ availableControls, tableInstance }) {
  return (
    <>
      <Configurator
        icon={Settings}
        configurator={ConfiguratorForm}
        name="Customize cards"
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
