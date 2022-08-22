import React from 'react';

export default function FormMeta({ className, ...otherProps }) {
  return <div {...otherProps} className={className} />;
}
