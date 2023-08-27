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
      // TODO: Fix placeholder color
      tw="[background:rgb(var(--body-on-primary-bg))] shadow-sm block w-full border [border-color:rgb(var(--field-border, var(--border)))] rounded py-3 px-4 placeholder-gray-400
        focus:[--tw-ring-color:rgba(var(--brand-primary), .1)]
        focus:ring-2
        focus:[border-color:rgb(var(--brand-primary))]
        disabled:opacity-50
        disabled:[background:rgba(var(--brand-subtle), .4)]
        focus-within:[--tw-ring-color:rgba(var(--brand-primary), .1)]
        focus-within:ring-2
        focus-within:[border-color:rgb(var(--brand-primary))]
      "
      className={className}
      suggestionsPortalHost={suggestionsPortalHost}
      allowSuggestionsAboveCursor
      inputRef={element}
    >
      {items.map((item, index) => (
        <Mention
          key={`mention-${index}`}
          style={defaultMentionStyle}
          appendSpaceOnAdd
          {...item}
        />
      ))}
    </MentionsInput>
  );
}

export default forwardRef((props: FieldMentionsStatelessProps, ref: any) => (
  <FieldMentionsStateless {...props} forwardedRef={ref} />
));
