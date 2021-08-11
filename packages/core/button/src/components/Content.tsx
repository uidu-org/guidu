import * as React from 'react';
import tw from 'twin.macro';

interface Props {
  followsIcon: boolean;
  spacing: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}

export default ({
  children,
  followsIcon,
  spacing,
  isLoading,
  ...rest
}: Props) => (
  <span
    css={[
      tw`flex-auto max-w-full truncate transition-opacity`,
      followsIcon ? tw`items-baseline` : tw`items-center`,
      spacing === 'none' ? tw`m-0` : tw`mx-1`,
      isLoading ? tw`opacity-0` : tw`opacity-100`,
    ]}
    {...rest}
  >
    {children}
  </span>
);
