import React from 'react';
import { HelpProps } from './types';

export default function Help({ help }: HelpProps) {
  return <small className="form-text text-muted">{help}</small>;
}
