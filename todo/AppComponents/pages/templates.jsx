import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { PageHeader, PageAction } from 'utils/components';

export default class SettingsPage extends Component {
  render() {
    return (
      <div>
        <PageHeader name="Templates" />
      </div>
    );
  }
}

SettingsPage.propTypes = {};
