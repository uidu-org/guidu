// @flow
import React from 'react';
import Avatar from '@atlaskit/avatar';
import Tag from '../src';

export default () => (
  <div>
    <Tag text="Base Tag" />
    <Tag text="Avatar Before" elemBefore={<Avatar size="xsmall" />} />
    <Tag text="Linked Tag" href="/components/tag" />
    <Tag text="Rounded Tag" appearance="rounded" />
    <Tag text="Removable button" removeButtonText="Aria label" />
    <Tag
      text="Removal halted"
      removeButtonText="Aria label"
      onBeforeRemoveAction={() => {
        console.log('Removal halted'); // eslint-disable-line no-console
        return false;
      }}
    />
    <Tag
      text="Post Removal Hook"
      removeButtonText="Aria label"
      onBeforeRemoveAction={() => {
        console.log('Before removal'); // eslint-disable-line no-console
        return true;
      }}
      onAfterRemoveAction={e => console.log('After removal', e)} // eslint-disable-line no-console
    />
  </div>
);
