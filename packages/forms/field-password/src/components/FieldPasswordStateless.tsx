import { FieldTextStateless } from '@uidu/field-text';
import React, {
  forwardRef,
  RefObject,
  useImperativeHandle,
  useRef,
} from 'react';
import { FieldPasswordStatelessProps } from '../types';

function FieldPassword({
  isPasswordVisible = false,
  forwardedRef,
  ...rest
}: FieldPasswordStatelessProps) {
  const element: RefObject<HTMLInputElement> = useRef();

  useImperativeHandle(forwardedRef, () => element.current);

  if (isPasswordVisible) {
    return <FieldTextStateless {...rest} type="text" ref={element} />;
  }
  return <FieldTextStateless {...rest} type="password" ref={element} />;
}

const FieldPasswordStateless = forwardRef(
  (props: FieldPasswordStatelessProps, ref) => (
    <FieldPassword {...props} forwardedRef={ref} />
  ),
);

export default FieldPasswordStateless;
