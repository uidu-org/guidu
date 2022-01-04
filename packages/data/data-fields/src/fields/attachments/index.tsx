import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';
import Cell from './Cell';

const mocks = loadable(() => import('./mocks'));

const Attachments: Field = {
  kind: 'attachments',
  name: (
    <FormattedMessage defaultMessage="Files" id="uidu.data-fields.files.name" />
  ),
  icon: <FontAwesomeIcon icon={faFile} />,
  description: (
    <FormattedMessage
      defaultMessage="Attachments allow you to add images, documents, or other files which can then be viewed or downloaded."
      id="uidu.data-fields.files.description"
    />
  ),
  color: '#8093A6',
  Cell,
  mocks,
};

export default Attachments;
