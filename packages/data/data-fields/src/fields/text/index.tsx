import { faParagraph } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Filter = loadable(
  () => import('../../components/filters/TextFilterForm'),
);

const Text: Field = {
  kind: 'text',
  name: <FormattedMessage defaultMessage="Text" />,
  icon: <FontAwesomeIcon icon={faParagraph} color="#fff" />,
  description: (
    <FormattedMessage
      id="field.text.description"
      defaultMessage="A long text field that can span multiple lines."
    />
  ),
  color: '#CB732B',
  Filter,
};

export default Text;
