import FieldDownshift, { DownshiftRadio } from '@uidu/field-downshift';
import FieldNumber from '@uidu/field-number';
import Select from '@uidu/select';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

export default function AppointmentForm() {
  const [unit, setUnit] = useState('minutes');
  return (
    <>
      <FieldDownshift
        label={<FormattedMessage defaultMessage="Choose a duration" />}
        name="duration"
        options={[
          {
            id: 15,
            name: '15 min',
          },
          {
            id: 30,
            name: '30 min',
          },
          {
            id: 45,
            name: '45 min',
          },
          {
            id: 60,
            name: '60 min',
          },
        ]}
        menu={(props) => <div className="d-flex mx-n2" {...props} />}
        option={DownshiftRadio}
        rowClassName="mb-1"
      />
      <div className="form-group">
        <label htmlFor="minutes">
          <FormattedMessage defaultMessage="...or choose a custom duration" />
        </label>

        <div className="row">
          <div className="col-4">
            <FieldNumber
              layout="elementOnly"
              name="minutes"
              min={1}
              max={unit === 'minutes' ? 60 : 12}
            />
          </div>
          <div className="col-4">
            <Select
              layout="elementOnly"
              name="unit"
              onChange={(name, value) => setUnit(value)}
              value={unit}
              options={[
                {
                  id: 'minutes',
                  name: <FormattedMessage defaultMessage="Minutes" />,
                },
                {
                  id: 'hours',
                  name: <FormattedMessage defaultMessage="Hours" />,
                },
              ]}
            />
          </div>
        </div>
      </div>
      <ol>
        <li>duration</li>
        <li>availability</li>
      </ol>
    </>
  );
}
