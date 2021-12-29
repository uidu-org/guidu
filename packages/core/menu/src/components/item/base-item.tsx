import React from 'react';
import { BaseItemProps } from '../types';

function DefaultTitle(p) {
  return <span {...p} />;
}

const BaseItem = ({
  children,
  description,
  iconAfter,
  iconBefore,
  overrides,
}: BaseItemProps) => {
  const Title = overrides?.Title || DefaultTitle;
  console.log(Title);

  return (
    <div tw="flex items-center w-full min-height[fit-content]">
      {iconBefore && (
        <span tw="flex flex-shrink-0 mr-3" data-item-elem-before>
          {iconBefore}
        </span>
      )}
      {children && (
        <span tw="flex-grow text-left overflow-hidden outline-none flex flex-col">
          <DefaultTitle data-item-title tw="truncate">
            {children}
          </DefaultTitle>
          {description && (
            <span data-item-description tw="truncate text-sm text-muted">
              {description}
            </span>
          )}
        </span>
      )}
      {iconAfter && (
        <span data-item-elem-after tw="flex flex-shrink-0 ml-3">
          {iconAfter}
        </span>
      )}
    </div>
  );
};

export default BaseItem;
