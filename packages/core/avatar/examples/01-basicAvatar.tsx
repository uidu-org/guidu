import React from 'react';
import { Block, Gap } from '../examples-utils/helpers';
import Avatar from '../src';

export default () => (
  <div>
    <Block heading="Circle">
      <Avatar name="xxlarge" size="xxlarge" />
      <Avatar
        name="xxlarge"
        size="xxlarge"
        component={(props) => {
          console.log(props);
          return (
            <span tw="absolute h-full w-full flex items-center justify-center bg-red-100 rounded-full text-3xl font-bold">
              AV
            </span>
          );
        }}
      />
      <Gap />
      <Avatar name="xlarge" size="xlarge" presence="online" />
      <Gap />
      <Avatar name="large" size="large" presence="offline" />
      <Gap />
      <Avatar name="medium" size="medium" presence="busy" />
      <Gap />
      <Avatar name="small" size="small" presence="focus" />
      <Gap />
      <Avatar name="xsmall" size="xsmall" />
    </Block>
    <Block heading="Square">
      <Avatar appearance="square" name="xxlarge" size="xxlarge" />
      <Gap />
      <Avatar
        appearance="square"
        name="xlarge"
        size="xlarge"
        status="approved"
      />
      <Gap />
      <Avatar appearance="square" name="large" size="large" status="declined" />
      <Gap />
      <Avatar appearance="square" name="medium" size="medium" status="locked" />
      <Gap />
      <Avatar appearance="square" name="small" size="small" />
      <Gap />
      <Avatar appearance="square" name="xsmall" size="xsmall" />
    </Block>
  </div>
);
