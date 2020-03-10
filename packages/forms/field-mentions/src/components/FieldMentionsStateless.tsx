import classNames from 'classnames';
import React, {
  forwardRef,
  RefObject,
  useImperativeHandle,
  useRef,
} from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import { FieldMentionsStatelessProps } from '../types';
import { defaultMentionStyle, defaultStyle } from '../utils';

function FieldMentionsStateless({
  placeholder = "Mention people using '@'",
  allowSpaceInQuery = true,
  style = defaultStyle,
  value = null,
  items,
  onChange,
  onKeyDown,
  className,
  suggestionsPortalHost,
  forwardedRef,
}: FieldMentionsStatelessProps) {
  const element: RefObject<any> = useRef();

  useImperativeHandle(forwardedRef, () => element.current);

  return (
    <MentionsInput
      value={value?.value || ''}
      onChange={onChange}
      onKeyDown={onKeyDown}
      style={style}
      placeholder={placeholder}
      allowSpaceInQuery={allowSpaceInQuery}
      className={classNames('form-control h-auto', className)}
      suggestionsPortalHost={suggestionsPortalHost}
      inputRef={element}
    >
      {items.map((item, index) => (
        <Mention
          {...item}
          key={`mention-${index}`}
          style={defaultMentionStyle}
          appendSpaceOnAdd
        />
      ))}
    </MentionsInput>
  );
}

export default forwardRef((props: FieldMentionsStatelessProps, ref: any) => (
  <FieldMentionsStateless {...props} forwardedRef={ref} />
));
