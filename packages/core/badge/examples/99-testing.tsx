import React from 'react';
import Badge from '../src';

export default function Example() {
  return (
    <div>
      <p>
        Added
        <Badge appearance="added" max={99}>
          {2}
        </Badge>
      </p>
      <p>
        default
        <Badge appearance="default" max={99}>
          {67}
        </Badge>
      </p>
      <p>
        important
        <Badge appearance="important" max={99} tes>
          {20}
        </Badge>
      </p>
      <p>
        primary
        <Badge appearance="primary" max={99} testId="myBadgePrimary">
          {19}
        </Badge>
      </p>
    </div>
  );
}
