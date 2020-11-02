import React from 'react';
import Media from 'react-media';
import { FormSectionProps } from '../../types';

export default function FormSection({
  name,
  description,
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
          <fieldset
            className={`row justify-content-between${
              !isLast ? ' border-bottom' : ''
            }${isFirst ? ' pb-4' : ' py-5'}`}
          >
            {layout !== 'elementOnly' && (
              <div className={`col-sm-${layout === 'horizontal' ? 4 : 12}`}>
                <legend className="h6">{name}</legend>
                {description}
              </div>
            )}
            {children && (
              <div className={`col-sm-${layout === 'horizontal' ? 7 : 12}`}>
                {children}
              </div>
            )}
          </fieldset>
        );
      }}
    </Media>
  );
}
