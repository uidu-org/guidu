import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';
import Cell from './Cell';

const mocks = loadable(() => import('./mocks'));

const Checkbox: Field = {
  kind: 'checkbox',
  name: <FormattedMessage defaultMessage="Checkbox" />,
  icon: <FontAwesomeIcon icon={faCheckSquare} />,
  description: (
    <FormattedMessage defaultMessage="A single checkbox that can be checked or unchecked." />
  ),
  color: '#C75875',
  Cell,
  mocks,
};

export default Checkbox;
