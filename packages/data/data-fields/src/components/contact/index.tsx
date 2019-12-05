import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const FilterForm = loadable(() => import('../../filters/TextFilterForm'));

const Contact: Field = {
  kind: 'contact',
  name: <FormattedMessage id="field.contact.name" defaultMessage="Contact" />,
  icon: <FontAwesomeIcon icon={faUsers} />,
  description: (
    <FormattedMessage
      id="field.contact.description"
      defaultMessage="A contact field represents a person or an organization - a contact"
    />
  ),
  filterForm: FilterForm,
};

export default Contact;
