import React from 'react';
import { HelpProps } from './types';

export default function Help({ help, id }: HelpProps) {
  return (
    <small className="form-text text-muted" id={`${id}-desc`}>
      {help}
    </small>
  );
}
