import { Wrapper } from '@uidu/field-base';
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
    return (
      <Wrapper {...rest}>
        <FieldTextStateless {...rest} type="text" ref={element} />
      </Wrapper>
    );
  }
  return (
    <Wrapper {...rest}>
      <FieldTextStateless {...rest} type="password" ref={element} />
    </Wrapper>
  );
}

const FieldPasswordStateless = forwardRef(
  (props: FieldPasswordStatelessProps, ref) => (
    <FieldPassword {...props} forwardedRef={ref} />
  ),
);

export default FieldPasswordStateless;
