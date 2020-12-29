import {
  akEditorFloatingDialogZIndex,
  Popup,
  timestampToIsoFormat,
  timestampToUTCDate,
} from '@uidu/editor-common';
import FieldDate from '@uidu/field-date';
import Form from '@uidu/form';
import { borderRadius, colors } from '@uidu/theme';
import React from 'react';
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

export default class DatePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const timestamp = props.element!.getAttribute('timestamp');
    if (timestamp) {
      const { day, month, year } = timestampToUTCDate(timestamp);
      this.state = {
        selected: [timestampToIsoFormat(timestamp)],
        day,
        month,
        year,
      };
    }
  }

  render() {
    const { element, closeDatePicker, onSelect } = this.props;
    const timestamp = element!.getAttribute('timestamp');
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
        <Form>
          <FieldDate
            withCalendar
            name="date"
            onChange={this.handleChange}
            onSelect={onSelect}
            {...this.state}
            ref={this.handleRef}
            innerProps={{ style: calendarStyle }}
          />
        </Form>
      </PopupWithListeners>
    );
  }

  private handleChange = ({ day, month, year }: CalendarOnChange) => {
    this.setState({
      day,
      month,
      year,
    });
  };

  private handleRef = (ref?: HTMLElement) => {
    const elm = ref && (ReactDOM.findDOMNode(ref) as HTMLElement);
    if (elm) {
      elm.focus();
    }
  };
}
