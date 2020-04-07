import React from 'react';
import Media from 'react-media';

export default function FormSection({
  name,
  description,
  children = null,
  isFirst = false,
  isLast = false,
}) {
  return (
    <Media query={{ maxWidth: 768 }}>
      {(matches) => {
        if (matches) {
          return children || null;
        }
        return (
          <div
            className={`row justify-content-between${
              !isLast ? ' border-bottom' : ''
            }${isFirst ? ' pb-4' : ' py-5'}`}
          >
            <div className={`col-sm-${children ? '4' : '12'} mt-1`}>
              <h6>{name}</h6>
              {description}
            </div>
            {children && <div className="col-sm-7">{children}</div>}
          </div>
        );
      }}
    </Media>
  );
}
