import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const AddField: Field = {
  kind: 'addField',
  name: (
    <FormattedMessage id="field.addField.name" defaultMessage="Add field" />
  ),
  icon: <FontAwesomeIcon icon={faPlus} />,
  // description: (
  //   <FormattedMessage
  //     id="field.address.description"
  //     defaultMessage="Allow geolocation of your records with Google Maps autocomplete help"
  //   />
  // ),
};

export default AddField;
