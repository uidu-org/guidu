import React, { useEffect, useState } from 'react';
import { FieldTimeProps } from '../types';
import FieldTimeNative from './FieldTimeNative';
import FieldTimeSelect from './FieldTimeSelect';

export default function FieldTime({ asSelect, ...rest }: FieldTimeProps) {
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const test = document.createElement('input');

    try {
      test.type = 'time';
    } catch (e) {
      setIsFallback(true);
    }
  }, []);

  if (asSelect || isFallback) {
    return <FieldTimeSelect {...rest} />;
  }

  return <FieldTimeNative {...rest} />;
}
