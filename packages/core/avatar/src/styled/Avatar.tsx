import React, { FC, ReactNode } from 'react';
import { Theme } from '../theme';
import { AppearanceType, SizeType } from '../types';

interface AvatarProps {
  size: SizeType;
  children: ReactNode;
  stackIndex?: number;
}

const Avatar: FC<AvatarProps> = (props) => (
  <Theme.Consumer {...props} includeBorderWidth>
    {({ dimensions }) => {
      return (
        <div
          tw="relative outline[0]"
          style={{
            zIndex: props.stackIndex,
            ...dimensions,
          }}
        >
          {props.children}
        </div>
      );
    }}
  </Theme.Consumer>
);

export default Avatar;

interface PresenceWrapperProps {
  appearance: AppearanceType;
  size: SizeType;
  children: ReactNode;
}

export const PresenceWrapper: FC<PresenceWrapperProps> = (props) => (
  <Theme.Consumer {...props} includeBorderWidth>
    {({ presence }) => {
      return (
        <span
          tw="absolute pointer-events-none"
          style={{
            ...presence,
          }}
        >
          {props.children}
        </span>
      );
    }}
  </Theme.Consumer>
);

interface StatusWrapperProps {
  appearance: AppearanceType;
  size: SizeType;
  children: any;
}

export const StatusWrapper: FC<StatusWrapperProps> = (props) => (
  <Theme.Consumer {...props} includeBorderWidth>
    {({ status }) => {
      return (
        <span
          tw="absolute"
          style={{
            ...status,
          }}
        >
          {props.children}
        </span>
      );
    }}
  </Theme.Consumer>
);
