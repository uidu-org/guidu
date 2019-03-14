/* tslint:disable:no-console */

import * as React from 'react';
import { Context, FileItem, Identifier } from '@uidu/media-core';
import { createStorybookContext } from '@uidu/media-test-helpers';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import AnnotateIcon from '@atlaskit/icon/glyph/media-services/annotate';
import { SelectableCard } from './selectableCard';
import {
  Card,
  CardAppearance,
  CardEvent,
  OnSelectChangeFuncResult,
  CardAction,
} from '../src';

const context = createStorybookContext();

export const clickHandler = (result: CardEvent) => {
  result.event.preventDefault();
  console.log('click', result.mediaItemDetails);
};

export const mouseEnterHandler = (result: CardEvent) => {
  result.event.preventDefault();
  console.log('mouseEnter', result.mediaItemDetails);
};

export const onSelectChangeHandler = (result: OnSelectChangeFuncResult) => {
  console.log('selectChanged', result);
};

export const createApiCards = (
  appearance: CardAppearance,
  identifier: Identifier,
) => {
  // API methods
  const apiCards = [
    {
      title: 'not selectable',
      content: (
        <Card
          context={context}
          appearance={appearance}
          identifier={identifier}
          onClick={clickHandler}
          onMouseEnter={mouseEnterHandler}
        />
      ),
    },
  ];

  const selectableCard = {
    title: 'selectable',
    content: (
      <SelectableCard
        context={context}
        identifier={identifier}
        onSelectChange={onSelectChangeHandler}
      />
    ),
  };

  if (appearance === 'image') {
    return [...apiCards, selectableCard];
  }

  return apiCards;
};

export const openAction = {
  label: 'Open',
  handler: () => {
    console.log('open');
  },
};
export const closeAction = {
  label: 'Close',
  handler: () => {
    console.log('close');
  },
};
export const deleteAction = {
  label: 'Delete',
  handler: () => {
    console.log('delete');
  },
  icon: <CrossIcon size="small" label="delete" />,
};

export const annotateCardAction: CardAction = {
  label: 'Annotate',
  handler: () => {
    console.log('annotate');
  },
  icon: <AnnotateIcon size="small" label="annotate" />,
};

export const actions = [
  openAction,
  closeAction,
  annotateCardAction,
  deleteAction,
];

export const anotherAction: CardAction = {
  label: 'Some other action',
  handler: (item?: FileItem) => {
    console.log('Some other action', item);
  },
};

export const annotateAction: CardAction = {
  label: 'Annotate',
  handler: (item?: FileItem) => {
    console.log('annotate', item);
  },
};

export const cardsActions = [anotherAction, annotateAction];
export const wrongContext: Context = createStorybookContext({
  authType: 'client',
});
export const wrongCollection = 'adfasdf';
