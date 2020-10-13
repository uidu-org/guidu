import loadable from '@loadable/component';
import { Configurator, Filterer, Sorter } from '@uidu/data-controls';
import React from 'react';
import { Calendar } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { DataViewKind } from '../../types';

const ConfiguratorForm = loadable(() => import('./configurator'));

const CalendarView: DataViewKind = {
  id: 'calendar',
  name: (
    <FormattedMessage id="dataView.calendar.name" defaultMessage="Calendar" />
  ),
  icon: Calendar,
  color: '#A3BE8C',
  description: (
    <FormattedMessage
      id="dataView.calendar.description"
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
    />
  ),

  controls: ({ tableInstance, columnDefs, availableControls }) => (
    <>
      <Configurator
        configurator={ConfiguratorForm}
        name="Using field created at"
        tableInstance={tableInstance}
        icon={Calendar}
        columnDefs={columnDefs}
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

export default CalendarView;
