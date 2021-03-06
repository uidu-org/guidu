import React from 'react';
import { getAdorableAvatar, RANDOM_USERS } from '../examples-utils/data';
import { ExampleGroup } from '../examples-utils/helpers';
import AvatarGroup from '../src';

export default () => {
  const data = RANDOM_USERS.map((d) => ({
    email: d.email,
    key: d.email,
    name: d.name,
    src: getAdorableAvatar(d.email),
    href: '#',
    appearance: 'circle' as AppearanceType,
    size: 'medium' as SizeType,
    enableTooltip: true,
  }));

  return (
    <div style={{ maxWidth: 270 }}>
      <ExampleGroup heading="Display in a Stack">
        <AvatarGroup
          appearance="stack"
          onAvatarClick={console.log}
          data={data}
          size="large"
        />
      </ExampleGroup>
      <ExampleGroup heading="Display as a Grid">
        <AvatarGroup
          appearance="grid"
          onAvatarClick={console.log}
          data={data}
          maxCount={14}
          size="large"
        />
      </ExampleGroup>
    </div>
  );
};
