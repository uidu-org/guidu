import FieldToggle from '@uidu/field-toggle';
import Select from '@uidu/select';
import React from 'react';

export default function Legend({ config, setConfig }) {
  return (
    <div
      onKeyDown={(e) => {
        console.log(e);
        e.stopPropagation();
      }}
    >
      <FieldToggle
        label="Show legend"
        name="legend"
        className="py-3"
        onChange={(name, value) => {
          if (value) {
            setConfig({
              ...config,
              [name]: {
                disabled: false,
                fillOpacity: 0.3,
                fontSize: 14,
              },
            });
          } else {
            setConfig({
              ...config,
              [name]: {
                disabled: true,
              },
            });
          }
        }}
      />
      <Select
        label="Position"
        name="position"
        options={[
          { id: 'left', name: 'left' },
          { id: 'right', name: 'right' },
          { id: 'top', name: 'top' },
          { id: 'bottom', name: 'bottom' },
        ]}
        onChange={(name, value) => {
          setConfig({
            ...config,
            legend: {
              [name]: value,
            },
          });
        }}
      />
    </div>
  );
}
