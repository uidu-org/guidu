import moment from 'moment';
import React, { Component } from 'react';
import 'react-big-calendar/lib/sass/styles.scss';
import Calendar from '../';
import { availableColumns, fetchContacts } from '../../table/examples-utils';

export default class Basic extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [...availableColumns],
    };
  }

  componentDidMount() {
    fetchContacts().then((rowData) => this.setState({ rowData }));
  }

  render() {
    return (
      <Calendar
        columnDefs={this.state.columnDefs}
        events={(this.state.rowData || []).map((datum) => ({
          start: moment(datum.createdAt).toDate(),
          end: moment(datum.createdAt).add(1, 'hour').toDate(),
          title: datum.email,
        }))}
      />
    );
  }
}
