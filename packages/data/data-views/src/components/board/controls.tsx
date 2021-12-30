import loadable from '@loadable/component';
import { Configurator, Filterer, Sorter } from '@uidu/data-controls';
import React from 'react';
import { Settings } from 'react-feather';

const ConfiguratorForm = loadable(() => import('./configurator'));

export default function Controls({ availableControls }) {
  return (
    <>
      <Configurator
        icon={Settings}
        configurator={ConfiguratorForm}
        name="Customize cards"
      />
      <Filterer {...availableControls.filterer.props} />
      <Sorter {...availableControls.sorter.props} />
    </>
  );
}
