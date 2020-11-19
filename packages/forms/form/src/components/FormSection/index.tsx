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
            }${isFirst ? ' pb-4' : ' pt-5 pb-4'}`}
          >
            {layout !== 'elementOnly' && (
              <div className={`mb-3 col-md-${layout === 'horizontal' ? 4 : 9}`}>
                <legend
                  className={`${
                    layout === 'horizontal' ? 'h5' : 'h5'
                  } font-weight-bold d-flex align-items-center`}
                >
                  {Icon && (
                    <Icon
                      size={30}
                      className="ml-n5 mr-3"
                      style={{ opacity: 0.15 }}
                      strokeWidth={1}
                    />
                  )}
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
