import loadable from '@loadable/component';
import { Configurator, Filterer, Sorter } from '@uidu/data-controls';
import React from 'react';
import { Settings, Trello } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { DataViewKind } from '../../types';

const ConfiguratorForm = loadable(() => import('./configurator'));

const Board: DataViewKind = {
  id: 'board',
  name: <FormattedMessage id="dataView.board.name" defaultMessage="Board" />,
  icon: Trello,
  color: '#D08770',
  description: (
    <FormattedMessage
      id="dataView.board.description"
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
    />
  ),
  configurator: Configurator,
  controls: ({ tableInstance, columnDefs, availableControls }) => (
    <>
      <p>Using field createdAt</p>
      <Configurator
        icon={Settings}
        configurator={ConfiguratorForm}
        tableInstance={tableInstance}
        columnDefs={columnDefs}
        name="Customize cards"
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

export default Board;
