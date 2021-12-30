import loadable from '@loadable/component';
import { Configurator, Filterer, Sorter } from '@uidu/data-controls';
import React from 'react';
import { Calendar } from 'react-feather';

const ConfiguratorForm = loadable(() => import('./configurator'));

export default function Controls({ availableControls }) {
  return (
    <>
      <Configurator
        configurator={ConfiguratorForm}
        name="Using field created at"
        icon={Calendar}
      />
      <Filterer {...availableControls.filterer.props} />
      <Sorter {...availableControls.sorter.props} />
    </>
  );
}
