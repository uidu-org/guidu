import React from 'react';
import tw from 'twin.macro';

interface Props {
  icon: React.ReactChild;
  isLoading?: boolean;
  isOnlyChild: boolean;
  spacing: string;
}

export default ({ spacing, icon, isOnlyChild, isLoading, ...rest }: Props) => (
  <span
    css={[
      tw`self-center flex flex-shrink-0 [line-height:0] [user-select:none] [font-size:0] transition-opacity`,
      isLoading ? tw`opacity-0` : tw`opacity-100`,
      spacing === 'none' ? tw`m-0` : isOnlyChild ? tw`mx-1` : tw`mx-1`,
    ]}
    {...rest}
  >
    {icon}
  </span>
);
