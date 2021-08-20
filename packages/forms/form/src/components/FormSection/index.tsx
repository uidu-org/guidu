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
              isFirst ? tw`pb-16` : tw`pt-14 pb-12`,
              layout === 'horizontal' ? tw`lg:flex-row` : tw`flex-col`,
            ]}
          >
            {layout !== 'elementOnly' && (
              <div
                css={[
                  tw`mb-8`,
                  layout === 'horizontal' ? tw`lg:w-3/12` : tw`w-10/12`,
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
                  layout === 'horizontal' ? tw`lg:w-8/12` : tw`w-full`,
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
