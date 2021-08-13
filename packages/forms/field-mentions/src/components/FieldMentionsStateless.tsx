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
  id,
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
      id={id}
      value={value?.value || ''}
      onChange={onChange}
      onKeyDown={onKeyDown}
      style={style}
      placeholder={placeholder}
      allowSpaceInQuery={allowSpaceInQuery}
      tw="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border border-color[var(--border)] rounded py-3 px-4 placeholder-gray-400"
      className={className}
      suggestionsPortalHost={suggestionsPortalHost}
      allowSuggestionsAboveCursor
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
