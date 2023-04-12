import { faImage } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Cover: ColumnDef<unknown> = {
  meta: {
    kind: 'cover',
    name: (
      <FormattedMessage
        defaultMessage="Cover"
        id="uidu.data-fields.cover.name"
      />
    ),
    icon: <FontAwesomeIcon icon={faImage} />,
    description: (
      <FormattedMessage
        defaultMessage="Add a cover image to your record"
        id="uidu.data-fields.cover.description"
      />
    ),
    isPrivate: true,
    color: 'skyblue',
  },
  enableSorting: false,
};

export default Cover;
