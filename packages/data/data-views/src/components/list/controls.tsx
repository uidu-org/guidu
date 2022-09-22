import loadable from '@loadable/component';
import { Table } from '@tanstack/react-table';
import { ButtonGroup } from '@uidu/button';
import { Configurator, Filterer, Grouper, Sorter } from '@uidu/data-controls';
import React from 'react';
import { EyeOff } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const ConfiguratorForm = loadable(() => import('./configurator'));

export default function Controls<T>({
  availableControls,
  tableInstance,
}: {
  availableControls: any;
  tableInstance: Table<T>;
}) {
  const { getState } = tableInstance;
  const { columnVisibility } = getState();
  const hiddenCount = columnVisibility?.length || 0;

  return (
    <ButtonGroup>
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
            id="uidu.data-views.list.controls.hide_fields"
          />
        }
        configurator={ConfiguratorForm}
        tableInstance={tableInstance}
      />
      {availableControls.filterer.visible && (
        <Filterer
          tableInstance={tableInstance}
          {...availableControls.filterer.props}
        />
      )}
      {availableControls.sorter.visible && (
        <Sorter
          tableInstance={tableInstance}
          {...availableControls.sorter.props}
        />
      )}
      {availableControls.grouper.visible && (
        <Grouper
          tableInstance={tableInstance}
          {...availableControls.grouper.props}
        />
      )}
    </ButtonGroup>
  );
}
