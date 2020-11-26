import loadable from '@loadable/component';
import { Configurator, Filterer, Grouper, Sorter } from '@uidu/data-controls';
import React from 'react';
import { EyeOff, List as ListIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { DataViewKind } from '../../types';

const ConfiguratorForm = loadable(() => import('./configurator'));

const List: DataViewKind = {
  id: 'list',
  name: <FormattedMessage id="dataView.list.name" defaultMessage="List" />,
  icon: ListIcon,
  color: '#E53E3E',
  description: (
    <FormattedMessage
      id="dataView.list.description"
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
    />
  ),
  controls: ({
    tableInstance,
    tableInstance: { state },
    tableInstance: {
      state: { hiddenColumns },
    },
    columnDefs,
    currentView,
    updateView,
    availableControls,
  }) => {
    const hiddenCount = hiddenColumns.length;

    return (
      <>
        <Configurator
          active={hiddenCount > 0}
          icon={EyeOff}
          name={
            <FormattedMessage
              defaultMessage={`{hiddenCount, plural,
                  =0 {Hide fields}
                  one {1 hidden field}
                  other {{hiddenCount, number} hidden fields}
                }`}
              values={{ hiddenCount }}
            />
          }
          tableInstance={tableInstance}
          configurator={ConfiguratorForm}
          // isConfiguratorOpen={isConfiguratorOpen}
          currentView={currentView}
          columnDefs={columnDefs}
          state={state}
          // groupers={groupers}
          // onDragEnd={onDragEnd}
          // onResize={onResize}
          // rowHeight={rowHeight}
          // columnCount={columnCount}
          // onSetColumnCount={onSetColumnCount}
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
        <Grouper
          tableInstance={tableInstance}
          {...availableControls.grouper.props}
        />
      </>
    );
  },
};

export default List;
