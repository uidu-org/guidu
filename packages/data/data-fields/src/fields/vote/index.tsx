import { faPoll } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Vote: ColumnDef<unknown, object> = {
  meta: {
    kind: 'vote',
    name: (
      <FormattedMessage defaultMessage="Vote" id="uidu.data-fields.vote.name" />
    ),
    icon: <FontAwesomeIcon icon={faPoll} />,
  },
};

export default Vote;
