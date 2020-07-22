import Select from '@uidu/select';
import React from 'react';

const legendOptions = {
  none: {
    disabled: true,
  },
  left: {
    position: 'left',
    disabled: false,
    fillOpacity: 0.3,
    fontSize: 14,
  },
  right: {
    position: 'right',
    disabled: false,
    fillOpacity: 0.3,
    fontSize: 14,
  },
  bottom: {
    position: 'bottom',
    disabled: false,
    fillOpacity: 0.3,
    fontSize: 14,
  },
  top: {
    position: 'top',
    disabled: false,
    fillOpacity: 0.3,
    fontSize: 14,
  },
};

export default function Legend({ config, setConfig }) {
  return (
    <>
      <Select
        label="Legend"
        name="position"
        options={[
          { id: 'none', name: 'none' },
          { id: 'left', name: 'left' },
          { id: 'right', name: 'right' },
          { id: 'top', name: 'top' },
          { id: 'bottom', name: 'bottom' },
        ]}
        onChange={(name, value) => {
          setConfig({
            ...config,
            legend: legendOptions[value],
          });
        }}
      />
    </>
  );
}
