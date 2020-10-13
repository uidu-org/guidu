import loadable from '@loadable/component';
import { Configurator, Filterer, Sorter } from '@uidu/data-controls';
import React from 'react';
import { Grid, Settings } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { DataViewKind } from '../../types';

const ConfiguratorForm = loadable(() => import('./configurator'));

const Gallery: DataViewKind = {
  id: 'gallery',
  name: (
    <FormattedMessage id="dataView.gallery.name" defaultMessage="Gallery" />
  ),
  icon: Grid,
  color: '#EBCB8B',
  description: (
    <FormattedMessage
      id="dataView.gallery.description"
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
    />
  ),
  controls: ({
    tableInstance,
    columnDefs,
    availableControls,
    currentView,
    updateView,
    state,
    columnCount,
    onSetColumnCount,
  }) => (
    <>
      <Configurator
        icon={Settings}
        configurator={ConfiguratorForm}
        tableInstance={tableInstance}
        columnDefs={columnDefs}
        name="Customize cards"
        // isConfiguratorOpen={isConfiguratorOpen}
        currentView={currentView}
        state={state}
        // groupers={groupers}
        // onDragEnd={onDragEnd}
        // onResize={onResize}
        // rowHeight={rowHeight}
        columnCount={columnCount}
        onSetColumnCount={onSetColumnCount}
        updateView={updateView}
        // startDateField={startDateField}
        // endDateField={endDateField}
        // primaryField={primaryField}
      />
      <Filterer
        tableInstance={tableInstance}
        columnDefs={columnDefs}
        {...availableControls.filterer.props}
      />
      <Sorter
        tableInstance={tableInstance}
        {...availableControls.sorter.props}
      />
    </>
  ),
};

export default Gallery;
