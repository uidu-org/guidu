import React from 'react';
import Media from 'react-media';
import tw from 'twin.macro';
import { FormSectionProps } from '../../types';

export default function FormSection({
  name,
  description,
  icon: Icon = null,
  children = null,
  isFirst = false,
  isLast = false,
  hideHelpers = false,
  layout = 'vertical',
}: FormSectionProps) {
  return (
    <Media query={{ maxWidth: 768 }}>
      {(matches) => {
        if (matches && hideHelpers) {
          return children || null;
        }
        return (
          <div
            css={[
              tw`flex justify-between flex-col`,
              !isLast && tw`border-b`,
              isFirst ? tw`pb-4` : tw`pt-5 pb-4`,
              layout === 'horizontal' ? tw`flex-row` : tw`flex-col`,
            ]}
          >
            {layout !== 'elementOnly' && (
              <div
                css={[
                  tw`mb-8`,
                  layout === 'horizontal' ? tw`w-4/12` : tw`w-10/12`,
                ]}
              >
                <legend css={[tw`text-xl font-bold flex items-center`]}>
                  {/* {Icon && (
                    <div tw="-ml-5 mr-3 opacity-20">
                      <Icon size={30} strokeWidth={1} />
                    </div>
                  )} */}
                  {name}
                </legend>
                {description}
              </div>
            )}
            {children && (
              <div
                css={[
                  tw`space-y-8`,
                  layout === 'horizontal' ? tw`w-7/12` : tw`w-10/12`,
                ]}
              >
                {children}
              </div>
            )}
          </div>
        );
      }}
    </Media>
  );
}
