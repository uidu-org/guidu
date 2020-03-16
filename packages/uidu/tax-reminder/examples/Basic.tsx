import React from 'react';
import TaxReminder from '../';
import { WidgetsExampleScaffold } from '../../widgets/example-utils';

export default function Basic() {
  return (
    <WidgetsExampleScaffold
      component={TaxReminder}
      donation={{}}
      currentOrganization={{ name: 'Charity Water' }}
      donationCampaign={{ name: 'The Spring' }}
      onCreate={(_donation, token) => console.log(token)}
    />
  );
}
