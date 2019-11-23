import { faParagraph } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const FilterForm = loadable(() => import('../../filters/TextFilterForm'));

const Text: Field = {
  kind: 'text',
  name: <FormattedMessage id="field.text.name" defaultMessage="Text" />,
  icon: <FontAwesomeIcon icon={faParagraph} />,
  description: (
    <FormattedMessage
      id="field.text.description"
      defaultMessage="A long text field that can span multiple lines."
    />
  ),
  filterForm: FilterForm,
};

export default Text;
