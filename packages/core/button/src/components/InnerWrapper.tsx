import * as React from 'react';
import tw from 'twin.macro';
interface Props {
  onClick?: React.MouseEventHandler;
  fit: boolean;
  children: React.ReactNode;
}

export default ({ fit, children, ...rest }: Props) => (
  <span
    css={[
      tw`self-center inline-flex flex-nowrap max-w-full relative`,
      fit && tw`w-full justify-center`,
    ]}
    {...rest}
  >
    {children}
  </span>
);
