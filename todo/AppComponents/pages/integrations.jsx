import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'utils/components';

import { Integrations } from 'components/AppComponents';

export default class IntegrationsPage extends Component {
  render() {
    return (
      <div>
        <PageHeader name="Integrazioni" />
        <Integrations {...this.props} />
      </div>
    );
  }
}

IntegrationsPage.propTypes = {};
