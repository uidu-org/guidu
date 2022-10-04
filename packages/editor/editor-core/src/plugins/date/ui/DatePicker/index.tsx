import {
  akEditorFloatingDialogZIndex,
  Popup,
  timestampToUTCDate,
} from '@uidu/editor-common';
import FieldDate from '@uidu/field-date';
import Form, { useForm } from '@uidu/form';
import { borderRadius, colors } from '@uidu/theme';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import withOuterListeners from '../../../../ui/with-outer-listeners';
import { DateType } from '../../types';

const PopupWithListeners = withOuterListeners(Popup);

const calendarStyle = {
  padding: borderRadius(),
  borderRadius: borderRadius(),
  boxShadow: `0 4px 8px -2px ${colors.N60A}, 0 0 1px ${colors.N60A}`,
  backgroundColor: colors.N0,
};

export interface Props {
  element: HTMLElement | null;
  closeDatePicker: () => void;
  onSelect: (date: DateType) => void;
}

export interface State {
  day: number;
  month: number;
  year: number;
  selected: Array<string>;
}

type CalendarOnChange = {
  day: number;
  month: number;
  year: number;
};

export default function DatePicker(props: Props) {
  const { element, closeDatePicker, onSelect } = props;
  const timestamp = element!.getAttribute('timestamp');
  const { day, month, year } = timestampToUTCDate(timestamp);
  const [state, setState] = useState({});

  if (timestamp) {
    // this.state = {
    //   selected: [timestampToIsoFormat(timestamp)],
    //   day,
    //   month,
    //   year,
    // };
  }

  const handleChange = ({ day, month, year }: CalendarOnChange) => {
    setState({
      day,
      month,
      year,
    });
  };

  const handleRef = (ref?: HTMLElement) => {
    const elm = ref && (ReactDOM.findDOMNode(ref) as HTMLElement);
    if (elm) {
      elm.focus();
    }
  };

  const form = useForm({});

  if (!timestamp) {
    return null;
  }

  return (
    <PopupWithListeners
      target={element!}
      offset={[0, 8]}
      fitHeight={327}
      fitWidth={340}
      handleClickOutside={closeDatePicker}
      handleEscapeKeydown={closeDatePicker}
      zIndex={akEditorFloatingDialogZIndex}
    >
      <Form form={form}>
        <FieldDate
          withCalendar
          name="date"
          onChange={handleChange}
          onSelect={onSelect}
          {...state}
          ref={handleRef}
          innerProps={{ style: calendarStyle }}
        />
      </Form>
    </PopupWithListeners>
  );
}
