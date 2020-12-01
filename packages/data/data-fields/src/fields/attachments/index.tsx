import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Attachments: Field = {
  kind: 'attachments',
  name: <FormattedMessage defaultMessage="Files" />,
  icon: <FontAwesomeIcon icon={faFile} color="#fff" />,
  description: (
    <FormattedMessage defaultMessage="Attachments allow you to add images, documents, or other files which can then be viewed or downloaded." />
  ),
  color: '#8093A6',
};

export default Attachments;
