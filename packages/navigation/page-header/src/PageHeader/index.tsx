import React from 'react';
import tw from 'twin.macro';
import { PageHeaderProps } from '../types';

const PageHeader = ({
  innerRef,
  breadcrumbs,
  actions,
  children,
  disableTitleStyles = false,
  truncateTitle = false,
  className,
}: PageHeaderProps) => {
  return (
    <div className={className} tw="flex flex-grow flex-col py-6 min-w-0">
      {breadcrumbs}
      <div tw="mt-1 flex md:items-center justify-between">
        <div tw="flex-1 min-w-0">
          {disableTitleStyles ? (
            children
          ) : (
            <h2
              ref={innerRef}
              tabIndex={-1}
              css={[
                tw`text-2xl font-bold sm:text-3xl`,
                truncateTitle && tw`truncate`,
              ]}
            >
              {children}
            </h2>
          )}
        </div>
        <div tw="ml-4">{actions}</div>
      </div>
    </div>
  );
};

export default PageHeader;
