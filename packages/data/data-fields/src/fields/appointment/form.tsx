import FieldDownshift, { DownshiftRadio } from '@uidu/field-downshift';
import FieldNumber from '@uidu/field-number';
import FieldTime from '@uidu/field-time';
import { FormSection } from '@uidu/form';
import Select from '@uidu/select';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import React, { useState } from 'react';
import { Copy, Plus, Trash } from 'react-feather';
import { FormattedMessage } from 'react-intl';

dayjs.extend(localeData);

export default function AppointmentForm() {
  const [unit, setUnit] = useState('minutes');
  return (
    <>
      <FormSection
        name={<FormattedMessage defaultMessage="Date range" />}
        isFirst
      ></FormSection>
      <FormSection name={<FormattedMessage defaultMessage="Duration" />}>
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
          menu={(props) => (
            <div
              tw="flex -m-3"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...props}
            />
          )}
          option={DownshiftRadio}
        />
        <div tw="mb-4">
          <label htmlFor="minutes">
            <FormattedMessage defaultMessage="...or choose a custom duration" />
          </label>

          <div tw="flex space-x-4">
            <div tw="w-4/12">
              <FieldNumber
                layout="elementOnly"
                name="minutes"
                min={1}
                max={unit === 'minutes' ? 60 : 12}
              />
            </div>
            <div tw="w-4/12">
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
      </FormSection>
      <FormSection name={<FormattedMessage defaultMessage="Availability" />}>
        <div tw="flex space-x-4">
          <div tw="w-7/12">
            <div className="card">
              <div className="card-header">
                <FormattedMessage defaultMessage="Set the weekly hours you're typically available for events" />
              </div>
              <div className="list-group list-group-flush">
                {dayjs.weekdaysShort().map((weekday) => (
                  <div key={weekday} tw="flex items-center content-between">
                    <div tw="flex items-center mr-5">
                      <div
                        tw="whitespace-nowrap flex-shrink-0 mr-3"
                        style={{ width: 64 }}
                      >
                        <input type="checkbox" /> <strong>{weekday}</strong>
                      </div>
                      <div tw="flex items-center">
                        <FieldTime
                          layout="elementOnly"
                          name={`${weekday}-start`}
                        />
                        <span tw="mx-2">-</span>
                        <FieldTime
                          layout="elementOnly"
                          name={`${weekday}-end`}
                        />

                        <button className="btn btn-sm d-flex px-2 flex-shrink-0">
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                    <div tw="flex items-center">
                      <button className="btn btn-sm d-flex px-2">
                        <Copy size={16} />
                      </button>
                      <button className="btn btn-sm d-flex px-2">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div tw="w-5/12">
            <div className="card h-100">
              <div className="card-header">
                <FormattedMessage defaultMessage="Add hours for specific dates." />
              </div>
              <div className="card-body">
                <p className="text-muted text-center">
                  <FormattedMessage defaultMessage="Add dates when your availability changes from your weekly hours" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </FormSection>
    </>
  );
}
