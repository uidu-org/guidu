import React, { memo } from 'react';
import tw from 'twin.macro';
import NavigationGroupHeading from './NavigationGroupHeading';

function NavigationGroup({
  heading = undefined,
  separator = undefined,
  withPadding = true,
  withMargin = true,
  before,
  after,
  children,
  className,
}) {
  return (
    <>
      <ul
        css={[tw`flex flex-col space-y-0.5 px-5`, withMargin && tw`my-5`]}
        className={className}
      >
        {heading && (
          <NavigationGroupHeading
            before={before}
            after={after}
            text={heading}
          />
        )}
        {children}
      </ul>
      {separator && <hr tw="mx-5" />}
    </>
  );
}

export default memo(NavigationGroup);
