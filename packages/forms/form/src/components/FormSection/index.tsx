import React from 'react';
import Media from 'react-media';
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
          <fieldset
            className={`row justify-content-between${
              !isLast ? ' border-bottom' : ''
            }${isFirst ? ' pb-4' : ' py-5'}`}
          >
            {layout !== 'elementOnly' && (
              <div
                className={`mb-2 col-md-${layout === 'horizontal' ? 4 : 12}`}
              >
                <legend className="h4 font-weight-bold d-flex align-items-center">
                  {Icon && <Icon size={24} className="mr-2" />}
                  {name}
                </legend>
                {description}
              </div>
            )}
            {children && (
              <div className={`col-md-${layout === 'horizontal' ? 7 : 12}`}>
                {children}
              </div>
            )}
          </fieldset>
        );
      }}
    </Media>
  );
}
