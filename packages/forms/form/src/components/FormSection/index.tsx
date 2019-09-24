import React from 'react';
import Media from 'react-media';

const FormSection = ({
  name,
  description,
  children,
  isFirst = false,
  isLast = false,
}) => (
  <Media query={{ maxWidth: 768 }}>
    {matches => {
      if (matches) {
        return children || null;
      }
      return (
        <div
          className={`row justify-content-between${
            !isLast ? ' border-bottom' : ''
          }${isFirst ? ' pb-4' : ' py-5'}`}
        >
          <div className="col-sm-4 mt-1">
            <h6>{name}</h6>
            {description}
          </div>
          <div className="col-sm-7">{children}</div>
        </div>
      );
    }}
  </Media>
);

export default FormSection;
