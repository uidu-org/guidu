/* eslint-disable react/jsx-props-no-spreading */

import { Wrapper } from '@uidu/field-base';
import autosize from 'autosize';
import React, { useEffect, useRef } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';

export default function FieldTextareaHook<T>({
  register,
  name,
  autoSize,
  ...props
}: {
  register: UseFormRegister<T>;
  name: Path<T>;
}) {
  const element = useRef<HTMLTextAreaElement>();
  const { ref } = register(name);

  useEffect(() => {
    if (autoSize) {
      autosize(element.current);
    }
    return () => {
      autosize.destroy(element.current);
    };
  }, [autoSize]);

  return (
    <Wrapper {...props}>
      <textarea
        tw="background[rgb(var(--body-on-primary-bg))] shadow-sm focus:--tw-ring-color[rgba(var(--brand-primary), .1)] focus:ring-2 focus:border-color[rgb(var(--brand-primary))] block w-full border border-color[rgb(var(--field-border, var(--border)))] rounded py-3 px-4 placeholder-gray-400 disabled:opacity-50 disabled:background[rgba(var(--brand-subtle), .4)]"
        {...register(name)}
        onChange={register(name).onChange}
        ref={(e) => {
          ref(e);
          element.current = e;
        }}
        {...props}
      />
    </Wrapper>
  );
}
