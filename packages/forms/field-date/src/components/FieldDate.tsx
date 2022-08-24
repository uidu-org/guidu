import React, { useEffect, useState } from 'react';
import { FieldDateProps } from '../types';
import FieldDateCalendar from './FieldDateCalendar';
import FieldDateNative from './FieldDateNative';

export default function FieldDate({
  withCalendar = false,
  ...rest
}: FieldDateProps) {
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const test = document.createElement('input');

    try {
      test.type = 'date';
    } catch (e) {
      setIsFallback(true);
    }
  }, []);

  if (withCalendar || isFallback) {
    return <FieldDateCalendar {...rest} />;
  }

  return <FieldDateNative {...rest} />;
}
