import { FieldBaseProps } from '@uidu/field-base';
import { HTMLProps, RefObject } from 'react';

export type FieldTimeProps = FieldBaseProps;

export type FieldTimeStatelessProps = HTMLProps<HTMLInputElement> & {
  forwardedRef: RefObject<HTMLInputElement>;
};
