import React from 'react';
import { FieldGeosuggestItemProps } from '../types';

export default function FieldGeosuggestItem({
  suggestion,
}: FieldGeosuggestItemProps) {
  const {
    description,
    structured_formatting: {
      main_text,
      main_text_matched_substrings,
      secondary_text,
    },
  } = suggestion;
  return (
    <>
      <strong>{main_text}</strong> <small>{secondary_text}</small>
    </>
  );
}
