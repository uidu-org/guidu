import React from 'react';
import { DashletGroupProps } from '../types';
import DashletHeader from './DashletHeader';
import Dashlets from './Dashlets';

export default function DashletGroup({
  isCard = true,
  showHeader,
  dashlet,
  dashlets,
  ...rest
}: DashletGroupProps) {
  return (
    <div className={`h-100${isCard ? ' card' : ' card border-0'}`}>
      {dashlet.label && (
        <DashletHeader
          name={dashlet.label}
          description={dashlet.description}
          isCard={isCard}
        />
      )}
      <Dashlets
        dashlets={dashlets.map((b) => ({ ...b, isCard: false }))}
        {...rest}
      />
    </div>
  );
}
