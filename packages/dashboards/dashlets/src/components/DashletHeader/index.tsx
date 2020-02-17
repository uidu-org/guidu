import React from 'react';
import { DashletHeaderProps } from './types';

export default function DashletHeader(props: DashletHeaderProps) {
  const { name, description } = props;
  return (
    <div className="card-header border-0 pt-4">
      <h5 className="card-title h6 m-0">{name}</h5>
      {description && <p className="text-muted mb-0">{description}</p>}
    </div>
  );
}
