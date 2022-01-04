import loadable from '@loadable/component';
import React from 'react';
import { Trello } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { DataViewKind } from '../../types';

const Controls = loadable(() => import('./controls'));

const Board: DataViewKind = {
  id: 'board',
  name: (
    <FormattedMessage defaultMessage="Board" id="uidu.data-views.board.name" />
  ),
  icon: Trello,
  color: '#D08770',
  description: (
    <FormattedMessage
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
      id="uidu.data-views.board.description"
    />
  ),
  controls: Controls,
};

export default Board;
