import React from 'react';
import tw from 'twin.macro';

export function Square({ children = null, isSelected = false }) {
  return (
    <div
      css={[
        tw`flex items-center justify-center flex-shrink-0 w-5 h-5 border rounded`,
        isSelected ? tw`bg-primary` : tw`bg-gray-50`,
      ]}
    >
      {children}
    </div>
  );
}

export function Circle({ children = null, isSelected = false, ...props }) {
  return (
    <div
      css={[
        tw`flex items-center justify-center flex-shrink-0 w-5 h-5 border rounded-full`,
        isSelected ? tw`bg-primary` : tw`bg-gray-50`,
      ]}
      {...props}
    >
      {children}
    </div>
  );
}
