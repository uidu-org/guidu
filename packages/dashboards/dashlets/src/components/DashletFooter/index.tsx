import React from 'react';
import { DashletsFooterProps } from './types';

export default function DashletFooter({ children }: DashletsFooterProps) {
  return <div className="card-footer">{children}</div>;
}
