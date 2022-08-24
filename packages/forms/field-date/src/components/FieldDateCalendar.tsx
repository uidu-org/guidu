import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import {
  FieldBaseProps,
  StyledAddon,
  StyledInput,
  useController,
  Wrapper,
} from '@uidu/field-base';
import Popup, { TriggerProps } from '@uidu/popup';
import { format, isValid, parse } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { ClassNames, DayPicker } from 'react-day-picker';
import styles from 'react-day-picker/dist/style.module.css';
import { FieldDateCalendarProps } from '../types';

export default function FieldDateCalendar({
  name,
  value: defaultValue,
  onChange = () => {},
  dayPickerProps,
  onDayChange,
  formatSubmit = 'yyyy-MM-dd',
  displayFormat = 'PP',
  today = new Date(),
  locale = enUS,
  ...rest
}: FieldBaseProps<string> & FieldDateCalendarProps) {
  const { field, inputProps, wrapperProps, fieldState } = useController({
    name,
    defaultValue,
    onChange,
    ...rest,
  });

  const parseValue = useCallback(
    (value: string) => parse(value, displayFormat, today, { locale }),
    [displayFormat, today, locale],
  );

  const date = parse(field.value, formatSubmit, new Date());

  const [selected, setSelected] = useState<Date>(date);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    field.value && field.value !== '' ? format(date, displayFormat) : '',
  );

  const setSelectedDay = useCallback(
    (day: Date) => {
      const value = day ? format(day, formatSubmit) : '';
      setSelected(day);
      if (day) {
        setInputValue(format(day, displayFormat));
        field.onChange(value);
        onChange(name, value);
      } else {
        setInputValue('');
      }
    },
    [displayFormat, formatSubmit, field, onChange, name],
  );

  const onDayClick = useCallback(
    (d: Date | undefined) => {
      setSelectedDay(d);
      setIsDialogOpen(false);
    },
    [setSelectedDay],
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      const day = parseValue(e.target.value);
      if (isValid(day)) {
        setSelectedDay(day);
      } else {
        // setSelectedDay(undefined);
      }
    },
    [parseValue, setSelectedDay],
  );

  const Content = useCallback(() => {
    const classNames: ClassNames = {
      ...styles,
      ...dayPickerProps.classNames,
    };
    return (
      <div tw="p-3">
        <DayPicker
          initialFocus={isDialogOpen}
          mode="single"
          defaultMonth={isValid(date) ? date : new Date()}
          onDayClick={onDayClick}
          selected={selected}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...dayPickerProps}
          classNames={classNames}
        />
      </div>
    );
  }, [date, dayPickerProps, isDialogOpen, onDayClick, selected]);

  const Trigger = useCallback(
    (triggerProps: TriggerProps) => (
      <Wrapper
        {...wrapperProps}
        addonsAfter={[
          <StyledAddon>
            <button
              {...triggerProps}
              tw="h-full w-full px-4"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDialogOpen(true);
              }}
            >
              <CalendarDaysIcon tw="h-5 w-5" />
            </button>
          </StyledAddon>,
        ]}
      >
        <StyledInput
          {...inputProps}
          $hasError={!!fieldState?.error}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
      </Wrapper>
    ),
    [
      handleInputChange,
      inputProps,
      inputValue,
      wrapperProps,
      fieldState?.error,
    ],
  );

  return (
    <Popup
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      placement="bottom"
      content={Content}
      trigger={Trigger}
    />
  );
}
