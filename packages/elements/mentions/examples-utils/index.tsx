import { faker } from '@faker-js/faker';
import * as React from 'react';
import {
  MentionDescription,
  MentionEventHandler,
  OnMentionEvent,
} from '../src/types';
import debug from '../src/utils/logger';

export const generateMentionItem = (
  component: JSX.Element,
  description?: string,
) => (
  <div>
    <p>{description}</p>
    <ul style={{ padding: 0 }}>{component}</ul>
  </div>
);

export const randomMentions = () =>
  Array.from(Array(10)).map((x) => ({
    avatar: faker.image.avatar(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
  }));

export const onSelection: OnMentionEvent = (mention: MentionDescription) =>
  debug('onSelection ', mention);

export const onMentionEvent: MentionEventHandler = (
  mentionId: string,
  text: string,
  e?: React.SyntheticEvent<HTMLSpanElement>,
) => debug(mentionId, text, e ? e.type : '');
