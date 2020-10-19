import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';
import Renderer from './renderer';

const Checkbox: Field = {
  kind: 'checkbox',
  name: <FormattedMessage id="field.checkbox.name" defaultMessage="Checkbox" />,
  icon: <FontAwesomeIcon icon={faCheckSquare} />,
  description: (
    <FormattedMessage
      id="field.checkbox.description"
      defaultMessage="A single checkbox that can be checked or unchecked."
    />
  ),
  Cell: Renderer,
};

export default Checkbox;
